import React,{useState} from 'react'
import { ethers, BigNumber } from "ethers";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    getProvider,
    getSigner,
    getRouter
} from './CommonFunctions.js'
import {
    router_address,
    
  } from "./Address/Address";

import Router_Abi from "./AbiStorage/Router_Abi.json";



const SwapToken = () => {
    const [amountOut, setAmountOut] = useState(null)

    const formik = useFormik({
        initialValues: {
          addressToken1: "",
          addressToken2: "",
          amountIn: "",
        },
        validationSchema: Yup.object({
          token1Amount: Yup.string().required("Required"),
          token2Amount: Yup.string().required("Required"),
          account: Yup.string().required("Required"),
        }),
        onSubmit:   (values, { resetForm }) => {

            console.log("im here")
            // const provider = getProvider();
            // const signer = getSigner(provider);
            // const routerContract = getRouter(router_address,signer)

            // console.log(routerContract)
            // console.log(values.addressToken1)

            //  const getAmountOut= async()=>{

            //     try {
            //         const values_out = await routerContract.getAmountsOut(
            //           ethers.utils.parseEther(values.amountIn),
            //           [values.address1, values.address2]
            //         );
            //         const amount_out = ethers.utils.formatEther(values_out[1]);
            //         return Number(amount_out);
            //       } catch {
            //         return false;
            //       }

            //  } 

            //  console.log(getAmountOut());  
            
              
           },
    });
    
    

   


  return (
    <div>
      <form className="p-3 mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            id="addressToken1"
            name="addressToken1"
            placeholder="addressToken1"
            type="text"
            {...formik.getFieldProps("addressToken1")}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>

          <input
            id="addressToken2"
            name="addressToken2"
            placeholder="addressToken2"
            type="text"
            {...formik.getFieldProps("addressToken2")}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>

          <input
            id="amountIn"
            name="amountIn"
            placeholder="amountIn"
            type="amountIn"
            {...formik.getFieldProps("amountIn")}
          />
        </div>
        <button type="submit" className="btn mt-3">
          Swap
        </button>
      </form>



    </div>
  )
}

export default SwapToken