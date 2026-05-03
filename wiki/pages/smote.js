import Head from 'next/head';
import CodeBlock from '@/components/CodeBlock';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Smote() {
  const smoteCode = `from imblearn.over_sampling import SMOTE

# This was NOT used in the final project
# Included for reference only — the class imbalance (58.5/41.5) 
# was not severe enough to require oversampling

smote = SMOTE(random_state=42)
X_train_sm, y_train_sm = smote.fit_resample(X_train, y_train)

print("Before SMOTE:", y_train.value_counts().to_dict())
print("After SMOTE :", pd.Series(y_train_sm).value_counts().to_dict())`;

  return (
    <>
      <Head>
        <title>Class Imbalance — Why I Did Not Use SMOTE | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="border-b border-border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Class Imbalance — Why I Did Not Use SMOTE</h1>
          <p className="text-lg text-foreground/60">Addressing dataset distribution and sampling decisions.</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section 1: What is Class Imbalance?</h2>
          <p className="text-foreground/80 leading-relaxed">
            Class imbalance happens when one category in the target variable has significantly more samples than the other. In a binary classification problem like this one, it means the model sees far more examples of one class during training, which can cause it to become biased toward always predicting the majority class.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section 2: My Dataset's Class Distribution</h2>
          <div className="overflow-x-auto my-4 border border-border-primary rounded-lg shadow-sm bg-card">
            <table className="min-w-full divide-y divide-border-primary text-sm">
              <thead className="bg-sidebar">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left font-semibold text-foreground uppercase tracking-wider">Class</th>
                  <th scope="col" className="px-6 py-3 text-left font-semibold text-foreground uppercase tracking-wider">Count</th>
                  <th scope="col" className="px-6 py-3 text-left font-semibold text-foreground uppercase tracking-wider">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground/80 font-medium">Depressed (1)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground/80">16,336</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground/80">58.5%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground/80 font-medium">Not Depressed (0)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground/80">11,565</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground/80">41.5%</td>
                </tr>
                <tr className="bg-sidebar font-bold">
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">Total</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">27,901</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-foreground/50 italic">
            "This was identified during the EDA phase by running df['Depression'].value_counts() on the dataset."
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section 3: What is SMOTE?</h2>
          <p className="text-foreground/80 leading-relaxed">
            SMOTE stands for Synthetic Minority Oversampling Technique. It is a common method for addressing class imbalance by generating new synthetic data points for the minority class. Instead of simply duplicating existing samples, SMOTE creates new points between existing minority class samples and their nearest neighbors in the feature space.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            SMOTE is typically recommended when the class imbalance is severe — for example, a 90/10 or 95/5 split where the minority class is extremely underrepresented.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section 4: Why I Decided Not to Use SMOTE</h2>
          <p className="text-foreground/80 leading-relaxed font-medium">
            After analyzing the class distribution in my dataset, I decided that SMOTE was not necessary for the following reasons:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-foreground/80">
            <li><strong>The imbalance is minor, not severe</strong> — A 58.5% vs 41.5% split is considered a mild imbalance. The general threshold where SMOTE becomes truly necessary is when the minority class makes up less than 20–30% of the data. My dataset does not meet that threshold.</li>
            <li><strong>The minority class is still well-represented</strong> — With 11,565 samples in the Not Depressed class, there is more than enough data for the models to learn from. SMOTE is most helpful when the minority class has very few samples, making it hard for the model to learn its patterns.</li>
            <li><strong>The models already performed well without it</strong> — Logistic Regression achieved 84.48% accuracy and an F1 score of 0.8694 without any oversampling. Random Forest achieved 83.87% accuracy and 0.8643 F1. These results show that the models were already learning both classes effectively.</li>
            <li><strong>SMOTE introduces synthetic data</strong> — Generating artificial data points adds a layer of uncertainty. Since my dataset is large enough and the imbalance is mild, introducing synthetic samples could add noise without meaningful benefit.</li>
            <li><strong>Stratified splitting was used instead</strong> — I used <code>stratify=y</code> in <code>train_test_split</code> to ensure both the training and test sets maintain the same 58.5% / 41.5% class ratio. This is a simpler and safer way to handle mild imbalance without modifying the data itself.</li>
          </ul>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-foreground">Section 5: When Would I Use SMOTE?</h2>
          <CollapsibleSection title="When would SMOTE be appropriate?" defaultOpen={false}>
            <div className="space-y-3 text-foreground/80">
              <p>I would consider applying SMOTE if:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The minority class made up less than 20–25% of the dataset</li>
                <li>The model's recall for the minority class was very low (below 0.70), indicating it was failing to detect those cases</li>
                <li>The confusion matrix showed a very large number of false negatives compared to true positives</li>
              </ul>
              <p className="mt-4 pt-4 border-t border-border-primary">
                In those scenarios, SMOTE would help the model get more exposure to the minority class and improve its ability to detect underrepresented cases. For this project, none of those conditions apply — the models already show strong recall (Logistic Regression: 0.8825, Random Forest: 0.8770), confirming that the mild imbalance did not significantly hurt performance.
              </p>
            </div>
          </CollapsibleSection>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-foreground">Section 6: Code Reference (for context only)</h2>
          <CollapsibleSection title="SMOTE code (not used — for reference only)" defaultOpen={false}>
            <div className="space-y-4">
              <p className="text-sm text-foreground/60 bg-sidebar p-4 rounded-lg border-l-4 border-accent shadow-sm">
                "The following code shows how SMOTE would be applied if the class imbalance were more severe. It was not executed in this project."
              </p>
              <CodeBlock language="python" code={smoteCode} />
            </div>
          </CollapsibleSection>
        </section>
      </div>
    </>
  );
}
