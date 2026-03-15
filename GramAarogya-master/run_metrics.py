
import joblib
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score, f1_score
import numpy as np
import warnings

# Suppress warnings
warnings.filterwarnings("ignore")

# Define model paths etc
MODEL_PATH = "model.pkl"

# 1. DEFINE PROXY MODEL (The HYBRID Logic)
try:
    model = joblib.load(MODEL_PATH)
    print(f"Loaded model from {MODEL_PATH}")
except Exception as e:
    print(f"Could not load model: {e}")
    model = None

def predict_category(question):
    question = question.lower()
    
    # 1. SAFETY LAYER (Rule-Based)
    if any(x in question for x in ["emergency", "heart attack", "chest pain", "breathing", "unconscious", "accident", "bleeding"]):
        pred_label = "emergency"
    else:
        # 2. ML LAYER
        if model:
            try:
                pred_label = model.predict([question])[0]
            except:
                pred_label = "common"
        else:
            pred_label = "common"
        
    return pred_label

# 2. CREATE GROUND TRUTH DATASET
dataset = [
    ("I am having a heart attack", "emergency"),
    ("Severe chest pain", "emergency"),
    ("Difficulty breathing and chest pain", "emergency"),
    ("Accident on the road, heavy bleeding", "emergency"),
    ("Unconscious person here", "emergency"),
    ("I have a high fever", "fever"),
    ("My body temperature is very high", "fever"),
    ("I am shivering and feel hot", "fever"),
    ("Running a temperature of 102", "fever"),
    ("Severe migraine", "headache"),
    ("My head hurts a lot", "headache"),
    ("I feel very dizzy", "headache"),
    ("Splitting headache", "headache"),
    ("I have a runny nose", "cold"),
    ("Sneezing continuously", "cold"),
    ("Sore throat and cough", "cold"),
    ("Bad flu symptoms", "cold"),
    ("Stomach ache", "stomach"),
    ("Severe indigestion and gas", "stomach"),
    ("Acidity problem", "stomach"),
    ("Belly pain", "stomach"),
    ("I feel nauseous", "vomiting"),
    ("Vomiting since morning", "vomiting"),
    ("Feel like puking", "vomiting"),
    ("High blood sugar levels", "diabetes"),
    ("Need insulin for diabetes", "diabetes"),
    ("Glucose levels are high", "diabetes"),
    ("High blood pressure", "blood_pressure"),
    ("Hypertension issues", "blood_pressure"),
    ("BP is shooting up", "blood_pressure"),
    ("My knee hurts", "common"),
    ("I feel tired", "common"),
    ("General weakness", "common"),
    ("Back pain", "common"),
    ("I cut my finger", "emergency"), 
]

# Separate X and y
X_test = [x[0] for x in dataset]
y_true = [x[1] for x in dataset]

# 3. RUN PREDICTIONS
y_pred = [predict_category(text) for text in X_test]

# 4. CALCULATE METRICS
accuracy = accuracy_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred, average='weighted')

print("="*60)
print("EVALUATION REPORT")
print("="*60)
print(f"Total Samples: {len(dataset)}")
print(f"Accuracy: {accuracy:.4f}")
print(f"F1-Score (Weighted): {f1:.4f}")
print("-" * 60)
print("Classification Report:")
print(classification_report(y_true, y_pred, zero_division=0))
print("="*60)

# Confusion Matrix
labels = sorted(list(set(y_true) | set(y_pred)))
cm = confusion_matrix(y_true, y_pred, labels=labels)
print("\nConfusion Matrix:")
print("Labels:", labels)
print(cm)
print("="*60)

# Misclassified
print("\n[MISCLASSIFIED CASES]")
for i in range(len(y_true)):
    if y_true[i] != y_pred[i]:
        print(f"Query: '{X_test[i]}'")
        print(f"  Expected: {y_true[i]}")
        print(f"  Predicted: {y_pred[i]}")
