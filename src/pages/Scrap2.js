import React, { useState } from "react";
import "../styles/Scrap.css";
import Header from "../components/Header";

function ScrapNotifications() {
  const [scrappedNotifications, setScrappedNotifications] = useState([
    {
      id: 1,
      title: "2024학년도 2학기 수강신청 공지사항",
      date: "2024-02-15",
      isBookMarked: true
    },
    {
      id: 2,
      title: "2024학년도 2학기 수강철회 안내",
      date: "2024-02-14",
      isBookMarked: true
    },
  ]);

    const handleBookmarkClick = (id) => {
    setScrappedNotifications((prev) =>
      prev.filter((notif) => notif.id !== id)
    );
  };

  

  return (
    <div className="notification-app">
      <Header page="Scrap" />

      {/* Main Content */}
      <div className="main-content">
        <aside className="sidebar">
          <div className="kingo-logo">
            <img src="/kingo-m-logo.png" alt="KINGO-M" />
          </div>
          <ul>
            <li className="menu-item">알림 공지</li>
            <li className="menu-item active">스크랩 공지</li>
            <li className="menu-item">휴지통</li>
          </ul>
        </aside>

        <div className="notifications">
          <div className="notifications-header">
            <h2>스크랩 공지</h2>
          </div>

          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
            />
            <button className="search-button">검색</button>
          </div>


          <ul className="scrap-notification-list">
            {scrappedNotifications.map((notif) => (
              <li key={notif.id} className="scrap-notification-item relative">
                {/*<div className="flex items-center justify-between">*/}
                <div className="scrap-notificaton-title">{notif.title}</div>
                    <div
                        className={`notification-bookmark ${
                            notif.isBookmarked ? "gray" : ""
                          }`}
                          onClick={() => handleBookmarkClick(notif.id)}
                        >🔖
                    </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ScrapNotifications;
