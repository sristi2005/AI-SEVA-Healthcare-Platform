🏥 AI-SEVA: Intelligent Healthcare Platform
A full-stack AI-driven healthcare platform enabling users to submit multilingual symptom descriptions and receive real-time disease predictions, nearest doctor recommendations, and health news.

🚀 Features
🩺 AI Symptom Checker: Uses Natural Language Processing (Scikit-learn, Multinomial Naive Bayes) to classify user symptoms and predict potential diseases or medical emergencies.
🗺️ Find Nearest Doctors: Integrates Leaflet.js interactive maps to locate and display nearby medical professionals and facilities based on user location and condition.
🌐 Multilingual Health News: Fetches and displays the latest healthcare news in multiple languages (English/Hindi).
⚡ Modern Tech Stack:
Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI
Backend: Flask, Python
Machine Learning: Scikit-learn (CountVectorizer, Naive Bayes)
🛠️ Installation & Setup
Prerequisites
Make sure you have Node.js and Python installed on your machine.

Frontend Setup (Next.js)
Clone the repository:

bash
git clone https://github.com/yourusername/ai-seva.git
cd ai-seva/GramAarogya-master
Install NPM dependencies:

bash
npm install
Run the development server:

bash
npm run dev
The frontend will be available at http://localhost:3000

Backend Setup (Flask API)
Open a new terminal and navigate to the project directory:

bash
cd ai-seva/GramAarogya-master
(Optional but recommended) Create and activate a Python virtual environment:

bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
Install Python dependencies:

bash
pip install -r requirements.txt
Run the Flask server:

bash
python backend.py
The backend API will run at http://localhost:5000

🧠 Machine Learning Pipeline
The project uses a custom NLP pipeline to classify symptoms:

simulate_ml.py
: Contains the training logic using CountVectorizer and MultinomialNB.
train_model.py
: Trains the model on symptom datasets and exports the trained 
model.pkl
 file.
run_metrics.py
: Evaluates the model accuracy, F1-scores, and generates a confusion matrix.
