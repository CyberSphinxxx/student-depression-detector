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
    ['Phase 1', 'Dataset Selection and EDA Planning (Lecture Activity 2)', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">Done</span>],
    ['Phase 2', 'EDA Implementation in Jupyter Notebook (Lab Activity 2)', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">Done</span>],
    ['Phase 3', 'Model Comparison Planning (Lecture Activity 3)', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">Done</span>],
    ['Phase 4', 'Model Training and Comparison (Lab Activity 3)', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">Done</span>],
    ['Phase 5', 'Hyperparameter Tuning', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">In Progress</span>],
    ['Phase 6', 'Final Model and Presentation', <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-foreground/10 text-foreground/50 border border-border-primary">Upcoming</span>],
  ];

  return (
    <>
      <Head>
        <title>About | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="border-b border-border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">About the Author & Project</h1>
          <p className="text-lg text-foreground/60">Information about the developer and the project context.</p>
        </div>

        <div className="prose prose-gray max-w-none text-foreground/80 leading-relaxed mb-4">
          <p>
            This wiki documents the development of the Student Depression Detector, a machine learning project built as part of IT325 Machine Learning at the University of Science and Technology of Southern Philippines (USTP), completed as a PIT (Project in Training) requirement. The goal is to build a classification model that predicts whether a student is at risk of depression based on academic, lifestyle, and socioeconomic factors. The project covers the full ML pipeline: data loading, EDA, preprocessing, model training and comparison, and model selection. Logistic Regression and Random Forest were selected for further tuning.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-6">Quick Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border-primary p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-blue-500">📊</span> The Dataset
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Sourced from Kaggle, the dataset contained 27,901 records detailing student demographics, academic pressures, and lifestyle choices. We narrowed it down to 18 critical features for our models.
              </p>
            </div>
            
            <div className="bg-card border border-border-primary p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-green-500">🧹</span> Preprocessing & EDA
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Key insights revealed that poor sleep and high academic pressure correlate strongly with depression risk. We used SMOTE to handle the mild class imbalance (58.5% vs 41.5%) in the target variable.
              </p>
            </div>

            <div className="bg-card border border-border-primary p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-purple-500">🧠</span> Modeling Strategy
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Five models were trained: Logistic Regression, KNN, Decision Tree, Random Forest, and Naive Bayes. They were rigorously evaluated using Accuracy, Precision, Recall, and F1-Score metrics.
              </p>
            </div>

            <div className="bg-card border border-border-primary p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-yellow-500">🏆</span> Final Outcome
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Logistic Regression and Random Forest emerged as top performers (~84% accuracy). Logistic Regression was chosen for deployment due to its efficiency and interpretability in the web environment.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border-primary rounded-xl p-8 shadow-sm">
          <div className="space-y-8">
            {details.map((detail, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-border-primary/50 pb-6 last:border-0 last:pb-0">
                <span className="font-bold text-foreground sm:w-32 flex-shrink-0 tracking-tight">{detail.label}</span>
                <span className="text-foreground/70">{detail.value}</span>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-border-primary/50 pb-6 last:border-0 last:pb-0">
              <span className="font-bold text-foreground sm:w-32 flex-shrink-0 tracking-tight">GitHub</span>
              <a 
                href="https://github.com/CyberSphinxxx/student-depression-detector" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 hover:underline break-all transition-colors"
              >
                https://github.com/CyberSphinxxx/student-depression-detector
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-border-primary/50 pb-6 last:border-0 last:pb-0">
              <span className="font-bold text-foreground sm:w-32 flex-shrink-0 tracking-tight">Colab</span>
              <a 
                href="https://colab.research.google.com/drive/1zhPo9jZubf_n9y4S_5XO1MQRQ0TrLi5f#scrollTo=1f05b64c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 hover:underline break-all transition-colors"
              >
                Notebook Link
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Project Timeline</h2>
          <MetricTable headers={timelineHeaders} rows={timelineRows} />
        </div>
      </div>
    </>
  );
}
