import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./styles/NoticePage.css";

function NoticePage({ goToMain, goToRecruitPost }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const categories = ["전체", "관심사 기반", "공모", "입시"];
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // ✅ 관심사 불러오기
  const stored = localStorage.getItem("selectedInterests");
  const selectedInterests = stored ? JSON.parse(stored) : [];

  useEffect(() => {
    const loadCSV = async (path, source) => {
      const res = await fetch(`${process.env.PUBLIC_URL}/${path}`);
      const text = await res.text();
      const parsed = Papa.parse(text, { header: true });
      return parsed.data.map(item => ({ ...item, source }));
    };

    Promise.all([
      loadCSV("1388_output/공지_요약완료_1388.csv", "1388_output"),
      loadCSV("allcon_output/공지_요약완료_allcon.csv", "allcon_output")
    ]).then(([data1, data2]) => {
      setData([...data1, ...data2]);
    });
  }, []);

  // ✅ 필터링 로직
  const filtered = data.filter((item) => {
    const title = item["제목"] || "";
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());

    const keywords = item["키워드"]
      ? item["키워드"].split(",").map(k => k.trim())
      : [];

    const matchesCategory =
      selectedCategory === "전체" ||
      (selectedCategory === "관심사 기반"
        ? selectedInterests.some(interest =>
            // 관심사가 키워드에 포함되거나 제목에 포함되면 true
            keywords.some(keyword => keyword.includes(interest)) ||
            title.includes(interest)
          )
        : keywords.some(keyword => keyword.includes(selectedCategory)));

    return matchesSearch && matchesCategory;
  });



  return (
    <div className="notice-wrapper">
      <div className="scroll-indicator">>>></div>
      <div className="notice-header">
        <input
          className="search-bar1"
          placeholder="검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="go-recruit-btn" onClick={goToRecruitPost}>
          →
        </button>
      </div>
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="notice-list">
        {filtered.map((item, idx) => (
          <li className="notice-card" key={idx}>
            <div className="image-box">
              <button
                className="btn-link"
                onClick={() => window.open(item["게시글 링크"], "_blank")}
              >
                <img
                  src={
                    item["이미지 저장 경로"] && item["이미지 저장 경로"].trim()
                      ? `${process.env.PUBLIC_URL}/${item["이미지 저장 경로"]}`
                      : `${process.env.PUBLIC_URL}/logo1.png`
                  }
                  alt="썸네일"
                  className="thumb"
                />
              </button>
            </div>
            <div className="info">
              <div className="title">{item["제목"]}</div>
              {item["요약"] && <div className="summary">{item["요약"]}</div>}
              {item["키워드"] && (
                <div className="keywords">
                  {item["키워드"].split(",").map((kw, i) => (
                    <span key={i} className="keyword-tag">#{kw.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoticePage;
