import "./index.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Qrcode from "./components/QRCode/Qrcode";
import ProposeList from "./components/ProposesList/ProposeList";
import Watchvideo from "./components/watchVideo/Watchvideo";
import Web3 from "web3";
import { useState, createContext, useEffect } from "react";
import {
  createReactClient,
  studioProvider,
  LivepeerConfig,
} from "@livepeer/react";

const ethers = require("ethers");
// const fs = require("fs-extra");

export const AppStateContext = createContext(null);

function App() {
  const [login, setlogin] = useState(false);
  const [walletaddress, setwalletaddress] = useState("");
  const [description, setdescription] = useState("");
  const [uploadSucess, setuploadSucess] = useState(false);
  const [proposalData, setproposalData] = useState([]);
  const [provider, setprovider] = useState("");
  const [signer, setsigner] = useState("");
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [web3Obj, setWeb3Obj] = useState();

  const client = createReactClient({
    provider: studioProvider({
      apiKey: "6a234aef-9c9c-41a1-82ba-948e33476fa2",
    }),
  });

  // useEffect(() => {
  //   async function ethersConnect() {
  //     await window.ethereum.enable();
  //     let provider = new ethers.providers.Web3Provider(window.ethereum);
  //     let contractAddress = "0x3368f41abd14350782f19346872fa36d2fb111a7";

  //     const signer = provider.getSigner();

  //     let contract = new ethers.Contract(contractAddress, abi, provider);

  //     const daiWithSigner = contract.connect(signer);

  //     const registerContendId = await contract.registerContentId(123);
  //     await registerContendId.wait();
  //   }
  // }, []);

  function registerContendId(id, contract, account) {
    contract.methods
      .registerContentId(id)
      .send({ from: account })
      .then(function (receipt) {
        if (receipt) {
          console.log("Fucntion is sucessfull");
        } else {
          console.log("Function is not succesfull");
        }
      });
  }

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      setWeb3Obj(web3);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      const _contract = new web3.eth.Contract(
        abi,
        "0x3368f41abd14350782f19346872fa36d2fb111a7"
      );
      _contract.address = "0x3368f41abd14350782f19346872fa36d2fb111a7";
      setContract(_contract);
      console.log(`COntract Object ${contract}`);

      // registerContendId(123, contract, walletaddress);
    }

    load();
  }, []);

  return (
    <>
      <LivepeerConfig client={client}>
        <AppStateContext.Provider
          value={{
            login,
            setlogin,
            walletaddress,
            setwalletaddress,
            description,
            setdescription,
            uploadSucess,
            setuploadSucess,
            proposalData,
            setproposalData,
          }}
        >
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/qrcode" element={<Qrcode />} />
              <Route exact path="/list" element={<ProposeList />} />
              <Route exact path="/watchvideo" element={<Watchvideo />} />
            </Routes>
          </Router>
        </AppStateContext.Provider>
      </LivepeerConfig>
    </>
  );
}

export default App;

let abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Proposals",
    outputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "contendId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "AncillaryData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "StartingTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ExpirationTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "passed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCids",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "getData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "getExpirationTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOracleAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "getSettledData",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "getStartingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "getState",
    outputs: [
      {
        internalType: "enum OptimisticOracleV2Interface.State",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "proposedPrice",
        type: "int256",
      },
    ],
    name: "propose",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "registerContentId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "requestData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "setAncillaryData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentId",
        type: "uint256",
      },
    ],
    name: "settleRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
