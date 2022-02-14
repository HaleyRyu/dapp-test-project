import React, { FC, useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/layout";
import Main from "./routes/main";
import MyAnimal from "./routes/my-animal";
import SaleAnimal from "./routes/sale-animal";

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
    <Layout>
      <Routes>
        <Route path="/" element={<Main account={account} />} />
        <Route path="/my-animal" element={<MyAnimal account={account} />} />
        <Route
            path="sale-animal"
            element={<SaleAnimal account={account} />}
        />
      </Routes>
    </Layout>
  </BrowserRouter>
  );
};

export default App;