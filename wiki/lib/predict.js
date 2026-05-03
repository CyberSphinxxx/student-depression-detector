// predict.js — Client-side Logistic Regression inference
// Mirrors the preprocessing pipeline in train.py and gui/app.py exactly.

import { MODEL_DATA } from "./modelData";

const { coef, intercept, scalerMean, scalerScale, featureColumns, encoderClasses } = MODEL_DATA;

// ─── LabelEncoder ────────────────────────────────────────────────────────────
function labelEncode(col, value) {
  const classes = encoderClasses[col];
  if (!classes) return 0;
  const idx = classes.indexOf(String(value));
  return idx === -1 ? 0 : idx;
}

// ─── Sleep Category (mirrors train.py exactly) ────────────────────────────────
function getSleepCategory(sleepLabel) {
  const lower = sleepLabel.toLowerCase();
  let hours;
  if (lower.includes("less than 5")) hours = 4.0;
  else if (lower.includes("5-6"))    hours = 5.5;
  else if (lower.includes("7-8"))    hours = 7.5;
  else if (lower.includes("more than 8")) hours = 9.0;
  else hours = 7.0; // Others

  if (hours < 6)       return 0; // Low
  else if (hours <= 8) return 1; // Normal
  else                 return 2; // High
}

// ─── Sigmoid ─────────────────────────────────────────────────────────────────
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

// ─── Main predict function ────────────────────────────────────────────────────
/**
 * @param {Object} inputs — raw user inputs from the form
 * @returns {{ prediction: number, confidence: number, label: string, probDepressed: number }}
 */
export function predict(inputs) {
  // 1. Build raw row (matching CSV column names)
  const row = {};

  // Numeric fields — stored directly
  row["id"]               = 70442; // use training mean as placeholder
  row["Age"]              = parseFloat(inputs["Age"]) || 25;
  row["CGPA"]             = parseFloat(inputs["CGPA"]) || 7.0;
  row["Academic Pressure"]= parseFloat(inputs["Academic Pressure"]) || 3;
  row["Work Pressure"]    = parseFloat(inputs["Work Pressure"]) || 0;
  row["Study Satisfaction"]= parseFloat(inputs["Study Satisfaction"]) || 3;
  row["Job Satisfaction"] = parseFloat(inputs["Job Satisfaction"]) || 0;
  row["Work/Study Hours"] = parseFloat(inputs["Work/Study Hours"]) || 7;
  row["Financial Stress"] = parseFloat(inputs["Financial Stress"]) || 3;

  // Categorical fields — label encoded
  row["Gender"]           = labelEncode("Gender", inputs["Gender"] || "Male");
  row["Sleep Duration"]   = labelEncode("Sleep Duration", inputs["Sleep Duration"] || "7-8 hours");
  row["Dietary Habits"]   = labelEncode("Dietary Habits", inputs["Dietary Habits"] || "Moderate");
  row["Have you ever had suicidal thoughts ?"] = labelEncode(
    "Have you ever had suicidal thoughts ?",
    inputs["Have you ever had suicidal thoughts ?"] || "No"
  );
  row["Family History of Mental Illness"] = labelEncode(
    "Family History of Mental Illness",
    inputs["Family History of Mental Illness"] || "No"
  );

  // Hidden fields — use training-distribution defaults (mean encoded index)
  row["City"]       = labelEncode("City", "Mumbai");       // common city
  row["Profession"] = labelEncode("Profession", "Student"); // most common profession
  row["Degree"]     = labelEncode("Degree", "B.Tech");     // most common degree

  // 2. Engineered features (mirrors train.py step 3)
  const stressCols = ["Academic Pressure", "Work Pressure", "Financial Stress"];
  row["Stress_Score"] = stressCols.reduce((s, c) => s + (row[c] || 0), 0) / stressCols.length;

  row["Sleep_Category"] = getSleepCategory(inputs["Sleep Duration"] || "7-8 hours");

  const studyHours = row["Work/Study Hours"];
  row["Study_Work_Balance"] = studyHours / (studyHours + 1);

  // 3. Build ordered feature vector
  const featureVector = featureColumns.map((col) => parseFloat(row[col] ?? 0) || 0);

  // 4. StandardScaler: z = (x - mean) / scale
  const scaled = featureVector.map(
    (val, i) => (val - scalerMean[i]) / scalerScale[i]
  );

  // 5. Logistic Regression: z = dot(coef, x) + intercept
  const z = scaled.reduce((sum, val, i) => sum + coef[i] * val, intercept);

  // 6. Sigmoid → probability of depression (class 1)
  const probDepressed = sigmoid(z);
  const prediction = probDepressed >= 0.5 ? 1 : 0;
  const confidence = prediction === 1 ? probDepressed : 1 - probDepressed;

  return {
    prediction,
    label: prediction === 1 ? "Depressed" : "Not Depressed",
    confidence: Math.round(confidence * 1000) / 10, // e.g. 87.3
    probDepressed: Math.round(probDepressed * 1000) / 10,
  };
}
