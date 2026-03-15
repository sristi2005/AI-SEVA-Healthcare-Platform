
import pandas as pd

def predict_category(question):
    question = question.lower()
    pred_label = "common"
    
    # Logic copied from backend.py for analysis
    if any(x in question for x in ["emergency", "heart attack", "chest pain", "breathing", "unconscious", "accident", "bleeding"]):
        pred_label = "emergency"
    elif any(x in question for x in ["fever", "high temperature", "shivering", "hot"]):
        pred_label = "fever"
    elif any(x in question for x in ["headache", "migraine", "head pain", "dizzy"]):
        pred_label = "headache"
    elif any(x in question for x in ["cold", "cough", "sneeze", "runny nose", "sore throat", "flu"]):
        pred_label = "cold"
    elif any(x in question for x in ["stomach", "abdominal", "belly", "digest", "gas", "acidity"]):
        pred_label = "stomach"
    elif any(x in question for x in ["vomit", "nausea", "puke"]):
        pred_label = "vomiting"
    elif any(x in question for x in ["diabetes", "sugar", "insulin", "glucose"]):
        pred_label = "diabetes"
    elif any(x in question for x in ["blood pressure", "bp", "hypertension"]):
        pred_label = "blood_pressure"
        
    return pred_label


# Test Cases for the Report
test_cases = [
    "I have a severe headache",
    "My chest hurts a lot and I can't breathe",
    "I have been vomiting since morning",
    "I feel dizzy and have a headache",
    "I have a stomach ache and gas",
    "My blood pressure is high",
    "I have a runny nose and cough",
    "I cut my finger and it is bleeding", 
    "I have a fever and a headache", # Conflict test
    "I am feeling generally unwell", # Ambiguous test
    "I have diabetes and need insulin",
    "My knee hurts when I walk" # Out of distribution
]

print("| Input Query | Predicted Category |")
print("|---|---|")
for test in test_cases:
    prediction = predict_category(test)
    print(f"| {test} | {prediction} |")

# Conflict Analysis
print("\n### Conflict Resolution Analysis")
conflict_query = "I have a fever and a headache"
p_cat = predict_category(conflict_query)
print(f"Query: '{conflict_query}'")
print(f"Result: '{p_cat}'")
print("Observation: The system prioritizes 'fever' over 'headache' because the 'fever' check happens earlier in the if-elif chain.")
