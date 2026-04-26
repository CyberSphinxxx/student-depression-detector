import { useState } from 'react';
import Head from 'next/head';

export default function Activities() {
  const [activeTab, setActiveTab] = useState(0);

  const activities = [
    {
      title: 'Lecture Activity 2 — EDA Planning',
      summary: 'Planned the EDA steps, identified missing values (3 in Financial Stress), confirmed no duplicates, noted mild class imbalance.',
    },
    {
      title: 'Lab Activity 2 — EDA Implementation',
      summary: 'Loaded dataset, ran all EDA steps, created 6 visualizations, wrote 5 observations.',
    },
    {
      title: 'Lecture Activity 3 — Model Comparison Planning',
      summary: 'Discussed why one model is not enough, why accuracy alone is misleading, how false positives/negatives affect decisions.',
    },
    {
      title: 'Lab Activity 3 — Model Comparison',
      summary: 'Trained 5 models, compared metrics, selected Logistic Regression and Random Forest for tuning.',
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {activities[activeTab].title}
            </h2>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-100">
              {activities[activeTab].summary}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
