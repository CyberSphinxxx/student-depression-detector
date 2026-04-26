import Head from 'next/head';
import MetricTable from '@/components/MetricTable';
import ImageWithCaption from '@/components/ImageWithCaption';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Models() {
  const tableHeaders = ['Model', 'Accuracy', 'Precision', 'Recall', 'F1 Score'];
  const tableRows = [
    ['Logistic Regression', '84.48%', '0.8568', '0.8825', '0.8694'],
    ['K-Nearest Neighbors', '74.95%', '0.7629', '0.8301', '0.7951'],
    ['Decision Tree', '76.65%', '0.8007', '0.8004', '0.8006'],
    ['Random Forest', '83.87%', '0.8519', '0.8770', '0.8643'],
    ['Naive Bayes', '65.57%', '0.6304', '0.9960', '0.7721'],
  ];

  // Best values for highlighting (using index mapping: col 1, col 2, col 3, col 4)
  const bestValues = {
    1: '84.48%',
    2: '0.8568',
    3: '0.9960',
    4: '0.8694',
  };

  const images = [
    { src: '/images/model_comparison_metrics.png', alt: 'Model Comparison Metrics', caption: 'Comparison of all 5 models based on core metrics' },
    { src: '/images/confusion_matrices_all_models.png', alt: 'Confusion Matrices All Models', caption: 'Confusion Matrices for all trained models' },
    { src: '/images/confusion_matrix_best_model.png', alt: 'Confusion Matrix Best Model', caption: 'Confusion Matrix of the selected best model (Logistic Regression)' },
    { src: '/images/feature_importance.png', alt: 'Feature Importance', caption: 'Feature Importance ranking' },
  ];

  return (
    <>
      <Head>
        <title>Model Comparison | Student Depression Detector</title>
      </Head>

      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Model Comparison</h1>
          <p className="text-lg text-gray-600">Evaluating and selecting the best performing machine learning models.</p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-700">
          <p>
            Five different machine learning models were trained on the dataset and evaluated using four key metrics: 
            <strong> Accuracy, Precision, Recall, and F1 Score</strong>. The goal was to identify the model that balances 
            correct predictions while minimizing false negatives (missing depressed students).
          </p>
        </div>

        <div className="my-8">
          <MetricTable headers={tableHeaders} rows={tableRows} bestValues={bestValues} />
        </div>

        <CollapsibleSection title="Model Selection Justification" defaultOpen={true}>
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic text-gray-700 bg-blue-50 rounded-r-md">
            Logistic Regression and Random Forest were selected for tuning. Logistic Regression had the highest accuracy (84.48%) and F1 score (0.8694). While Naive Bayes had the highest recall (0.9960), its accuracy of 65.57% makes it unreliable. A high accuracy model is not always the best — recall and F1 must also be considered.
          </blockquote>
        </CollapsibleSection>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">Evaluation Visualizations</h2>
          <div className="grid grid-cols-1 gap-8">
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
