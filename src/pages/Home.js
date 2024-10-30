import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { FaCircleCheck } from "react-icons/fa6";
import qrCode from "../assets/images/qr_code.png";
import {useState, useEffect} from "react";

function Home({student_data}){

  const [count, setCount] = useState(180);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    
    if(count === 0) {
        clearInterval(id);
        setCount(180);
    }
    return () => clearInterval(id);
  }, [count]);


    return(
       <div className="bg-white">
            <Header page="Home"/>
            
            <div className="flex justify-between space-x-1 text-center home_tabs bg-white">
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-blue-900 id_tab">신분증</button>
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-zinc-300 kingo_tab">KINGO ⓘ</button>
                <button className="w-full pt-1.5 pb-2 text-sm font-semibold text-white bg-zinc-300 favor_tab">즐겨찾기</button>
            </div>

            <div className="id_card p-4 pt-4.5 m-3 bg-neutral-200 rounded-lg">
                <div className={`${styles.borderBottom} flex pb-2 border-neutral-400 justify-between space-x-4 id_info bg-inherit`}>
                    <div className="flex flex-col flex-none std_pic bg-inherit">
                        <div className={`${styles.text} w-10 ml-0 mb-1 text-white font-semibold bg-blue-900 rounded-xl`}>학생증</div>
                        <img className="rounded-md" src="" alt="std_pic" width="90px" height="90px" />
                    </div>
                    <div className="flex flex-col flex-auto std_info bg-inherit">
                        <div className={`flex-none ${styles.text2} w-9 ml-0 mt-0.5 text-blue-950 font-semibold bg-slate-50 rounded-sm`}>
                            신분증 안내
                        </div>
                        <div className="flex-auto flex flex-col text-xs justify-around ml-0 bg-neutral-200">
                            <div className="bg-neutral-200 text-left font-bold m-0">{"홍길동"}</div>
                            <div className="bg-neutral-200">
                                <p className={`${styles.text3} bg-neutral-200 text-left `}>{"소프트웨어학과"}</p>
                                <p className={`${styles.text4} bg-neutral-200 text-left `}>{"0000000000"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-none bg-neutral-200">
                        <FaCircleCheck className="float-left mt-0.5 h-3 bg-neutral-200 text-green-400 "/>
                        <p className={`${styles.text3} font-bold pt-0.5 bg-neutral-200 float-left`}>주 신분증</p>
                    </div>
                </div>
                <div className="id_qr bg-inherit pt-4">
                    <img src={qrCode} alt="qr_code" width="150px" height="150px"/>
                    <div className="mt-1 bg-inherit">
                        <p className={`inline ${styles.text5} bg-inherit font-semibold`}>남은시간 : </p>
                        <p className={`inline text-xs text-lime-500 bg-inherit font-semibold`}>
                            {Math.floor(count/60)}:{count % 60 < 10 ? '0'+count%60 : count%60}
                        </p>
                    </div>
                </div>
            </div>
       </div> 
    )

}

export default Home;