import { useState } from 'react';
import Head from 'next/head';

export default function Activities() {
  const [activeTab, setActiveTab] = useState(0);

  const activities = [
    {
      title: 'Lecture Activity 2 — EDA Planning',
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-gray-900">Type: <span className="font-normal text-gray-700">Lecture Activity</span> | Topic: <span className="font-normal text-gray-700">EDA Planning</span></p>
          <div>
            <h4 className="font-semibold text-gray-800">What I did:</h4>
            <p className="text-gray-700">I examined the Student Depression Dataset and identified its important components to plan the EDA properly.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Key findings from planning:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Dataset title: Student Depression Dataset (Kaggle)</li>
              <li>Text/categorical features: Gender, City, Profession, Sleep Duration, Dietary Habits, Degree, Have you ever had suicidal thoughts?, Family History of Mental Illness</li>
              <li>Target variable: Depression (binary — 0 or 1)</li>
              <li>Dataset size: 27,901 rows × 18 columns</li>
              <li>Missing values: 3 missing in the Financial Stress column only</li>
              <li>Duplicate rows: None detected</li>
              <li>Class distribution: 58.5% Depressed, 41.5% Not Depressed (mild imbalance)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Planned EDA steps:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>Load the dataset and display the first 5 rows</li>
              <li>Check shape, column names, and data types</li>
              <li>Identify and handle missing values</li>
              <li>Check for duplicate rows</li>
              <li>Analyze class distribution of the Depression column</li>
              <li>Create at least 6 visualizations</li>
              <li>Write 5 observations based on findings</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: 'Lab Activity 2 — EDA Implementation',
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-gray-900">Type: <span className="font-normal text-gray-700">Laboratory Activity</span> | Topic: <span className="font-normal text-gray-700">Exploratory Data Analysis</span></p>
          <div>
            <h4 className="font-semibold text-gray-800">What I did:</h4>
            <p className="text-gray-700">I implemented the EDA plan from Lecture Activity 2 in a Jupyter Notebook / Google Colab using Python.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Steps completed:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>Loaded the dataset using <code>pd.read_csv()</code> and displayed first 5 rows with <code>df.head()</code></li>
              <li>Checked shape (27,901 × 18), printed all column names and their data types</li>
              <li>Ran <code>df.isnull().sum()</code> — found 3 missing values in Financial Stress only</li>
              <li>Ran <code>df.duplicated().sum()</code> — confirmed 0 duplicate rows</li>
              <li>Used <code>df["Depression"].value_counts()</code> — 16,336 depressed (58.5%), 11,565 not (41.5%)</li>
              <li>Created 6 visualizations: class distribution, age distribution, academic pressure vs depression, CGPA distribution, sleep duration and dietary habits, financial stress and suicidal thoughts, correlation heatmap</li>
              <li>Added label column <code>Depression_Label</code> mapping 0→"Not Depressed" and 1→"Depressed" for cleaner chart legends</li>
              <li>Wrote 5 observations in a markdown cell</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Tools used:</h4>
            <p className="text-gray-700">pandas, numpy, matplotlib, seaborn</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Output:</h4>
            <p className="text-gray-700">Fully executed Jupyter Notebook with all visualizations and observations</p>
          </div>
        </div>
      )
    },
    {
      title: 'Lecture Activity 3 — Model Comparison Planning',
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-gray-900">Type: <span className="font-normal text-gray-700">Lecture Activity</span> | Topic: <span className="font-normal text-gray-700">Model Comparison and Evaluation</span></p>
          <div>
            <h4 className="font-semibold text-gray-800">What I did:</h4>
            <p className="text-gray-700">I answered discussion questions about model evaluation theory and analyzed a sample results table to practice reading and comparing ML metrics.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Discussion points I answered:</h4>
            <div className="space-y-3 mt-2">
              <div>
                <p className="font-medium text-gray-800">1. Why using only one model may lead to a weak result:</p>
                <p className="text-gray-700">Different models have different strengths. Logistic Regression is fast and interpretable but may miss complex patterns. Testing multiple models lets me compare fairly and pick the best one for my dataset.</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">2. Why accuracy alone is not enough:</p>
                <p className="text-gray-700">In my dataset, 58.5% of students are depressed. A model that predicts "depressed" for everyone would already get 58.5% accuracy without learning anything useful. Precision, recall, and F1 score are also needed.</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">3. How false positives and false negatives affect decisions:</p>
                <p className="text-gray-700">A false negative (predicting "not depressed" when the student actually is) is the most dangerous error in this context because the student would miss out on help. A false positive causes an unnecessary false alarm but is less harmful.</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">4. How evaluation metrics help choose models fairly:</p>
                <p className="text-gray-700">Metrics like F1 score and recall allow me to compare models beyond just accuracy and pick one that actually performs well on both classes.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Lab Activity 3 — Model Comparison',
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-gray-900">Type: <span className="font-normal text-gray-700">Laboratory Activity</span> | Topic: <span className="font-normal text-gray-700">Training and Comparing 5 Models</span></p>
          <div>
            <h4 className="font-semibold text-gray-800">What I did:</h4>
            <p className="text-gray-700">I trained five machine learning models on the Student Depression Dataset and compared their performance to select the best two for tuning.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Steps completed:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>Encoded all categorical columns using <code>LabelEncoder</code></li>
              <li>Dropped 3 rows with missing Financial Stress values</li>
              <li>Separated features (<code>X</code>) and target (<code>y</code>), dropped the <code>id</code> column</li>
              <li>Split data 80/20 using <code>train_test_split</code> with <code>stratify=y</code></li>
              <li>Applied SMOTE to the training set to balance classes</li>
              <li>Trained 5 models: Logistic Regression, K-Nearest Neighbors, Decision Tree, Random Forest, Naive Bayes</li>
              <li>Evaluated each model using accuracy, precision, recall, and F1 score</li>
              <li>Created bar chart comparing all metrics and confusion matrices for all 5 models</li>
              <li>Selected Logistic Regression and Random Forest for tuning</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Final results:</h4>
            <div className="overflow-x-auto my-3 border border-gray-200 rounded shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-2 text-left font-semibold text-gray-900 uppercase">Model</th>
                    <th scope="col" className="px-4 py-2 text-left font-semibold text-gray-900 uppercase">Accuracy</th>
                    <th scope="col" className="px-4 py-2 text-left font-semibold text-gray-900 uppercase">F1 Score</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">Logistic Regression</td><td className="px-4 py-2">84.48%</td><td className="px-4 py-2">0.8694</td></tr>
                  <tr><td className="px-4 py-2">K-Nearest Neighbors</td><td className="px-4 py-2">74.95%</td><td className="px-4 py-2">0.7951</td></tr>
                  <tr><td className="px-4 py-2">Decision Tree</td><td className="px-4 py-2">76.65%</td><td className="px-4 py-2">0.8006</td></tr>
                  <tr><td className="px-4 py-2">Random Forest</td><td className="px-4 py-2">83.87%</td><td className="px-4 py-2">0.8643</td></tr>
                  <tr><td className="px-4 py-2">Naive Bayes</td><td className="px-4 py-2">65.57%</td><td className="px-4 py-2">0.7721</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Models selected for tuning:</h4>
            <p className="text-gray-700">Logistic Regression and Random Forest</p>
          </div>
        </div>
      )
    },
  ];

  return (
    <>
      <Head>
        <title>Activity Summaries | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Summaries</h1>
          <p className="text-lg text-gray-600">A log of project milestones and lab activities.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {activities.map((activity, idx) => (
              <button
                key={idx}
                className={`whitespace-nowrap px-6 py-4 text-sm font-medium transition-colors focus:outline-none ${
                  activeTab === idx
                    ? 'border-b-2 border-gray-900 text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent'
                }`}
                onClick={() => setActiveTab(idx)}
              >
                Activity {idx + 1}
              </button>
            ))}
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              {activities[activeTab].title}
            </h2>
            <div className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-md border border-gray-100">
              {activities[activeTab].content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
