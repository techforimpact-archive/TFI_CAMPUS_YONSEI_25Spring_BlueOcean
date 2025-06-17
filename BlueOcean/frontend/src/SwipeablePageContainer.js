// src/SwipeablePageContainer.js
import React, { useState } from "react";
import NoticePage from "./NoticePage";
import RecruitmentPostPage from "./RecruitmentPostPage";
import "./styles/SwipeablePageContainer.css";

function SwipeablePageContainer({ goToMain, goToRecruit1, goToRecruit2 }) {
  const [currentPage, setCurrentPage] = useState("notice");
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 50) setCurrentPage("notice");
    else if (deltaX < -50) setCurrentPage("recruit")
  };

  return (
    <div
      className="swipe-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {currentPage === "notice" ? (
        <NoticePage
          goToMain={goToMain}
          goToRecruitPost={() => setCurrentPage("recruit")}
        />
      ) : (
        <RecruitmentPostPage
          goToRecruit1={goToRecruit1}
          goToRecruit2={goToRecruit2}
        />
      )}
    </div>
  );
}

export default SwipeablePageContainer;
