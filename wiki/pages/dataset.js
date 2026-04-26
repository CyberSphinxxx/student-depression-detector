import Head from 'next/head';
import MetricTable from '@/components/MetricTable';

export default function Dataset() {
  const tableHeaders = ['Column', 'Type', 'Description'];
  const tableRows = [
    ['id', 'Numeric', 'Row identifier'],
    ['Gender', 'Categorical', 'Male or Female'],
    ['Age', 'Numeric', 'Age of the student'],
    ['City', 'Categorical', 'City where the student lives'],
    ['Profession', 'Categorical', 'Student or working'],
    ['Academic Pressure', 'Numeric', 'Rating 1–5 (low to high)'],
    ['Work Pressure', 'Numeric', 'Rating 1–5'],
    ['CGPA', 'Numeric', 'Grade point average'],
    ['Study Satisfaction', 'Numeric', 'Rating 1–5'],
    ['Job Satisfaction', 'Numeric', 'Rating 1–5'],
    ['Sleep Duration', 'Categorical', 'e.g. Less than 5 hours, 5–6 hours'],
    ['Dietary Habits', 'Categorical', 'Healthy, Moderate, Unhealthy'],
    ['Degree', 'Categorical', 'e.g. BSc, B.Com, M.Tech'],
    ['Have you ever had suicidal thoughts?', 'Categorical', 'Yes or No'],
    ['Work/Study Hours', 'Numeric', 'Hours per day'],
    ['Financial Stress', 'Numeric', 'Rating 1–5'],
    ['Family History of Mental Illness', 'Categorical', 'Yes or No'],
    ['Depression', 'Numeric', 'Target — 0 = Not Depressed, 1 = Depressed'],
  ];

  return (
    <>
      <Head>
        <title>Dataset Info | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dataset Information</h1>
          <p className="text-lg text-gray-600">Overview of the features used in the ML models.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Source & Context</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Source:</strong> Kaggle — Student Depression Dataset
            </li>
            <li>
              <strong>Link:</strong> <a href="https://www.kaggle.com/datasets/hopesb/student-depression-dataset" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View on Kaggle</a>
            </li>
            <li>
              <strong>Target Variable:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-sm text-pink-600">Depression</code> (0 = Not Depressed, 1 = Depressed)
            </li>
            <li>
              <strong>Class Distribution:</strong> 58.5% Depressed, 41.5% Not Depressed
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature Dictionary</h2>
          <MetricTable headers={tableHeaders} rows={tableRows} />
        </div>
      </div>
    </>
  );
}
