import React, { useState } from "react";
import axios from "axios";

const ChangeEmail = ({ setPage }) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    // 驗證新電子郵件和重新輸入的電子郵件
    if (email !== confirmEmail) {
      setError("新電子信箱和重新輸入的新電子信箱不一致");
      return;
    }

    const url = "http://localhost:8000/update/account_setting_email";
    const data = {
      currentEmail,
      email,
      currentPassword,
    };

    try {
      const response = await axios.post(url, data);
      // 根據回應處理結果
      if (response.data.success) {
        // alert("更新成功，將導向回上一頁!");
        setPage(6);
      } else {
        setError(response.data.message); // 顯示錯誤訊息
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "發生錯誤，請稍後再試");
      } else {
        setError("請確認資料輸入正確!");
      }
    }
  };

  return (
    <div>
      <div>
        <div className="changeRight1">
          <h1>更改電子信箱</h1>
        </div>
       
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      
        <div className="changeRight2">
          <form onSubmit={handleSubmit} method="POST">
            <input
              type="email"
              placeholder="*目前電子信箱"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder="*新電子信箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder="*重新輸入新電子信箱"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="*目前密碼"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <div class="aButton">
              <span onClick={() => setPage(6)}>回上頁</span>
              <button>送出</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
