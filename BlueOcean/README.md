# GPT 챗봇 웹 애플리케이션

이 프로젝트는 React 프론트엔드와 Flask 백엔드를 사용하여 OpenAI GPT API와 통신하는 간단한 웹 기반 챗봇입니다.

---

## 📁 프로젝트 구조

babybaby/
├── frontend/ # React 기반 사용자 인터페이스
│ └── src/
│ ├── App.js
│ ├── App.css
├── backend/ # Flask API 서버
│ ├── app.py
│ ├── requirements.txt


---

## 🚀 실행 방법

### 1. 백엔드 실행 (Flask)
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py

2. 프론트엔드 실행 (React)
cd frontend
npm install
npm start