import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [inputAmount, setInputAmount] = useState(0);
  const [transactionCount, setTransactionCount] = useState({
    deposit: 0,
    withdrawal: 0,
  });
  const [notifications, setNotifications] = useState({
    deposit: [],
    withdrawal: [],
  });

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected:", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once the wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const addNotification = (category, message, amount) => {
    const timestamp = new Date();
    setTransactionCount((prevCounts) => ({
      ...prevCounts,
      [category]: prevCounts[category] + 1,
    }));

    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [category]: [
        ...prevNotifications[category],
        { message, amount, timestamp },
      ],
    }));
  };

  const clearNotifications = () => {
    setNotifications({
      deposit: [],
      withdrawal: [],
    });
    setTransactionCount({
      deposit: 0,
      withdrawal: 0,
    });
  };

  const deposit = async () => {
    if (atm && inputAmount > 0) {
      try {
        let tx = await atm.deposit(inputAmount, {
          value: ethers.utils.parseEther(inputAmount.toString()),
        });
        await tx.wait();
        addNotification("deposit", "Deposit successful!", inputAmount);
        getBalance();
      } catch (error) {
        console.error("Error depositing:", error);
        addNotification("deposit", "Error depositing. Please try again.", "");
      }
    }
  };

  const withdraw = async () => {
    if (atm && inputAmount > 0) {
      try {
        let tx = await atm.withdraw(inputAmount);
        await tx.wait();
        addNotification("withdrawal", "Withdrawal successful!", inputAmount);
        getBalance();
      } catch (error) {
        console.error("Error withdrawing:", error);
        addNotification(
          "withdrawal",
          "Error withdrawing. Please try again.",
          ""
        );
      }
    }
  };

  const initUser = () => {
    // Check to see if the user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask to use this ATM.</p>;
    }

    // Check to see if the user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    // Additional details about the account owner
    const accountOwnerDetails = {
      name: "Praveen",
      country: "India",
    };

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Name: {accountOwnerDetails.name}</p>
        <p>Your Country: {accountOwnerDetails.country}</p>
        <p>Your Balance: {balance} ETH</p>
        <div className="input-container">
          <input
            type="number"
            placeholder="Enter amount"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          />
          <button className="deposit-button" onClick={deposit}>
            Deposit
          </button>
          <button className="withdraw-button" onClick={withdraw}>
            Withdraw
          </button>
        </div>
      </div>
    );
  };

  const renderNotifications = (category) => {
    return (
      <div className={category === "deposit" ? "left-notifications" : "right-notifications"}>
        <h2>{category === "deposit" ? "Deposit Notifications" : "Withdrawal Notifications"}</h2>
        <table className="notification-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {notifications[category].map((notification, index) => (
              <tr key={index} className="notification-item">
                <td>{notification.message}</td>
                {notification.amount && <td>{notification.amount} ETH</td>}
                <td>{notification.timestamp.toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          text-align: center;
          background-color: green;
          color: white;
          padding: 20px;
          min-height: 100vh;
        }

        .left-notifications {
          flex: 1;
          text-align: left;
        }

        .right-notifications {
          flex: 1;
          text-align: right;
        }

        .input-container {
          margin-top: 10px;
        }

        input {
          margin-right: 10px;
          padding: 5px;
        }

        .deposit-button,
        .withdraw-button {
          padding: 5px;
          border: none;
          cursor: pointer;
          background-color: white;
          color: green;
        }

        .clear-button {
          margin-top: 10px;
          padding: 5px;
          border: none;
          cursor: pointer;
          background-color: white;
          color: green;
        }

        .notification-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          background-color: green;
          color: white;
        }

        .notification-table th, .notification-table td {
          padding: 10px;
          border: 1px solid white;
        }

        .notification-item {
          margin-bottom: 15px;
        }
      `}</style>
      {initUser()}
      {renderNotifications("deposit")}
      {renderNotifications("withdrawal")}
      <button className="clear-button" onClick={clearNotifications}>
        Clear Notifications
      </button>
    </main>
  );
}

export {};
