# 🏥 AI-SEVA: Intelligent Healthcare Platform

A **full-stack AI-driven healthcare platform** that allows users to enter symptoms in natural language and receive **real-time disease predictions, nearby doctor suggestions, and multilingual health news**.

The platform is designed to **assist rural communities in finding relevant healthcare information quickly**.

---

# 🚀 Features

### 🩺 AI Symptom Checker

* Uses **Natural Language Processing (NLP)** to analyze user-entered symptoms.
* Built with **Scikit-learn, CountVectorizer, and Multinomial Naive Bayes**.
* Predicts potential diseases and identifies possible medical emergencies.

### 🗺️ Find Nearest Doctors

* Interactive maps built using **Leaflet.js**.
* Displays nearby **doctors and healthcare facilities** based on the user's location and condition.

### 🌐 Multilingual Health News

* Displays **latest healthcare news**.
* Supports **multiple languages (English & Hindi)** for wider accessibility.

### ⚡ Modern Tech Stack

**Frontend**

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Shadcn UI

**Backend**

* Flask
* Python

**Machine Learning**

* Scikit-learn
* CountVectorizer
* Multinomial Naive Bayes

---

# 🛠 Installation & Setup

## Prerequisites

Make sure you have installed:

* **Node.js**
* **Python 3**

---

# Frontend Setup (Next.js)

Clone the repository:

```bash
git clone https://github.com/yourusername/ai-seva.git
cd ai-seva/GramAarogya-master
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:3000
```

---

# Backend Setup (Flask API)

Open a new terminal and navigate to the project directory:

```bash
cd ai-seva/GramAarogya-master
```

Create and activate a virtual environment (recommended):

```bash
python -m venv venv
```

Activate the environment

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

```bash
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
python backend.py
```

The backend API will run at:

```
http://localhost:5000
```

---

# 🧠 Machine Learning Pipeline

The system uses a **custom NLP pipeline** to classify symptoms and predict diseases.

### `simulate_ml.py`

Contains the training logic using:

* **CountVectorizer**
* **Multinomial Naive Bayes**

### `train_model.py`

* Trains the ML model on symptom datasets
* Exports the trained model as:

```
model.pkl
```

### `run_metrics.py`

Evaluates model performance by generating:

* Accuracy score
* F1 score
* Confusion matrix

---

# 📌 Future Improvements

* Real-time doctor appointment booking
* Integration with **live Google Maps API**
* Support for **more regional languages**
* More advanced **AI diagnosis models**

---

# 🤝 Contribution

Contributions are welcome!
Feel free to fork the repository and submit pull requests.

---

# 📜 License

This project is developed for **educational and research purposes**.

