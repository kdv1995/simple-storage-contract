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
import { Header } from "./components/Header";

function App() {
  const { provider } = useContext(Web3Context);
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [isConnected, setIsConnected] = useState(false);
  const [favouriteNumber, setFavouriteNumber] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    number: "",
  });

  const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formValues);
  };

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

  const storeTheNumberHandler = async () => {
    const num = Number(parseInt(inputValue));
    await storeTheNumber(num, contractWriteable, setIsLoading)
      .then((receipt) => {
        if (receipt) {
          setFavouriteNumber(num.toString());
          setFavouriteNumber("");
        }
      })
      .catch(console.error);
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
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
    <div className="bg-neutral-700 p-5">
      <Header
        setSigner={setSigner}
        isConnected={isConnected}
        signer={signer}
        setIsConnected={setIsConnected}
      />

      {signer && isConnected && (
        <>
          <div className="flex flex-col">
            <h2 className="text-slate-100 text-xl">
              Contract address: {globalConstants.address}
            </h2>
            <div className="text-white text-left">
              Current favourite number:{favouriteNumber}
            </div>
            <h3 className="text-red-400 mt-5 text-left">
              Would you like to change it?
            </h3>
            <div className="flex items-center mt-5 gap-2">
              <input
                className="form-input"
                placeholder="Enter a new number"
                value={inputValue}
                onChange={(e) => handleInputValueChange(e)}
              />
              <button
                className="text-white text-2xl  bg-red-300 px-2 py-1"
                onClick={storeTheNumberHandler}
              >
                Store the new number
              </button>
            </div>
            <div className="text-white mt-5">
              {isLoading && "Loading... Please sign transactions with Metamask"}
            </div>
            <div>
              <h1 className="text-left text-white">
                Would you like to store your name and number together?
              </h1>
              <div className="flex items-center mt-5 gap-2">
                <input
                  className="form-input"
                  name="name"
                  placeholder="Enter your name"
                  value={formValues.name}
                  onChange={(e) => handleFormValues(e)}
                />
                <input
                  className="form-input"
                  name="number"
                  placeholder="Enter your number"
                  value={formValues.number}
                  onChange={(e) => handleFormValues(e)}
                />
                <button
                  className="text-white text-2xl  bg-red-300 px-2 py-1"
                  onClick={storeTheNumberHandler}
                >
                  Store your name and number
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
