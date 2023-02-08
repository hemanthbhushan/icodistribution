import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import TestToken_Abi from './AbiStorage/TestToken_Abi.json'
import MusicVerse_abi from "./AbiStorage/Metaverse.json";

import { token1Address,token2Address } from "./Address/Address";
import RouterDetails from "./RouterDetails";




const TokenDetails = () => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [token1Contract, setToken1Contract] = useState(null);
  const [token2Contract, setToken2Contract] = useState(null);

  const [token1Name, setToken1Name] = useState("Token1");
  const [token1Symbol, setToken1Symbol] = useState("Symbol of token1")
  const [token2Name, setToken2Name] = useState("Token2");
  const [token2Symbol, setToken2Symbol] = useState("Symbol of token2")
 
  const [tk1Balance, setTk1Balance] = useState(null);
  const [tk2Balance, setTk2Balance] = useState(null);
  const [transferHash, setTransferHash] = useState(null);
  

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const updateBalance = async () => {
    let balanceBigN = await token1Contract.balanceOf(defaultAccount);
    let balanceNumber = balanceBigN.toString();

    let tokenDecimals = await token1Contract.decimals();

    let token1Balance = balanceNumber / Math.pow(10, tokenDecimals);

    setTk1Balance(toFixed(token1Balance));


  ///token 2
  let balanceBigN2 = await token2Contract.balanceOf(defaultAccount);
    let balanceNumber2 = balanceBigN2.toString();

    let tokenDecimals2 = await token2Contract.decimals();

    let token2Balance = balanceNumber2 / Math.pow(10, tokenDecimals2);

    setTk2Balance(toFixed(token2Balance));


  };

  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  }

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempToken1Contract = new ethers.Contract(
      token1Address,
      MusicVerse_abi,
      tempSigner
    );
    let tempToken2Contract = new ethers.Contract(
      token2Address,
      TestToken_Abi,
      tempSigner
    );
   
    setToken1Contract(tempToken1Contract);
    setToken2Contract(tempToken2Contract);
  };

  useEffect(() => {
    if (token1Contract != null && token2Contract !=null) {
      updateBalance();
      updateTokenDetails();
    }
  }, [token1Contract],[token2Contract]);

  const updateTokenDetails = async () => {
    setToken1Name(await token1Contract.name());
    setToken1Symbol(await token1Contract.symbol())
    setToken2Name(await token2Contract.name());
    setToken2Symbol(await token2Contract.symbol())
  };

  return (
    <div>
      <h2> {token1Name + " ERC-20 Wallet"} </h2>
      <button  onClick={connectWalletHandler}>
        {connButtonText}
      </button>

      <div >
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>

        <div>
       
          <h3>
            {token1Name} Balance: {tk1Balance}

          </h3>
          <span className="fas fa-key"></span>
          <h3> 
            {token2Name} Balance: {tk2Balance}
          </h3>
          <h3>

            TokenSymbol:{token1Symbol}
             </h3>

             <span className="fas fa-key"></span>
          <h3>
          TokenSymbol:{token2Symbol}
          </h3>
        </div>

        {errorMessage}
      </div>
      
      <RouterDetails token1Contract = {token1Contract} token2Contract={token2Contract} defaultAccount = {defaultAccount}/>
      
      {/* {contract !== null && <Interactions contract={contract} />} */}
    </div>
  );
};

export default TokenDetails;