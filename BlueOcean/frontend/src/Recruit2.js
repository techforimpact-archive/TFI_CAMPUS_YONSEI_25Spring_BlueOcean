import React from "react";
import "./styles/Recruit2.css";

function Recruit2({ goBack, goToRecruit1, posts, onBoard, onSail, currentUser }) {
  return (
    <div className="recruit2-wrapper">
      <div className="recruit2-header">
        <div className="search-bar">
          <input type="text" placeholder="🔍 검색" />
        </div>
        <button className="recruit2-switch-btn" onClick={goToRecruit1}>
          선원모집
        </button>
      </div>
      <h2 className="recruit2-title">파랑해 🐳</h2>

      <div className="ticket-list1">
        {posts.map((post, idx) => (
          <div className="ticket-grid" key={idx}>
            <div className="grid-box top-left">Cruise Ticket</div>
            <div className="grid-box top-right">First Class</div>

            <div className="grid-box middle-left">
              <div className="ticket-subject">{post.title}</div>
              <div className="ticket-info">위치 : {post.location}</div>
              <div className="ticket-info">기간 : {post.date}</div>
              <div className="ticket-info">인원 : {post.capacity}</div>
              <div className="ticket-info1">⚓</div>
            </div>

            <div className="grid-box middle-right">
              <div className="ticket-passenger">
                탑승객: {post.passengers.length} / {post.capacity}
              </div>

              {/* 탑승/항해 버튼 */}
              <div className="button-group">
                <button
                  className="ticket-button1"
                  onClick={() => onBoard(idx, currentUser)}
                  disabled={
                    !post.passengers.includes(currentUser) &&
                    post.passengers.length >= parseInt(post.capacity, 10)
                  }
                >
                  {post.passengers.includes(currentUser) ? "취소" : "탑승"}
                </button>

                <button
                  className="ticket-button2"
                  onClick={() => onSail(post)}
                  disabled={post.passengers[0] !== currentUser}
                >
                  항해
                </button>
              </div>
            </div>
            <div className="grid-box bottom-left"></div>
            <div className="grid-box bottom-right"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recruit2;
