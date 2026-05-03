# Student Depression Detector

## Overview
Student Depression Detector is an end-to-end machine learning project that predicts whether a student is at risk of depression based on their lifestyle, academic performance, and demographic information. Early detection of depression in students helps educators, counselors, and support services intervene in a timely manner — ultimately improving student wellbeing and academic outcomes.

The project trains two classifiers (Logistic Regression and Random Forest), automatically selects the better one, and exposes the model through a clean Tkinter desktop GUI where anyone can fill in a student profile and instantly see a prediction with a confidence score.

## Dataset
| Property | Value |
|---|---|
| **Source** | Kaggle — Student Depression Dataset |
| **Link** | https://www.kaggle.com/datasets/hopesb/student-depression-dataset |
| **Rows** | 27,901 |
| **Columns** | 18 |
| **Target Variable** | `Depression` (1 = Depressed, 0 = Not Depressed) |

### Features Used
`Gender`, `Age`, `City`, `Profession`, `Academic Pressure`, `Work Pressure`, `CGPA`, `Study Satisfaction`, `Job Satisfaction`, `Sleep Duration`, `Dietary Habits`, `Degree`, `Have you ever had suicidal thoughts?`, `Work/Study Hours`, `Financial Stress`, `Family History of Mental Illness`

### Engineered Features
| Feature | Description |
|---|---|
| `Stress_Score` | Mean of Academic Pressure, Work Pressure & Financial Stress |
| `Sleep_Category` | 0 = Low (<6 h), 1 = Normal (6-8 h), 2 = High (>8 h) |
| `Study_Work_Balance` | Study Hours ÷ (Study Hours + 1) — balance proxy |

## Project Structure
```
student-depression-detector/
├── Student Depression Dataset.csv   ← raw dataset (do not modify)
├── notebooks/
│   └── exploration.ipynb            ← EDA notebook
├── model/
│   ├── depression_model.pkl         ← saved best model
│   ├── scaler.pkl                   ← StandardScaler
│   ├── encoders.pkl                 ← dict of LabelEncoders
│   ├── feature_columns.pkl          ← ordered list of feature names
│   ├── confusion_matrix_*.png       ← confusion matrix heatmaps
│   └── feature_importance.png       ← feature importance chart
├── gui/
│   └── app.py                       ← Tkinter desktop GUI
├── report/                          ← (empty — add your report here)
├── requirements.txt
├── train.py                         ← training script
└── README.md
```

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/CyberSphinxxx/student-depression-detector.git
cd student-depression-detector
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```
> **Note:** `tkinter` is bundled with Python and does not need a separate `pip install`.

### 3. Train the model
```bash
python train.py
```
This will:
- Load and preprocess the dataset
- Engineer new features
- Train Logistic Regression and Random Forest classifiers
- Pick the best model by test accuracy
- Save all artifacts to `model/`

### 4. Launch the GUI
```bash
python gui/app.py
```

## How It Works

```
CSV Data
   ↓
Data Loading (pandas)
   ↓
Preprocessing
  • Drop duplicates
  • Fill missing values (median / mode)
  • Encode target (Yes/No → 1/0)
  • LabelEncode all categorical columns
   ↓
Feature Engineering
  • Stress_Score
  • Sleep_Category
  • Study_Work_Balance
   ↓
Train/Test Split (80/20)
   ↓
Model Training
  • Logistic Regression
  • Random Forest Classifier
   ↓
Model Selection (by test accuracy)
   ↓
Artifacts Saved (model/, scaler, encoders, feature list)
   ↓
GUI Prediction (Tkinter)
  • User fills form
  • Same preprocessing applied
  • model.predict() + predict_proba()
  • Result displayed with confidence bar
```

## Models Used
| Model | Notes |
|---|---|
| **Logistic Regression** | `max_iter=1000`, `random_state=42`. Fast, interpretable baseline. |
| **Random Forest Classifier** | `n_estimators=100`, `random_state=42`. Ensemble method, typically higher accuracy. |

The script automatically compares test accuracy and saves the winning model to `model/depression_model.pkl`.

## Results
Run `python train.py` to populate the table below:

| Model | Test Accuracy |
|---|---|
| Logistic Regression | TBD after running |
| Random Forest | TBD after running |

## GUI Preview
*(Add a screenshot here after running `python gui/app.py`)*

## Technologies Used
| Library | Purpose |
|---|---|
| Python 3.8+ | Core language |
| pandas | Data loading & manipulation |
| numpy | Numerical operations |
| scikit-learn | ML models, preprocessing, metrics |
| matplotlib / seaborn | Visualisation & plots |
| tkinter | Desktop GUI (built-in) |
| joblib | Model serialisation |

## Author
*John Lemar Gonzales*
