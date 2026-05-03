import Head from 'next/head';
import MetricTable from '@/components/MetricTable';

export default function Dataset() {
  const findingsHeaders = ['Check', 'Result'];
  const findingsRows = [
    ['Total Rows', '27,901'],
    ['Total Columns', '18'],
    ['Missing Values', '3 (Financial Stress column only)'],
    ['Duplicate Rows', '0'],
    ['Depressed (1)', '16,336 students — 58.5%'],
    ['Not Depressed (0)', '11,565 students — 41.5%'],
  ];

  const tableHeaders = ['Column', 'Type', 'Description', 'Role'];
  const tableRows = [
    ['id', 'Numeric', 'Row identifier', 'Dropped — not used'],
    ['Gender', 'Categorical', 'Male or Female', 'Input feature'],
    ['Age', 'Numeric', 'Age of the student', 'Input feature'],
    ['City', 'Categorical', 'City where the student lives', 'Input feature'],
    ['Profession', 'Categorical', 'Student or working professional', 'Input feature'],
    ['Academic Pressure', 'Numeric', 'Self-rated 1–5 (1=Low, 5=High)', 'Input feature — strong predictor'],
    ['Work Pressure', 'Numeric', 'Self-rated 1–5', 'Input feature'],
    ['CGPA', 'Numeric', 'Cumulative Grade Point Average (0–10 scale)', 'Input feature — weak predictor'],
    ['Study Satisfaction', 'Numeric', 'Self-rated 1–5', 'Input feature'],
    ['Job Satisfaction', 'Numeric', 'Self-rated 1–5', 'Input feature'],
    ['Sleep Duration', 'Categorical', 'Less than 5 hours / 5–6 hours / 7–8 hours / More than 8 hours', 'Input feature — strong predictor'],
    ['Dietary Habits', 'Categorical', 'Healthy / Moderate / Unhealthy', 'Input feature'],
    ['Degree', 'Categorical', 'Educational degree (BSc, BA, M.Tech, etc.)', 'Input feature'],
    ['Have you ever had suicidal thoughts?', 'Categorical', 'Yes or No', 'Input feature'],
    ['Work/Study Hours', 'Numeric', 'Hours spent working or studying per day', 'Input feature'],
    ['Financial Stress', 'Numeric', 'Self-rated 1–5 (1=Low, 5=High)', 'Input feature — strong predictor'],
    ['Family History of Mental Illness', 'Categorical', 'Yes or No', 'Input feature'],
    ['Depression', 'Numeric', 'Target variable — 0 = Not Depressed, 1 = Depressed', 'Target variable'],
  ];

  return (
    <>
      <Head>
        <title>Dataset Info | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dataset Information</h1>
          <p className="text-lg text-foreground/60">Overview of the features used in the ML models.</p>
        </div>

        <div className="prose prose-gray max-w-none text-foreground/80">
          <p>
            The Student Depression Dataset was sourced from Kaggle and contains responses from 27,901 students across various cities in India. Each row represents one student with 17 input features and one binary target variable (Depression). The dataset was collected to help identify lifestyle, academic, and socioeconomic patterns associated with student depression.
          </p>
        </div>

        <div className="bg-card border border-border-primary rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4">Source & Context</h2>
          <ul className="list-disc pl-5 space-y-3 text-foreground/80">
            <li>
              <strong className="text-foreground">Source:</strong> Kaggle — Student Depression Dataset
            </li>
            <li>
              <strong className="text-foreground">Link:</strong> <a href="https://www.kaggle.com/datasets/hopesb/student-depression-dataset" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 hover:underline transition-colors">View on Kaggle</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Data Quality Findings</h2>
          <MetricTable headers={findingsHeaders} rows={findingsRows} />
          <p className="text-sm text-foreground/50 mt-2 italic">
            The 3 rows with missing Financial Stress values were dropped using df_model.dropna() since 3 rows out of 27,901 is only 0.01% of the data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 mt-8">Feature Dictionary</h2>
          <MetricTable headers={tableHeaders} rows={tableRows} />
          <p className="text-foreground/80 mt-4 leading-relaxed">
            The id column was dropped before training since it is just a row number with no predictive value. All categorical columns were converted to numbers using scikit-learn's LabelEncoder before being passed to the models.
          </p>
        </div>
      </div>
    </>
  );
}
