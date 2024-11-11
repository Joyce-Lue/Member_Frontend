import React, { useState } from "react";
import axios from "axios";

const ChangePersonalData = ({ setPage }) => {
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [error, setError] = useState("");

  const years = [];
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/update/account_setting";

    // 將 年、月、日 合併成一個日期字串
    const birthdayString = `${birthday.year}-${String(birthday.month).padStart(
      2,
      "0"
    )}-${String(birthday.day).padStart(2, "0")}`;

    const data = {
      userName,
      gender,
      birthday: birthdayString,
    };

    try {
      const response = await axios.post(url, data);
      // 根據回應處理結果
      if (response.data.success) {
        // setPage(6);
        alert("更改成功，請至帳戶設定的個人資料查看!");
        setUserName("");
        setGender("");
        setBirthday({ year: "", month: "", day: "" });
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
          <h1>更改個人資料</h1>
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className="changeRight2">
          <form onSubmit={handleSubmit} method="POST">
            <input
              type="text"
              placeholder="*姓名"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />

            {/* <!-- 性別 --> */}
            <label>您的性別</label>
            <div className="gender">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label>女</label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label>男</label>
              <input
                type="radio"
                name="gender"
                value="unknown"
                checked={gender === "unknown"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label>不願回答</label>
              <br />
            </div>

            {/* <!-- 生日 --> */}
            <label>生日</label>
            <br />
            {/* 年 */}
            <select
              name="year"
              value={birthday.year}
              onChange={(e) =>
                setBirthday({ ...birthday, year: e.target.value })
              }
              required
            >
              <option value="">*年</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {/* 月 */}
            <select
              name="month"
              value={birthday.month}
              onChange={(e) =>
                setBirthday({ ...birthday, month: e.target.value })
              }
              required
            >
              <option value="">*月</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            {/* 日 */}
            <select
              name="day"
              value={birthday.day}
              onChange={(e) =>
                setBirthday({ ...birthday, day: e.target.value })
              }
              required
            >
              <option value="">*日</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            {/* <!-- 按鈕 --> */}
            <br />
            <span onClick={() => setPage(1)}>回上頁</span>
            <button>更新</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePersonalData;
