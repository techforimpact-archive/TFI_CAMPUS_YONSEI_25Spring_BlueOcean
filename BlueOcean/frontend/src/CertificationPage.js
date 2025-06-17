import React, { useState } from "react";
import "./styles/CertificationPage.css";

function CertificationPage({ date, onComplete, goBack }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // ✅ 항상 Date 객체로 변환
  const parsedDate = date instanceof Date ? date : new Date(date);

  const handleSubmit = () => {
    if (!title || !content) {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    const submittedData = {
    date: parsedDate.toDateString(), // 이 줄 추가
    title,
    content,
    isPublic,
  };


    onComplete(submittedData);
  };

  return (
    <div className="certification-wrapper">
      <div className="top-bar">
        <h2 className="page-title"><strong>환경 공모전 참여</strong></h2>
      </div>

      <div className="certification-card">
        <div className="card-title">활동 인증하기</div>

        <div className="field">
          <label>제목</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="field">
          <label>날짜</label>
          <input type="text" value={parsedDate.toLocaleDateString()} disabled />
        </div>

        <div className="field">
          <label>내용</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} />
        </div>

        <div className="field">
          <label>첨부</label>
          <div className="upload-box">
            <input type="file" />
          </div>
        </div>

        <div className="field">
          <label>공개</label>
          <div className="toggle-buttons">
            <button
              className={isPublic ? "selected" : ""}
              onClick={() => setIsPublic(true)}
            >
              공개
            </button>
            <button
              className={!isPublic ? "selected" : ""}
              onClick={() => setIsPublic(false)}
            >
              비공개
            </button>
          </div>
        </div>
      </div>

      <div className="bottom-buttons">
        <button onClick={goBack}>취소</button>
        <button onClick={handleSubmit}>완료</button>
      </div>
    </div>
  );
}

export default CertificationPage;
