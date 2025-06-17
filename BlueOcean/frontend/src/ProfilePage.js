import React, { useState, useEffect } from "react";
import "./styles/ProfilePage.css";

function ProfilePage({ goToMain }) {
  const getInitialInterests = () => {
    const stored = localStorage.getItem("selectedInterests");
    return stored ? JSON.parse(stored) : [];
  };

  const getInitialName = () => localStorage.getItem("userName") || "";
  const getInitialAge = () => localStorage.getItem("userAge") || "";
  const getInitialBio = () => localStorage.getItem("userBio") || "";

  const [interests, setInterests] = useState(getInitialInterests);
  const [name, setName] = useState(getInitialName);
  const [age, setAge] = useState(getInitialAge);
  const [bio, setBio] = useState(getInitialBio);

  useEffect(() => {
    localStorage.setItem("selectedInterests", JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    localStorage.setItem("userName", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("userAge", age);
  }, [age]);

  useEffect(() => {
    localStorage.setItem("userBio", bio);
  }, [bio]);

  const allInterests = [
    "진로", "자격증", "취업", "입시", "멘토링", "심리", "상담",
    "문화예술", "공모", "숏폼", "디자인", "게임", "IT", "디자인",
    "대회", "해외교류", "창업"
  ];

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h2>내 프로필</h2>
        <input
          type="text"
          placeholder="이름"
          className="profile-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="나이"
          className="profile-input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <textarea
          placeholder="한 줄 소개"
          className="profile-textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div className="interest-section">
        <h3>관심있는 주제를 선택해 주세요</h3>
        <div className="interest-buttons">
          {allInterests.map((item) => (
            <button
              key={item}
              className={interests.includes(item) ? "selected" : ""}
              onClick={() => toggleInterest(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
