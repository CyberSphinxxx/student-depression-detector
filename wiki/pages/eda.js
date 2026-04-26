import Head from 'next/head';
import ImageWithCaption from '@/components/ImageWithCaption';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function EDA() {
  const images = [
    { src: '/images/viz1_class_distribution.png', alt: 'Class Distribution', caption: 'Class Distribution — Bar and Pie Chart' },
    { src: '/images/viz2_age_distribution.png', alt: 'Age Distribution', caption: 'Age Distribution by Depression Status' },
    { src: '/images/viz3_academic.png', alt: 'Academic Pressure', caption: 'Academic Pressure and CGPA' },
    { src: '/images/viz4_sleep_diet.png', alt: 'Sleep and Diet', caption: 'Sleep Duration and Dietary Habits' },
    { src: '/images/viz5_heatmap.png', alt: 'Correlation Heatmap', caption: 'Correlation Heatmap of Numeric Features' },
    { src: '/images/viz6_stress_suicidal.png', alt: 'Stress and Suicidal Thoughts', caption: 'Financial Stress and Suicidal Thoughts' },
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
            During the Exploratory Data Analysis phase, we investigated the underlying distributions, 
            relationships, and potential correlations within the dataset. The primary goal was to understand 
            how different features interact with the target variable (Depression) and to identify any anomalies 
            or patterns that might influence the predictive models.
          </p>
        </div>

        <CollapsibleSection title="Key Observations" defaultOpen={true}>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>More students are depressed than not — 58.5% vs 41.5%, showing a mild class imbalance.</li>
            <li>Higher academic pressure is closely linked to higher rates of depression.</li>
            <li>Students who sleep less than 5 hours tend to be more depressed.</li>
            <li>Unhealthy dietary habits and high financial stress are significantly linked to depression.</li>
            <li>Academic pressure and financial stress have the strongest correlation with depression; CGPA has a very weak connection.</li>
          </ol>
        </CollapsibleSection>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-6">Visualizations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {images.map((img, idx) => (
              <ImageWithCaption 
                key={idx}
                src={img.src}
                alt={img.alt}
                caption={img.caption}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
