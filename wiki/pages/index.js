import Head from "next/head";

export default function Home() {
  const stats = [
    { label: "Dataset Rows", value: "27,901" },
    { label: "Features (Columns)", value: "18" },
    { label: "Models Selected", value: "2" },
    { label: "Best Accuracy", value: "84.48%" },
  ];

  return (
    <>
      <Head>
        <title>Student Depression Detector | ML Project</title>
        <meta name="description" content="An end-to-end ML project predicting student depression risk." />
      </Head>

      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Student Depression Detector
          </h1>
          <h2 className="text-xl font-medium text-gray-500">
            IT325 Machine Learning | PIT Project
          </h2>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to the documentation for the <strong>Student Depression Detector</strong>. 
            This is an end-to-end Machine Learning project that I built to predict whether a student is at risk of depression 
            based on various lifestyle, academic, and socioeconomic factors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</span>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-lg leading-relaxed">
            <li><strong>Load Data</strong> — The Student Depression Dataset (27,901 rows, 18 columns) is loaded using pandas</li>
            <li><strong>Clean & Encode</strong> — Categorical columns are label-encoded, 3 missing values in Financial Stress are dropped</li>
            <li><strong>EDA</strong> — Distributions, correlations, and class balance are visualized using matplotlib and seaborn</li>
            <li><strong>Balance with SMOTE</strong> — The mild class imbalance (58.5% vs 41.5%) is addressed using SMOTE on the training set</li>
            <li><strong>Train 5 Models</strong> — Logistic Regression, K-Nearest Neighbors, Decision Tree, Random Forest, and Naive Bayes are trained</li>
            <li><strong>Evaluate & Compare</strong> — Models are evaluated using Accuracy, Precision, Recall, and F1 Score</li>
            <li><strong>Select Best Models</strong> — Logistic Regression and Random Forest are selected for further tuning</li>
          </ol>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            <li className="bg-gray-50 px-4 py-2 rounded-md border border-gray-100 flex items-center justify-center font-medium">Python 3</li>
            <li className="bg-gray-50 px-4 py-2 rounded-md border border-gray-100 flex items-center justify-center font-medium">pandas</li>
            <li className="bg-gray-50 px-4 py-2 rounded-md border border-gray-100 flex items-center justify-center font-medium">numpy</li>
            <li className="bg-gray-50 px-4 py-2 rounded-md border border-gray-100 flex items-center justify-center font-medium">scikit-learn</li>
            <li className="bg-gray-50 px-4 py-2 rounded-md border border-gray-100 flex items-center justify-center font-medium text-center">imbalanced-learn (SMOTE)</li>
            <li className="bg-gray-50 px-4 py-2 rounded-md border border-gray-100 flex items-center justify-center font-medium">matplotlib</li>
            <li className="bg-gray-50 px-4 py-2 rounded-md border border-gray-100 flex items-center justify-center font-medium">seaborn</li>
            <li className="bg-gray-50 px-4 py-2 rounded-md border border-gray-100 flex items-center justify-center font-medium text-center">Jupyter / Google Colab</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Links</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://github.com/CyberSphinxxx/student-depression-detector" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
              >
                GitHub Repository ↗
              </a>
            </li>
            <li>
              <a 
                href="https://colab.research.google.com/drive/1zhPo9jZubf_n9y4S_5XO1MQRQ0TrLi5f#scrollTo=1f05b64c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
              >
                Google Colab Notebook ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
