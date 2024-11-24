import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoBookmarkSharp } from "react-icons/io5";
import ExternalPage from "../components/ExternalPage";
import Header from "../components/Header";

function Register({ onBack }) {
  const [keywords, setKeywords] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");
  const [isAlertEnabled, setIsAlertEnabled] = useState(false);
  const [itemColors, setItemColors] = useState(["gray", "gray", "gray", "gray"]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [clickedKeyword, setClickedKeyword] = useState("");
  const [selectedNoticeURL, setSelectedNoticeURL] = useState(null); // New state for selected notice URL

  const notices = [
    {
      title: "2024학년도 학사과정 겨울 계절수업 운영 안내",
      url: "https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=view&articleNo=122612&article.offset=0&articleLimit=10&srSearchVal=2024%ED%95%99%EB%85%84%EB%8F%84+%ED%95%99%EC%82%AC%EA%B3%BC%EC%A0%95+%EA%B2%A8%EC%9A%B8+%EA%B3%84%EC%A0%88%EC%88%98%EC%97%85+%EC%9A%B4%EC%98%81+%EC%95%88%EB%82%B4",
    },
    {
      title: "[반도체소부장혁신융합대학사업단] 2024학년도 겨울계절학기 수강신청 안내",
      url: "https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=view&articleNo=122309&article.offset=0&articleLimit=10&srSearchVal=%EB%B0%98%EB%8F%84%EC%B2%B4%EC%86%8C%EB%B6%80%EC%9E%A5%ED%98%81%EC%8B%A0%EC%9C%B5%ED%95%A9%EB%8C%80%ED%95%99%EC%82%AC%EC%97%85%EB%8B%A8%5D+2024%ED%95%99%EB%85%84%EB%8F%84+%EA%B2%A8%EC%9A%B8%EA%B3%84%EC%A0%88%ED%95%99%EA%B8%B0+%EC%88%98%EA%B0%95%EC%8B%A0%EC%B2%AD+%EC%95%88%EB%82%B4",
    },
    {
      title: "[행사/세미나] 글로벌 IT전문가와 킹고인의 만남 시즌2 쉰일곱번째 만남 참가 신청(3/28 목)",
      url: "https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=view&articleNo=116546&article.offset=0&articleLimit=10&srSearchVal=%5B%ED%96%89%EC%82%AC%2F%EC%84%B8%EB%AF%B8%EB%82%98%5D+",
    },
  ];

  const addKeyword = () => {
    if (inputKeyword.trim() && !keywords.includes(inputKeyword)) {
      setKeywords([...keywords, inputKeyword]);
    }
    setInputKeyword("");
  };

  const handleKeywordClick = (keyword) => {
    setClickedKeyword(keyword);
    const matchingNotices = notices.filter((notice) =>
      notice.title.includes(keyword)
    );
    setFilteredNotices(matchingNotices);
  };

  const handleNoticeClick = (url) => {
    setSelectedNoticeURL(url); // Set the selected notice URL
  };

  const handleBackToNotices = () => {
    setSelectedNoticeURL(null); // Clear the selected notice URL
  };

  const handleToggle = () => {
    setIsAlertEnabled((prev) => !prev);
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
     {selectedNoticeURL ? (
  // Render the ExternalPage if a notice is selected
  <div className="h-full flex flex-col">
    {/* Header Section */}
    <Header page="keywordRegister" />

    {/* External Page */}
    <ExternalPage url={selectedNoticeURL} />
  </div>
) : (

        <div className="bg-white">
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

          {/* Notices Section */}
          <div className="flex mt-5 mx-4 border border-gray-300 rounded-lg h-[calc(100vh-180px)]">
            {/* Left Section */}
            <div className="w-1/3 bg-gray-100 flex flex-col p-4">
              <h2 className="font-semibold text-center border-b pb-2">
                나의 키워드
              </h2>
              <ul className="mt-4 space-y-2">
                {keywords.map((keyword, index) => (
                  <li key={index} className="text-xs">
                    <span
                      className={`cursor-pointer ${
                        clickedKeyword === keyword
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                      onClick={() => handleKeywordClick(keyword)}
                    >
                      {keyword}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section */}
            <div className="flex-1 p-4">
              <h2 className="font-semibold text-center border-b pb-2">
                관련 공지
              </h2>
              <ul className="mt-4 space-y-2">
                {filteredNotices.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    관련 공지가 없습니다.
                  </p>
                ) : (
                  filteredNotices.map((notice, index) => (
                    <li
                      key={index}
                      className="flex p-2 border rounded-md bg-gray-200 flex justify-between"
                    >
                      <span
                        className="flex-auto cursor-pointer bg-inherit"
                        onClick={() => handleNoticeClick(notice.url)}
                      >
                        {notice.title}
                      </span>
                      <div className="flex-none my-auto bg-inherit">
                        <IoBookmarkSharp
                          size={20}
                          className={`bg-inherit cursor-pointer ${
                            itemColors[index] === "red"
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                          style={{width:"20px"}}
                          onClick={() => toggleIconColor(index)}
                        />
                      </div>
                      
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;