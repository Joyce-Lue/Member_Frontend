import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/forgetPassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/forgetPassword",
        { email }
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "發生錯誤，請再試一次！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <header /> */}

      <div className="container">
        <div className="forgetContainer">
          <div className="forgetRight forgetRight1">
            <h1>忘記密碼 ?</h1>
          </div>
          <div className="forgetRight forgetRight2">
            <p>
              請在下方輸入電子郵件並案下重設密碼，
              <br />
              我們將寄重設密碼的連結到您的電子郵件。
            </p>

            <input
              type="email"
              placeholder="請輸入電子郵件"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <Link to="/login">回上頁</Link>
              <button onClick={handleResetPassword} disabled={loading}>
                {loading ? "發送中..." : "重設密碼"}
              </button>
            </div>
            {message && <p style={{ color: "red" }}>{message}</p>}
          </div>
          <div className="forgetRight forgetRight3">
            <h2>客服中心</h2>
            <p>
              若您需要協助，請撥打客服中心:0800-963-852，我們將協助您設定新密碼。
            </p>
          </div>
        </div>
      </div>

      {/* <footer /> */}
    </>
  );
};

export default ForgetPassword;
