import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    getWalletInfo();
  }, []);

  const getWalletInfo = async () => {
    try {
      const { data } = await axios.get("/api/getwallet");
      console.log("data", data);
      setWallet(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const depositUSDC = async () => {
    try {
      const { data } = await axios.post("/api/depositusdc");
      console.log("deposit 5 USDC", data);
      setWallet(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 `}
    >
      <h1 className="text-2xl">Circle Example</h1>

      {wallet && (
        <div className="walletinfo my-4 justify-center flex flex-col items-center">
          <p> WalletMasterId: {wallet?.walletId}</p>
          {wallet.balances && wallet.balances.length > 0 ? (
            wallet.balances.map((balance, index) => (
              <p key={index}>
                {balance.currency} : {balance.amount}
              </p>
            ))
          ) : (
            <p>No balances</p>
          )}
        </div>
      )}

      <button
        className="bg-green-400 px-2 py-2 rounded-md text-black my-8 font-bold text-xl"
        onClick={() => depositUSDC()}
      >
        Deposit 5$USDC
      </button>
    </main>
  );
}
