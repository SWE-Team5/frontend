import React, { useState } from "react";
import "../styles/Scrap.css";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import kingoMIcon from "../assets/images/kingo-M.png";
import { IoBookmarkSharp } from "react-icons/io5";
import sort from "../assets/images/sort.png";


function NotificationRelated() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState("main");

  // 전달받은 공지사항 데이터
  const selectedNotification = location.state?.notification || {};

  // 더미 관련 데이터
  const [relatedNotifications, setRelatedNotifications] = useState([
    { id: 1, title: "[긴급] 2024학년도 2학기 수강신청 관련 안내", isScrapped: false, url:""},
    { id: 2, title: "2024학년도 2학기 수강신청 안내", isScrapped: true, url:"https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=view&articleNo=122612&article.offset=0&articleLimit=10&srSearchVal=2024%ED%95%99%EB%85%84%EB%8F%84+%ED%95%99%EC%82%AC%EA%B3%BC%EC%A0%95+%EA%B2%A8%EC%9A%B8+%EA%B3%84%EC%A0%88%EC%88%98%EC%97%85+%EC%9A%B4%EC%98%81+%EC%95%88%EB%82%B4"},
    { id: 3, title: "2024학년도 2학기 수강철회 안내", isScrapped: false, url:""},
    { id: 4, title: "석박사통합과정 조기수료·이수포기 신청 안내", isScrapped: false, url:""},
  ]);

  const handleBookmarkClick = (id) => {
    setRelatedNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isScrapped: !notif.isScrapped } : notif
      )
    );
  };

  const [content, setContent] = useState("");

  // 공지 검색 처리
  const filteredNotices = relatedNotifications.filter((notice) =>
    notice.title.includes(content) // 제목에 검색어 포함 여부 확인
  );

  const [isAscending, setIsAscending] = useState(true); // 오름차순/내림차순 상태

  const handleSort = () => {
    const sorted = [...relatedNotifications].sort((a, b) => {
      if (isAscending) return b.title.localeCompare(a.title); // 내림차순
        return a.title.localeCompare(b.title); // 오름차순
        })
    
    setRelatedNotifications(sorted);
    setIsAscending(!isAscending); // 정렬 상태 토글
  };

  return (
    <div className="notification-app">
      {/* 상단 헤더 */}
      <Header page="Scrap" detail="detail" />

      {/* 관련 공지사항 */}
      <div className="main-content">
         {/* Sidebar */}
         <aside className="flex-none sidebar">
          <div className="kingo-logo">
            <img src={kingoMIcon} width={"50px"} height={"75px"} alt="KINGO-M"/>
            <div className="iconTitle font-bold text-l relative bottom-3">KINGO-M</div>
          </div>
          <ul>
            <li 
                className={`menu-item ${currentView === 'main' ? 'active' : ''}`}
                onClick={() => {setCurrentView('main'); navigate("/scrapSchedule")}}
            >
                알림 공지
            </li>
            <li 
                className={`menu-item ${currentView === 'scrap' ? 'active' : ''}`}
                onClick={() => {setCurrentView('scrap'); navigate("/scrapNotice")}}
            >
                스크랩 공지
            </li>
            {/* <li 
                className={`menu-item ${currentView === 'trash' ? 'active' : ''}`}
                onClick={() => setCurrentView('trash')}
            >
                휴지통
            </li> */}
          </ul>
        </aside>

      <div className="related-notifications p-4">

        <div className="notifications-header flex-col gap-1.5 w-full" style={{marginBottom:"0px"}}>
            {/*<h2>학사과정 조기졸업/석사과정 수업연한 단축/
            석박사통합과정 조기수료·이수포기 신청</h2>*/}
            <h2 className="w-full bolder" style={{textAlign:"left"}}>{selectedNotification.title || "선택된 공지사항 없음"}</h2>
            <div className="search-bar w-full mb-0">
              <input
                type="text"
                className="search-input"
                placeholder="검색어를 입력하세요"
                value={content} onChange={(e)=>setContent(e.target.value)}
              />
              <button className="search-button">검색</button>
            </div>
        
        </div>

        <div className="float-start mb-2 sub_func w-full">
            <div className=" text-xs  pt-1 cursor-pointer" onClick={handleSort}>
                <span className="inline-block float-left" >정렬</span>
                <img className="inline-block float-left" src={sort} width="17px" height="17px" />
            </div>
        </div>


        <ul className="notification-list">
          {(filteredNotices ? filteredNotices : relatedNotifications).map((notif) => (
            <li key={notif.id} className="notification-item">
              <div className="notification-title bg-inherit"
                onClick={()=>navigate("/scrapNotice/detail", {state:{title: notif.title, noticeURL: notif.url, page:"scrapNotice"}})}
              >{notif.title}</div>
              <div
                className={`scrap-notification-icon bg-inherit ${
                  notif.isScrapped ? "active2" : ""
                }`}
                onClick={() => handleBookmarkClick(notif.id)}
              >
                <IoBookmarkSharp className="bg-inherit"/>
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
