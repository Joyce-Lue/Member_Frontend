import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Collect = () => {
  const [collect, setCollect] = useState(0); // 沒收藏改為0 有收藏改為1
  const [userCollect, setUserCollect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let myUserID = localStorage.getItem("userID");
        let response = await axios.get("http://localhost:8000/api/collection");
        let foundCollect = response.data.filter(
          (item) => item.userID === parseInt(myUserID)
        );
        setUserCollect(foundCollect);
        setCollect(foundCollect.length > 0 ? 1 : 0);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 加入收藏

  // 取消收藏
  const handleRemoveCollect = async (collectID, userID) => {
    try {
      await axios.delete(`http://localhost:8000/api/collection/delete`, {
        data: { collectID, userID },
      }); // 使用 data 傳遞 collectID 到後端

      // 更新前端列表
      setUserCollect((prev) =>
        prev.filter((item) => item.collectID !== collectID)
      );
      setCollect(userCollect.length > 1 ? 1 : 0); // 更新收藏數量狀態
    } catch (err) {
      setError(err);
    }
  };

  // 加入購物車(還沒測試)
  const handleAddCart = async (collect) => {
    const url = "http://localhost:8000/api/collection/addCart";

    const data = {
      productID: collect.productID,
      productName: collect.productName,
      capacity: collect.capacity,
      unitPrice: collect.unitPrice,
      img_url: collect.img_url,
    };

    try {
      const response = await axios.post(url, data);

      if (response.data.success) alert("已加入購物車！");
    } catch (err) {
      console.log("加入購物車錯誤:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "發生錯誤，請再試一次。");
      } else {
        setError("抱歉，請再試一遍。");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        <div className="collectRight1">
          <h1>收藏</h1>
        </div>
        {/* 沒有收藏紀錄 */}
        {collect === 0 && (
          <div className="collectRight2">
            <p>沒有您的最愛，欲新增請在商品頁面點選右上的圖示即可!</p>
            <Link to="/shopping">繼續購物</Link>
          </div>
        )}

        {/* 有收藏紀錄 */}
        {collect === 1 && (
          <div className="Collect2Right2">
            {userCollect.map((collect) => (
              <div className="bottom" key={collect.collectID}>
                <div className="info">
                  <img src={collect.img_url} alt="商品圖片" />
                </div>
                <div className="info1">
                  <p>商品名稱 : {collect.productName}</p>
                  <p>容量 : {collect.capacity}ml</p>
                  <p>價格 : ${collect.unitPrice}</p>
                </div>
                <div className="info2">
                  <p className="add" onClick={() => handleAddCart()}>
                    加入購物車
                  </p>
                  <p
                    className="delete"
                    onClick={() =>
                      handleRemoveCollect(collect.collectID, collect.userID)
                    }
                  >
                    取消收藏
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collect;
