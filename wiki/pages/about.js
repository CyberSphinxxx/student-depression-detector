import Head from 'next/head';
import MetricTable from '@/components/MetricTable';

export default function About() {
  const details = [
    { label: 'Name', value: 'John Lemar L. Gonzales' },
    { label: 'Course', value: 'BSIT3-R15 — IT325 Machine Learning' },
    { label: 'School', value: 'University of Science and Technology of Southern Philippines (USTP)' },
    { label: 'Project', value: 'Student Depression Detector — PIT (Project in Training)' },
  ];

  const timelineHeaders = ['Phase', 'Activity', 'Status'];
  const timelineRows = [
    ['Phase 1', 'Dataset Selection and EDA Planning (Lecture Activity 2)', 'Done'],
    ['Phase 2', 'EDA Implementation in Jupyter Notebook (Lab Activity 2)', 'Done'],
    ['Phase 3', 'Model Comparison Planning (Lecture Activity 3)', 'Done'],
    ['Phase 4', 'Model Training and Comparison (Lab Activity 3)', 'Done'],
    ['Phase 5', 'Hyperparameter Tuning', 'In Progress'],
    ['Phase 6', 'Final Model and Presentation', 'Upcoming'],
  ];

  return (
    <>
      <Head>
        <title>About | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">About the Author & Project</h1>
          <p className="text-lg text-gray-600">Information about the developer and the project context.</p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-700 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <p>
            This wiki documents the development of the <strong>Student Depression Detector</strong>, a machine learning project built as part of <strong>IT325 Machine Learning</strong> at the University of Science and Technology of Southern Philippines (USTP). The project was completed as a <strong>PIT (Project in Training)</strong> requirement for the course.
          </p>
          <p>
            The goal of the project is to build a reliable classification model that can predict whether a student is at risk of depression based on their academic performance, lifestyle habits, and socioeconomic background. Early detection of depression in students is important because timely intervention — whether through counseling, peer support, or academic accommodations — can significantly improve student wellbeing and academic outcomes.
          </p>
          <p>
            The project covers the full machine learning pipeline: data loading, exploratory data analysis, data preprocessing, model training and comparison, and model selection. Two models — Logistic Regression and Random Forest — were selected for further tuning based on their consistent performance across all evaluation metrics.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm">
          <div className="space-y-6">
            {details.map((detail, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <span className="font-semibold text-gray-800 sm:w-32 flex-shrink-0">{detail.label}</span>
                <span className="text-gray-700">{detail.value}</span>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <span className="font-semibold text-gray-800 sm:w-32 flex-shrink-0">GitHub</span>
              <a 
                href="https://github.com/CyberSphinxxx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline break-all"
              >
                https://github.com/CyberSphinxxx
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <span className="font-semibold text-gray-800 sm:w-32 flex-shrink-0">Colab</span>
              <a 
                href="https://colab.research.google.com/drive/1zhPo9jZubf_n9y4S_5XO1MQRQ0TrLi5f#scrollTo=1f05b64c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline break-all"
              >
                Notebook Link
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Project Timeline</h2>
          <MetricTable headers={timelineHeaders} rows={timelineRows} />
        </div>
      </div>
    </>
  );
}
