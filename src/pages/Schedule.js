import Header from "../components/Header";
import "../styles/Schedule.css";

import { FaCircleCheck } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

import table from "../assets/images/table.png";
import list from "../assets/images/list.png";

import {useState, useEffect, useMemo} from "react";

import React, { Component } from 'react';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';


function Schedule(){

    // const [type, setType] = useState('Calendar');
    const [currentViewRange, setCurrentViewRange] = useState({ start: null, end: null });
    const navigate = useNavigate();
    const location = useLocation();



    const [todos, setTodos] = useState([
        {id:1, title: '2024학년도 2학기 개시일' , start:'2024-03-01', notice: [], new: 0},
        {id:2, title: '2학기 개강', start:'2024-03-04', notice:[], new: 0},
        {id:3, title: '학사과정 조기졸업/석사과정 수업연한 단축/석박사통합과정 조기수료·이수포기 신청', start:'2024-03-04', end:'2024-03-07',
          notice: [{title : '2024년 여름 전체 학위수여식 참석(신청) 안내(졸업생/축하객, 신청일: 학사 8.13./석사 8.14.)', read : 1, url : ""},
            {title:'2024학년도 2학기 학사과정 조기졸업 신청 안내', read : 0, url : "https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=view&articleNo=119786&article.offset=0&articleLimit=10&srSearchVal=2024%EB%85%84+%EC%97%AC%EB%A6%84+%EC%A0%84%EC%B2%B4+%ED%95%99%EC%9C%84%EC%88%98%EC%97%AC%EC%8B%9D+%EC%B0%B8%EC%84%9D%28%EC%8B%A0%EC%B2%AD%29+%EC%95%88%EB%82%B4"},
            {title:'2024년 금신사랑장학생 선발 안내', read : 1, url : ""},
          ]
        , new:1},
        {id:4, title: '대학원과정 논문제출자격시험 응시(면제) 신청', start:'2024-03-04', end:'2024-03-07',
          notice: [], new:0
        },
    ]);

      // 날짜가 겹치는 이벤트들을 그룹화하는 함수
      const groupEventsByDate = (events) => {
        const groupedEvents = {};
        const displayedDateRanges = new Set(); // 이미 출력된 날짜 범위를 저장
    
        events.forEach((event) => {
          const startDate = new Date(event.start);
          const endDate = new Date(event.end || event.start);
    
          const startDateString = startDate.toLocaleDateString('ko-KR');
          const endDateString = endDate.toLocaleDateString('ko-KR');
    
          const dateRangeKey = `${startDateString} - ${endDateString}`;
    
          if (!groupedEvents[dateRangeKey]) {
            groupedEvents[dateRangeKey] = { events: [], isFirstOutput: true }; // 새로운 그룹 생성
          }
    
          groupedEvents[dateRangeKey].events.push(event);
    
          // 동일한 기간이 이미 출력되었는지 확인
          if (displayedDateRanges.has(dateRangeKey)) {
            groupedEvents[dateRangeKey].isFirstOutput = false; // 표시 안 함
          } else {
            displayedDateRanges.add(dateRangeKey); // 날짜 범위를 추가
          }
        });
    
        // 그룹화된 이벤트들을 정렬
        const sortedGroupedEvents = Object.keys(groupedEvents)
          .sort((a, b) => {
            const [startA, endA] = a.split(' - ').map((date) => new Date(date).getTime());
            const [startB, endB] = b.split(' - ').map((date) => new Date(date).getTime());
    
            if (startA === startB) return endA - endB;
            return startA - startB;
          })
          .reduce((acc, key) => {
            acc[key] = groupedEvents[key];
            return acc;
          }, {});
    
        return sortedGroupedEvents;
      };

    const [groupedEvents, setGroupedEvents] = useState(groupEventsByDate(todos));


    useEffect(()=>{
      setGroupedEvents(groupEventsByDate(todos));
    }, [todos])

    const fullCalendarEvents = useMemo(() => {
        // console.log( "memo",groupedEvents)
        return Object.keys(groupedEvents).flatMap((key) => {
          const group = groupedEvents[key];
          // console.log("group", group)
          return group.events ? group.events.map((event, idx) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            notice: event.notice,
            showDate: group.isFirstOutput || idx === 0, // 첫 번째 출력 시만 날짜 표시
          })):{};
        });
      }, [groupedEvents]);

      console.log('todos',todos, groupedEvents, fullCalendarEvents)


      const transformEvents = (events) => {
        const groupedEvents = {};
      
        events.forEach((event) => {
          const startDate = event.start;
          const endDate = event.end
            ? event.end
            : startDate;
      
          const key = `${startDate}-${endDate}`;
          if (!groupedEvents[key]) {
            groupedEvents[key] = {
              start: event.start,
              end: event.end,
              titles: [], // 이벤트 제목을 배열로 저장
            };
          }
          groupedEvents[key].titles.push(event.title); // 제목 추가
        });
      
        return Object.keys(groupedEvents).map((key) => {
          const group = groupedEvents[key];
          return {
            title: group.titles.join("@ "), // 여러 제목을 합쳐 표시
            start: group.start,
            end: group.end,
            mark: 0,
          };
        });
      };
      
      const transformedEvents = transformEvents(fullCalendarEvents);

    // 현재 보이는 월을 기준으로 이벤트 필터링
    const filterEventsForCurrentViewMonth = (events) => {
        if (!currentViewRange.start || !currentViewRange.end) {
        return events; // 범위가 설정되지 않으면 모든 이벤트를 반환
        }
        // 현재 보이는 월에 해당하는 이벤트만 필터링
        return events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= currentViewRange.start && eventDate <= currentViewRange.end;
        });
    };

    const [currentEvents, setCurrentEvents] = useState(filterEventsForCurrentViewMonth(fullCalendarEvents));

    const handleDatesSet = (arg) => {
        const { view } = arg;

        setCurrentViewRange({
            start: arg.view.currentStart,
            end: arg.view.currentEnd
        });
    
      };

    const eventClickHandler = (info) => {
      // info.preventDefault();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === info.event.id ? { ...todo, new: 0 } : todo
        )
      );

      console.log("click", info);
      // return <Navigate to="/ScheduleDetail" title={arg.event.title} notice={arg.event.notice} />;
      if(info.event.extendedProps.notice.length > 0)
        navigate("/schedule/detail", {state:{ title:info.event.title, notice: info.event.extendedProps.notice, selectedFavorites: selectedFavorites }});
    };

    const eventClickHandler2 = (event) => {
      // info.preventDefault();
      console.log(event);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === event.id ? { ...todo, new: 0 } : todo
        )
      );

      // return <Navigate to="/ScheduleDetail" title={arg.event.title} notice={arg.event.notice} />;
      if(event.extendedProps.notice.length > 0)
        navigate("/schedule/detail", {state:{ title:event.title, notice: event.extendedProps.notice, selectedFavorites: selectedFavorites }});
    };

    // const favorites = location.state.favorites ? location.state.favorites:{};
    const [selectedFavorites, setSelectedFavorites] = useState({});
  
    // 별표 클릭 시 상태 업데이트 함수
    const toggleFavorite = (eventId) => {
      // console.log("togglefavor", eventId)
      setSelectedFavorites((prevState) => ({
        ...prevState,
        [eventId]: !prevState[eventId], // 해당 이벤트의 별표 상태를 반전시킴
      }));
    };

    // 리스트 일정에서 출력한 이벤트
    //   const [eventIdSet, setEventIdSet] = useState([]);

    const handleViewChange = (view) => {
      // FullCalendar에서 뷰가 변경될 때마다 상태를 초기화
      if (view.type === 'dayGridMonth' || view.type === 'listMonth') {
          // setEventIdSet([]); // 상태 초기화
      }
    };

    const updatedEventIdSet = [];

    const listViewEventContent = (arg) => {
      const { event } = arg;
      const isFavorite = selectedFavorites[arg.event.id];  // 해당 이벤트가 관심 목록에 있는지 확인

      // console.log(event.extendedProps.notice, selectedFavorites);
      // 이벤트가 여러 날짜에 걸쳐 있는지 확인하고 날짜 범위를 표시
      const startDate = event.start.toLocaleDateString('ko-KR', {
      //   month: 'numeric',
        day: 'numeric',
        weekday: 'short', // 요일 추가
      }).replace(' ', '');

      const endDate = event.end
        ? event.end.toLocaleDateString('ko-KR', {
          //   month: 'numeric',
            day: 'numeric',
            weekday: 'short', // 요일 추가
          }).replace(' ', '')
        : startDate;

      
  
      // console.log(event.id, updatedEventIdSet, updatedEventIdSet.includes(event.id),arg.view.type);
      if (!updatedEventIdSet.includes(event.id)) {
        updatedEventIdSet.push(event.id);
        // setEventIdSet(updatedEventIdSet); 
        // 상태 업데이트
      } else{
            // console.log(arg.view.type === 'listMonth')
            if (arg.view.type === 'listMonth') {
                
            }
      }

      if (arg.view.type === 'listMonth') {
          return (
          // <Link className="w-full p-0"  to={{pathname:event.extendedProps.notice ? "/scheduleDetail":"", state:{notice : event.extendedProps.notice ? event.extendedProps.notice : "", title : event.title}}}>
          // <Link className="w-full p-0"  to={event.extendedProps.notice ? "/scheduleDetail":""} state={{notice : event.extendedProps.notice ? event.extendedProps.notice : "", title : event.title}}>
          
          <div className={`custom-event flex flex-row py-0 ${event.extendedProps.notice.length > 0 ?'cursor-pointer' : 'cursor-default'}`}>

              <div className="flex flex-auto event-title align-middle p-1.5" style={{backgroundColor: isFavorite ? 'rgb(105, 173, 1)': event.extendedProps.notice.length > 0 ? 'darkgray':'lightgray', borderRadius:'3px'}}>
                  <div className="flex-auto align-middle " style={{paddingTop:"2px" ,fontSize:'13px', fontWeight:"bold", backgroundColor: isFavorite ? 'rgb(105, 173, 1)' : 'inherit'}}>
                      {event.title} <p className=" bg-inherit" style={{color:"red", display: event.extendedProps.new ? "inline-block" : "none"}}>new</p>
                  </div>
                  <div className="flex-none event-favorite align-middle my-auto" style={{ backgroundColor:isFavorite ? 'rgb(105, 173, 1)' : "inherit"}} onClick={(event) => {event.preventDefault();event.stopPropagation();toggleFavorite(arg.event.id)}}>
                      <span className="event-favorite-star align-middle my-auto bg-inherit cursor-pointer" style={{backgroundColor:isFavorite ? 'rgb(105, 173, 1)' : "inherit", color: isFavorite ? 'yellow' : 'gray'} }>
                        <FaStar className="bg-inherit my-auto"/>
                      </span> {/* 별표 아이콘 */}
                  </div>
              </div>
              
          </div>
          // </Link>
      )}
      else{
          return(
          // <Link className="w-full p-0" to={{pathname:event.notice ? "/scheduleDetail":"", state:{notice : arg.event.notice ? arg.event.notice : "", title : event.title}}}>
          <div className={`flex flex-row cal-custom-event ${event.extendedProps.notice.length > 0 ?'cursor-pointer' : 'cursor-default'}`} style={{backgroundColor: isFavorite ? 'rgb(105, 173, 1)' : event.extendedProps.notice.length > 0 ? 'darkgray':'lightgray'}}  >
              <div className="flex-auto event-title bg-inherit p-1.5" style={{fontSize:'9.5px', backgroundColor:isFavorite ? 'rgb(105, 173, 1)' : "inherit"}}
                  onClick={()=>{eventClickHandler2(event)}}
              >
                {event.title} 
                {/* <p className=" bg-inherit" style={{color:"red", display: event.extendedProps.new ? "inline-block" : "none"}}>new</p> */}
              </div>
              <div className="flex-none event-favorite bg-inherit my-auto pt-0.5" style={{ backgroundColor:isFavorite ? 'rgb(105, 173, 1)' : "inherit"}} onClick={(event) => {event.stopPropagation();toggleFavorite(arg.event.id); }}>
                  <div className="event-favorite-star bg-inherit my-auto cursor-pointer" style={{ fontSize:"15px", color: isFavorite ? 'yellow' : 'gray', backgroundColor: isFavorite ? 'rgb(105, 173, 1)' : 'inherit'}}>
                    <FaStar className="bg-inherit my-auto" />
                  </div> {/* 별표 아이콘 */}
              </div>
          </div>
          // </Link>
        )
      }
    };


    return(
       <div className="relative w-full h-full bg-white">
            <Header page="Schedule"/>
            <div className="line"></div>
            
            {/* <div className="flex justify-between space-x-1 text-center home_tabs bg-white">
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-blue-900 id_tab cursor-pointer">신분증</button>
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-zinc-300 kingo_tab cursor-pointer">KINGO ⓘ</button>
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-zinc-300 favor_tab cursor-pointer">즐겨찾기</button>
            </div> */}

            <div id="calender-container" className="h-fit m-3 mb-5 rounded-lg shadow-lg">
                  
               <FullCalendar
                    className="block"
                    plugins={[listPlugin, dayGridPlugin]}
                    initialView="dayGridMonth" // 초기 View 설정
                    titleFormat={{ month: "long" }}
                    height="auto"
                    contentHeight={600}
                    handleWindowResize={true}
                    dragScroll={true}
                    locale="ko"
                    eventClick={eventClickHandler}
                    listDayFormat={{
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                    }} // 월/일(요일) 형식
                    listDaySideFormat={false}
                    eventContent={(arg) => listViewEventContent(arg)}
                    headerToolbar={{
                        start: "prev title next",
                        center: "",
                        end: "listMonth,dayGridMonth",
                    }}
                    buttonIcons={{
                        prev: "chevron-left",
                        next: "chevron-right",
                    }}
                    
                    showNonCurrentDates={false}
                    fixedWeekCount={false} 
                    views={{
                            dayGridMonth: {
                            dayMaxEventRows: 0,
                            buttonText: " ", // 버튼 텍스트 설정
                            dayCellContent: (arg) => {
                                return arg.date.getDate(); // 숫자만 표시
                            },
                            dayCellDidMount: (arg) => {
                                const viewStart = arg.view.currentStart; // 현재 View의 시작일
                                const currentMonth = viewStart.getMonth(); // 현재 월
                    
                                // console.log("arg",arg, currentMonth, arg.date.getMonth());
                                // 이번 달의 날짜가 아닌 날짜들은 숨긴다.
                                if (arg.date.getMonth() !== currentMonth) {
                                  const startOfWeek = new Date(arg.date); 
                                  startOfWeek.setDate(arg.date.getDate() - arg.date.getDay()); // 해당 날짜의 주 첫 번째 날(일요일)을 찾음
                                  const endOfWeek = new Date(startOfWeek);
                                  endOfWeek.setDate(startOfWeek.getDate() + 6); // 해당 날짜의 주 마지막 날(토요일)
                                  // console.log("arg.date",arg.date, startOfWeek, endOfWeek);

                                  // startOfWeek가 현재 월과 같은 주에 속하는지 확인
                                  const sameWeek = startOfWeek.getMonth() == currentMonth || endOfWeek.getMonth() == currentMonth;
                                  
                                  console.log(startOfWeek.getMonth(), currentMonth, endOfWeek.getMonth(), sameWeek);
                                  // 이전 달과 다음 달 날짜가 같은 주에 속하면 표시
                                  if (arg.date.getMonth() !== currentMonth && !sameWeek) {
                                    // arg.el.style.display = "none"; // 다른 주에 속하거나 이번 달에 속하지 않으면 숨김
                                  }
                                }
                            },
                        },
                        listMonth: {
                          buttonText: " ",
                          dayHeaderContent : (arg) => {
                              // '일(요일)' 형식으로 변경
                              return new Date(arg.date).toLocaleDateString('ko-KR', {
                                  day: 'numeric',
                                  weekday: 'short',
                              });
                          }, // 버튼 텍스트 설정
                        },
                    }}
                    events={filterEventsForCurrentViewMonth(fullCalendarEvents)} // 현재 보이는 월에 해당하는 이벤트만 필터링
                    datesSet={handleDatesSet} // datesSet 이벤트 핸들러 추가
                    viewDidMount={(arg) => handleViewChange(arg.view)} // 뷰가 마운트될 때 호출
                    viewWillUnmount={(arg) => handleViewChange(arg.view)} // 뷰가 언마운트될 때 호출
                />

            </div>

       </div> 
    )

}

export default Schedule;