import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillFlag } from "react-icons/ai"; 

function Register({ onBack, onNavigateToPage }) {
  const [keywords, setKeywords] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");
  const [isAlertEnabled, setIsAlertEnabled] = useState(false); // Toggle state
  const [itemColors, setItemColors] = useState([ // Default color for all items
    "gray", "gray", "gray", "gray"
  ]);

  const addKeyword = () => {
    if (inputKeyword.trim() && !keywords.includes(inputKeyword)) {
      setKeywords([...keywords, inputKeyword]);
    }
    setInputKeyword("");
  };

  const handleToggle = () => {
    setIsAlertEnabled((prev) => !prev); // Toggle the state
  };

  const toggleIconColor = (index) => {
    setItemColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index ? (color === "gray" ? "red" : "gray") : color
      )
    );
  };

  return (
    <div className="bg-gray-50 h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray-300">
        <IoIosArrowBack
          size={24}
          className="cursor-pointer bg-white"
          onClick={onBack}
        />
        <h1 className="text-lg font-semibold flex-1 text-center bg-white">
          관심 공지 등록 및 확인
        </h1>
        <div className="w-6"></div>
      </div>

      {/* Input Section */}
      <div className="flex items-center mt-5 mx-4">
        <input
          type="text"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          placeholder="관심 키워드를 입력하세요."
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={addKeyword}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
        >
          등록
        </button>
      </div>

      {/* Main Sections */}
      <div className="flex mt-5 mx-4 border border-gray-300 rounded-lg h-[calc(100vh-180px)]">
        {/* Left Section: 나의 키워드 */}
        <div className="w-1/3 bg-gray-100 flex flex-col p-4">
          <h2 className="font-semibold text-center border-b pb-2">나의 키워드</h2>
          <div className="flex-1 mt-4 border border-gray-600 rounded-md bg-gray overflow-y-auto p-2 ml-1 mr-1 h-[200px]">
            <ul className="space-y-2">
              {keywords.map((keyword, index) => (
                <li key={index} className="text-xs">
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <label htmlFor="alert" className="font-medium text-xs mb-2">
              알림 수신동의
            </label>
            <div
              onClick={handleToggle} // Handle click to toggle state
              className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${
                isAlertEnabled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                  isAlertEnabled ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-gray-300"></div>

        {/* Right Section: 관련 공지 */}
        <div className="flex-1 p-4  flex flex-col"> {/* Reduced font size */}
          <h2 className="font-semibold text-center border-b pb-2">관련 공지</h2>
          <ul className="mt-4 space-y-2 overflow-y-auto flex-1 text-xs">
            {[
              "2024년 2학기 경제학과 3차 졸업시험 신청안내",
              "2024학년도 2학기 수강철회 안내",
              "[채용/공지] SKKU Global Springboard Program: CES 2025 참여",
              "[채용/공지] 자연과학캠퍼스 근로 장학생 모집",
            ].map((item, index) => (
              <li
                key={index}
                className="p-2 border rounded-md bg-gray-100 flex items-center justify-between"
              >
                <span
                  className="cursor-pointer flex-1"
                  onClick={() => {
                    if (index === 0) {
                      onNavigateToPage(
                        "https://app.skku.edu/emate_app/bbs/b1805133145.nsf/view01/F31D8C088E337BF449258BD6002C7EDB?OpenDocument&rowid=F31D8C088E337BF449258BD6002C7EDB_1&ui=webmail"
                      );
                    }
                  }}
                >
                  {item}
                </span>
                <div className="w-5 h-5 flex items-center justify-center">
                  <AiFillFlag
                    className={`cursor-pointer ${itemColors[index] === "red" ? "text-red-500" : "text-gray-500"}`}
                    size={16} // Fixed size for all icons
                    onClick={() => toggleIconColor(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;
