import Head from 'next/head';
import ImageWithCaption from '@/components/ImageWithCaption';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function EDA() {
  const images = [
    { 
      src: '/images/viz1_class_distribution.png', 
      alt: 'Class Distribution', 
      caption: 'Class Distribution (Bar and Pie Chart)',
      interpretation: 'Interpretation: Out of 27,901 students, 16,336 (58.5%) are labeled as depressed and 11,565 (41.5%) are not. This shows a mild class imbalance — the dataset has more depressed students than non-depressed ones. While not extreme, this imbalance was addressed later using SMOTE to prevent the model from being biased toward predicting depression for everyone.'
    },
    { 
      src: '/images/viz2_age_distribution.png', 
      alt: 'Age Distribution', 
      caption: 'Age Distribution by Depression Status',
      interpretation: 'Interpretation: The histogram and boxplot show that depressed students tend to be slightly younger on average. Most students in the dataset are between 18 and 35 years old. The age distributions of both groups overlap heavily, which suggests age alone is not a strong predictor of depression. However, younger students may face more academic pressure which contributes indirectly.'
    },
    { 
      src: '/images/viz3_academic.png', 
      alt: 'Academic Pressure', 
      caption: 'Academic Pressure and CGPA',
      interpretation: 'Interpretation: The count plot shows a clear pattern — students who rated their academic pressure as 4 or 5 out of 5 are far more likely to be depressed. This is the strongest visual signal in the dataset. Interestingly, the CGPA distribution for depressed and non-depressed students is nearly identical, confirming that grades alone are a poor predictor of mental health. A student can have a high CGPA and still be depressed.'
    },
    { 
      src: '/images/viz4_sleep_diet.png', 
      alt: 'Sleep and Diet', 
      caption: 'Sleep Duration and Dietary Habits',
      interpretation: 'Interpretation: Students sleeping less than 5 hours per night make up the largest group of depressed students. Students who sleep 7–8 hours show notably lower depression rates. For dietary habits, students with unhealthy diets have a higher proportion of depressed individuals compared to those with healthy or moderate diets. Both sleep and diet appear to be meaningful lifestyle indicators of depression risk.'
    },
    { 
      src: '/images/viz5_heatmap.png', 
      alt: 'Correlation Heatmap', 
      caption: 'Correlation Heatmap of Numeric Features',
      interpretation: 'Interpretation: The heatmap reveals that Academic Pressure (0.47) and Financial Stress (0.36) have the strongest positive correlations with the Depression target. Work/Study Hours also shows a moderate positive correlation (0.21). Study Satisfaction has a negative correlation (-0.17), meaning students who are more satisfied with their studies tend to be less depressed. CGPA has almost no correlation (0.02) with depression, confirming it is a weak predictor. Age shows a slight negative correlation (-0.23), suggesting older students are slightly less likely to be depressed.'
    },
    { 
      src: '/images/viz6_stress_suicidal.png', 
      alt: 'Stress and Suicidal Thoughts', 
      caption: 'Financial Stress and Suicidal Thoughts',
      interpretation: 'Interpretation: Students with higher financial stress levels (4 or 5 out of 5) are more commonly depressed. The suicidal thoughts chart shows a stark difference — students who have had suicidal thoughts are overwhelmingly more likely to be classified as depressed. This is expected, as suicidal ideation is a well-established clinical indicator of severe depression.'
    },
  ];

  return (
    <>
      <Head>
        <title>EDA Results | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Exploratory Data Analysis (EDA)</h1>
          <p className="text-lg text-gray-600">Visualizing the patterns and distributions within the dataset.</p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-700">
          <p>
            During the Exploratory Data Analysis phase, I investigated the distributions, relationships, and correlations within the Student Depression Dataset. The primary goal was to understand how different features interact with the target variable (Depression) and to identify any patterns that might influence model training. I created six visualizations covering class distribution, age, academic pressure, CGPA, sleep duration, dietary habits, financial stress, and suicidal thoughts history.
          </p>
        </div>

        <CollapsibleSection title="Key Observations" defaultOpen={true}>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li><strong>Class Imbalance</strong> — The dataset has 58.5% depressed students vs 41.5% not depressed. This mild imbalance was addressed using SMOTE during model training to prevent bias.</li>
            <li><strong>Academic Pressure is the strongest predictor</strong> — Students who rated academic pressure at 4 or 5 out of 5 are significantly more likely to be depressed. The correlation with depression is 0.47, the highest among all numeric features.</li>
            <li><strong>Sleep deprivation is a strong risk factor</strong> — Students sleeping less than 5 hours per night make up the largest depressed group. Getting 7–8 hours of sleep is associated with better mental health outcomes.</li>
            <li><strong>Diet and money both matter</strong> — Unhealthy dietary habits and high financial stress (levels 4–5) are both noticeably linked to higher depression rates, pointing to socioeconomic and lifestyle factors as significant contributors.</li>
            <li><strong>CGPA is a weak predictor</strong> — Despite being a common measure of academic performance, CGPA has almost no correlation (0.02) with depression. A student's grades alone cannot predict their mental health status.</li>
          </ol>
        </CollapsibleSection>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-6">Visualizations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {images.map((img, idx) => (
              <div key={idx} className="flex flex-col">
                <ImageWithCaption 
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption}
                />
                <p className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-100 flex-grow">
                  {img.interpretation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
