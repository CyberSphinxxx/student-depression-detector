import Head from 'next/head';

export default function About() {
  const details = [
    { label: 'Name', value: 'John Lemar L. Gonzales' },
    { label: 'Course', value: 'BSIT3-R15 — IT325 Machine Learning' },
    { label: 'School', value: 'University of Science and Technology of Southern Philippines (USTP)' },
    { label: 'Project', value: 'Student Depression Detector — PIT (Project in Training)' },
  ];

  return (
    <>
      <Head>
        <title>About | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">About the Author</h1>
          <p className="text-lg text-gray-600">Information about the developer and the project context.</p>
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
      </div>
    </>
  );
}
