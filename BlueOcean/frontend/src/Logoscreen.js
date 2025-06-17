import React from "react";
import "./styles/logoscreen.css";

function LogoScreen() {
  return (
    <div className="fullscreen-wrapper">
      <div className="logo-wrapper">
        <img src={process.env.PUBLIC_URL + "/logo1.png"} alt="Logo" className="logo-image" />
        <div className="logo-text1">우리들의 항해를 시작합니다.</div>
        <div className="logo-text">powered by KakaoImpact</div>
      </div>
    </div>
  );
}


export default LogoScreen;
