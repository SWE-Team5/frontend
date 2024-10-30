import { PiList } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import skkuLogo from "../assets/images/skku_logo.png";
import skkuLogo2 from "../assets/images/skku_logo2.png";
import chatbotIcon from "../assets/images/chatbot_icon.png";
import noticeIcon from "../assets/images/notice_icon.png";

function Header({page}){
    if(page == "Home"){
        return(
            <div className="flex flex-unwrap justify-between space-x-2 w-full h-14 p-3 text-3xl border-b-stone-400 bg-white">
                <div className="flex-1 bg-white"><PiList className="m-0 bg-inherit" /></div>
                <div className="flex-auto flex justify-center space-x-2 bg-white">
                    <img className="w-fit m-0" src={skkuLogo2} alt="skku_logo" height="25px" width="" />
                    <p className="pt-1 bg-inherit text-base font-bold">성균관대학교</p>
                </div>
                <div className="flex-none flex justify-center space-x-1 bg-white">
                    <img className="w-fit m-0" src={chatbotIcon} alt="chatbot_icon" height="25px" width="" />
                    <img className="w-fit m-0" src={noticeIcon} alt="notice_icon" height="25px" width="" />
                    <IoIosSearch className="bg-inherit"/>
                </div>
            </div>
        )
    }
    else if (page == "Schedule"){
        return(
            <div className="flex flex-wrapw-full h-14 text-3xl border-b-stone-400 bg-white">
                
            </div>
        )
    }
    else if (page == "Scrap"){
        return(
            <div className="flex flex-wrapw-full h-14 text-3xl border-b-stone-400 bg-white">
                
            </div>
        )
    }
    else if (page == "chatbot"){
        return(
            <div className="flex flex-wrapw-full h-14 text-3xl border-b-stone-400 bg-white">
                
            </div>
        )
    }
    return null;
    
}

export default Header;