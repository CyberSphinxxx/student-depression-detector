# =============================================================
# gui/app.py — Student Depression Detector GUI
# Tkinter application that loads the trained model and provides
# an interactive form to predict student depression risk.
# =============================================================

import os
import sys
import tkinter as tk
from tkinter import ttk, messagebox
import joblib
import numpy as np

# =============================================================
# PATHS — resolved relative to this file so the GUI works
# from any working directory.
# =============================================================
GUI_DIR   = os.path.dirname(os.path.abspath(__file__))
BASE_DIR  = os.path.dirname(GUI_DIR)
MODEL_DIR = os.path.join(BASE_DIR, "model")

MODEL_PATH   = os.path.join(MODEL_DIR, "depression_model.pkl")
SCALER_PATH  = os.path.join(MODEL_DIR, "scaler.pkl")
ENC_PATH     = os.path.join(MODEL_DIR, "encoders.pkl")
FEAT_PATH    = os.path.join(MODEL_DIR, "feature_columns.pkl")

# =============================================================
# LOAD MODEL ARTIFACTS
# =============================================================
def load_artifacts():
    """Load model, scaler, encoders, and feature column list."""
    missing = []
    for p in [MODEL_PATH, SCALER_PATH, ENC_PATH, FEAT_PATH]:
        if not os.path.exists(p):
            missing.append(p)
    if missing:
        messagebox.showerror(
            "Missing Files",
            "The following model files are missing. "
            "Please run train.py first.\n\n" + "\n".join(missing)
        )
        sys.exit(1)

    model           = joblib.load(MODEL_PATH)
    scaler          = joblib.load(SCALER_PATH)
    encoder_dict    = joblib.load(ENC_PATH)
    feature_columns = joblib.load(FEAT_PATH)
    return model, scaler, encoder_dict, feature_columns


# =============================================================
# COLOUR PALETTE
# =============================================================
BG_COLOR       = "#F0F2F5"
CARD_COLOR     = "#FFFFFF"
PRIMARY_COLOR  = "#2563EB"   # blue-600
SUCCESS_COLOR  = "#16A34A"   # green-600
DANGER_COLOR   = "#DC2626"   # red-600
LABEL_COLOR    = "#374151"   # gray-700
HEADER_COLOR   = "#1E3A8A"   # blue-900
SUBTITLE_COLOR = "#6B7280"   # gray-500
RESET_COLOR    = "#6B7280"
BTN_TEXT       = "#FFFFFF"
FONT_FAMILY    = "Segoe UI"


# =============================================================
# MAIN APPLICATION CLASS
# =============================================================
class DepressionDetectorApp:
    # ----------------------------------------------------------
    def __init__(self, root):
        self.root = root
        self.root.title("Student Depression Detector")
        self.root.geometry("780x760")
        self.root.resizable(True, True)
        self.root.configure(bg=BG_COLOR)

        # Load ML artifacts
        self.model, self.scaler, self.encoder_dict, self.feature_columns = load_artifacts()

        # Build UI
        self._build_header()
        self._build_form()
        self._build_buttons()
        self._build_result_section()

    # ----------------------------------------------------------
    # HEADER
    # ----------------------------------------------------------
    def _build_header(self):
        header_frame = tk.Frame(self.root, bg=HEADER_COLOR, pady=16)
        header_frame.pack(fill=tk.X)

        tk.Label(
            header_frame,
            text="🧠  Student Depression Detector",
            font=(FONT_FAMILY, 20, "bold"),
            bg=HEADER_COLOR, fg="#FFFFFF"
        ).pack()

        tk.Label(
            header_frame,
            text="Fill in the details below to check depression risk",
            font=(FONT_FAMILY, 11),
            bg=HEADER_COLOR, fg="#BFDBFE"
        ).pack(pady=(2, 0))

    # ----------------------------------------------------------
    # INPUT FORM
    # ----------------------------------------------------------
    def _build_form(self):
        """Create a scrollable 2-column grid of input widgets."""
        # Scrollable canvas wrapper
        canvas_frame = tk.Frame(self.root, bg=BG_COLOR)
        canvas_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)

        canvas = tk.Canvas(canvas_frame, bg=BG_COLOR, highlightthickness=0)
        scrollbar = ttk.Scrollbar(canvas_frame, orient="vertical", command=canvas.yview)
        self.scroll_frame = tk.Frame(canvas, bg=BG_COLOR)

        self.scroll_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )

        canvas.create_window((0, 0), window=self.scroll_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        # Bind mouse wheel to scroll
        canvas.bind_all("<MouseWheel>", lambda e: canvas.yview_scroll(-1*(e.delta//120), "units"))

        self._create_fields()

    def _label_widget(self, parent, text, row, col):
        """Place a field label."""
        tk.Label(
            parent, text=text,
            font=(FONT_FAMILY, 10),
            bg=BG_COLOR, fg=LABEL_COLOR,
            anchor="e", width=28
        ).grid(row=row, column=col, padx=(10, 4), pady=6, sticky="e")

    def _create_fields(self):
        """Define and place all input fields."""
        f = self.scroll_frame   # shorthand

        # Storage
        self.vars = {}

        # ------ Field definitions ------
        # Each entry: (label_text, widget_type, options_or_range)
        FIELDS = [
            ("Age",                              "spinbox",   (15, 35)),
            ("Gender",                           "dropdown",  ["Male", "Female"]),
            ("Academic Pressure",                "scale",     (1, 5)),
            ("Work Pressure",                    "scale",     (0, 5)),
            ("CGPA",                             "cgpa",      (0.0, 10.0)),
            ("Study Satisfaction",               "scale",     (1, 5)),
            ("Job Satisfaction",                 "scale",     (1, 5)),
            ("Sleep Duration",                   "dropdown",  ["Less than 5 hours", "5-6 hours",
                                                               "7-8 hours", "More than 8 hours"]),
            ("Dietary Habits",                   "dropdown",  ["Healthy", "Moderate", "Unhealthy"]),
            ("Have you ever had suicidal thoughts ?", "dropdown", ["Yes", "No"]),
            ("Work/Study Hours",                 "spinbox",   (0, 24)),
            ("Financial Stress",                 "scale",     (1, 5)),
            ("Family History of Mental Illness", "dropdown",  ["Yes", "No"]),
        ]

        # 2-column layout: label | widget
        for idx, (label, wtype, opts) in enumerate(FIELDS):
            row  = idx
            lcol = 0    # label column
            wcol = 1    # widget column

            self._label_widget(f, label + ":", row, lcol)

            if wtype == "dropdown":
                var = tk.StringVar(value=opts[0])
                w   = ttk.Combobox(f, textvariable=var, values=opts,
                                   state="readonly", width=28, font=(FONT_FAMILY, 10))
                w.grid(row=row, column=wcol, padx=(4, 20), pady=6, sticky="w")

            elif wtype == "spinbox":
                lo, hi = opts
                var = tk.IntVar(value=lo)
                w   = tk.Spinbox(f, from_=lo, to=hi, textvariable=var,
                                 width=10, font=(FONT_FAMILY, 10),
                                 bg=CARD_COLOR, relief="solid", bd=1)
                w.grid(row=row, column=wcol, padx=(4, 20), pady=6, sticky="w")

            elif wtype == "scale":
                lo, hi = opts
                var = tk.DoubleVar(value=lo)
                frm = tk.Frame(f, bg=BG_COLOR)
                frm.grid(row=row, column=wcol, padx=(4, 20), pady=6, sticky="w")
                sc = tk.Scale(frm, from_=lo, to=hi, orient="horizontal",
                              variable=var, resolution=1, length=200,
                              bg=BG_COLOR, fg=LABEL_COLOR,
                              troughcolor="#DBEAFE", activebackground=PRIMARY_COLOR,
                              highlightthickness=0, showvalue=True, font=(FONT_FAMILY, 9))
                sc.pack()

            elif wtype == "cgpa":
                lo, hi = opts
                var = tk.DoubleVar(value=7.0)
                frm = tk.Frame(f, bg=BG_COLOR)
                frm.grid(row=row, column=wcol, padx=(4, 20), pady=6, sticky="w")
                sc  = tk.Scale(frm, from_=lo, to=hi, orient="horizontal",
                               variable=var, resolution=0.1, length=200,
                               bg=BG_COLOR, fg=LABEL_COLOR,
                               troughcolor="#DBEAFE", activebackground=PRIMARY_COLOR,
                               highlightthickness=0, showvalue=True, font=(FONT_FAMILY, 9))
                sc.pack()

            self.vars[label] = var

    # ----------------------------------------------------------
    # BUTTONS
    # ----------------------------------------------------------
    def _build_buttons(self):
        btn_frame = tk.Frame(self.root, bg=BG_COLOR)
        btn_frame.pack(pady=(0, 8))

        predict_btn = tk.Button(
            btn_frame,
            text="🔍  Predict Depression Risk",
            command=self.predict,
            bg=PRIMARY_COLOR, fg=BTN_TEXT,
            font=(FONT_FAMILY, 13, "bold"),
            relief="flat", padx=28, pady=10,
            cursor="hand2",
            activebackground="#1D4ED8", activeforeground=BTN_TEXT
        )
        predict_btn.pack(side=tk.LEFT, padx=10)

        reset_btn = tk.Button(
            btn_frame,
            text="↺  Reset",
            command=self.reset,
            bg=RESET_COLOR, fg=BTN_TEXT,
            font=(FONT_FAMILY, 11),
            relief="flat", padx=16, pady=10,
            cursor="hand2",
            activebackground="#4B5563", activeforeground=BTN_TEXT
        )
        reset_btn.pack(side=tk.LEFT, padx=6)

    # ----------------------------------------------------------
    # RESULT SECTION
    # ----------------------------------------------------------
    def _build_result_section(self):
        self.result_frame = tk.Frame(self.root, bg=BG_COLOR, pady=6)
        self.result_frame.pack(fill=tk.X, padx=30)

        # Main result label (large text)
        self.result_label = tk.Label(
            self.result_frame,
            text="",
            font=(FONT_FAMILY, 26, "bold"),
            bg=BG_COLOR
        )
        self.result_label.pack()

        # Sub-message
        self.message_label = tk.Label(
            self.result_frame,
            text="",
            font=(FONT_FAMILY, 11),
            bg=BG_COLOR, wraplength=680
        )
        self.message_label.pack(pady=(2, 0))

        # Confidence text
        self.confidence_label = tk.Label(
            self.result_frame,
            text="",
            font=(FONT_FAMILY, 12, "bold"),
            bg=BG_COLOR
        )
        self.confidence_label.pack(pady=(4, 4))

        # Confidence bar (horizontal canvas bar)
        bar_outer = tk.Frame(self.result_frame, bg="#E5E7EB", height=20,
                             bd=0, relief="flat")
        bar_outer.pack(fill=tk.X, padx=40, pady=4)
        bar_outer.pack_propagate(False)

        self.conf_canvas = tk.Canvas(bar_outer, height=20, bg="#E5E7EB",
                                     highlightthickness=0)
        self.conf_canvas.pack(fill=tk.BOTH, expand=True)

    # ----------------------------------------------------------
    # PREPROCESSING  (must mirror train.py exactly)
    # ----------------------------------------------------------
    def _preprocess_input(self, raw_inputs: dict) -> np.ndarray:
        """
        Apply the same preprocessing pipeline as train.py to
        a single dictionary of raw user inputs and return a
        1-row numpy array ready for model.predict().
        """
        # Map from GUI label → exact CSV column name
        COLUMN_MAP = {
            "Age":                                    "Age",
            "Gender":                                 "Gender",
            "Academic Pressure":                      "Academic Pressure",
            "Work Pressure":                          "Work Pressure",
            "CGPA":                                   "CGPA",
            "Study Satisfaction":                     "Study Satisfaction",
            "Job Satisfaction":                       "Job Satisfaction",
            "Sleep Duration":                         "Sleep Duration",
            "Dietary Habits":                         "Dietary Habits",
            "Have you ever had suicidal thoughts ?":  "Have you ever had suicidal thoughts ?",
            "Work/Study Hours":                       "Work/Study Hours",
            "Financial Stress":                       "Financial Stress",
            "Family History of Mental Illness":       "Family History of Mental Illness",
        }

        row = {}

        # --- Encode categorical values using the saved encoders ---
        for gui_label, csv_col in COLUMN_MAP.items():
            if gui_label not in raw_inputs:
                continue
            value = raw_inputs[gui_label]

            if csv_col in self.encoder_dict:
                le = self.encoder_dict[csv_col]
                try:
                    encoded = le.transform([str(value)])[0]
                except ValueError:
                    # If unseen label, use 0 as fallback
                    encoded = 0
                row[csv_col] = encoded
            else:
                # Numeric — store directly
                try:
                    row[csv_col] = float(value)
                except (ValueError, TypeError):
                    row[csv_col] = 0.0

        # --- Feature Engineering (same as train.py) ---

        # Stress_Score
        stress_cols = ['Academic Pressure', 'Work Pressure', 'Financial Stress']
        stress_vals = [row.get(c, 0.0) for c in stress_cols if c in row]
        if stress_vals:
            row['Stress_Score'] = float(np.mean(stress_vals))

        # Sleep_Category
        SLEEP_COL = 'Sleep Duration'
        if SLEEP_COL in row and SLEEP_COL in self.encoder_dict:
            sleep_le  = self.encoder_dict[SLEEP_COL]
            sleep_enc = row[SLEEP_COL]
            # Reverse-map encoded → original label
            if sleep_enc < len(sleep_le.classes_):
                original_label = sleep_le.classes_[int(sleep_enc)]
            else:
                original_label = '7-8 hours'
            cls_low = original_label.lower()
            if 'less than 5' in cls_low:
                approx_hours = 4
            elif '5-6' in cls_low:
                approx_hours = 5.5
            elif '7-8' in cls_low:
                approx_hours = 7.5
            else:
                approx_hours = 9

            if approx_hours < 6:
                row['Sleep_Category'] = 0
            elif approx_hours <= 8:
                row['Sleep_Category'] = 1
            else:
                row['Sleep_Category'] = 2

        # Study_Work_Balance
        study_col = 'Work/Study Hours'
        if study_col in row:
            sh = float(row[study_col])
            row['Study_Work_Balance'] = sh / (sh + 1)

        # --- Build ordered feature vector using saved feature_columns ---
        feature_vector = []
        for col in self.feature_columns:
            feature_vector.append(float(row.get(col, 0.0)))

        return np.array([feature_vector])

    # ----------------------------------------------------------
    # PREDICT
    # ----------------------------------------------------------
    def predict(self):
        """Collect inputs, preprocess, predict, and display result."""
        try:
            # Gather raw values from widgets
            raw_inputs = {}
            for label, var in self.vars.items():
                raw_inputs[label] = var.get()

            # Preprocess
            X_input  = self._preprocess_input(raw_inputs)
            X_scaled = self.scaler.transform(X_input)

            # Predict
            prediction = self.model.predict(X_scaled)[0]
            proba      = self.model.predict_proba(X_scaled)[0]
            # proba[1] = probability of depression (class 1)
            confidence = proba[1] if prediction == 1 else proba[0]
            conf_pct   = round(confidence * 100, 1)

            # === Display Result ===
            if prediction == 1:
                self.result_label.config(
                    text="⚠  DEPRESSED",
                    fg=DANGER_COLOR
                )
                self.message_label.config(
                    text="Please seek support from a counselor or trusted person. You are not alone.",
                    fg=DANGER_COLOR
                )
                bar_color = DANGER_COLOR
            else:
                self.result_label.config(
                    text="✔  NOT DEPRESSED",
                    fg=SUCCESS_COLOR
                )
                self.message_label.config(
                    text="Keep maintaining a healthy lifestyle! Your mental health looks good.",
                    fg=SUCCESS_COLOR
                )
                bar_color = SUCCESS_COLOR

            self.confidence_label.config(
                text=f"Confidence: {conf_pct}%",
                fg=LABEL_COLOR
            )

            # Draw confidence bar
            self._draw_bar(conf_pct / 100, bar_color)

        except Exception as exc:
            messagebox.showerror(
                "Prediction Error",
                f"An error occurred during prediction:\n\n{exc}"
            )

    # ----------------------------------------------------------
    def _draw_bar(self, ratio: float, color: str):
        """Fill the confidence canvas bar proportionally."""
        self.conf_canvas.update_idletasks()
        width = self.conf_canvas.winfo_width() or 600
        self.conf_canvas.delete("all")
        self.conf_canvas.create_rectangle(0, 0, int(width * ratio), 20,
                                           fill=color, outline="")

    # ----------------------------------------------------------
    # RESET
    # ----------------------------------------------------------
    def reset(self):
        """Reset all inputs to default values."""
        DEFAULTS = {
            "Age":                                    20,
            "Gender":                                 "Male",
            "Academic Pressure":                      3.0,
            "Work Pressure":                          0.0,
            "CGPA":                                   7.0,
            "Study Satisfaction":                     3.0,
            "Job Satisfaction":                       3.0,
            "Sleep Duration":                         "7-8 hours",
            "Dietary Habits":                         "Moderate",
            "Have you ever had suicidal thoughts ?":  "No",
            "Work/Study Hours":                       6,
            "Financial Stress":                       2.0,
            "Family History of Mental Illness":       "No",
        }
        for label, var in self.vars.items():
            if label in DEFAULTS:
                try:
                    var.set(DEFAULTS[label])
                except Exception:
                    pass

        # Clear result area
        self.result_label.config(text="")
        self.message_label.config(text="")
        self.confidence_label.config(text="")
        self.conf_canvas.delete("all")


# =============================================================
# ENTRY POINT
# =============================================================
if __name__ == "__main__":
    root = tk.Tk()
    try:
        # Use a modern ttk theme when available
        style = ttk.Style(root)
        style.theme_use("clam")
    except Exception:
        pass
    app = DepressionDetectorApp(root)
    root.mainloop()
