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
            This is an end-to-end Machine Learning project that predicts whether a student is at risk of depression 
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
