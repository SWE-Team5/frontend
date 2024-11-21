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

    const todos = [
        {title: '2024학년도 2학기 개시일' , start:'2024-09-01'},
        {title: '2학기 개강', start:'2024-09-02'},
        
        // {title: , date:};
        // {title: , date:};

    ];

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
               
                <FullCalendar 
                    className="block"
                    defaultView="dayGridMonth" 
                    plugins={[listPlugin, dayGridPlugin ]}
                    titleFormat={{month:'long'}}
                    height={'auto'}
                    contentHeight={600}
                    handleWindowResize={'true'}
                    dragScroll={'true'}
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
                />

            </div>

       </div> 
    )

}

export default Schedule;