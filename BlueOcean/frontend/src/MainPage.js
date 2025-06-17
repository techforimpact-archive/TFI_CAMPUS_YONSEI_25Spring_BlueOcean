import React from "react";
import "./styles/MainPage.css";


function MainPage({ goToGoal, goToRoutine, goToIsland, goToProfile, islands}) {
  return (
    <div className="main-wrapper">
      <div className="main-title">
        <div className="main-title-text-wrapper">
          <img src={`${process.env.PUBLIC_URL}/ship.png`} alt="crown" className="main-title-icon" />
          <div className="main-title-text">파랑해</div>
        </div>
        <div className="main-subtitle-text">당신의 행복이 펼쳐지는 바다</div>
      </div>

      <div className="main-page">
        {/* ✅ 바다 배경 */}
        <div className="ocean-background" />
        {/* 종이배 */}
        {/* ✅ 배 중심에 ripple 여러 겹 */}
        <div className="ripple-container">
          <div className="ripple ripple1" />
          <div className="ripple ripple2" />
          <div className="ripple ripple3" />
          <img className="boat" src={`${process.env.PUBLIC_URL}/ship.png`} alt="boat" onClick={goToGoal} />
        </div>

        {/* 섬 리스트 렌더링 (겹치지 않게 배치) */}
        {islands.map((island, idx) => {
          let top, left;

          if (idx % 3 === 0) {
            // 위치 그룹 A (왼쪽 상단)
            const row = idx % 5;
            const col = idx % 4;
            top = 40 + row * 12;
            left = 20 + col * 15;
          } else if (idx % 3 === 1) {
            // 위치 그룹 B (오른쪽 중단)
            const row = idx % 6;
            const col = idx % 5;
            top = 60 + row * 10;
            left = 40 + col * 12;
          } else {
            // 위치 그룹 C (가운데 아래)
            const row = idx % 4;
            const col = idx % 3;
            top = 10 + row * 10;
            left = 40 + col * 18;
          }


          return (
            <div
              key={idx}
              className="island"
              onClick={() => goToIsland(island)}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -50%)",
                position: "absolute",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <img src={`${process.env.PUBLIC_URL}/island1.png`} alt="island" className="island-img" />
              <div className="island-label">{island.title}</div>
            </div>
          );
        })}

        {/* 하단 탭바 */}
        <div className="tab-bar">
          <img src="/icon1.png" alt="goal" className="tab-icon" onClick={goToGoal} />
          <img src="/icon2.png" alt="main" className="tab-icon" />
          <img src="/icon3.png" alt="routine" className="tab-icon" onClick={goToRoutine} />
          <img src="/icon4.png" alt="profile" className="tab-icon" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
