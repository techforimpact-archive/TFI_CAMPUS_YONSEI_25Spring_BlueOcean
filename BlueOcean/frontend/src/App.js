import React, { useState, useEffect } from "react";
import MainPage from "./MainPage";
import Logoscreen from "./Logoscreen";
import MyRoutinePage from "./MyRoutinePage";
import IslandPage from "./IslandPage";
import CertificationPage from "./CertificationPage";
import Recruit1 from "./Recruit1";
import Recruit2 from "./Recruit2";
import SwipeablePageContainer from "./SwipeablePageContainer";
import ProfilePage from "./ProfilePage";

function App() {
  const [page, setPage] = useState("logo");
  const [completedDates, setCompletedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [boardedIslands, setBoardedIslands] = useState([]); // 섬 리스트
  const [selectedIsland, setSelectedIsland] = useState(null); // 클릭한 섬
  const currentUser = localStorage.getItem("userName") || "익명참여자";

  // 모집글 목록 상태
  const [recruitPosts, setRecruitPosts] = useState([
    {
      title: "학교 밖 청소년 대상 설명회",
      location: "양천구",
      date: "7월 20일",
      capacity: "3",
      passengers: ["김지나"],
    },
    {
      title: "8월 검정고시 준비하기",
      location: "서대문구",
      date: "8월 5일",
      capacity: "4",
      passengers: ["김민아","김가현"],
    },
    {
      title: "학교 밖 청소년 대상 설명회",
      location: "동작구",
      date: "6월 25일",
      capacity: 3,
      passengers: ["박나현"],
    },
    {
      title: "해설 강연교사 함께하기",
      location: "강동구",
      date: "6월 20일",
      capacity: 2,
      passengers: ["정다인"],
    },
  ]);


  useEffect(() => {
    if (page === "logo") {
      const timer = setTimeout(() => {
        setPage("main");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [page]);

  // 페이지 이동 함수들
  const goToMain = () => setPage("main");
  const goToGoal = () => setPage("goal");
  const goToRoutine = () => setPage("routine");
  const goToIsland = (island = null) => {
    if (island) setSelectedIsland(island);
    setPage("island");
  };
  const goToRecruit1 = () => setPage("recruit1");
  const goToRecruit2 = () => setPage("recruit2");

  const goToCertification = (selectedDate) => {
    setCurrentDate(selectedDate);
    setPage("certification");
  };
  const [activityData, setActivityData] = useState({});
  const onCertificationComplete = (submittedData) => {
    const dateObj = new Date(submittedData.date);
    const dateStr = dateObj.toDateString();

    // 완료된 날짜 저장
    setCompletedDates(prev => [...prev, dateStr]);

    // 활동 정보 저장
    setActivityData(prev => ({
      ...prev,
      [dateStr]: submittedData
    }));

    setPage("island");
  };

  const goToProfile = () => setPage("profile");
  const onBoard = (index, name) => {
    setRecruitPosts((prev) => {
      return prev.map((post, i) => {
        if (i !== index) return post;

        const isOnBoard = post.passengers.includes(name);
        let updatedPassengers;

        if (isOnBoard) {
          // 탑승한 상태면 취소
          updatedPassengers = post.passengers.filter(p => p !== name);
        } else if (post.passengers.length < parseInt(post.capacity, 10)) {
          // 탑승 가능하면 추가
          updatedPassengers = [...post.passengers, name];
        } else {
          // 인원 초과 시 아무 변경 없음
          updatedPassengers = post.passengers;
        }

        return {
          ...post,
          passengers: updatedPassengers,
        };
      });
    });
  };



  const onSail = (post) => {
    setBoardedIslands((prev) => [...prev, post]); // 섬 리스트에 추가
    setPage("main"); // 메인 페이지로 이동 (선택적으로 IslandPage로 변경 가능)
  };

  // 렌더링 분기
  const renderPage = () => {
    switch (page) {
      case "main":
        return (
          <MainPage
            goToGoal={goToGoal}
            goToRoutine={goToRoutine}
            goToIsland={(island) => {
              setSelectedIsland(island);
              goToIsland();
            }}
            islands={boardedIslands}
            goToProfile={goToProfile}
          />
        );
      case "goal":
        return (
          <SwipeablePageContainer
            goToMain={goToMain}
            goToRecruit1={goToRecruit1}
            goToRecruit2={goToRecruit2}
          />
        );
      case "routine":
        return <MyRoutinePage goToMain={goToMain} />;
      case "island":
        return (
          <IslandPage
            goToMain={goToMain}
            goToCertification={goToCertification}
            completedDates={completedDates}
            island={selectedIsland}
            activityData={activityData}
          />

        );
      case "certification":
        return (
          <CertificationPage
            date={currentDate}
            onComplete={onCertificationComplete}
            goBack={goToIsland}
          />
        );
      case "recruit1":
        return (
          <Recruit1
            goBack={goToRecruit1}
            goToRecruit2={goToRecruit2}
            onSubmitPost={(newPost) =>
              setRecruitPosts([...recruitPosts, newPost])
            }
          />
        );
      case "recruit2":
        return (
          <Recruit2
            goBack={goToRecruit2}
            goToRecruit1={goToRecruit1}
            posts={recruitPosts}
            onBoard={onBoard}
            onSail={onSail}
            currentUser={currentUser}  // ← 추가
          />
        );
      case "profile":
        return <ProfilePage goToMain={goToMain} />;
      default:
        return <Logoscreen />;
    }
  };

  return (
    <div className="app-wrapper">
      {renderPage()}
      {page !== "logo" && page !== "island" && (
        <div className="tab-bar">
          <img src={`${process.env.PUBLIC_URL}/icon1.png`} className="tab-icon" onClick={goToMain} alt="main" />
          <img src={`${process.env.PUBLIC_URL}/icon2.png`} className="tab-icon" onClick={goToGoal} alt="goal" />
          <img src={`${process.env.PUBLIC_URL}/icon3.png`} className="tab-icon" onClick={goToRoutine} alt="routine" />
          <img src={`${process.env.PUBLIC_URL}/icon4.png`} className="tab-icon" onClick={goToProfile} alt="profile" />
        </div>
      )}
    </div>
  );
}

export default App;
