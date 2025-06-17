import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./styles/CustomCalendar.css";
import "./styles/IslandPage.css";

function IslandPage({ island, goToMain, goToCertification, completedDates, activityData }) {
  const [date, setDate] = useState(new Date());
  const [selectedActivity, setSelectedActivity] = useState(null);

  const parseKoreanDate = (dateStr) => {
    try {
      const [monthStr, dayStr] = dateStr.replace("월", "").replace("일", "").split(" ");
      const now = new Date();
      const year = now.getFullYear();
      const month = parseInt(monthStr, 10) - 1;
      const day = parseInt(dayStr, 10);
      return new Date(year, month, day);
    } catch {
      return null;
    }
  };

  const certifyToday = () => {
    goToCertification(date);
  };


  const handleDateClick = (value) => {
    setDate(value);
    const selectedDate = value.toDateString();
    const data = activityData[selectedDate];
    setSelectedActivity(data || null); // 데이터가 없으면 null
  };


  const [meetings, setMeetings] = useState(() => {
    const parsed = island?.date ? parseKoreanDate(island.date) : null;
    return parsed ? [parsed.toDateString()] : [];
  });

  if (!island) return <div>섬 정보가 없습니다.</div>;

  const { title, target, date: duration, capacity, passengers } = island;

  const registerMeeting = () => {
    const dayStr = date.toDateString();
    if (!meetings.includes(dayStr)) {
      setMeetings([...meetings, dayStr]);
    }
  };

  const today = new Date().toDateString();
  const isTodayMeeting = meetings.includes(today);

  return (
    <div className="island-wrapper">
      <h2 className="island-title">{title}</h2>

      <div className="island-info-box">
        <p><strong>대상:</strong> {target}</p>
        <p><strong>기간:</strong> {duration}</p>
        <p><strong>정원:</strong> {capacity}</p>
        <p><strong>탑승자:</strong> {passengers?.join(", ")}</p>
      </div>

      <div className="island-calendar-box">
        <div className="island-calendar-title">모임 항해 일지</div>
        <div className="island-calendar-body">
          <Calendar
            onChange={setDate}
            value={date}
            locale="ko-KR"
            calendarType="gregory"
            formatDay={(locale, date) => date.getDate().toString()}
            onClickDay={handleDateClick}
            tileClassName={({ date }) => {
              const dayStr = date.toDateString();
              if (completedDates.includes(dayStr)) return 'meeting-done';
              if (meetings.includes(dayStr)) return 'meeting-day';
              return null;
            }}
          />
        </div>
      </div>

      <div className="island-bottom-buttons">
        <button
          className={`island-action-btn ${!isTodayMeeting ? 'disabled' : ''}`}
          disabled={!isTodayMeeting}
          onClick={certifyToday}
        >
          활동 인증하기
        </button>
        <button className="island-action-btn" onClick={registerMeeting}>
          모임 일정 등록
        </button>
      </div>
      {selectedActivity && (
        <div className="activity-info-box">
          <h3>활동 인증 정보</h3>
          <p><strong>제목:</strong> {selectedActivity.title}</p>
          <p><strong>내용:</strong> {selectedActivity.content}</p>
          <p><strong>공개여부:</strong> {selectedActivity.isPublic ? "공개" : "비공개"}</p>
        </div>
      )}


      <div className="tab-bar">
        <img src={`${process.env.PUBLIC_URL}/icon1.png`} className="tab-icon" onClick={goToMain} alt="main" />
        <img src={`${process.env.PUBLIC_URL}/icon2.png`} className="tab-icon" alt="goal" />
        <img src={`${process.env.PUBLIC_URL}/icon3.png`} className="tab-icon" alt="routine" />
        <img src={`${process.env.PUBLIC_URL}/icon4.png`} className="tab-icon" alt="etc" />
      </div>
    </div>
  );
}

export default IslandPage;
