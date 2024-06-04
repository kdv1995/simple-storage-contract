import "./App.css";
import { globalConstants } from "./constants";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "./context/Web3ProviderContext";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import ContractABI from "../../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json";
import {
  getCurrentFavouriteNumber,
  main,
  storeTheNumber,
} from "./utils/smartContractHandlers";
import { ConnectButton } from "./components/ConnectButton";

function App() {
  const { provider } = useContext(Web3Context);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [favouriteNumber, setFavouriteNumber] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(0);

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

  const connectButtonHandler = async () => {
    await main(provider, setIsConnected, setSigner).catch(console.error);
  };

  const storeTheNumberHandler = async () => {
    await storeTheNumber(inputValue, contractWriteable).catch(console.error);
  };

  useEffect(() => {
    if (localStorage.getItem("address")) {
      main(provider, setIsConnected, setSigner).catch(console.error);
      getCurrentFavouriteNumber(contractReadOnly).then((favouriteNumber) =>
        setFavouriteNumber((favouriteNumber as BigInt).toString())
      );
    } else {
      return;
    }
  }, [favouriteNumber, provider]);

  return (
    <div className="grid grid-cols-10 bg-neutral-700">
      <div className="col-span-10">
        <h1 className="text-white text-4xl mb-3">
          Simple Storage smart contract
        </h1>
        <h2 className="text-slate-100 text-xl">
          Contract address: {globalConstants.address}
        </h2>
        <ConnectButton
          connectButtonHandler={connectButtonHandler}
          isConnected={isConnected}
          signer={signer}
        />
      </div>
      <div className="col-span-2">
        <div className="text-white">
          Current favourite number:{favouriteNumber}
        </div>
        <h3 className="text-red-400 mt-5">Would you like to change it?</h3>
        <input
          value={inputValue}
          type="number"
          onChange={(e) => setInputValue(+e.target.value)}
        />
        <button
          className="text-white text-2xl rounded-xl bg-red-300"
          onClick={storeTheNumberHandler}
        >
          Store the new number
        </button>
      </div>
    </div>
  );
}

export default App;
