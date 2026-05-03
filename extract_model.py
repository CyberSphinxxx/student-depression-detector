"""
extract_model.py
Dumps all model artifacts needed for JavaScript inference into a single JSON file.
Run from repo root: python extract_model.py
"""
import os, json
import joblib
import numpy as np

BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

model           = joblib.load(os.path.join(MODEL_DIR, "depression_model.pkl"))
scaler          = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
encoder_dict    = joblib.load(os.path.join(MODEL_DIR, "encoders.pkl"))
feature_columns = joblib.load(os.path.join(MODEL_DIR, "feature_columns.pkl"))

print(f"Model type: {type(model).__name__}")
print(f"Features ({len(feature_columns)}): {feature_columns}")
print(f"Scaler mean shape: {scaler.mean_.shape}")
print(f"Encoders: {list(encoder_dict.keys())}")

# Build encoder classes map: { "Gender": ["Female", "Male"], ... }
encoder_classes = {}
for col, le in encoder_dict.items():
    encoder_classes[col] = list(le.classes_)

# Logistic Regression coefficients
if hasattr(model, 'coef_'):
    coef      = model.coef_[0].tolist()
    intercept = model.intercept_[0].tolist()
    model_type = "logistic_regression"
    print(f"\nCoefficients ({len(coef)}): {coef}")
    print(f"Intercept: {intercept}")
else:
    raise ValueError(f"Unsupported model type: {type(model).__name__}")

output = {
    "modelType": model_type,
    "featureColumns": feature_columns,
    "coef": coef,
    "intercept": intercept,
    "scalerMean": scaler.mean_.tolist(),
    "scalerScale": scaler.scale_.tolist(),
    "encoderClasses": encoder_classes,
}

out_path = os.path.join(BASE_DIR, "model_params.json")
with open(out_path, "w") as f:
    json.dump(output, f, indent=2)

print(f"\n✅ Saved to {out_path}")
