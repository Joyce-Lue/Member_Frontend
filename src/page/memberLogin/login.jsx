import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "../../styles/login.css";

const Login = () => {
  const [state, setState] = useState(true);
  const goLogin = () => setState(true);
  const goRegister = () => setState(false);

  // 處理 註冊和登入
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e, isLogin) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8000/login"
      : "http://localhost:8000/register";
    const data = isLogin ? { email, password } : { userName, email, password };

    // console.log('---------我是handleSubmit分隔線-----------');
    // console.log(url);
    // console.log(data);
    // console.log('---------我是handleSubmit分隔線-----------');

    try {
      const response = await axios.post(url, data);

      // 原始寫法:
      localStorage.setItem("userID", response.data);

      // console.log('aaaaa', url)
      // console.log('aaaaa', data)
      // console.log('aaaaa1', response)
      // console.log('bbbbb', response.data)

      alert(isLogin ? "登入成功！" : "註冊成功！");
      history.push(isLogin ? "/member" : setState(true));
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log("aaaaa2", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "發生錯誤，請再試一次。");
      } else {
        setError("抱歉，我們無法識別您的登錄資料。請再試一遍。");
      }
    }
  };

  return (
    <main>
      <div style={{ marginLeft: "30%", marginRight: "30%" }}>
        <div>
          <ul className="noBullets horizontallyCenter">
            <li
              className={`LoginLi ${state ? "active" : "inactive"}`}
              onClick={goLogin}
            >
              <h2 className="LoginHeader">會員登入</h2>
            </li>
            <li
              className={`LoginLi ${!state ? "active" : "inactive"}`}
              onClick={goRegister}
            >
              <h2 className="LoginHeader">註冊</h2>
            </li>
          </ul>
        </div>
        <div>
          <ul className="noBullets horizontally">
            <li className={`Line ${state ? "active" : "inactive"}`}></li>
            <li className={`Line ${!state ? "active" : "inactive"}`}></li>
          </ul>
        </div>

        {/* <!-- 登入 --> */}
        {state && (
          <div>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
            <div className="horizontallyCenter LoginMargin">
              <p>歡迎回來。登入並繼續瀏覽頁面。</p>
            </div>
            <form onSubmit={(e) => handleSubmit(e, true)} method="POST">
              <div className="horizontallyCenter LoginMargin">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="電子郵件"
                  required
                />
              </div>
              <div className="horizontallyCenter LoginMargin">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  placeholder="密碼"
                  required
                />
              </div>
              <div className="horizontallyCenter LoginMargin">
                <Link to="/ForgetPassword">
                  <span className="forget">忘記密碼?</span>
                </Link>
              </div>
              <div className="horizontallyCenter LoginMargin">
                <input type="checkbox" id="loginRember" />
                <label htmlFor="loginRember">記住我(選填)</label>
              </div>
              <div className="horizontallyCenter">
                <button>登入</button>
              </div>
            </form>
          </div>
        )}

        {/* <!-- 註冊 --> */}
        {!state && (
          <div>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
            <div className="LoginMargin horizontallyCenter">
              <p>註冊會員。將收到活動訊息並享有優惠!</p>
            </div>
            <form onSubmit={(e) => handleSubmit(e, false)} method="POST">
              {/* 姓名 */}
              <div className="horizontallyCenter  LoginMargin">
                <input
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="姓名"
                  required
                />
              </div>
              {/* 電子郵件 */}
              <div className="horizontallyCenter LoginMargin">
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="電子郵件"
                  required
                />
              </div>

              {/* 密碼 */}
              <div className="horizontallyCenter LoginMargin">
                <input
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="密碼"
                  required
                />
              </div>
              <div className="horizontallyCenter LoginMargin">
                <input type="checkbox" id="loginRember" required />
                <label htmlFor="loginRember">
                  本人已年滿18歲並以閱讀且同意 <br />{" "}
                  IRISEL公司的條款細則和隱私權政策 。
                </label>
              </div>
              <div className="horizontallyCenter LoginMargin">
                <button>註冊</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
