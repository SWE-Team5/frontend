import React, { useState } from 'react';

function NotificationApp() {
  const [currentView, setCurrentView] = useState('main');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [scrappedNotifications, setScrappedNotifications] = useState([]);
  const [starredNotifications, setStarredNotifications] = useState([]);

  const handleStarClick = (notification, e) => {
    e.stopPropagation();
    if (starredNotifications.some(n => n.id === notification.id)) {
      setStarredNotifications(starredNotifications.filter(n => n.id !== notification.id));
    } else {
      setStarredNotifications([...starredNotifications, notification]);
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedCategory(notification);
    setCurrentView('related');
  };

  const handleRelatedClick = (notification) => {
    setSelectedNotification(notification);
    setCurrentView('detail');
  };

  const handleBookmarkClick = (notification) => {
    if (!scrappedNotifications.some(n => n.id === notification.id)) {
      setScrappedNotifications([...scrappedNotifications, notification]);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 bg-gray-50">
        <div className="max-w-2xl mx-auto bg-white min-h-screen">
          {currentView === 'main' && (
            <MainView 
              onNotificationClick={handleNotificationClick} 
              onStarClick={handleStarClick}
              starredNotifications={starredNotifications}
            />
          )}
          {currentView === 'related' && (
            <RelatedNotificationsView 
              category={selectedCategory}
              onNotificationClick={handleRelatedClick}
              onBack={() => setCurrentView('main')}
            />
          )}
          {currentView === 'detail' && (
            <DetailView 
              notification={selectedNotification}
              onBack={() => setCurrentView('related')}
              onBookmark={handleBookmarkClick}
            />
          )}
          {currentView === 'scrap' && (
            <ScrapView notifications={scrappedNotifications} />
          )}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ currentView, setCurrentView }) {
  return (
    <div className="w-64 bg-white border-r min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">KINGO-M</h1>
        <ul className="space-y-2">
          <li 
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentView === 'main' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
            }`}
            onClick={() => setCurrentView('main')}
          >
            알림 공지
          </li>
          <li 
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              currentView === 'scrap' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
            }`}
            onClick={() => setCurrentView('scrap')}
          >
            스크랩 공지
          </li>
          <li className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
            휴지통
          </li>
        </ul>
      </div>
    </div>
  );
}

function MainView({ onNotificationClick, onStarClick, starredNotifications }) {
  const notifications = [
    { 
      id: 1, 
      title: "2024학년도 2학기 수강신청 공지사항",
      date: "2024-02-15",
      isNew: true
    },
    {
      id: 2,
      title: "학사 일정 안내",
      date: "2024-02-14",
      isNew: false
    }
  ];

  return (
    <div>
      <div className="flex items-center p-4 border-b">
        <span className="text-lg">나의 공지함</span>
      </div>
      <div className="p-4">
        <SearchBar />
        <div className="mt-4 space-y-4">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className="flex justify-between items-center p-4 border rounded-lg cursor-pointer"
              onClick={() => onNotificationClick(notification)}
            >
              <div className="flex-grow">
                <div className="flex items-center">
                  <span className="font-medium">{notification.title}</span>
                  {notification.isNew && (
                    <span className="ml-2 text-red-500 text-xs">new</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{notification.date}</div>
              </div>
              <button
                onClick={(e) => onStarClick(notification, e)}
                className={`ml-4 text-2xl ${
                  starredNotifications.some(n => n.id === notification.id)
                    ? 'text-yellow-400'
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                ★
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedNotificationsView({ category, onNotificationClick, onBack }) {
  const relatedNotifications = [
    {
      id: 1,
      title: "2024-2 수강신청 일정 안내",
      date: "2024-02-15",
      content: "수강신청 일정을 안내드립니다..."
    },
    {
      id: 2,
      title: "2024-2 수강신청 유의사항",
      date: "2024-02-15",
      content: "수강신청 시 유의사항..."
    }
  ];

  return (
    <div>
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="mr-3">←</button>
        <span className="text-lg">나의 공지함</span>
      </div>
      <div className="p-4 space-y-4">
        {relatedNotifications.map(notification => (
          <div 
            key={notification.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => onNotificationClick(notification)}
          >
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailView({ notification, onBack, onBookmark }) {
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3">←</button>
          <span className="text-lg">나의 공지함</span>
        </div>
        <button 
          onClick={() => onBookmark(notification)}
          className="px-4 py-1 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50"
        >
          북마크
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{notification?.title}</h2>
        <div className="text-gray-600 mb-4">작성일: {notification?.date}</div>
        <div className="whitespace-pre-line">
          {notification?.content}
        </div>
      </div>
    </div>
  );
}

function ScrapView({ notifications }) {
  return (
    <div>
      <div className="flex items-center p-4 border-b">
        <span className="text-lg">스크랩 공지</span>
      </div>
      <div className="p-4 space-y-4">
        {notifications.map(notification => (
          <div key={notification.id} className="p-4 border rounded-lg">
            <h3 className="font-medium">{notification.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            스크랩된 공지사항이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
        검색
      </button>
    </div>
  );
}

export default NotificationApp;