import React, { useState, useEffect } from "react";
import axios from "axios";

const Account = ({ newsLetterStatus }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let myUserID = localStorage.getItem("userID");

        // console.log(' vvvvvvvvv',myUserID);

        let response = await axios.get("http://localhost:8000/api/my_account");

        // console.log('dddddddd', response);

        let foundUser = response.data.find(
          (item) => item.userID === parseInt(myUserID)
        );
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
        <div className="AccountRight1">
          <h1>我的帳戶</h1>
        </div>
        <div className="AccountRight2">
          <h3>個人資料</h3>

          <div className="AccountBox">
            <p>姓名:</p>
            <label>{user.userName}</label>
          </div>

          <div className="AccountBox">
            <p>電子郵件:</p>
            <label>{user.email}</label>
          </div>
          <div className="AccountBox">
            <p>手機號碼:</p>
            <label>{user.phoneNumber}</label>
          </div>

          <div className="AccountBox">
            <p>室內電話:</p>
            <label>{user.telePhone}</label>
          </div>

          <div className="AccountBox">
            <p>配送地址1:</p>
            <label>{user.address1}</label>
          </div>

          <div className="AccountBox">
            <p>配送地址2:</p>
            <label>{user.address2}</label>
          </div>

          <div className="AccountBox">
            <p>訂閱電子報:</p>
            <label>{newsLetterStatus ? "是" : "否"}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
