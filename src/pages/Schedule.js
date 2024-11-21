import Header from "../components/Header";
import "../styles/Schedule.css";

import { FaCircleCheck } from "react-icons/fa6";

import table from "../assets/images/table.png";
import list from "../assets/images/list.png";

import {useState, useEffect} from "react";

import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';


function Schedule(){

    const [type, setType] = useState('Calendar');
    const [currentViewRange, setCurrentViewRange] = useState({ start: null, end: null });


    const todos = [
        {title: '2024학년도 2학기 개시일' , start:'2024-03-01'},
        {title: '2학기 개강', start:'2024-03-04'},
        {title: '학사과정 조기졸업/석사과정 수업연한 단축/석박사통합과정 조기수료·이수포기 신청', start:'2024-03-04', end:'2024-03-07'},
        {title: '대학원과정 논문제출자격시험 응시(면제) 신청', start:'2024-03-04', end:'2024-03-07'},
        
        // {title: , date:};
        // {title: , date:};

    ];

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

    const handleDatesSet = (arg) => {
        setCurrentViewRange({
        start: arg.view.currentStart,
        end: arg.view.currentEnd
        });
    };

    const [favorites, setFavorites] = useState([]);

  // 관심 추가 처리 함수
  const toggleFavorite = (eventId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(eventId)
        ? prevFavorites.filter((id) => id !== eventId)
        : [...prevFavorites, eventId]
    );
  };

  const listViewEventContent = (arg) => {
    const { event } = arg;
    const isFavorite = favorites.includes(event.id);  // 해당 이벤트가 관심 목록에 있는지 확인

    // 이벤트가 여러 날짜에 걸쳐 있는지 확인하고 날짜 범위를 표시
    const startDate = event.start.toLocaleDateString('ko-KR', {
    //   month: 'numeric',
      day: 'numeric',
      weekday: 'short', // 요일 추가
    });
    const endDate = event.end
      ? event.end.toLocaleDateString('ko-KR', {
        //   month: 'numeric',
          day: 'numeric',
          weekday: 'short', // 요일 추가
        })
      : startDate;
    if (arg.view.type === 'listMonth') {
        return (
        <div className="custom-event flex flex-row">
            <div className="flex-none event-date">
            {`${startDate} - ${endDate}`}
            </div>
            <div className="flex-auto event-title">
            {event.title}
            </div>
            <div className="flex-none event-favorite" onClick={() => toggleFavorite(event.id)}>
            <span style={{ color: isFavorite ? 'yellow' : 'gray' }}>&#9733;</span> {/* 별표 아이콘 */}
            </div>
        </div>
        );}
        else{
            return(<div className="flex flex-row cal-custom-event">
                <div className="flex-auto event-title">{arg.event.title}</div>
                <div className="flex-none event-favorite" onClick={() => toggleFavorite(event.id)}>
                    <span className="event-favorite-star" style={{ color: isFavorite ? 'yellow' : 'gray' }}>&#9733;</span> {/* 별표 아이콘 */}
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
                    

                                // 이번 달의 날짜가 아닌 날짜들은 숨긴다.
                                if (arg.date.getMonth() !== currentMonth) {
                                  const startOfWeek = new Date(arg.date); 
                                  startOfWeek.setDate(arg.date.getDate() - arg.date.getDay()); // 해당 날짜의 주 첫 번째 날(일요일)을 찾음
                                  const endOfWeek = new Date(startOfWeek);
                                  endOfWeek.setDate(startOfWeek.getDate() + 6); // 해당 날짜의 주 마지막 날(토요일)
                                //   console.log(startOfWeek);

                                  // startOfWeek가 현재 월과 같은 주에 속하는지 확인
                                  const sameWeek = startOfWeek.getMonth() === currentMonth || endOfWeek.getMonth() === currentMonth;
                                  
                                  // 이전 달과 다음 달 날짜가 같은 주에 속하면 표시
                                  if (arg.date.getMonth() !== currentMonth && !sameWeek) {
                                    arg.el.style.display = "none"; // 다른 주에 속하거나 이번 달에 속하지 않으면 숨김
                                  }
                                }
                            },
                        },
                        listMonth: {
                        buttonText: " ", // 버튼 텍스트 설정
                        },
                    }}
                    events={filterEventsForCurrentViewMonth(todos)} // 현재 보이는 월에 해당하는 이벤트만 필터링
                    datesSet={handleDatesSet} // datesSet 이벤트 핸들러 추가
                />

            </div>

       </div> 
    )

}

export default Schedule;