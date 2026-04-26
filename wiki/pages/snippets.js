import Head from 'next/head';
import CodeBlock from '@/components/CodeBlock';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Snippets() {
  const snippets = [
    {
      title: 'Data Loading and Encoding',
      code: `import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("Student Depression Dataset.csv")
df_model = df.copy()
le = LabelEncoder()

cat_cols = df_model.select_dtypes(include='object').columns
for col in cat_cols:
    df_model[col] = le.fit_transform(df_model[col].astype(str))

df_model = df_model.dropna()`,
    },
    {
      title: 'Train/Test Split',
      code: `from sklearn.model_selection import train_test_split

X = df_model.drop(columns=["Depression", "id"])
y = df_model["Depression"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)`,
    },
    {
      title: 'Training the 5 Models',
      code: `from sklearn.linear_model import LogisticRegression
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
    print(f"Done: {name}")`,
    },
    {
      title: 'Applying SMOTE',
      code: `from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_train_sm, y_train_sm = smote.fit_resample(X_train, y_train)

print("Before SMOTE:", y_train.value_counts().to_dict())
print("After SMOTE :", pd.Series(y_train_sm).value_counts().to_dict())`,
    },
    {
      title: 'Plotting the Confusion Matrix',
      code: `import seaborn as sns
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
            <CollapsibleSection key={idx} title={snippet.title} defaultOpen={idx === 0}>
              <CodeBlock language="python" code={snippet.code} />
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </>
  );
}
