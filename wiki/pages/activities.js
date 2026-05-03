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
            <p className="text-gray-700">I implemented the EDA plan in a Jupyter Notebook using Python with pandas, numpy, matplotlib, and seaborn.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Steps completed:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>Loaded dataset with <code>pd.read_csv()</code> and displayed <code>df.head()</code></li>
              <li>Checked shape (27,901 x 18), all column names and data types</li>
              <li>Ran <code>df.isnull().sum()</code> — found 3 missing values in Financial Stress only</li>
              <li>Ran <code>df.duplicated().sum()</code> — confirmed 0 duplicate rows</li>
              <li>Used <code>df["Depression"].value_counts()</code> — 16,336 depressed (58.5%), 11,565 not (41.5%)</li>
              <li>Created 6 visualizations: class distribution, age histogram/boxplot, academic pressure count plot, CGPA histogram, sleep/diet grouped bars, financial stress/suicidal thoughts, correlation heatmap</li>
              <li>Added <code>Depression_Label</code> column mapping 0 to "Not Depressed" and 1 to "Depressed" for cleaner chart legends</li>
              <li>Wrote 5 observations in a markdown text cell</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Output:</h4>
            <p className="text-gray-700">Fully executed Jupyter Notebook with all 6 visualizations and 5 written observations</p>
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
            <p className="text-gray-700">I answered discussion questions about model evaluation theory to understand how to fairly compare ML models before coding anything.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Discussion questions I answered:</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Why one model is not enough</strong> — Different models have different strengths. Testing multiple models lets me compare fairly and pick the best one for my dataset.</li>
              <li><strong>Why accuracy alone is not enough</strong> — In my dataset, 58.5% are depressed. A model predicting "depressed" for everyone would get 58.5% accuracy without learning anything. I also need precision, recall, and F1 score.</li>
              <li><strong>How false positives and negatives affect decisions</strong> — A false negative (predicting not depressed when they actually are) is the most dangerous error because the student misses out on help. A false positive causes a false alarm but is less harmful.</li>
              <li><strong>How metrics help choose models fairly</strong> — F1 score and recall let me compare models beyond just accuracy and select one that performs well on both classes.</li>
            </ul>
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
            <p className="text-gray-700">I trained five ML models on the Student Depression Dataset, compared their performance using four metrics, and selected the best two for tuning.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Steps completed:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>Encoded all categorical columns using <code>LabelEncoder</code></li>
              <li>Dropped 3 rows with missing Financial Stress values</li>
              <li>Dropped the <code>id</code> column (not useful for prediction)</li>
              <li>Split data 80/20 with <code>stratify=y</code> to preserve class ratio</li>
              <li>Applied SMOTE to the training set to balance classes</li>
              <li>Trained 5 models: Logistic Regression, K-Nearest Neighbors, Decision Tree, Random Forest, Naive Bayes</li>
              <li>Evaluated each using accuracy, precision, recall, and F1 score</li>
              <li>Created bar charts for all metrics and confusion matrices for all 5 models</li>
              <li>Selected Logistic Regression and Random Forest for tuning</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Results:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Highest Accuracy:</strong> Logistic Regression — 84.48%</li>
              <li><strong>Highest Recall:</strong> Naive Bayes — 0.9960</li>
              <li><strong>Best F1 Score:</strong> Logistic Regression — 0.8694</li>
              <li><strong>Models selected for tuning:</strong> Logistic Regression and Random Forest</li>
            </ul>
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
        <div className="border-b border-border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Activity Summaries</h1>
          <p className="text-lg text-foreground/60">A log of project milestones and lab activities.</p>
        </div>

        <div className="bg-card border border-border-primary rounded-xl overflow-hidden shadow-sm">
          <div className="flex overflow-x-auto border-b border-border-primary bg-sidebar/50">
            {activities.map((activity, idx) => (
              <button
                key={idx}
                className={`whitespace-nowrap px-8 py-5 text-sm font-semibold transition-all focus:outline-none relative ${
                  activeTab === idx
                    ? 'text-accent'
                    : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'
                }`}
                onClick={() => setActiveTab(idx)}
              >
                Activity {idx + 1}
                {activeTab === idx && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border-primary/50">
              {activities[activeTab].title}
            </h2>
            <div className="text-foreground/80 leading-relaxed bg-sidebar p-8 rounded-xl border border-border-primary/50">
              {activities[activeTab].content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
