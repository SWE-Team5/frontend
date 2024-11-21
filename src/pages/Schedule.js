import Header from "../components/Header";
import "../styles/Schedule.css";

import { FaCircleCheck } from "react-icons/fa6";

import table from "../assets/images/table.png";
import list from "../assets/images/list.png";

import {useState, useEffect, useMemo} from "react";

import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';


function Schedule(){

    const [type, setType] = useState('Calendar');
    const [currentViewRange, setCurrentViewRange] = useState({ start: null, end: null });


    const todos = [
        {id:1, title: '2024학년도 2학기 개시일' , start:'2024-03-01'},
        {id:2, title: '2학기 개강', start:'2024-03-04'},
        {id:3, title: '학사과정 조기졸업/석사과정 수업연한 단축/석박사통합과정 조기수료·이수포기 신청', start:'2024-03-04', end:'2024-03-07'},
        {id:4, title: '대학원과정 논문제출자격시험 응시(면제) 신청', start:'2024-03-04', end:'2024-03-07'},
        
        // {title: , date:};
        // {title: , date:};

    ];

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

    const groupedEvents = groupEventsByDate(todos);

    const fullCalendarEvents = useMemo(() => {
        return Object.keys(groupedEvents).flatMap((key) => {
          const group = groupedEvents[key];
          return group.events.map((event, idx) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            showDate: group.isFirstOutput || idx === 0, // 첫 번째 출력 시만 날짜 표시
          }));
        });
      }, [groupedEvents]);

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

    //   console.log(transformedEvents);

    //   console.log(groupedEvents, fullCalendarEvents)

    // const listViewEventContent = (arg)=>{
    //     if (arg.view.type === 'listMonth') {
    //         return (
    //           <div className="custom-event flex flex-row">
    //                 <div className="flex-none event-date">
    //                     {`${arg.event.start.getDate()}일${arg.event.end ? '-' + arg.event.end.getDate() + '일' : ''}(${arg.event.start.toLocaleDateString('ko-KR', {
    //                     weekday: 'short',
    //                     })})`}
    //                 </div>
    //                 <div className="flex-auto event-title">
    //                     {arg.event.title}
    //                 </div>
    //           </div>
    //         )
    //     }
    //     else{
    //         return(<div className="cal-custom-event">
    //                 <span className="event-title">{arg.event.title}</span>
    //         </div>)
    //     }
    // }

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
    
        // if (view.type === "dayGridMonth") {
        //   setCurrentEvents(filterEventsForCurrentViewMonth(fullCalendarEvents));
        // } else if (view.type === "listMonth") {
        //   setCurrentEvents(filterEventsForCurrentViewMonth(transformedEvents));
        // }
      };

    const [selectedFavorites, setSelectedFavorites] = useState({});
  
    // 별표 클릭 시 상태 업데이트 함수
    const toggleFavorite = (eventId) => {
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

    // console.log(arg.event.id, selectedFavorites);
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

      
  
      console.log(event.id, updatedEventIdSet, updatedEventIdSet.includes(event.id),arg.view.type);
      if (!updatedEventIdSet.includes(event.id)) {
        updatedEventIdSet.push(event.id);
        // setEventIdSet(updatedEventIdSet); 
        // 상태 업데이트
      } else{
            console.log(arg.view.type === 'listMonth')
            if (arg.view.type === 'listMonth') {
                return;
            }
      }

    if (arg.view.type === 'listMonth') {
        // console.log(arg.event.extendedProps.showDate)
        return (
        <div className="custom-event flex flex-row">
            {/* <div className="flex-none event-date w-20 pr-4">
                {`${arg.event.extendedProps.showDate ? startDate == endDate ? startDate : startDate + '-' + endDate : ""}`}
            </div> */}
            <div className="flex flex-auto event-title align-middle p-1.5" style={{backgroundColor: isFavorite ? 'green' : 'darkgray', borderRadius:'3px'}}>
                <div className="flex-auto align-middle " style={{padding:"auto" ,fontSize:'13px', fontWeight:"bold", backgroundColor: isFavorite ? 'green' : 'inherit'}}>
                    {event.title}
                </div>
                <div className="flex-none event-favorite align-middle" style={{ backgroundColor:isFavorite ? 'green' : "inherit"}} onClick={() => toggleFavorite(arg.event.id)}>
                    <span className="event-favorite-star align-middle" style={{paddingBottom:"2px" ,boxSizing:"border-box", backgroundColor:isFavorite ? 'green' : "inherit", color: isFavorite ? 'yellow' : 'gray'} }>&#9733;</span> {/* 별표 아이콘 */}
                </div>
            </div>
            
        </div>
        );}
        else{
            return(<div className={`flex flex-row cal-custom-event`} style={{backgroundColor: isFavorite ? 'green' : 'inherit'}}>
                <div className="flex-auto event-title bg-inherit">{arg.event.title}</div>
                <div className="flex-none event-favorite bg-inherit" onClick={() => toggleFavorite(arg.event.id)}>
                    <div className="event-favorite-star bg-inherit" style={{ fontSize:"17px", color: isFavorite ? 'yellow' : 'gray', backgroundColor: isFavorite ? 'green' : 'inherit'}}>&#9733;</div> {/* 별표 아이콘 */}
                </div>
            </div>)
        }
   };


    return(
       <div className="relative w-full h-full bg-white">
            <Header page="Schedule"/>
            
            <div className="flex justify-between space-x-1 text-center home_tabs bg-white">
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-blue-900 id_tab cursor-pointer">신분증</button>
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-zinc-300 kingo_tab cursor-pointer">KINGO ⓘ</button>
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-zinc-300 favor_tab cursor-pointer">즐겨찾기</button>
            </div>

            <div id="calender-container" className="h-fit m-3 mb-5 rounded-lg shadow-lg">
                {/* <div className="sche-types w-10 flex flex-row block h-10 "> 
                    <div className={`flex-none z-10  sche-type-container mr-2 cursor-pointer ${type == 'Calendar' ? "type-active" : ""} `} onClick={()=>{setType('Calendar'); console.log(type);}}>
                         <img className={`sche-type ${type == 'Calendar' ? "type-active" : ""}`} src={table}  width={"33px"} height={"33px"} />
                    </div>    
                    <div className={`flex-none z-10 sche-type-container cursor-pointer ${type == 'List' ? "type-active" : ""}`} onClick={()=>{setType('List'); console.log(type);}} >
                        <img className={`sche-type  ${type == 'List' ? "type-active" : ""}`} src={list} width={"33px"} height={"33px"}/>
                    </div>     
                </div> */}
               
               {/* <FullCalendar 
                    className="block"
                    defaultView="dayGridMonth" 
                    plugins={[listPlugin, dayGridPlugin ]}
                    titleFormat={{month:'long'}}
                    height={'auto'}
                    contentHeight={600}
                    handleWindowResize={'true'}
                    dragScroll={'true'}
                    listDayFormat={{ weekday: 'short', day: 'numeric', month: 'short' }} // 월/일(요일) 형식
                    listDaySideFormat={false}
                    eventContent={(arg)=>{listViewEventContent(arg);}}
                    headerToolbar={{
                        start:"prev title next",
                        center:"",
                        end:"listMonth, dayGridMonth "
                    }}
                    buttonIcons={{
                        prev: 'chevron-left',
                        next: 'chevron-right',
                    }}

                    views={{ 
                        dayGridMonth: { 
                          dayMaxEventRows: 3, 
                          buttonText: ' ' 
                        },
                        listMonth:{
                          buttonText: ' ' 
                        }
                    }}

                    locale={'ko'}
                    events={todos}
                /> */}
               
               
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
                    
                                console.log(arg.date, currentMonth, arg.date.getMonth() !== currentMonth);
                                // 이번 달의 날짜가 아닌 날짜들은 숨긴다.
                                if (arg.date.getMonth() !== currentMonth) {
                                  const startOfWeek = new Date(arg.date); 
                                  startOfWeek.setDate(arg.date.getDate() - arg.date.getDay()); // 해당 날짜의 주 첫 번째 날(일요일)을 찾음
                                  const endOfWeek = new Date(startOfWeek);
                                  endOfWeek.setDate(startOfWeek.getDate() + 6); // 해당 날짜의 주 마지막 날(토요일)
                                  console.log(arg.date, startOfWeek, endOfWeek);

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
                        buttonText: " ", // 버튼 텍스트 설정
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