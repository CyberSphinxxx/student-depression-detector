import Head from 'next/head';
import MetricTable from '@/components/MetricTable';
import ImageWithCaption from '@/components/ImageWithCaption';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Models() {
  const metricHeaders = ['Metric', 'What it measures', 'Why it matters here'];
  const metricRows = [
    ['Accuracy', 'Percentage of all correct predictions', 'General performance, but misleading on imbalanced data'],
    ['Precision', 'Of all students predicted as depressed, how many actually are', 'Avoids unnecessary false alarms'],
    ['Recall', 'Of all actually depressed students, how many did the model catch', 'Most important — missing a depressed student is dangerous'],
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
    { src: '/images/confusion_matrix_best_model.png', alt: 'Confusion Matrix Best Model', caption: 'Confusion Matrix — Logistic Regression (Highest Accuracy and F1 Score)' },
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
            Five machine learning models were trained on the Student Depression Dataset and evaluated using four key metrics: Accuracy, Precision, Recall, and F1 Score. The dataset was split 80/20 (training/testing) with stratification to preserve the class ratio. The goal was to find models that not only score high in accuracy but also minimize false negatives — missing students who are actually depressed.
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
            Note: The best value in each column is highlighted. Logistic Regression leads in Accuracy and F1 Score. Naive Bayes leads in Recall but its low overall accuracy (65.57%) means it classifies too many non-depressed students as depressed, making it unreliable in practice.
          </p>
        </div>

        <CollapsibleSection title="Model Selection Justification" defaultOpen={true}>
          <div className="text-gray-700 space-y-4">
            <p>I selected <strong>Logistic Regression</strong> and <strong>Random Forest</strong> as the two models to carry forward for hyperparameter tuning.</p>
            <p>Logistic Regression achieved the highest accuracy (84.48%) and the highest F1 score (0.8694), making it the most balanced and reliable model. It performed consistently well across all four metrics. Random Forest was a close second with 83.87% accuracy and an F1 score of 0.8643.</p>
            <p>While Naive Bayes had the highest recall at 0.9960 (it almost never misses a depressed student), its accuracy of only 65.57% means it is flagging far too many non-depressed students as depressed. In a real application, this would overwhelm support services with false alarms.</p>
            <p>K-Nearest Neighbors and Decision Tree both performed in the mid-70s range in accuracy, which is notably lower than Logistic Regression and Random Forest.</p>
            <p>The key lesson here: <strong>a model with the highest accuracy is not always the best model.</strong> In mental health applications, recall matters a lot because missing a depressed student (false negative) has real consequences. Both Logistic Regression and Random Forest strike the right balance.</p>
          </div>
        </CollapsibleSection>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">What is a Confusion Matrix?</h2>
          <div className="prose prose-gray max-w-none text-gray-700 bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
            <p className="mt-0">A confusion matrix shows the breakdown of correct and incorrect predictions for each class. It has four values:</p>
            <ul className="mb-0">
              <li><strong>True Positive (TP):</strong> Correctly predicted as Depressed</li>
              <li><strong>True Negative (TN):</strong> Correctly predicted as Not Depressed</li>
              <li><strong>False Positive (FP):</strong> Predicted Depressed but actually Not Depressed (false alarm)</li>
              <li><strong>False Negative (FN):</strong> Predicted Not Depressed but actually Depressed (missed case — most dangerous)</li>
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
