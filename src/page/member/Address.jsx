import React, { useState } from "react";
import axios from "axios";

const Address = ({ setPage }) => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [TelePhone, setTelePhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/update/my_account";
    // 構建要發送的數據
    const data = {
      userName,
      phoneNumber,
      TelePhone,
      address1,
      address2,
    };

    try {
      const response = await axios.post(url, data);
      // 根據回應處理結果
      if (response.data.success) {
        setPage(0);
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
        <div className="AddressRight1">
          <h1>帳戶地址</h1>
        </div>
        <div className="AddressRight2">
          <p>* 表示必填欄位</p>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <input
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="*姓名"
              required
            />
            <br />
            <input
              name="address1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              type="text"
              placeholder="*配送地址1"
              required
            />
            <br />
            <input
              name="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              type="text"
              placeholder="配送地址2"
            />
            <br />
            <input
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="*手機號碼"
              required
            />
            <br />
            <input
              name="TelePhone"
              value={TelePhone}
              onChange={(e) => setTelePhone(e.target.value)}
              type="text"
              placeholder="市內電話"
            />
            <br />
            <button>送出</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
