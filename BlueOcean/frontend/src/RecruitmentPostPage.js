import React, { useState } from "react";
import "./styles/RecruitmentPostPage.css";

const initialPosts = [
  {
    title: "학교 밖 청소년 대상 설명회",
    location: "동작구",
    tags: "진로탐색",
    name: "김정민",
    capacity: 3,
    passengers: ["카리나"]
  },
  {
    title: "해설 강연교사 함께하기",
    location: "강동구",
    tags: "자원봉사",
    name: "황보민",
    capacity: 2,
    passengers: []
  },
];

function RecruitmentPostPage({ goToRecruit1, goToRecruit2, goBackToNotice }) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [posts, setPosts] = useState(initialPosts);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (deltaX < -30) goBackToNotice();
  };

  const handleJoin = (index) => {
    setPosts((prev) => {
      const updated = [...prev];
      const post = updated[index];

      if (
        post.passengers.length < post.capacity &&
        !post.passengers.includes("익명참여자")
      ) {
        post.passengers = [...post.passengers, "익명참여자"];
      }

      return updated;
    });
  };

  return (
    <div className="fullscreen-wrapper1">
      <div
        className="recruitment-list-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slider-toggle-wrapper">
          <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="slider-toggle-knob"></div>
          </div>
        </div>

        <div className="recruitment-scroll-area">
          <div className="header-background">
            <img
              className="boat-image"
              src={`${process.env.PUBLIC_URL}/paper-boat.png`}
              alt="boat"
            />
            <div className="tab-buttons">
              <button className="tab active" onClick={goToRecruit1}>
                선원 모집
              </button>
              <button className="tab" onClick={goToRecruit2}>
                항해 시작
              </button>
            </div>
          </div>

          <div className="recommend-section">
            <h2 className="recommend-title">추천</h2>

            {posts.map((post, index) => (
              <div className="ticket-grid" key={index}>
                <div className="grid-box top-left">Cruise Ticket</div>
                <div className="grid-box top-right">First Class</div>

                <div className="grid-box middle-left">
                  <div className="ticket-subject">{post.title}</div>
                  <div className="ticket-info">장소 : {post.location}</div>
                  <div className="ticket-info">Tag : {post.tags}</div>
                  <div className="ticket-info">
                    탑승객: {post.passengers.length} / {post.capacity}
                  </div>
                  <div className="ticket-info1">⚓</div>
                </div>

                <div className="grid-box middle-right">
                  {post.passengers.length >= post.capacity ? (
                    <div className="full-label">모집 마감</div>
                  ) : (
                    <button
                      onClick={() => handleJoin(index)}
                      disabled={post.passengers.includes("익명참여자")}
                      className="ticket-button"
                    >
                      참여하기
                    </button>
                  )}
                </div>

                <div className="grid-box bottom-left"></div>
                <div className="grid-box bottom-right"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitmentPostPage;
