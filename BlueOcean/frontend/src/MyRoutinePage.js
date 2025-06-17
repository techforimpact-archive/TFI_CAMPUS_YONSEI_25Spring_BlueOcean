import React, { useState } from "react";
import "./styles/RoutinePage.css"; // 스타일은 따로 분리되어 있어야 함
import MapComponent from "./MapComponent";

const centers = [
  // 기존 마포/서대문/동작 센터들
  {
    name: "시립마포청소년센터",
    address: "서울 마포구 월드컵로 212",
    phone: "02-3153-5900",
    fee: "이용료: 무료",
    reservation: "예약: 네이버 예약",
    url: "https://naver.me/xaPg1Rca",
  },
  {
    name: "구립망원청소년문화센터",
    address: "서울 마포구 망원로 60",
    phone: "02-332-2541",
    fee: "이용료: 무료",
    reservation: "예약: 전화 문의 후 예약",
    url: "http://mwyouth.org/",
  },
  {
    name: "가재울청소년센터",
    address: "서울 서대문구 수색로 43",
    phone: "02-336-9240",
    fee: "이용료: 무료",
    reservation: "예약: 홈페이지 신청",
    url: "https://www.gjumyc.or.kr/",
  },
  {
    name: "시립서대문청소년센터",
    address: "서울 서대문구 연희로32길 129",
    phone: "02-334-0080",
    fee: "이용료: 무료",
    reservation: "예약: (개방 공간)",
    url: "https://www.fun1318.or.kr",
  },
  {
    name: "대방청소년센터",
    address: "서울 동작구 여의대방로20길 33",
    phone: "02-845-0924",
    fee: "이용료: 무료",
    reservation: "예약: 네이버 예약",
    url: "https://naver.me/5CW7dOvE",
  },
  {
    name: "사당청소년센터",
    address: "서울 동작구 사당로23길 57-7",
    phone: "02-595-0231",
    fee: "이용료: 무료(자율 이용) / 유료",
    reservation: "예약: 전화 문의",
    url: "http://www.sdyouth.net/",
  },
  {
    name: "동작청소년센터",
    address: "서울 동작구 상도로15바길 5",
    phone: "02-816-7971",
    fee: "이용료: 무료(자율 이용) / 유료",
    reservation: "예약: 전화 문의",
    url: "http://www.djyc.or.kr/",
  },
  {
    name: "시립보라매청소년센터",
    address: "서울 동작구 여의대방로20길 61",
    phone: "02-834-6411",
    fee: "이용료: 무료(청소년 전용 공간) / 유료",
    reservation: "예약: 홈페이지 신청",
    url: "http://www.boramyc.or.kr/",
  },

  // 양천구
  {
    name: "신월청소년문화센터",
    address: "서울 양천구 가로공원로 86 신월청소년문화쎈타",
    phone: "02-2604-7485",
    fee: "이용료: 무료",
    reservation: "예약: X (자율 이용)",
    url: "http://www.swyouth.or.kr/",
  },

  // 성북구
  {
    name: "시립성북청소년센터",
    address: "서울 성북구 한천로 660-9",
    phone: "02-3292-1318",
    fee: "이용료: 무료",
    reservation: "예약: 네이버 예약",
    url: "https://naver.me/FafJJLAa",
  },

  // 도봉구
  {
    name: "시립창동청소년센터",
    address: "서울 도봉구 노해로69길 132",
    phone: "02-950-9600",
    fee: "이용료: 무료",
    reservation: "예약: X (자율 이용)",
    url: "http://www.cdyouth.or.kr",
  },

  // 강동구
  {
    name: "시립강동청소년센터",
    address: "서울 강동구 아리수로93길 47",
    phone: "02-6252-1300",
    fee: "이용료: 무료",
    reservation: "예약: X (자율 이용)",
    url: "http://www.wagle.or.kr/",
  },

  // 은평구
  {
    name: "시립은평청소년센터",
    address: "서울 은평구 백련산로4길 16",
    phone: "070-7113-4959",
    fee: "이용료: 무료",
    reservation: "예약: 방문 신청",
    url: "https://www.woori1318.or.kr/",
  },

  // 중랑구
  {
    name: "시립중랑청소년센터",
    address: "서울 중랑구 용마산로 217",
    phone: "02-490-0226",
    fee: "이용료: 무료",
    reservation: "예약: X",
    url: "https://www.jjang.or.kr/",
  },
];

function MyRoutinePage({ goToMain }) {
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [filteredCenters, setFilteredCenters] = useState(centers);

  const handleOpenLink = (url) => {
    if (url.startsWith("tel:")) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  };

  const handleSearch = () => {
    const filtered = centers.filter((center) => {
      const addr = center.address;
      const matchesRegion = region && region !== "시/도 선택" ? addr.includes(region.replace("특별시", "").replace("광역시", "")) : true;
      const matchesSubRegion = subRegion && subRegion !== "시/군/구 선택" ? addr.includes(subRegion) : true;
      return matchesRegion && matchesSubRegion;
    });
    setFilteredCenters(filtered);
  };

  const handleReset = () => {
    setRegion("");
    setSubRegion("");
    setFilteredCenters(centers);
  };

  return (
    <div className="routine-wrapper">
      <div className="map-toggle-container">
        <button className="btn-map-toggle" onClick={() => setShowMap((prev) => !prev)}>
          {showMap ? "지도 닫기" : "지도 보기"}
        </button>
      </div>

      {showMap && <MapComponent locations={filteredCenters} />}

      <div className="routine-filter">
        <div className="filter-label">모임 지역</div>
        <div className="filter-select">
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option>시/도 선택</option>
            <option>서울특별시</option>
            <option>부산광역시</option>
          </select>
          <select value={subRegion} onChange={(e) => setSubRegion(e.target.value)}>
            <option>시/군/구 선택</option>
            <option>마포구</option>
            <option>서대문구</option>
            <option>동작구</option>
            <option>양천구</option>
            <option>성북구</option>
            <option>도봉구</option>
            <option>강동구</option>
            <option>은평구</option>
            <option>중랑구</option>
          </select>
        </div>
        <div className="filter-buttons">
          <button className="btn-search" onClick={handleSearch}>검색</button>
          <button className="btn-reset" onClick={handleReset}>초기화</button>
        </div>
      </div>

      <div className="routine-list">
        {filteredCenters.map((center, idx) => (
          <div className="routine-card" key={idx}>
            <div className="routine-card-header">
              <span className="center-name">{center.name}</span>
              <span className="center-phone">{center.phone}</span>
            </div>
            <div className="routine-card-body">
              <div>{center.fee}</div>
              <div>{center.reservation}</div>
            </div>
            <button className="routine-button" onClick={() => handleOpenLink(center.url)}>
              예약/홈페이지 이동
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRoutinePage;