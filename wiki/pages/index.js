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
        <div className="border-b border-border-primary pb-6">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">
            Student Depression Detector
          </h1>
          <h2 className="text-xl font-medium text-foreground/60">
            IT325 Machine Learning | PIT Project
          </h2>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg leading-relaxed text-foreground/80">
            Welcome to the documentation for the <strong>Student Depression Detector</strong>. 
            This is an end-to-end Machine Learning project that I built to predict whether a student is at risk of depression 
            based on various lifestyle, academic, and socioeconomic factors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-card border border-border-primary rounded-lg p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-all">
              <span className="text-3xl font-bold text-foreground mb-1">{stat.value}</span>
              <span className="text-sm font-medium text-foreground/50 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Important Links</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://github.com/CyberSphinxxx/student-depression-detector" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 hover:underline font-medium flex items-center gap-2 transition-colors"
              >
                GitHub Repository ↗
              </a>
            </li>
            <li>
              <a 
                href="https://colab.research.google.com/drive/1zhPo9jZubf_n9y4S_5XO1MQRQ0TrLi5f#scrollTo=1f05b64c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 hover:underline font-medium flex items-center gap-2 transition-colors"
              >
                Google Colab Notebook ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Load Data", desc: "The Student Depression Dataset (27,901 rows, 18 columns) is loaded using pandas" },
              { title: "Clean and Encode", desc: "Categorical columns are label-encoded; 3 missing Financial Stress rows are dropped" },
              { title: "EDA", desc: "Distributions, correlations, and class balance are visualized using matplotlib and seaborn" },
              { title: "Balance with SMOTE", desc: "Mild class imbalance (58.5% vs 41.5%) is addressed using SMOTE on the training set only" },
              { title: "Train 5 Models", desc: "Logistic Regression, K-Nearest Neighbors, Decision Tree, Random Forest, and Naive Bayes" },
              { title: "Evaluate and Compare", desc: "Models are scored using Accuracy, Precision, Recall, and F1 Score" },
              { title: "Select Best Models", desc: "Logistic Regression and Random Forest are selected for further tuning" }
            ].map((step, idx) => (
              <div key={idx} className="bg-card border border-border-primary rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className="text-7xl font-black text-foreground/5 absolute -top-4 -right-2 group-hover:text-foreground/10 transition-colors pointer-events-none select-none z-0">
                  {idx + 1}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{step.title}</h4>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Python 3", "pandas", "numpy", "scikit-learn", 
              "imbalanced-learn (SMOTE)", "matplotlib", "seaborn", 
              "Jupyter / Google Colab"
            ].map((tech, idx) => (
              <span key={idx} className="bg-sidebar text-foreground/80 px-5 py-2.5 rounded-full text-sm font-medium border border-border-primary shadow-sm hover:bg-foreground/5 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
