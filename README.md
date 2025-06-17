# techforimpact-archive-TFICAMPUS_YONSEI_25Spring_BlueOcean

테크포 임팩트 유스보이스팀 아기자기 "🛟 청소년의 안전한 모임 설계 플랫폼"

이 프로젝트는 **React 프론트엔드**와 **Python 기반의 크롤링 및 GPT API 요약 기능**을 활용한, 청소년을 위한 정보 제공 플랫폼입니다.  
별도의 백엔드 서버는 존재하지 않으며, 웹 데이터를 수집하고 요약하는 간단한 Python 코드와 사용자 친화적인 인터페이스로 구성되어 있습니다.

---

## 📁 프로젝트 구조

```
babybaby/
├── frontend/               # React 기반 사용자 인터페이스
│   ├── public/
│   └── src/
│       ├── App.js
│       └── App.css
├── backend/                # 크롤링 및 요약 코드
│   ├── crwaling.ipynb      # 웹 크롤링용 Jupyter 노트북
│   └── app.py              # GPT API 기반 요약 실행 코드
├── README.md
└── ...
```

---

## 📦 필요 환경

- Node.js (v18 이상 권장)
- npm 또는 yarn
- Python 3.8 이상
- Jupyter Notebook
- OpenAI API Key (요약 기능에 필요)

---

## 🚀 실행 방법

### 🔹 1. 크롤링 및 요약 실행

```bash
# backend 디렉토리로 이동
cd backend

# 웹 크롤링 실행 (Jupyter Notebook 사용)
jupyter notebook crwaling.ipynb

# 요약 기능 실행 (OpenAI API 필요)
python app.py
```

⚠️ `app.py`를 실행하기 위해서는 OpenAI API Key가 필요합니다. `.env` 파일 또는 코드 내에 API 키를 설정해주세요.

---

### 🔹 2. 프론트엔드 실행 (React)

```bash
# frontend 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

🌐 실행 후 브라우저에서 `http://localhost:3000` 으로 접속하면 앱을 확인할 수 있습니다.

---

## ❗ 주의사항

- `node_modules/` 및 `build/` 폴더는 GitHub에 포함되어 있지 않습니다.  
  → `npm install`을 통해 필요한 패키지를 자동으로 설치할 수 있습니다.
- `.env` 파일에는 민감한 정보(API Key 등)가 포함될 수 있어 Git에 포함되지 않습니다.  
  → `.env.example` 파일을 제공하거나 직접 생성하여 설정하세요.

---

## 📝 라이선스

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.
