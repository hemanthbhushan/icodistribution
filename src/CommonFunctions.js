import Router_abi from "./AbiStorage/Router_Abi.json";
import Factory_Abi from "./AbiStorage/Factory_Abi.json";
import { ethers, BigNumber } from "ethers";



export function getProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
  }

export function getSigner(provider) {
    return provider.getSigner();
  }

export function getRouter(address, signer) {
    return new ethers.Contract(address, Router_abi, signer);
  }

  export function getFactory(address, signer) {
    return new new ethers.Contract(address, Factory_Abi, signer);
  }
