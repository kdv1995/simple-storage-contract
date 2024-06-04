import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3ProviderContext";
import { Contract, JsonRpcSigner } from "ethers";
import ContractABI from "../../../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json";
import { globalConstants } from "../constants";
import { main } from "../utils/smartContractHandlers";

export const useInitializeWeb3 = () => {
  const { provider } = useContext(Web3Context);
  const [isConnected, setIsConnected] = useState(false);

  const [signer, setSigner] = useState<JsonRpcSigner>();
  const contractReadOnly = new Contract(
    globalConstants.address,
    ContractABI.abi,
    provider
  );
  const contractWriteable = new Contract(
    globalConstants.address,
    ContractABI.abi,
    signer
  );

  useEffect(() => {
    if (localStorage.getItem("address")) {
      main(provider, setIsConnected, setSigner).catch(console.error);
    } else {
      return;
    }
  }, []);

  return {
    isConnected,
    setIsConnected,
    signer,
    contractReadOnly,
    contractWriteable,
    setSigner,
  };
};
