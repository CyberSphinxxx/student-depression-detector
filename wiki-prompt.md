# Wiki Build Prompt — Student Depression Detector
> Copy everything under the horizontal line and paste it into your AI inside your IDE.

---

Build a **Next.js wiki website** for my machine learning project called **Student Depression Detector**. Place everything inside a `/wiki` folder at the root of the existing repo. It should be deployable to **Vercel** by pointing the root directory to `/wiki`.

---

## Project Context

This is a solo school machine learning project by **John Lemar L. Gonzales (BSIT3-R15)** from the University of Science and Technology of Southern Philippines. The project detects depression risk in students using the Student Depression Dataset from Kaggle (27,901 rows, 18 columns). The GitHub repo is: https://github.com/CyberSphinxxx/student-depression-detector

---

## Design Requirements

- Simple and academic style, like a clean school documentation site
- Color scheme: White background + Dark Gray text and accents (`#1f2937`, `#374151`)
- Fully responsive (mobile + desktop)
- Interactive: sidebar navigation, tabs, collapsible sections, and a search bar that filters section titles
- Use Tailwind CSS for styling
- Syntax highlighted code blocks (use highlight.js or Prism.js)

---

## Pages / Sections

Use a sidebar layout with smooth scroll or page routing.

### 1. Home / Project Overview

- Title: Student Depression Detector
- Subtitle: IT325 Machine Learning | PIT Project
- Short description: An end-to-end ML project that predicts whether a student is at risk of depression based on lifestyle, academic, and socioeconomic factors.
- Quick stats cards:
  - 27,901 rows
  - 18 columns
  - 2 models selected
  - 84.48% best accuracy
- Link to GitHub repo and Colab notebook: https://colab.research.google.com/drive/1zhPo9jZubf_n9y4S_5XO1MQRQ0TrLi5f#scrollTo=1f05b64c

---

### 2. Dataset Info

- Source: Kaggle — Student Depression Dataset
- Link: https://www.kaggle.com/datasets/hopesb/student-depression-dataset
- Table of all 18 columns with their data type (numeric or categorical) and a short description

| Column | Type | Description |
|---|---|---|
| id | Numeric | Row identifier |
| Gender | Categorical | Male or Female |
| Age | Numeric | Age of the student |
| City | Categorical | City where the student lives |
| Profession | Categorical | Student or working |
| Academic Pressure | Numeric | Rating 1–5 (low to high) |
| Work Pressure | Numeric | Rating 1–5 |
| CGPA | Numeric | Grade point average |
| Study Satisfaction | Numeric | Rating 1–5 |
| Job Satisfaction | Numeric | Rating 1–5 |
| Sleep Duration | Categorical | e.g. Less than 5 hours, 5–6 hours |
| Dietary Habits | Categorical | Healthy, Moderate, Unhealthy |
| Degree | Categorical | e.g. BSc, B.Com, M.Tech |
| Have you ever had suicidal thoughts? | Categorical | Yes or No |
| Work/Study Hours | Numeric | Hours per day |
| Financial Stress | Numeric | Rating 1–5 |
| Family History of Mental Illness | Categorical | Yes or No |
| Depression | Numeric | Target — 0 = Not Depressed, 1 = Depressed |

- Target variable: `Depression` (0 = Not Depressed, 1 = Depressed)
- Class distribution: 58.5% Depressed, 41.5% Not Depressed

---

### 3. EDA Results

- Intro paragraph about what EDA was done
- Image gallery using tabs or a grid — images stored in `/wiki/public/images/`:

| Filename | Caption |
|---|---|
| `viz1_class_distribution.png` | Class Distribution — Bar and Pie Chart |
| `viz2_age_distribution.png` | Age Distribution by Depression Status |
| `viz3_academic.png` | Academic Pressure and CGPA |
| `viz4_sleep_diet.png` | Sleep Duration and Dietary Habits |
| `viz5_heatmap.png` | Correlation Heatmap of Numeric Features |
| `viz6_stress_suicidal.png` | Financial Stress and Suicidal Thoughts |

- Each image should have a caption and a short interpretation below it
- Collapsible section — **Key Observations**:
  1. More students are depressed than not — 58.5% vs 41.5%, mild class imbalance
  2. Higher academic pressure is linked to more depression
  3. Students who sleep less than 5 hours tend to be more depressed
  4. Unhealthy diet and high financial stress are also linked to depression
  5. Academic pressure and financial stress have the strongest correlation with depression; CGPA has a very weak connection

---

### 4. Model Comparison

- Intro: Five models were trained and evaluated using accuracy, precision, recall, and F1 score
- Results table with the best value per column highlighted in green:

| Model | Accuracy | Precision | Recall | F1 Score |
|---|---|---|---|---|
| Logistic Regression | 84.48% | 0.8568 | 0.8825 | 0.8694 |
| K-Nearest Neighbors | 74.95% | 0.7629 | 0.8301 | 0.7951 |
| Decision Tree | 76.65% | 0.8007 | 0.8004 | 0.8006 |
| Random Forest | 83.87% | 0.8519 | 0.8770 | 0.8643 |
| Naive Bayes | 65.57% | 0.6304 | 0.9960 | 0.7721 |

- Show these images:
  - `model_comparison_metrics.png`
  - `confusion_matrices_all_models.png`
  - `confusion_matrix_best_model.png`
  - `feature_importance.png`

- Collapsible justification:
  > Logistic Regression and Random Forest were selected for tuning. Logistic Regression had the highest accuracy (84.48%) and F1 score (0.8694). While Naive Bayes had the highest recall (0.9960), its accuracy of 65.57% makes it unreliable. A high accuracy model is not always the best — recall and F1 must also be considered.

---

### 5. SMOTE Explanation

- Short explanation in simple words: "SMOTE (Synthetic Minority Oversampling Technique) creates artificial samples of the minority class to balance the dataset before training."
- Why it was applied: mild class imbalance (58.5% vs 41.5%)
- Collapsible: before vs after SMOTE class counts
- Code snippet:

```python
from imblearn.over_sampling import SMOTE
smote = SMOTE(random_state=42)
X_train_sm, y_train_sm = smote.fit_resample(X_train, y_train)
```

---

### 6. Activity Summaries

Use tabs for each activity:

| Tab | Title | Summary |
|---|---|---|
| 1 | Lecture Activity 2 — EDA Planning | Planned the EDA steps, identified missing values (3 in Financial Stress), confirmed no duplicates, noted mild class imbalance |
| 2 | Lab Activity 2 — EDA Implementation | Loaded dataset, ran all EDA steps, created 6 visualizations, wrote 5 observations |
| 3 | Lecture Activity 3 — Model Comparison Planning | Discussed why one model is not enough, why accuracy alone is misleading, how false positives/negatives affect decisions |
| 4 | Lab Activity 3 — Model Comparison | Trained 5 models, compared metrics, selected Logistic Regression and Random Forest for tuning |

---

### 7. Code Snippets

Collapsible sections for each major code block with syntax highlighting:

**Data Loading and Encoding**
```python
import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("Student Depression Dataset.csv")
df_model = df.copy()
le = LabelEncoder()

cat_cols = df_model.select_dtypes(include='object').columns
for col in cat_cols:
    df_model[col] = le.fit_transform(df_model[col].astype(str))

df_model = df_model.dropna()
```

**Train/Test Split**
```python
from sklearn.model_selection import train_test_split

X = df_model.drop(columns=["Depression", "id"])
y = df_model["Depression"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

**Training the 5 Models**
```python
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB

models = {
    "Logistic Regression" : LogisticRegression(max_iter=1000, random_state=42),
    "K-Nearest Neighbors" : KNeighborsClassifier(n_neighbors=5),
    "Decision Tree"       : DecisionTreeClassifier(random_state=42),
    "Random Forest"       : RandomForestClassifier(n_estimators=100, random_state=42),
    "Naive Bayes"         : GaussianNB(),
}

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    print(f"Done: {name}")
```

**Applying SMOTE**
```python
from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_train_sm, y_train_sm = smote.fit_resample(X_train, y_train)

print("Before SMOTE:", y_train.value_counts().to_dict())
print("After SMOTE :", pd.Series(y_train_sm).value_counts().to_dict())
```

**Plotting the Confusion Matrix**
```python
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_test, y_pred)

sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=["Not Depressed", "Depressed"],
            yticklabels=["Not Depressed", "Depressed"])
plt.title("Confusion Matrix")
plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.tight_layout()
plt.show()
```

---

### 8. About

- Name: John Lemar L. Gonzales
- Course: BSIT3-R15 — IT325 Machine Learning
- School: University of Science and Technology of Southern Philippines (USTP)
- Project: Student Depression Detector — PIT (Project in Training)
- GitHub: https://github.com/CyberSphinxxx
- Colab Notebook: https://colab.research.google.com/drive/1zhPo9jZubf_n9y4S_5XO1MQRQ0TrLi5f#scrollTo=1f05b64c

---

## Folder Structure to Generate

```
/wiki
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── public/
│   └── images/         ← manually add all PNG files here
├── components/
│   ├── Sidebar.jsx
│   ├── SearchBar.jsx
│   ├── CodeBlock.jsx
│   ├── CollapsibleSection.jsx
│   ├── ImageWithCaption.jsx
│   └── MetricTable.jsx
└── pages/
    ├── index.js            ← Home
    ├── dataset.js
    ├── eda.js
    ├── models.js
    ├── smote.js
    ├── activities.js
    ├── snippets.js
    └── about.js
```

---

## Deployment Notes

- Add a `vercel.json` in `/wiki` that sets the root to `/wiki`
- `next.config.js` should use default SSG/SSR for Vercel — do not set `output: 'export'`
- Images should use Next.js `<Image>` component with `unoptimized={true}` since they are local PNGs
- Generate all files completely — do not leave placeholder comments, write the full working code for every file

---

## How to Deploy to Vercel After Generation

1. Push the `/wiki` folder to your GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import `CyberSphinxxx/student-depression-detector`
3. Set **Root Directory** to `wiki`
4. Click **Deploy**
5. Place all PNG image files into `/wiki/public/images/` before or after deploying
