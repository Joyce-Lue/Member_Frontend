import React, { useState, useEffect } from "react";
import axios from "axios";

const ChangeAccountData = ({setPage}) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let myUserID = localStorage.getItem("userID");
        
        // console.log('wwwwwwww',myUserID);
        
        let response = await axios.get("http://localhost:8000/api/account_setting");

        // console.log('wwwwww', response);
        
        let foundUser = response.data.find(item => item.userID === parseInt(myUserID));
        setUser(foundUser);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 檢查是否找到用戶
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <div>
        <div className="CADRight">
          <h1>更改帳戶資料</h1>
        </div>

        {/* <!-- 帳戶資料 --> */}

        {/* 編輯電子郵件 */}
        <div className="CADRight CADRight2">
          <span
            id="emailLink"
            onClick={() => setPage(7)}
            style={{ textDecoration: "underline" }}
          >編輯</span>
          <div className="CADBox">
            <p>電子郵件:</p>
            <label>{ user.email }</label>
          </div>
        </div>

        {/* 編輯手機號碼 */}
        <div className="CADRight CADRight2">
          <span
            id="phoneLink"
            onClick={() => setPage(8)}
            style={{ textDecoration: "underline" }}
          >編輯</span>
          <div className="CADBox">
            <p>手機號碼:</p>
            <label>{ user.phoneNumber }</label>
          </div>
        </div>

        {/* 編輯密碼 */}
        <div className="CADRight CADRight2">
          <span 
            onClick={() => setPage(9)}
            style={{ textDecoration: "underline" }}>
            編輯
          </span>
          <div className="CADBox">
            <p>密碼:</p>
            <label>{ user.password ? "******" : "沒有密碼" }</label>
          </div>
        </div>

        <span className="goBack" onClick={() => setPage(1)}>
          回上頁
        </span>
      </div>
    </div>
  );
};

export default ChangeAccountData;
