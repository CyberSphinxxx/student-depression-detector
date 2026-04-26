import Head from 'next/head';
import CodeBlock from '@/components/CodeBlock';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Smote() {
  const smoteCode = `from imblearn.over_sampling import SMOTE
smote = SMOTE(random_state=42)
X_train_sm, y_train_sm = smote.fit_resample(X_train, y_train)`;

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

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">What is SMOTE?</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>SMOTE</strong> creates artificial samples of the minority class to balance the dataset before training. 
            Unlike simple duplication, it generates new, synthetic data points that are statistically similar to the existing minority samples.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Why it was applied</h3>
          <p className="text-gray-700 leading-relaxed">
            During EDA, we observed a mild class imbalance in the target variable (Depression), with 
            <strong> 58.5% </strong> representing depressed students and <strong> 41.5% </strong> not depressed. 
            Training on imbalanced data can cause the model to become biased toward the majority class. 
            SMOTE helps mitigate this bias.
          </p>
        </div>

        <CollapsibleSection title="Before vs After SMOTE Class Counts" defaultOpen={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-md p-4 border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2">Before SMOTE</h4>
              <ul className="text-gray-700 space-y-1">
                <li>Depressed (1): <strong>13,068</strong></li>
                <li>Not Depressed (0): <strong>9,252</strong></li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-md p-4 border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2">After SMOTE</h4>
              <ul className="text-gray-700 space-y-1">
                <li>Depressed (1): <strong>13,068</strong></li>
                <li>Not Depressed (0): <strong>13,068</strong></li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Implementation</h2>
          <CodeBlock language="python" code={smoteCode} />
        </div>
      </div>
    </>
  );
}
