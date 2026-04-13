# =============================================================
# train.py -- Student Depression Detector
# Trains Logistic Regression and Random Forest, selects the
# best model, and saves all artifacts to the model/ folder.
# =============================================================

# --- IMPORTS ---
import os
import sys
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')          # non-interactive backend for saving plots
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)

# Force stdout to use UTF-8 so special chars print safely on Windows
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================
# PATHS -- always relative to this script's location
# =============================================================
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
DATA_PATH  = os.path.join(BASE_DIR, "Student Depression Dataset.csv")
MODEL_DIR  = os.path.join(BASE_DIR, "model")
os.makedirs(MODEL_DIR, exist_ok=True)   # create model/ if it does not exist

# =============================================================
# STEP 1 -- LOAD DATA
# =============================================================
print("=" * 60)
print("STEP 1 -- Loading Data")
print("=" * 60)

df = pd.read_csv(DATA_PATH)
print(f"Shape: {df.shape}")
print(f"\nFirst 5 rows:\n{df.head()}")
print(f"\nColumn names: {df.columns.tolist()}")

# =============================================================
# STEP 2 -- PREPROCESSING
# =============================================================
print("\n" + "=" * 60)
print("STEP 2 -- Preprocessing")
print("=" * 60)

# 2-a. Drop duplicate rows
before = len(df)
df.drop_duplicates(inplace=True)
print(f"Dropped {before - len(df)} duplicate rows. Remaining: {len(df)}")

# 2-b. Handle missing values
numeric_cols     = df.select_dtypes(include=[np.number]).columns.tolist()
categorical_cols = df.select_dtypes(include=['object', 'str']).columns.tolist()

for col in numeric_cols:
    if df[col].isnull().sum() > 0:
        df[col] = df[col].fillna(df[col].median())
        print(f"  Filled numeric NaN in '{col}' with median")

for col in categorical_cols:
    if df[col].isnull().sum() > 0:
        df[col] = df[col].fillna(df[col].mode()[0])
        print(f"  Filled categorical NaN in '{col}' with mode")

print(f"Missing values after fill:\n{df.isnull().sum()[df.isnull().sum()>0]}")

# 2-c. Encode target variable "Depression" -> 0/1
TARGET = "Depression"
if df[TARGET].dtype == object:
    df[TARGET] = df[TARGET].map({'Yes': 1, 'No': 0})
    print(f"Encoded '{TARGET}' column: Yes->1, No->0")
else:
    print(f"'{TARGET}' is already numeric -- no encoding needed")

# 2-d. Encode all other categorical columns with LabelEncoder
#      Keep a dict so the GUI can reuse the same encoders.
encoder_dict = {}
# Refresh categorical list (exclude target which is now numeric)
categorical_cols = df.select_dtypes(include=['object', 'str']).columns.tolist()

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    encoder_dict[col] = le
    print(f"  LabelEncoded '{col}' -- classes: {list(le.classes_)}")

# =============================================================
# STEP 3 -- FEATURE ENGINEERING
# =============================================================
print("\n" + "=" * 60)
print("STEP 3 -- Feature Engineering")
print("=" * 60)

# 3-a. Stress_Score: average of pressure-related columns
stress_cols = [c for c in ['Academic Pressure', 'Work Pressure', 'Financial Stress'] if c in df.columns]
if stress_cols:
    df['Stress_Score'] = df[stress_cols].mean(axis=1)
    print(f"Created 'Stress_Score' from: {stress_cols}")

# 3-b. Sleep_Category
# Sleep Duration was already label-encoded, so we map encoded int -> hour approx
# LabelEncoder sorts alphabetically:
#   '5-6 hours'->0, '7-8 hours'->1, 'Less than 5 hours'->2,
#   'More than 8 hours'->3, 'Others'->4
SLEEP_COL = 'Sleep Duration'
if SLEEP_COL in df.columns:
    sleep_le = encoder_dict.get(SLEEP_COL)
    if sleep_le is not None:
        sleep_hour_map = {}
        for i, cls in enumerate(sleep_le.classes_):
            cls_low = cls.lower()
            if 'less than 5' in cls_low:
                sleep_hour_map[i] = 4.0
            elif '5-6' in cls_low:
                sleep_hour_map[i] = 5.5
            elif '7-8' in cls_low:
                sleep_hour_map[i] = 7.5
            elif 'more than 8' in cls_low:
                sleep_hour_map[i] = 9.0
            else:
                sleep_hour_map[i] = 7.0   # default for 'Others'
        df['Sleep_Hours_Approx'] = df[SLEEP_COL].map(sleep_hour_map).fillna(7.0)
    else:
        df['Sleep_Hours_Approx'] = df[SLEEP_COL] * 1.5 + 4  # fallback

    def categorize_sleep(hours):
        if hours < 6:
            return 0   # Low
        elif hours <= 8:
            return 1   # Normal
        else:
            return 2   # High

    df['Sleep_Category'] = df['Sleep_Hours_Approx'].apply(categorize_sleep)
    df.drop(columns=['Sleep_Hours_Approx'], inplace=True)
    print("Created 'Sleep_Category' (0=Low, 1=Normal, 2=High)")

# 3-c. Study_Work_Balance: Study Hours / (Study Hours + 1)
study_col = 'Work/Study Hours'
if study_col in df.columns:
    df['Study_Work_Balance'] = df[study_col] / (df[study_col] + 1)
    print("Created 'Study_Work_Balance'")

print(f"\nShape after feature engineering: {df.shape}")
print(f"Columns: {df.columns.tolist()}")

# =============================================================
# STEP 4 -- SCALE FEATURES
# =============================================================
print("\n" + "=" * 60)
print("STEP 4 -- Scaling Features")
print("=" * 60)

# Separate features and target
X = df.drop(columns=[TARGET])
y = df[TARGET]

feature_columns = X.columns.tolist()
print(f"Feature columns ({len(feature_columns)}): {feature_columns}")

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Save scaler
joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
print("Scaler saved -> model/scaler.pkl")

# =============================================================
# STEP 5 -- TRAIN / TEST SPLIT
# =============================================================
print("\n" + "=" * 60)
print("STEP 5 -- Train/Test Split (80/20)")
print("=" * 60)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.20, random_state=42
)
print(f"Train size: {X_train.shape[0]}  |  Test size: {X_test.shape[0]}")

# =============================================================
# STEP 6 -- TRAIN & EVALUATE MODELS
# =============================================================
print("\n" + "=" * 60)
print("STEP 6 -- Training Models")
print("=" * 60)

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
    "Random Forest":       RandomForestClassifier(n_estimators=100, random_state=42),
}

results = {}   # store accuracy for comparison

for model_name, model in models.items():
    print("\n" + "-" * 50)
    print(f"  Model: {model_name}")
    print("-" * 50)

    # Train
    model.fit(X_train, y_train)

    # Predict
    y_train_pred = model.predict(X_train)
    y_test_pred  = model.predict(X_test)

    train_acc = accuracy_score(y_train, y_train_pred)
    test_acc  = accuracy_score(y_test,  y_test_pred)
    results[model_name] = {"model": model, "test_acc": test_acc}

    print(f"  Training Accuracy : {train_acc:.4f} ({train_acc*100:.2f}%)")
    print(f"  Test Accuracy     : {test_acc:.4f}  ({test_acc*100:.2f}%)")
    print(f"\n  Classification Report:\n{classification_report(y_test, y_test_pred)}")
    print(f"  Confusion Matrix:\n{confusion_matrix(y_test, y_test_pred)}")

    # --- Confusion Matrix Heatmap ---
    cm = confusion_matrix(y_test, y_test_pred)
    fig, ax = plt.subplots(figsize=(6, 5))
    sns.heatmap(
        cm, annot=True, fmt='d', cmap='Blues',
        xticklabels=['Not Depressed', 'Depressed'],
        yticklabels=['Not Depressed', 'Depressed'],
        ax=ax
    )
    ax.set_xlabel('Predicted')
    ax.set_ylabel('Actual')
    ax.set_title(f'Confusion Matrix -- {model_name}')
    safe_name = model_name.replace(' ', '_').lower()
    cm_path = os.path.join(MODEL_DIR, f"confusion_matrix_{safe_name}.png")
    plt.tight_layout()
    plt.savefig(cm_path, dpi=150)
    plt.close(fig)
    print(f"  Confusion matrix saved -> {cm_path}")

# =============================================================
# STEP 7 -- MODEL SELECTION
# =============================================================
print("\n" + "=" * 60)
print("STEP 7 -- Model Selection")
print("=" * 60)

best_name  = max(results, key=lambda k: results[k]["test_acc"])
best_model = results[best_name]["model"]
best_acc   = results[best_name]["test_acc"]

print(f"\n  [BEST] Model : {best_name}")
print(f"         Test Accuracy: {best_acc*100:.2f}%")
print(f"         Reason: Highest test accuracy among all trained models.")

# Save best model
model_path = os.path.join(MODEL_DIR, "depression_model.pkl")
joblib.dump(best_model, model_path)
print(f"\n  Model saved -> {model_path}")

# Save encoders
enc_path = os.path.join(MODEL_DIR, "encoders.pkl")
joblib.dump(encoder_dict, enc_path)
print(f"  Encoders saved -> {enc_path}")

# Save feature columns
feat_path = os.path.join(MODEL_DIR, "feature_columns.pkl")
joblib.dump(feature_columns, feat_path)
print(f"  Feature columns saved -> {feat_path}")

# =============================================================
# STEP 8 -- FEATURE IMPORTANCE / COEFFICIENTS PLOT
# =============================================================
print("\n" + "=" * 60)
print("STEP 8 -- Feature Importance")
print("=" * 60)

fig, ax = plt.subplots(figsize=(10, 7))
plot_path = os.path.join(MODEL_DIR, "feature_importance.png")

if hasattr(best_model, 'feature_importances_'):
    # Random Forest -- feature importance bar chart
    importances = best_model.feature_importances_
    fi_df = pd.DataFrame({'Feature': feature_columns, 'Importance': importances})
    fi_df.sort_values('Importance', ascending=True, inplace=True)
    fi_df.tail(20).plot.barh(x='Feature', y='Importance', ax=ax, color='steelblue', legend=False)
    ax.set_title(f'Feature Importances -- {best_name}')
    ax.set_xlabel('Importance Score')
else:
    # Logistic Regression -- coefficients bar chart
    coefs = best_model.coef_[0]
    coef_df = pd.DataFrame({'Feature': feature_columns, 'Coefficient': coefs})
    coef_df.sort_values('Coefficient', ascending=True, inplace=True)
    colors = ['red' if c < 0 else 'green' for c in coef_df['Coefficient']]
    ax.barh(coef_df['Feature'], coef_df['Coefficient'], color=colors)
    ax.set_title(f'Logistic Regression Coefficients -- {best_name}')
    ax.set_xlabel('Coefficient Value')
    ax.axvline(0, color='black', linewidth=0.8)

plt.tight_layout()
plt.savefig(plot_path, dpi=150)
plt.close(fig)
print(f"  Feature importance chart saved -> {plot_path}")

# =============================================================
# STEP 9 -- SUMMARY TABLE
# =============================================================
print("\n" + "=" * 60)
print("STEP 9 -- Column Summary")
print("=" * 60)

summary_rows = []
for col in df.columns:
    was_encoded = col in encoder_dict
    summary_rows.append({
        'Column':  col,
        'dtype':   str(df[col].dtype),
        'Encoded': 'Yes (LabelEncoder)' if was_encoded else ('Target' if col == TARGET else 'No'),
    })

summary_df = pd.DataFrame(summary_rows)
pd.set_option('display.max_rows', None)
pd.set_option('display.max_colwidth', None)
print(summary_df.to_string(index=False))

# =============================================================
print("\n" + "=" * 60)
print("Training complete! Model saved to model/depression_model.pkl")
print("=" * 60)
