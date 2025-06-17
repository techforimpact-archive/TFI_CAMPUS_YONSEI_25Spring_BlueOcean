import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./styles/Recruit1.css";

const allowedCenters = [
  "시립마포청소년센터",
  "구립망원청소년문화센터",
  "가재울청소년센터",
  "시립서대문청소년센터",
  "대방청소년센터",
  "사당청소년센터",
  "동작청소년센터",
  "시립보라매청소년센터",
  "신월청소년문화센터",
  "시립성북청소년센터",
  "시립강동청소년센터",
  "시립은평청소년센터",
  "시립중랑청소년센터"
];

function Recruit1({ goToRecruit2, onSubmitPost }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [capacity, setCapacity] = useState("");

  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [allowedTitles, setAllowedTitles] = useState([]);

  const [titleError, setTitleError] = useState("");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    const loadTitlesFromCSV = async (path) => {
      const res = await fetch(`${process.env.PUBLIC_URL}/${path}`);
      const text = await res.text();
      const parsed = Papa.parse(text, { header: true });
      return parsed.data.map((row) => row["제목"]).filter(Boolean);
    };

    Promise.all([
      loadTitlesFromCSV("1388_output/공지_요약완료_1388.csv"),
      loadTitlesFromCSV("allcon_output/공지_요약완료_allcon.csv")
    ]).then(([titles1, titles2]) => {
      setAllowedTitles([...titles1, ...titles2]);
    });
  }, []);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    setTitleError("");
    setTitleSuggestions(allowedTitles.filter((t) => t.includes(val)));
  };

  const handleLocationChange = (e) => {
    const val = e.target.value;
    setLocation(val);
    setLocationError("");
    setLocationSuggestions(allowedCenters.filter((c) => c.includes(val)));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value); // 입력 그대로 유지
  };

  const formatDate = (input) => {
    const trimmed = input.trim();

    // YYYY-MM-DD or YYYY.MM.DD or YYYY/MM/DD
    const yearMonthDayRegex = /^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})$/;

    // YY-MM-DD or YY.MM.DD or YY/MM/DD
    const shortYearMonthDayRegex = /^(\d{2})[.\-/](\d{1,2})[.\-/](\d{1,2})$/;

    // MM.DD or M.D
    const monthDayRegex = /^(\d{1,2})[.\-/](\d{1,2})$/;

    if (yearMonthDayRegex.test(trimmed)) {
      const [, , month, day] = trimmed.match(yearMonthDayRegex);
      return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
    } else if (shortYearMonthDayRegex.test(trimmed)) {
      const [, , month, day] = trimmed.match(shortYearMonthDayRegex);
      return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
    } else if (monthDayRegex.test(trimmed)) {
      const [, month, day] = trimmed.match(monthDayRegex);
      return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
    }

    return trimmed;
  };


  const handleSubmit = () => {
    let valid = true;

    if (!allowedTitles.includes(title)) {
      setTitleError("제공된 제목 중에서 선택해주세요.");
      valid = false;
    }

    if (!allowedCenters.includes(location)) {
      setLocationError("정확한 청소년센터를 선택해주세요.");
      valid = false;
    }

    if (!valid) return;

    const newPost = {
      title,
      target: "청소년",
      date: formatDate(date), // 여기서 날짜 포맷
      location,
      content,
      capacity: parseInt(capacity, 10),
      passengers: [],
    };

    onSubmitPost(newPost);
    goToRecruit2();
  };

  return (
    <div className="fullscreen-wrapper2">
      <h2 className="title-text">가치해</h2>
      <div className="recruitment-list-wrapper1">
        <div className="recruitment-form">
          <h3 className="form-title">선원 모집하기</h3>
          <form>
            <label>제목</label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={handleTitleChange}
            />
            {titleSuggestions.length > 0 && (
              <ul className="suggestion-list">
                {titleSuggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setTitle(s);
                      setTitleSuggestions([]);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
            {titleError && <div className="error-message">{titleError}</div>}

            <label>날짜</label>
            <input
              type="text"
              className="input-field"
              value={date}
              onChange={handleDateChange}
              placeholder="예: 25.06.30"
            />


            <label>위치</label>
            <input
              type="text"
              className="input-field"
              value={location}
              onChange={handleLocationChange}
            />
            {locationSuggestions.length > 0 && (
              <ul className="suggestion-list">
                {locationSuggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setLocation(s);
                      setLocationSuggestions([]);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
            {locationError && (
              <div className="error-message">{locationError}</div>
            )}

            <label>내용</label>
            <textarea
              className="input-field large-textarea"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <label>인원</label>
            <input
              type="text"
              className="input-field"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </form>

          <div className="form-buttons">
            <button className="cancel-button" onClick={goToRecruit2}>
              모집 취소
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              모집 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruit1;
