import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderLog = () => {
  const [orderLog, setOrderLog] = useState(0); // 沒訂單狀態為0 有訂單狀態改為1
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const firstOrder = userOrders[0]; // 取第一筆訂單作為基本資訊顯示

  useEffect(() => {
    let fetchData = async () => {
      try {
        let myUserID = localStorage.getItem("userID");
        let response = await axios.get("http://localhost:8000/api/orders_log");
        let foundOrders = response.data.filter(
          (item) => item.userID === parseInt(myUserID)
        );

        setUserOrders(foundOrders);
        setOrderLog(foundOrders.length > 0 ? 1 : 0);
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

  return (
    <div>
      <div>
        <div className="OrderLogRight OrderLogRight1">
          <h1>訂單紀錄</h1>
        </div>
        {/* 沒有訂單紀錄 */}
        {orderLog === 0 && (
          <div className="OrderLogRight OrderLogRight2">
            <p>您目前還沒有訂單!</p>
            <a href="/shopping">繼續購物</a>
          </div>
        )}

        {/* 有訂單紀錄 */}
        {orderLog === 1 && firstOrder && (
          <div className="OrderLog2Right2">
            <p>
              訂購日期:
              {new Date(firstOrder.orderDate).toLocaleDateString("zh-TW")}
            </p>
            <div className="top">
              <p>狀態: {firstOrder.orderStatus} </p>
              <p>訂單總金額: ${firstOrder.totalAmount}</p>
            </div>

            {/* 迴圈顯示商品資訊 */}
            {userOrders.map((order, index) => (
              <div className="bottom" key={order.productID}>
                <div className="info">
                  <img src={order.img_url} alt="商品圖片" />
                </div>
                <div className="info1">
                  <p>商品名稱: {order.productName}</p>
                  <p>容量: {order.capacity}ml</p>
                  <p>數量: {order.quantity}</p>
                </div>
                <div className="info2">
                  <p>單價: ${order.unitPrice}</p>
                </div>
              </div>
            ))}

            {/* 用戶其他訂單 */}
            <hr />
            {/* <p>訂購日期</p>
            <div className="top">
              <p>運送狀態</p>
              <p>總金額</p>
            </div>
            <div className="bottom">
              <div className="info">
                <img src="" alt="商品圖片" />
              </div>
              <div className="info1">
                <p>商品名稱 :</p>
                <p>容量 :</p>
                <p>數量 :</p>
              </div>
              <div className="info2">
                <p>金額 :</p>
              </div>
            </div>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              檢視其他訂單 &darr;
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderLog;
