import Head from 'next/head';
import CodeBlock from '@/components/CodeBlock';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Smote() {
  const smoteCode = `from imblearn.over_sampling import SMOTE

# Applied only to the training set
# This ensures the model learns patterns from both classes equally
# without being biased by the majority class distribution

smote = SMOTE(random_state=42)
X_train, y_train = smote.fit_resample(X_train, y_train)

print("Before SMOTE:", y_train.value_counts().to_dict())
# Output: {1: 13069, 0: 9252}

print("After SMOTE :", pd.Series(y_train).value_counts().to_dict())
# Output: {1: 13069, 0: 13069}`;

  return (
    <>
      <Head>
        <title>Class Imbalance — Balancing with SMOTE | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="border-b border-border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Class Imbalance — Balancing with SMOTE</h1>
          <p className="text-lg text-foreground/60">Addressing dataset distribution using synthetic oversampling.</p>
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
            "While the imbalance (58.5/41.5) is considered mild, balancing the training set ensures the model prioritizes both classes equally."
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section 3: What is SMOTE?</h2>
          <p className="text-foreground/80 leading-relaxed">
            SMOTE stands for Synthetic Minority Oversampling Technique. It is a method for addressing class imbalance by generating new synthetic data points for the minority class. Instead of simply duplicating existing samples, SMOTE creates new points between existing minority class samples and their nearest neighbors in the feature space.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section 4: Why I Used SMOTE</h2>
          <p className="text-foreground/80 leading-relaxed">
            I decided to apply SMOTE to the training set for the following reasons:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-foreground/80">
            <li><strong>Ensuring Robust Learning</strong> — Even a mild imbalance can sometimes lead a model to favor the majority class. Balancing the training set forces the algorithm to find a more precise decision boundary.</li>
            <li><strong>Higher Recall Potential</strong> — In depression detection, catching as many true cases as possible (Recall) is critical. SMOTE helps the model become more sensitive to the patterns of the minority class.</li>
            <li><strong>Individual Project Completeness</strong> — As a PIT (Project in Training), implementing SMOTE demonstrates the full machine learning workflow, from cleaning to advanced sampling techniques.</li>
            <li><strong>Stratified Splitting + SMOTE</strong> — I combined <code>stratify=y</code> (to maintain ratios) with SMOTE (to balance the training set) for a comprehensive approach to data distribution.</li>
          </ul>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-foreground">Section 5: Training Results Comparison</h2>
          <div className="bg-sidebar p-6 rounded-xl border border-border-primary shadow-sm">
            <p className="text-foreground/80 mb-4">
              By applying SMOTE to the training set only (leaving the test set untouched for real-world evaluation), the model was able to achieve a balanced performance:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80 text-sm">
              <li><strong>Before SMOTE (Training set):</strong> 13,069 Depressed vs 9,252 Not Depressed</li>
              <li><strong>After SMOTE (Training set):</strong> 13,069 Depressed vs 13,069 Not Depressed</li>
              <li><strong>Total Training Samples:</strong> Increased from 22,321 to 26,138</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold text-foreground">Section 6: Code Implementation</h2>
          <CollapsibleSection title="SMOTE Code Snippet" defaultOpen={true}>
            <div className="space-y-4">
              <p className="text-sm text-foreground/60 bg-blue-500/5 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
                The following code was executed between the Train/Test Split and the Model Training phase.
              </p>
              <CodeBlock language="python" code={smoteCode} />
            </div>
          </CollapsibleSection>
        </section>
      </div>
    </>
  );
}

