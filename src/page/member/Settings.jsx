import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = ({
  setPage,
  setEmailNotification,
  setSmsNotification,
  setPhoneNotification,
}) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 從 localStorage 加載通知設置狀態，如果沒有設置過則默認為 false
  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem("emailNotification");
    return savedEmail === "true"; // 如果有設置為 "true"，則為 true
  });
  const [sms, setSms] = useState(() => {
    const savedSms = localStorage.getItem("smsNotification");
    return savedSms === "true";
  });
  const [phone, setPhone] = useState(() => {
    const savedPhone = localStorage.getItem("phoneNotification");
    return savedPhone === "true";
  });

  // 每次通知設置變更時更新 localStorage
  useEffect(() => {
    localStorage.setItem("emailNotification", email);
    localStorage.setItem("smsNotification", sms);
    localStorage.setItem("phoneNotification", phone);
  }, [email, sms, phone]);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let myUserID = localStorage.getItem("userID");

        // console.log('wwwwwwww',myUserID);

        let response = await axios.get(
          "http://localhost:8000/api/account_setting"
        );

        // console.log('wwwwww', response);

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

  if (!user) return <div>No user found</div>;

  // 改變通知設置
  const toggleEmailNotification = () => {
    setEmail((prev) => {
      setEmailNotification(!prev);
      return !prev;
    });
  };
  const toggleSmsNotification = () => {
    setSms((prev) => {
      setSmsNotification(!prev);
      return !prev;
    });
  };
  const togglePhoneNotification = () => {
    setPhone((prev) => {
      setPhoneNotification(!prev);
      return !prev;
    });
  };

  return (
    <div>
      <div>
        <div className="SettingsRight SettingsRight1">
          <h1>帳戶設定</h1>
        </div>

        {/* <!-- 個人資料 --> */}
        <div className="SettingsRight SettingsRight2">
          <h3>個人資料</h3>
          <span
            onClick={() => setPage(5)}
            style={{ textDecoration: "underline" }}
            className="setPage"
          >
            編輯
          </span>

          <div className="SettingsBox">
            <p>姓名:</p>
            <label>{user.userName}</label>
          </div>
          <div className="SettingsBox">
            <p>生日:</p>
            <label>{new Date(user.birthday).toLocaleDateString("zh-TW")}</label>
          </div>
          <div className="SettingsBox">
            <p>您的性別:</p>
            <label>{user.gender}</label>
          </div>
        </div>

        {/* <!-- 帳戶資料 --> */}
        <div className="SettingsRight SettingsRight3">
          <h3>帳戶資料</h3>
          <span
            onClick={() => setPage(6)}
            style={{ textDecoration: "underline" }}
            className="setPage"
          >
            編輯
          </span>

          <div className="SettingsBox">
            <p>電子郵件:</p>
            <label>{user.email}</label>
          </div>
          <div className="SettingsBox">
            <p>手機號碼:</p>
            <label>{user.phoneNumber}</label>
          </div>
          <div className="SettingsBox">
            <p>密碼:</p>
            <label>{user.password ? "******" : ""}</label>
          </div>
        </div>

        {/* <!-- 接收訊息方式 --> */}
        <div className="SettingsRight SettingsRight4">
          <h3>接收訊息方式</h3>
          <p>搶先獲得最新產品資訊、服務、優惠資訊及線上購物到貨通知。</p>

          <div className="SettingsBox">
            <p>電子郵件(以電子信箱接收)</p>
            <button
              onClick={toggleEmailNotification}
              className={`toggle-button ${email ? "active" : "inactive"}`}
            >
              {email ? "是" : "否"}
            </button>
          </div>

          <div className="SettingsBox">
            <p>簡訊(以簡訊接收)</p>
            <button
              onClick={toggleSmsNotification}
              className={`toggle-button ${sms ? "active" : "inactive"}`}
            >
              {sms ? "是" : "否"}
            </button>
          </div>

          <div className="SettingsBox">
            <p>電話(以電話接收)</p>
            <button
              onClick={togglePhoneNotification}
              className={`toggle-button ${phone ? "active" : "inactive"}`}
            >
              {phone ? "是" : "否"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
