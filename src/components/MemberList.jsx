import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const MemberList = ({ setPage }) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token"); // 清除令牌
    setIsAuthenticated(false); // 更新狀態
    history.push("/login"); // 導向登入頁面
  };

  const handleSetPage = (pageIndex) => {
    setCurrentPage(pageIndex); // 更新當前頁面
    setPage(pageIndex);
  };

  return (
    <div>
      <div>
        <div className="aside1">
          <p
            className={`style ${currentPage === 0 ? "active" : "inactive"}`}
            onClick={() => handleSetPage(0)}
          >
            我的帳戶
          </p>
          <p onClick={handleLogout}>登出</p>
        </div>
        <div className="aside2">
          <p className={`style ${currentPage === 1 ? "active" : "inactive"}`} onClick={() => handleSetPage(1)}>
            帳戶設定
          </p>
          <p className={`style ${currentPage === 2 ? "active" : "inactive"}`} onClick={() => handleSetPage(2)}>
            帳戶地址
          </p>
          <p className={`style ${currentPage === 3 ? "active" : "inactive"}`} onClick={() => handleSetPage(3)}>
            訂單紀錄
          </p>
          <p className={`style ${currentPage === 4 ? "active" : "inactive"}`} onClick={() => handleSetPage(4)}>
            收藏
          </p>
        </div>
        <div className="aside3">
          <p>客服中心:</p>
          <p>電話:0800-963-852</p>
          <p>
            服務時間: <br /> 星期一至星期五 09:00-1200、13:30-17:30。
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
