import React, { useState } from "react";
import "../styles/Scrap.css";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function NotificationRelated() {
  const navigate = useNavigate();
  const location = useLocation();
  

  // 전달받은 공지사항 데이터
  const selectedNotification = location.state?.notification || {};

  // 더미 관련 데이터
  const [relatedNotifications, setRelatedNotifications] = useState([
    { id: 1, title: "[긴급] 2024학년도 2학기 수강신청 관련 안내", isStarred: false },
    { id: 2, title: "2024학년도 2학기 수강신청 안내", isStarred: true },
    { id: 3, title: "2024학년도 2학기 수강철회 안내", isStarred: false },
    { id: 4, title: "석박사통합과정 조기수료·이수포기 신청 안내", isStarred: false },
  ]);

  const handleBookmarkClick = (id) => {
    setRelatedNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isStarred: !notif.isStarred } : notif
      )
    );
  };

  return (
    <div className="notification-app">
      {/* 상단 헤더 */}
      <Header page="Scrap" />

      {/* 관련 공지사항 */}
      <div className="main-content">
        <aside className="sidebar">
          <div className="kingo-logo">
            <img src="/kingo-m-logo.png" alt="KINGO-M" />
          </div>
          <ul>
            <li className="menu-item">알림 <br/>공지</li>
            <li className="menu-item active">스크랩 <br/>공지</li>
            <li className="menu-item">휴지통</li>
          </ul>
        </aside>


      <div className="related-notifications">

        <div className="notifications-header">
            {/*<h2>학사과정 조기졸업/석사과정 수업연한 단축/
            석박사통합과정 조기수료·이수포기 신청</h2>*/}
            <h2>{selectedNotification.title || "선택된 공지사항 없음"}</h2>
        </div>

        <div className="search-bar"></div>

        <ul className="notification-list">
          {relatedNotifications.map((notif) => (
            <li key={notif.id} className="notification-item">
              <div className="notification-title">{notif.title}</div>
              <div
                className={`notification-icon ${
                  notif.isStarred ? "active" : ""
                }`}
                onClick={() => handleBookmarkClick(notif.id)}
              >
                ★
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default NotificationRelated;
