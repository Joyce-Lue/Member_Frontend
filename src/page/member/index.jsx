import React, { useState } from "react";

import MemberList from "../../components/MemberList";
import Account from "./Account";
import Settings from "./Settings";
import Address from "./Address";

import ChangePersonalData from "./ChangePersonalData";
import ChangeAccountData from "./ChangeAccountData";

import ChangeEmail from "./ChangeEmail";
import ChangePhone from "./ChangePhone";
import ChangePassword from "./ChangePassword";

import OrderLog from "./OrderLog";
import Collect from "./Collect";

const Member = () => {
  const [page, setPage] = useState(0);

  // 設置通知狀態
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);
  const [phoneNotification, setPhoneNotification] = useState(false);

  // 檢查是否有任何通知方式被選中
  const newsLetterStatus =
    emailNotification || smsNotification || phoneNotification;

  return (
    <>
      {/* <Header/> */}

      <div className="container">
        <div className="container2">
          <MemberList setPage={setPage} />
        </div>
        <div className="container3">
          {page === 0 && <Account  newsLetterStatus={newsLetterStatus}  />}
          {page === 1 && (
            <Settings
              setPage={setPage}
              setEmailNotification={setEmailNotification}
              setSmsNotification={setSmsNotification}
              setPhoneNotification={setPhoneNotification}
            />
          )}{/* 傳遞狀態給 Settings 組件 */}
          {page === 2 && <Address setPage={setPage} />}
          {page === 3 && <OrderLog />}
          {page === 4 && <Collect />}

          {page === 5 && <ChangePersonalData setPage={setPage} />}
          {page === 6 && <ChangeAccountData setPage={setPage} />}

          {page === 7 && <ChangeEmail setPage={setPage} />}
          {page === 8 && <ChangePhone setPage={setPage} />}
          {page === 9 && <ChangePassword setPage={setPage} />}
        </div>
      </div>

      {/* <footer/> */}
    </>
  );
};

export default Member;
