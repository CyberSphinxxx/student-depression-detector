import Head from 'next/head';
import ImageWithCaption from '@/components/ImageWithCaption';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function EDA() {
  const images = [
    { 
      src: '/images/viz1_class_distribution.png', 
      alt: 'Class Distribution', 
      caption: 'Class Distribution (Bar and Pie Chart)',
      interpretation: 'Out of 27,901 students, 16,336 (58.5%) are labeled as depressed and 11,565 (41.5%) are not. This mild class imbalance was addressed later using SMOTE to prevent the model from being biased toward always predicting depression.'
    },
    { 
      src: '/images/viz2_age_distribution.png', 
      alt: 'Age Distribution', 
      caption: 'Age Distribution by Depression Status',
      interpretation: 'Depressed students tend to be slightly younger on average. Most students are between 18 and 35 years old. Age distributions overlap heavily between both groups, suggesting age alone is not a strong predictor of depression.'
    },
    { 
      src: '/images/viz3_academic.png', 
      alt: 'Academic Pressure', 
      caption: 'Academic Pressure and CGPA',
      interpretation: 'Students who rated academic pressure as 4 or 5 out of 5 are far more likely to be depressed — this is the strongest visual signal in the dataset. CGPA distributions for both groups are nearly identical, confirming that grades alone are a poor predictor of mental health.'
    },
    { 
      src: '/images/viz4_sleep_diet.png', 
      alt: 'Sleep and Diet', 
      caption: 'Sleep Duration and Dietary Habits',
      interpretation: 'Students sleeping less than 5 hours make up the largest depressed group. Students sleeping 7–8 hours show notably lower depression rates. Students with unhealthy diets also have a higher proportion of depressed individuals.'
    },
    { 
      src: '/images/viz5_heatmap.png', 
      alt: 'Correlation Heatmap', 
      caption: 'Correlation Heatmap of Numeric Features',
      interpretation: 'Academic Pressure has the highest positive correlation with Depression at 0.47. Financial Stress follows at 0.36. Work/Study Hours is 0.21. Study Satisfaction is negative at -0.17. CGPA is almost zero at 0.02, confirming it is a weak predictor. Age is -0.23.'
    },
    { 
      src: '/images/viz6_stress_suicidal.png', 
      alt: 'Stress and Suicidal Thoughts', 
      caption: 'Financial Stress and Suicidal Thoughts',
      interpretation: 'Students with financial stress at level 4 or 5 are more commonly depressed. Students who have had suicidal thoughts are overwhelmingly more likely to be classified as depressed — suicidal ideation is a well-established clinical indicator of severe depression.'
    },
  ];

  return (
    <>
      <Head>
        <title>EDA Results | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Exploratory Data Analysis (EDA)</h1>
          <p className="text-lg text-foreground/60">Visualizing the patterns and distributions within the dataset.</p>
        </div>

        <div className="prose prose-gray max-w-none text-foreground/80">
          <p>
            During the Exploratory Data Analysis phase, I investigated the distributions, relationships, and correlations within the Student Depression Dataset. The primary goal was to understand how different features interact with the target variable (Depression) and to identify any patterns that might influence model training. I created six visualizations covering class distribution, age, academic pressure, CGPA, sleep duration, dietary habits, financial stress, and suicidal thoughts history.
          </p>
        </div>

        <CollapsibleSection title="Key Observations" defaultOpen={true}>
          <ol className="list-decimal pl-5 space-y-3 text-foreground/80">
            <li><strong className="text-foreground">Class Imbalance</strong> — 58.5% of students are depressed vs 41.5% not depressed. This mild imbalance was addressed using SMOTE on the training set to prevent model bias.</li>
            <li><strong className="text-foreground">Academic Pressure is the strongest predictor</strong> — Students who rated it 4 or 5 out of 5 are significantly more likely to be depressed. Its correlation with depression is 0.47, the highest among all numeric features.</li>
            <li><strong className="text-foreground">Financial Stress is the second strongest predictor</strong> — Level 4 and 5 stress shows a correlation of 0.36 with depression, highlighting socioeconomic factors.</li>
            <li><strong className="text-foreground">Suicidal Thoughts history is the strongest visual signal</strong> — Students with a history of suicidal ideation are overwhelmingly more likely to be classified as depressed.</li>
            <li><strong className="text-foreground">Sleep deprivation is a major risk factor</strong> — Students sleeping less than 5 hours make up the largest depressed group. Getting 7–8 hours of sleep is associated with better mental health outcomes.</li>
            <li><strong className="text-foreground">Age Trends</strong> — Depressed students trend slightly younger on average (correlation of -0.23), though there is significant overlap across all age groups.</li>
            <li><strong className="text-foreground">CGPA is a weak predictor</strong> — Despite being an academic metric, CGPA has a correlation of only 0.02 with depression. A student's grades alone cannot predict their mental health.</li>
          </ol>
        </CollapsibleSection>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-8">Visualizations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {images.map((img, idx) => (
              <div key={idx} className="flex flex-col bg-card border border-border-primary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="p-2 bg-sidebar border-b border-border-primary">
                  <ImageWithCaption 
                    src={img.src}
                    alt={img.alt}
                    caption={img.caption}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Interpretation</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {img.interpretation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
