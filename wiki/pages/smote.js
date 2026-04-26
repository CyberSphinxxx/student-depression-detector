import Head from 'next/head';
import CodeBlock from '@/components/CodeBlock';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Smote() {
  const smoteCode = `from imblearn.over_sampling import SMOTE

# Initialize SMOTE with a fixed random state for reproducibility
smote = SMOTE(random_state=42)

# Apply SMOTE only to the training data
# X_train_sm and y_train_sm are the balanced versions
X_train_sm, y_train_sm = smote.fit_resample(X_train, y_train)

print("Before SMOTE:", y_train.value_counts().to_dict())
# Output: {1: 13069, 0: 9252}

print("After SMOTE :", pd.Series(y_train_sm).value_counts().to_dict())
# Output: {1: 13069, 0: 13069}`;

  return (
    <>
      <Head>
        <title>SMOTE | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SMOTE</h1>
          <p className="text-lg text-gray-600">Synthetic Minority Oversampling Technique</p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-700">
          <p>
            During the Exploratory Data Analysis, I observed a mild class imbalance in the target variable — 58.5% of students are labeled as depressed and 41.5% are not. While this imbalance is not extreme, it can still cause models to lean toward predicting the majority class. To address this, I applied SMOTE (Synthetic Minority Oversampling Technique) to the training set before fitting the models.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">How SMOTE Works</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SMOTE does not simply duplicate existing samples. Instead, it generates new synthetic data points by:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Picking a sample from the minority class (Not Depressed)</li>
            <li>Finding its nearest neighbors in the feature space</li>
            <li>Creating a new synthetic point somewhere between the original sample and one of its neighbors</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mt-4">
            This results in a more diverse and balanced training set without the risk of exact duplication.
          </p>
        </div>

        <CollapsibleSection title="Before vs After SMOTE" defaultOpen={true}>
          <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-900 uppercase tracking-wider">Class</th>
                  <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-900 uppercase tracking-wider">Before SMOTE</th>
                  <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-900 uppercase tracking-wider">After SMOTE</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">Not Depressed (0)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">9,252 samples</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">13,069 samples (synthetic added)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">Depressed (1)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">13,069 samples</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">13,069 samples (unchanged)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors bg-gray-50 font-semibold">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">Total</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">22,321</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">26,138</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mt-4 bg-gray-50 p-4 rounded border border-gray-100">
            Note: SMOTE was only applied to the <strong>training set</strong> (80% of data). The test set was kept original and untouched to ensure fair and realistic evaluation. Applying SMOTE to the test set would give artificially inflated results.
          </p>
        </CollapsibleSection>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Implementation</h2>
          <CodeBlock language="python" code={smoteCode} />
        </div>
      </div>
    </>
  );
}
