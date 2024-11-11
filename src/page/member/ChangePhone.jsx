import React, { useState } from "react";
import axios from "axios";

const ChangePhone = ({ setPage }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/update/account_setting_phonenumber";
    const data = { phoneNumber };

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
          <h1>更改手機號碼</h1>
        </div>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="changeRight2">
          <form onSubmit={handleSubmit} method="POST">
            <input
              type="tel"
              placeholder="*手機號碼"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

export default ChangePhone;
