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
    ['Phase 1', 'Dataset Selection and EDA Planning (Lecture Activity 2)', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Done</span>],
    ['Phase 2', 'EDA Implementation in Jupyter Notebook (Lab Activity 2)', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Done</span>],
    ['Phase 3', 'Model Comparison Planning (Lecture Activity 3)', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Done</span>],
    ['Phase 4', 'Model Training and Comparison (Lab Activity 3)', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Done</span>],
    ['Phase 5', 'Hyperparameter Tuning', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">In Progress</span>],
    ['Phase 6', 'Final Model and Presentation', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Upcoming</span>],
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

        <div className="prose prose-gray max-w-none text-gray-700">
          <p>
            This wiki documents the development of the Student Depression Detector, a machine learning project built as part of IT325 Machine Learning at the University of Science and Technology of Southern Philippines (USTP), completed as a PIT (Project in Training) requirement. The goal is to build a classification model that predicts whether a student is at risk of depression based on academic, lifestyle, and socioeconomic factors. The project covers the full ML pipeline: data loading, EDA, preprocessing, model training and comparison, and model selection. Logistic Regression and Random Forest were selected for further tuning.
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
