import React, { useState } from "react";
import axios from "axios";

const ChangePassword = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 驗證新密碼和重新輸入的密碼
    if (password !== confirmPassword) {
      setError("新密碼和重新輸入的新密碼不一致");
      return;
    }

    const url = "http://localhost:8000/update/account_setting_password";
    const data = {
      email,
      password,
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
          <h1>變更密碼</h1>
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="changeRight2">
          <form onSubmit={handleSubmit} method="POST">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="*目前電子信箱"
              required
            />
            <br />
            <input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              placeholder="*目前密碼"
              required
            />
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*新密碼"
              required
            />
            <br />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="*重新輸入新密碼"
              required
            />
            <br />
            <a href="/forgetPassword">忘記密碼</a>
            <p className="hint">
              &times;1個小寫字母&times;1個大寫字母&times;1個數字&times;最少8個字元
            </p>
            <div className="aButton">
              <span onClick={() => setPage(6)}>回上頁</span>
              <button>送出</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
