import Head from 'next/head';
import CodeBlock from '@/components/CodeBlock';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Snippets() {
  const snippets = [
    {
      title: '1. Data Loading and Encoding',
      code: `import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load the dataset
df = pd.read_csv("Student Depression Dataset.csv")

# Make a copy so we don't modify the original
df_model = df.copy()
le = LabelEncoder()

# Find all text/categorical columns and encode them as numbers
cat_cols = df_model.select_dtypes(include='object').columns
for col in cat_cols:
    df_model[col] = le.fit_transform(df_model[col].astype(str))

# Drop the 3 rows with missing Financial Stress values
df_model = df_model.dropna()

print("Shape after cleaning:", df_model.shape)
# Output: (27898, 18)`,
    },
    {
      title: '2. Train/Test Split',
      code: `from sklearn.model_selection import train_test_split

# Separate features (X) and target (y)
# Drop id (not useful) and Depression (this is what we predict)
X = df_model.drop(columns=["Depression", "id"])
y = df_model["Depression"]

# Split 80% training, 20% testing
# stratify=y preserves the class ratio in both sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("Training samples:", len(X_train))  # ~22,318
print("Testing samples :", len(X_test))   # ~5,580`,
    },
    {
      title: '3. Training the 5 Models',
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

models = {
    "Logistic Regression" : LogisticRegression(max_iter=1000, random_state=42),
    "K-Nearest Neighbors" : KNeighborsClassifier(n_neighbors=5),
    "Decision Tree"       : DecisionTreeClassifier(random_state=42),
    "Random Forest"       : RandomForestClassifier(n_estimators=100, random_state=42),
    "Naive Bayes"         : GaussianNB(),
}

results = []
for name, model in models.items():
    model.fit(X_train, y_train)       # train on training data
    y_pred = model.predict(X_test)    # predict on unseen test data

    results.append({
        "Model"    : name,
        "Accuracy" : round(accuracy_score(y_test, y_pred) * 100, 2),
        "Precision": round(precision_score(y_test, y_pred), 4),
        "Recall"   : round(recall_score(y_test, y_pred), 4),
        "F1 Score" : round(f1_score(y_test, y_pred), 4),
    })
    print(f"Done: {name}")`,
    },
    {
      title: '4. Applying SMOTE',
      code: `from imblearn.over_sampling import SMOTE

# Initialize SMOTE with fixed random state for reproducibility
smote = SMOTE(random_state=42)

# Apply SMOTE ONLY to training data — never to test data
X_train_sm, y_train_sm = smote.fit_resample(X_train, y_train)

print("Before SMOTE:", y_train.value_counts().to_dict())
# Output: {1: 13069, 0: 9252}

print("After SMOTE :", pd.Series(y_train_sm).value_counts().to_dict())
# Output: {1: 13069, 0: 13069}`,
    },
    {
      title: '5. Plotting the Confusion Matrix',
      code: `import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix

# Train the best model
best_model = LogisticRegression(max_iter=1000, random_state=42)
best_model.fit(X_train, y_train)
y_pred = best_model.predict(X_test)

# Generate and plot the confusion matrix
cm = confusion_matrix(y_test, y_pred)

fig, ax = plt.subplots(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=["Not Depressed", "Depressed"],
            yticklabels=["Not Depressed", "Depressed"],
            ax=ax, linewidths=0.5)
ax.set_title("Confusion Matrix — Logistic Regression", fontweight="bold")
ax.set_xlabel("Predicted Label")
ax.set_ylabel("True Label")
plt.tight_layout()
plt.show()`,
    },
  ];

  return (
    <>
      <Head>
        <title>Code Snippets | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Snippets</h1>
          <p className="text-lg text-gray-600">Core Python implementation snippets used in the project.</p>
        </div>

        <div className="space-y-4">
          {snippets.map((snippet, idx) => (
            <CollapsibleSection key={idx} title={snippet.title} defaultOpen={true}>
              <CodeBlock language="python" code={snippet.code} />
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </>
  );
}
