import Head from 'next/head';
import MetricTable from '@/components/MetricTable';
import ImageWithCaption from '@/components/ImageWithCaption';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Models() {
  const metricHeaders = ['Metric', 'What it measures', 'Why it matters here'];
  const metricRows = [
    ['Accuracy', 'Percentage of all correct predictions', 'General performance — but misleading on imbalanced data'],
    ['Precision', 'Of all predicted depressed, how many actually are', 'Avoids unnecessary false alarms'],
    ['Recall', 'Of all actually depressed, how many did the model catch', 'Most important — missing a depressed student is dangerous'],
    ['F1 Score', 'Balance between Precision and Recall', 'Best single metric for imbalanced classification'],
  ];

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
    { src: '/images/confusion_matrix_best_model.png', alt: 'Confusion Matrix Best Model', caption: 'Confusion Matrix — Logistic Regression (Highest Accuracy: 84.48% | F1 Score: 0.8694)' },
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
            Five machine learning models were trained on the Student Depression Dataset and evaluated using four key metrics. The data was split 80/20 (training/testing) with stratification to preserve the class ratio. The goal was to find models that score well in accuracy but also minimize false negatives — missing students who are actually depressed.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">What Each Metric Means</h2>
          <MetricTable headers={metricHeaders} rows={metricRows} />
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Model Performance</h2>
          <MetricTable headers={tableHeaders} rows={tableRows} bestValues={bestValues} />
          <p className="text-gray-700 mt-4 bg-gray-50 p-4 rounded border border-gray-100">
            Logistic Regression leads in Accuracy (84.48%) and F1 Score (0.8694). Naive Bayes leads in Recall (0.9960) but its accuracy of only 65.57% means it incorrectly classifies too many non-depressed students as depressed, making it unreliable in practice.
          </p>
        </div>

        <CollapsibleSection title="Model Selection Justification" defaultOpen={true}>
          <div className="text-gray-700 space-y-4">
            <p>
              I selected Logistic Regression and Random Forest as the two models to carry forward for hyperparameter tuning. Logistic Regression achieved the highest accuracy (84.48%) and the highest F1 score (0.8694). Random Forest was a close second at 83.87% accuracy and 0.8643 F1. Both significantly outperformed KNN and Decision Tree. While Naive Bayes had the highest recall at 0.9960, its 65.57% accuracy means it flags far too many non-depressed students as depressed. A model with high recall or accuracy is not always the best — in mental health applications you need balance, and Logistic Regression and Random Forest provide that better than the other three models.
            </p>
          </div>
        </CollapsibleSection>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">What is a Confusion Matrix?</h2>
          <div className="prose prose-gray max-w-none text-gray-700 bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
            <p className="mt-0">A confusion matrix shows the breakdown of correct and incorrect predictions for each class. It has four values:</p>
            <ul className="mb-0">
              <li>True Positive (TP): Correctly predicted as Depressed</li>
              <li>True Negative (TN): Correctly predicted as Not Depressed</li>
              <li>False Positive (FP): Predicted Depressed but actually Not Depressed — a false alarm</li>
              <li>False Negative (FN): Predicted Not Depressed but actually Depressed — the most dangerous error in this use case</li>
            </ul>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Evaluation Visualizations</h3>
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
