import React, { FC, useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./routes/main";

const App: FC = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      // 브라우저에 Metamask가 설치되어 있다면 실행되고, 아니면 else 문이 실행된다.
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } else {
        alert("Install Metamask.");
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main account={account} />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;