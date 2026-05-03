import Head from 'next/head';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function FAQ() {
  const sections = [
    {
      title: "About the Dataset",
      questions: [
        {
          q: "What dataset did you use and where did you get it?",
          a: "I used the Student Depression Dataset from Kaggle (https://www.kaggle.com/datasets/hopesb/student-depression-dataset). It has 27,901 rows and 18 columns — each row is one student with lifestyle, academic, and mental health data."
        },
        {
          q: "What is the target variable?",
          a: "The Depression column — binary. 1 means depressed, 0 means not depressed."
        },
        {
          q: "Did you find missing values or duplicates?",
          a: "3 missing values in the Financial Stress column only. I dropped those rows with dropna() since 3 out of 27,901 is only 0.01%. Zero duplicate rows."
        },
        {
          q: "Is your dataset balanced?",
          a: "Mild imbalance — 58.5% depressed, 41.5% not depressed. Addressed using SMOTE on the training set."
        },
        {
          q: "Why did you choose this dataset?",
          a: "Student mental health is a relevant real-world problem. The dataset is large (27,901 rows), clean, and its features directly relate to known depression risk factors. It also connects to a practical application — early detection for student support services."
        }
      ]
    },
    {
      title: "EDA",
      questions: [
        {
          q: "What is EDA and why did you do it?",
          a: "Exploratory Data Analysis — I did it to understand the dataset before building models. I looked at feature distributions, found patterns and correlations, checked data quality, and identified how input features relate to Depression. Without EDA, I would be training models blindly."
        },
        {
          q: "What were your key EDA findings?",
          a: "Five findings: (1) Mild class imbalance of 58.5% vs 41.5%. (2) Academic pressure is the strongest predictor — correlation of 0.47. (3) Students sleeping less than 5 hours are more likely to be depressed. (4) Unhealthy diet and high financial stress are linked to depression. (5) CGPA has almost no correlation (0.02) with depression — grades alone are a poor predictor of mental health."
        },
        {
          q: "What does the correlation heatmap show?",
          a: "Academic Pressure (0.47) and Financial Stress (0.36) have the strongest positive correlations with Depression. CGPA (0.02) is the weakest. Study Satisfaction (-0.17) is negatively correlated — more satisfied students tend to be less depressed. Age is -0.23."
        },
        {
          q: "Why is CGPA a weak predictor?",
          a: "CGPA measures performance but depression is driven more by how a student feels about school. A student can have a high GPA and still feel overwhelmed. The heatmap confirms this — CGPA has almost no linear relationship with depression at 0.02."
        }
      ]
    },
    {
      title: "SMOTE",
      questions: [
        {
          q: "What is SMOTE and why did you apply it?",
          a: "Synthetic Minority Oversampling Technique. I applied it because the training set had more depressed students (13,069) than not depressed (9,252). SMOTE generates synthetic new data points for the minority class to balance training and prevent model bias."
        },
        {
          q: "Did you apply SMOTE to the entire dataset?",
          a: "No — only the training set. The test set must stay original so evaluation reflects real-world performance on unseen data. Applying SMOTE to the test set would artificially inflate results."
        },
        {
          q: "What were the class counts before and after SMOTE?",
          a: "Before: 13,069 depressed and 9,252 not depressed (total: 22,321). After: 13,069 and 13,069 (total: 26,138)."
        }
      ]
    },
    {
      title: "Models",
      questions: [
        {
          q: "What models did you train and why those five?",
          a: "Logistic Regression, K-Nearest Neighbors, Decision Tree, Random Forest, and Naive Bayes. They cover different algorithm types — linear, distance-based, tree, ensemble, and probabilistic — giving a fair and diverse comparison."
        },
        {
          q: "Can you briefly explain each model?",
          a: "Logistic Regression — linear model calculating probability of depression. KNN — classifies based on 5 most similar training samples. Decision Tree — tree of yes/no questions, easy to interpret but prone to overfitting. Random Forest — 100 decision trees with majority vote, more robust. Naive Bayes — probabilistic model assuming feature independence."
        },
        {
          q: "What evaluation metrics did you use and why?",
          a: "Accuracy (overall correct predictions), Precision (of predicted depressed, how many actually are), Recall (of actually depressed, how many did the model catch — most important here since missing a depressed student is dangerous), and F1 Score (balance of precision and recall)."
        },
        {
          q: "What were the actual results?",
          a: "Logistic Regression: 84.48% accuracy, 0.8694 F1. KNN: 74.95% accuracy, 0.7951 F1. Decision Tree: 76.65% accuracy, 0.8006 F1. Random Forest: 83.87% accuracy, 0.8643 F1. Naive Bayes: 65.57% accuracy, 0.9960 recall, 0.7721 F1."
        },
        {
          q: "Which two models did you select and why?",
          a: "Logistic Regression and Random Forest. Logistic Regression had the best accuracy (84.48%) and F1 (0.8694). Random Forest was a close second. Both significantly outperformed KNN, Decision Tree, and Naive Bayes. Naive Bayes had the highest recall but its 65.57% accuracy made it too unreliable."
        },
        {
          q: "Why not Naive Bayes despite its high recall?",
          a: "Its recall was 0.9960 but accuracy was only 65.57%. It was flagging too many non-depressed students as depressed. In practice, this would overwhelm counselors with false alarms, making the system unusable."
        },
        {
          q: "Is 84% accuracy too high — could the model be overfitting?",
          a: "No. 84% is realistic for this dataset — 27,901 rows of clean data, features directly related to depression, and only mild imbalance. Overfitting shows as high training accuracy but low test accuracy. Since I evaluated on a separate held-out 20% test set, the 84% reflects real generalization, not memorization."
        }
      ]
    },
    {
      title: "Concepts",
      questions: [
        {
          q: "Why is accuracy alone not enough?",
          a: "A model predicting everyone as depressed would get 58.5% accuracy without learning anything. Recall and F1 score reveal whether the model is actually useful — especially important with imbalanced data."
        },
        {
          q: "What is a confusion matrix?",
          a: "A table showing True Positives (correctly predicted depressed), True Negatives (correctly predicted not depressed), False Positives (false alarm — predicted depressed but not), and False Negatives (missed case — predicted not depressed but actually is). False Negatives are the most dangerous error in this project."
        },
        {
          q: "What is the difference between a Decision Tree and Random Forest?",
          a: "A Decision Tree is one tree trained on all data — interpretable but tends to overfit. A Random Forest is 100 trees each trained on random data subsets — majority vote makes it more robust. My results confirm this: Decision Tree 76.65% vs Random Forest 83.87%."
        },
        {
          q: "What would you do next?",
          a: "Hyperparameter tuning on Logistic Regression and Random Forest using GridSearchCV. For Logistic Regression: tune regularization parameter C. For Random Forest: tune n_estimators, max_depth, and min_samples_split. After tuning, select the final best model and do one last evaluation on the test set."
        }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>FAQ | Student Depression Detector</title>
      </Head>

      <div className="space-y-8 animate-in fade-in duration-500 pb-12">
        <div className="border-b border-border-primary pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Frequently Asked Questions</h1>
          <p className="text-lg text-foreground/60">Common questions about the dataset, methodology, and models.</p>
        </div>

        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h2 className="text-xl font-bold text-foreground border-l-4 border-accent pl-4 py-1">
              {section.title}
            </h2>
            <div className="space-y-0">
              {section.questions.map((item, qIdx) => (
                <CollapsibleSection key={qIdx} title={item.q} defaultOpen={false}>
                  <p className="text-foreground/80 leading-relaxed">
                    {item.a}
                  </p>
                </CollapsibleSection>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
