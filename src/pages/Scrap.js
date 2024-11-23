import React, { useState } from "react";
import "../styles/Scrap.css";
import Header from "../components/Header";

function NotificationApp() {
  const [currentView, setCurrentView] = useState("main");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "학사과정 조기졸업/석사과정 수업연한 단축/석박사통합과정 조기수료·이수포기 신청",
      isNew: true,
      isStarred: false,
    },
    {
      id: 2,
      title: "학사과정 학점 포기 신청",
      isNew: false,
      isStarred: false,
    },
    {
      id: 3,
      title: "2024학년도 2학기 수강신청",
      isNew: true,
      isStarred: true,
    },
    {
      id: 4,
      title: "2024학년도 2학기 수강철회 안내",
      isNew: false,
      isStarred: false,
    },
    {
      id: 5,
      title: "인공지능",
      isNew: false,
      isStarred: true,
    },
  ]);

  const handleStarClick = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isStarred: !notif.isStarred } : notif
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isNew: false }))
    );
  };

  const handleSort = () => {
    setNotifications((prev) =>
      [...prev].sort((a, b) => (a.title > b.title ? 1 : -1))
    );
  };

  return (
    <div className="notification-app">
      <Header page="Scrap" />

      {/* Header 
      <header className="header">
        <button className="back-button">←</button>
        <h1 className="header-title">나의 공지함</h1>
      </header> */}

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="kingo-logo">
            <img src="/kingo-m-logo.png" alt="KINGO-M" />
          </div>
          <ul>
            <li 
                className={`menu-item ${currentView === 'main' ? 'active' : ''}`}
                onClick={() => setCurrentView('main')}
            >
                알림 공지
            </li>
            <li 
                className={`menu-item ${currentView === 'scrap' ? 'active' : ''}`}
                onClick={() => setCurrentView('scrap')}
            >
                스크랩 공지
            </li>
            <li 
                className={`menu-item ${currentView === 'trash' ? 'active' : ''}`}
                onClick={() => setCurrentView('trash')}
            >
                휴지통
            </li>
          </ul>
        </aside>

        {/* Notifications */}
        <div className="notifications">
          <div className="notifications-header">
            <h2>알림 공지</h2>
            <div className="notifications-actions">
              <button onClick={handleSort} className="sort-button">
                정렬
              </button>
              <button onClick={handleMarkAllRead} className="mark-all-read">
                Mark All Read
              </button>
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
            />
            <button className="search-button">검색</button>
          </div>

          <ul className="notification-list">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`notification-item ${
                  notif.isNew ? "unread-notification" : "read-notification"
                }`}
              >
                <div className="notification-title">{notif.title}</div>
                    
                {notif.isNew && (
                    <span className='new-label'>new</span>
                )}
                
                <div
                  className={`notification-icon ${
                    notif.isStarred ? "active" : ""
                  }`}
                  onClick={() => handleStarClick(notif.id)}
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

export default NotificationApp;
