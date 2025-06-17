import React, { useEffect } from "react";

function MapComponent({ locations }) {
  useEffect(() => {
    const waitForKakao = setInterval(() => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        clearInterval(waitForKakao);
        initializeMap();
      }
    }, 100);

    const initializeMap = () => {
      const { kakao } = window;
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
        level: 7,
      };
      const map = new kakao.maps.Map(container, options);
      const geocoder = new kakao.maps.services.Geocoder();

      locations.forEach((loc) => {
        geocoder.addressSearch(loc.address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new kakao.maps.Marker({
              map,
              position: coords,
            });
            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;">${loc.name}</div>`,
            });
            kakao.maps.event.addListener(marker, "click", () => {
              infowindow.open(map, marker);
            });
          } else {
            console.warn(`${loc.name}의 주소를 찾을 수 없습니다.`);
          }
        });
      });
    };

    return () => clearInterval(waitForKakao);
  }, [locations]);

  return <div id="map" style={{ width: "100%", height: "400px", marginTop: "20px" }} />;
}

export default MapComponent;
