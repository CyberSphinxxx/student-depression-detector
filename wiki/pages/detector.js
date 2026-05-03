import { useState, useCallback } from "react";
import Head from "next/head";
import { predict } from "@/lib/predict";
import { AlertTriangle, CheckCircle2, RotateCcw, Brain, Info, ChevronDown, FileText, Settings, Calculator } from "lucide-react";

// ─── Field definitions ────────────────────────────────────────────────────────
const FIELDS = [
  {
    id: "gender",
    key: "Gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female"],
    default: "Male",
  },
  {
    id: "age",
    key: "Age",
    label: "Age",
    type: "number",
    min: 15,
    max: 60,
    step: 1,
    default: 22,
  },
  {
    id: "cgpa",
    key: "CGPA",
    label: "CGPA",
    type: "range",
    min: 0,
    max: 10,
    step: 0.1,
    default: 7.0,
    format: (v) => Number(v).toFixed(1),
  },
  {
    id: "academic_pressure",
    key: "Academic Pressure",
    label: "Academic Pressure",
    type: "range",
    min: 0,
    max: 5,
    step: 1,
    default: 3,
    format: (v) => `${v}/5`,
  },
  {
    id: "work_pressure",
    key: "Work Pressure",
    label: "Work Pressure",
    type: "range",
    min: 0,
    max: 5,
    step: 1,
    default: 0,
    format: (v) => `${v}/5`,
  },
  {
    id: "study_satisfaction",
    key: "Study Satisfaction",
    label: "Study Satisfaction",
    type: "range",
    min: 0,
    max: 5,
    step: 1,
    default: 3,
    format: (v) => `${v}/5`,
  },
  {
    id: "job_satisfaction",
    key: "Job Satisfaction",
    label: "Job Satisfaction",
    type: "range",
    min: 0,
    max: 5,
    step: 1,
    default: 0,
    format: (v) => `${v}/5`,
  },
  {
    id: "sleep_duration",
    key: "Sleep Duration",
    label: "Sleep Duration",
    type: "select",
    options: ["Less than 5 hours", "5-6 hours", "7-8 hours", "More than 8 hours"],
    default: "7-8 hours",
  },
  {
    id: "dietary_habits",
    key: "Dietary Habits",
    label: "Dietary Habits",
    type: "select",
    options: ["Healthy", "Moderate", "Unhealthy"],
    default: "Moderate",
  },
  {
    id: "suicidal_thoughts",
    key: "Have you ever had suicidal thoughts ?",
    label: "Suicidal Thoughts",
    type: "select",
    options: ["No", "Yes"],
    default: "No",
  },
  {
    id: "work_study_hours",
    key: "Work/Study Hours",
    label: "Work / Study Hours per Day",
    type: "number",
    min: 0,
    max: 24,
    step: 1,
    default: 7,
  },
  {
    id: "financial_stress",
    key: "Financial Stress",
    label: "Financial Stress",
    type: "range",
    min: 0,
    max: 5,
    step: 1,
    default: 2,
    format: (v) => `${v}/5`,
  },
  {
    id: "family_history",
    key: "Family History of Mental Illness",
    label: "Family History of Mental Illness",
    type: "select",
    options: ["No", "Yes"],
    default: "No",
  },
];

function buildDefaults() {
  return Object.fromEntries(FIELDS.map((f) => [f.key, f.default]));
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FieldInput({ field, value, onChange }) {
  const handleChange = (e) => onChange(field.key, e.target.value);

  if (field.type === "select") {
    return (
      <div className="relative">
        <select
          id={field.id}
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 pr-10 rounded-lg border border-border-primary bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
        >
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-foreground/50">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    );
  }

  if (field.type === "range") {
    const pct = ((value - field.min) / (field.max - field.min)) * 100;
    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-foreground/40">{field.min}</span>
          <span className="text-sm font-semibold text-accent tabular-nums">
            {field.format ? field.format(value) : value}
          </span>
          <span className="text-xs text-foreground/40">{field.max}</span>
        </div>
        <input
          id={field.id}
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={handleChange}
          style={{
            background: `linear-gradient(to right, var(--accent) ${pct}%, var(--border) ${pct}%)`,
          }}
          className="w-full h-2 rounded-full appearance-none cursor-pointer detector-range"
        />
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <input
        id={field.id}
        type="number"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-lg border border-border-primary bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
      />
    );
  }

  return null;
}

function ResultCard({ result, onReset }) {
  const isDepressed = result.prediction === 1;

  return (
    <div
      className={`rounded-2xl border p-6 space-y-5 transition-all duration-500 ${
        isDepressed
          ? "bg-red-500/5 border-red-500/30"
          : "bg-green-500/5 border-green-500/30"
      }`}
    >
      {/* Icon + Label */}
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
            isDepressed ? "bg-red-500/15" : "bg-green-500/15"
          }`}
        >
          {isDepressed ? (
            <AlertTriangle className="w-7 h-7 text-red-500" />
          ) : (
            <CheckCircle2 className="w-7 h-7 text-green-500" />
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-0.5">
            Prediction Result
          </p>
          <h2
            className={`text-2xl font-black ${
              isDepressed ? "text-red-500" : "text-green-500"
            }`}
          >
            {isDepressed ? "At Risk of Depression" : "Not At Risk"}
          </h2>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-foreground/60 font-medium">Model Confidence</span>
          <span className="font-bold text-foreground">{result.confidence}%</span>
        </div>
        <div className="h-3 rounded-full bg-border-primary overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              isDepressed ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${result.confidence}%` }}
          />
        </div>
        <p className="text-xs text-foreground/40 text-right">
          Probability of Depression: {result.probDepressed}%
        </p>
      </div>

      {/* Message */}
      <p className="text-sm leading-relaxed text-foreground/70">
        {isDepressed
          ? "The model suggests signs of depression risk based on your inputs. Please consider reaching out to a counselor, trusted person, or mental health professional. You are not alone."
          : "The model suggests your current lifestyle and academic conditions are within a healthy range. Keep maintaining a balanced routine, and check in with yourself regularly."}
      </p>

      {/* Disclaimer */}
      <div className="flex gap-2 bg-foreground/5 rounded-lg p-3 border border-border-primary">
        <Info className="w-4 h-4 text-foreground/40 shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/50 leading-relaxed">
          This tool is for <strong>educational purposes only</strong> and is based on a machine learning model trained on survey data. It is not a clinical diagnosis. Always consult a qualified mental health professional.
        </p>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reset and try again
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Detector() {
  const [values, setValues] = useState(buildDefaults);
  const [result, setResult] = useState(null);

  const handleChange = useCallback((key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setResult(null);
  }, []);

  const handlePredict = () => {
    const res = predict(values);
    setResult(res);
    // Scroll to result on mobile
    setTimeout(() => {
      document.getElementById("detector-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleReset = () => {
    setValues(buildDefaults());
    setResult(null);
  };

  // Split fields into two columns
  const col1 = FIELDS.slice(0, Math.ceil(FIELDS.length / 2));
  const col2 = FIELDS.slice(Math.ceil(FIELDS.length / 2));

  return (
    <>
      <Head>
        <title>Try the Detector | Student Depression Detector</title>
        <meta
          name="description"
          content="Interactive depression risk detector powered by the trained Logistic Regression model."
        />
      </Head>

      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="border-b border-border-primary pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
              <Brain className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Try the Detector</h1>
          </div>
          <p className="text-foreground/60 leading-relaxed max-w-2xl">
            This is the live version of the trained{" "}
            <span className="text-accent font-medium">Logistic Regression</span> model
            (84.48% accuracy). Fill in your details below and the model will predict your
            depression risk — entirely in-browser, no data is sent anywhere.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["No data sent to server", "Runs in your browser", "Logistic Regression", "84.48% Accuracy"].map(
              (badge) => (
                <span
                  key={badge}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {badge}
                </span>
              )
            )}
          </div>
        </div>

        {/* Form + Result layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Form — takes 3/5 width on XL */}
          <div className="xl:col-span-3 space-y-6">
            <div className="bg-card border border-border-primary rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-5">Your Information</h2>

              {/* Two-column grid on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {[...col1, ...col2].map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label
                      htmlFor={field.id}
                      className="text-sm font-medium text-foreground/70"
                    >
                      {field.label}
                    </label>
                    <FieldInput
                      field={field}
                      value={values[field.key]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-7">
                <button
                  id="detector-predict-btn"
                  onClick={handlePredict}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md shadow-accent/20 text-sm"
                >
                  <Brain className="w-4 h-4" />
                  Predict Depression Risk
                </button>
                <button
                  id="detector-reset-btn"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border-primary text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Feature weights info card */}
            <div className="bg-card border border-border-primary rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Top Predictive Features
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Suicidal Thoughts", weight: 95 },
                  { label: "Academic Pressure", weight: 78 },
                  { label: "Stress Score", weight: 72 },
                  { label: "Dietary Habits", weight: 55 },
                  { label: "Financial Stress", weight: 52 },
                  { label: "Work/Study Hours", weight: 48 },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <span className="text-xs text-foreground/60 w-36 shrink-0">{f.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-border-primary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${f.weight}%` }}
                      />
                    </div>
                    <span className="text-xs text-foreground/40 w-8 text-right">{f.weight}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result panel — takes 2/5 width on XL, sticky on desktop */}
          <div className="xl:col-span-2" id="detector-result">
            {result ? (
              <div className="xl:sticky xl:top-6">
                <ResultCard result={result} onReset={handleReset} />
              </div>
            ) : (
              <div className="xl:sticky xl:top-6 h-full min-h-[200px] rounded-2xl border border-border-primary border-dashed bg-card flex flex-col items-center justify-center text-center p-8 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-foreground/20" />
                </div>
                <div>
                  <p className="text-foreground/40 font-medium text-sm">No prediction yet</p>
                  <p className="text-foreground/30 text-xs mt-1">
                    Fill in the form and click Predict
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How it works section */}
        <div className="bg-card border border-border-primary rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">How It Works Behind the Scenes</h2>
            <p className="text-sm text-foreground/60 mt-2 max-w-xl">
              This detector runs entirely in your browser using the extracted parameters of our trained Logistic Regression model.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-border-primary z-0"></div>

            {[
              {
                step: "1",
                icon: <FileText className="w-6 h-6 text-accent" />,
                title: "Input Collection",
                desc: "You provide 13 data points covering academic pressure, lifestyle habits, and mental health indicators.",
              },
              {
                step: "2",
                icon: <Settings className="w-6 h-6 text-accent" />,
                title: "In-Browser Processing",
                desc: "The app performs Label Encoding, scales values using StandardScaler, and computes engineered features (e.g., Stress Score).",
              },
              {
                step: "3",
                icon: <Calculator className="w-6 h-6 text-accent" />,
                title: "Model Inference",
                desc: "We compute the dot product of your scaled features with the model's coefficients, then apply the sigmoid function to get a probability.",
              },
            ].map((s) => (
              <div key={s.step} className="relative z-10 flex flex-col items-center text-center bg-background rounded-xl p-6 border border-border-primary shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-card border-[6px] border-background flex items-center justify-center mb-4 shadow-sm relative">
                  {s.icon}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                    {s.step}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .detector-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }
        .detector-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}
