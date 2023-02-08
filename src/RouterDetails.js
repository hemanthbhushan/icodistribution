import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  router_address,
  tokenAddress,
  factory_address,
} from "./Address/Address";

import PairDetails from "./PairDetails";

import Router_Abi from "./AbiStorage/Router_Abi.json";
import Factory_Abi from "./AbiStorage/Factory_Abi.json";
import Pair_Abi from "./AbiStorage/Pair_Abi.json";


const RouterDetails = ({ token1Contract, token2Contract, defaultAccount }) => {
  function expandTo18Decimals(n) {
    return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
  }
  const [provider, setProvider] = useState(0);
  const [signer, setSigner] = useState(0);
  const [routerContract, setRouterContract] = useState(null);
  const [factoryContract, setFactoryContract] = useState(null);
  

  const [reserve0, setReserve0] = useState(null)
    const [reserve1, setReserve1] = useState(null)

    const [liquidityTokenSymbol, setliquidityTokenSymbol] = useState("liquidity token symbol")
    const [liqudityBalance, setliqudityBalance] = useState(null)
    const [pairAddress, setPairAddress] = useState(null)
  // const [error, seterror] = useState([])

  let router_Contract, factory_Contract;
 

  const formik = useFormik({
    initialValues: {
      token1Amount: "",
      token2Amount: "",
      account: "",
    },
    validationSchema: Yup.object({
      token1Amount: Yup.string().required("Required"),
      token2Amount: Yup.string().required("Required"),
      account: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {


    try{
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
  
      let tempSigner = tempProvider.getSigner();
      setSigner(tempSigner);
  
      router_Contract = new ethers.Contract(
        router_address,
        Router_Abi,
        tempSigner
      );
      factory_Contract = new ethers.Contract(
        factory_address,
        Factory_Abi,
        tempSigner
      );
     
      setRouterContract(router_Contract);
      setFactoryContract(factory_Contract);
     

      await token1Contract.approve(router_Contract.address, values.token1Amount);
      await token2Contract.approve(router_Contract.address, values.token2Amount);
      console.log('router_address', router_address)

      // await token2Contract.approve(router_address, expandTo18Decimals(1000));
      console.log('router_router_Contract',router_Contract)

      const pairAddress = await factory_Contract.getPair(
        token1Contract.address,
        token2Contract.address
      );
      setPairAddress(pairAddress)
      

      const pair = new ethers.Contract(pairAddress, Pair_Abi, tempSigner)
      const  result = await pair.getReserves();
      const  _reserve0 = result._reserve0;
      const  _reserve1 = result._reserve1;
     
      setReserve0(_reserve0.toString())
      setReserve1(_reserve1.toString())
     const _liquidityBalance = await pair.balanceOf(defaultAccount);
     const  _liquidityTokenSymbol = await pair.symbol();
    
      setliqudityBalance(_liquidityBalance.toString());
      setliquidityTokenSymbol(_liquidityTokenSymbol)

   
     
     
    await router_Contract.addLiquidity(
        token1Contract.address,
        token2Contract.address,
        values.token1Amount,
        values.token2Amount,
        1000000000000,
        expandTo18Decimals(1),
        values.account,
        Math.floor(Date.now() / 1000) + 60 * 10
      );
     

     
     
    }catch(e){
    //  seterror(e)
    console.log(e)
    }
  }
  });

  return (
    <div>
       
      
      <h3>Add Liquidity</h3>
      <form className="p-3 mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            id="token1Amount"
            name="token1Amount"
            placeholder="token1Amount"
            type="text"
            {...formik.getFieldProps("token1Amount")}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>

          <input
            id="token2Amount"
            name="token2Amount"
            placeholder="token2Amount"
            type="token2Amount"
            {...formik.getFieldProps("token2Amount")}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>

          <input
            id="account"
            name="account"
            placeholder="account"
            type="account"
            {...formik.getFieldProps("account")}
          />
        </div>
        <button type="submit" className="btn mt-3">
          Add Liquidity
        </button>
      </form>

     
      <PairDetails pairAddress = {pairAddress} reserve0 = {reserve0}  reserve1 = {reserve1} liqudityBalance = {liqudityBalance} liquidityTokenSymbol = {liquidityTokenSymbol}  />
      
    </div>

  );
};

export default RouterDetails;
