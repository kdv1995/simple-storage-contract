import "./App.css";
import { globalConstants } from "./constants";
import { useContext, useEffect, useState } from "react";
import {
  getCurrentFavouriteNumber,
  getPerson,
  storeTheNumber,
  storeTheNumberFromSomeone,
} from "./utils/smartContractHandlers";
import { Header } from "./components/Header";
import { useInitializeWeb3 } from "./hooks/useInitializeWeb3";
import { Web3Context } from "./context/Web3ProviderContext";

function App() {
  const { provider } = useContext(Web3Context);
  const [favouriteNumber, setFavouriteNumber] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    number: "",
  });

  const [currentChosenPerson, setCurrentChosenPerson] = useState(null);
  const [currentChosenPersonIndex, setCurrentChosenPersonIndex] = useState(0);

  const handleCurrentChosenPersonIndex = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentChosenPersonIndex(Number(e.target.value));
  };

  const {
    isConnected,
    signer,
    contractWriteable,
    contractReadOnly,
    setSigner,
    setIsConnected,
  } = useInitializeWeb3();

  const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const storeTheNumberHandler = async () => {
    const num = Number(parseInt(inputValue));
    await storeTheNumber(num, contractWriteable, setIsLoading)
      .then((receipt) => {
        if (receipt) {
          setFavouriteNumber(num.toString());
        }
      })
      .catch(console.error);
  };

  const storeNameAndNumberFromOthersHandler = async () => {
    const num = Number(parseInt(formValues.number));
    const name = formValues.name;
    await storeTheNumberFromSomeone(
      num,
      name,
      contractWriteable,
      setIsLoading
    ).then((receipt) => {
      if (receipt) {
        setFormValues({
          name: "",
          number: "",
        });
      }
    });
  };

  const getPersonByIndexHandler = async () => {
    await getPerson(currentChosenPersonIndex, contractReadOnly)
      .then((person) => setCurrentChosenPerson(person))
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    getCurrentFavouriteNumber(contractReadOnly).then((favouriteNumber) =>
      setFavouriteNumber((favouriteNumber as BigInt).toString())
    );
    getPersonByIndexHandler();
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
                  onClick={storeNameAndNumberFromOthersHandler}
                >
                  Store your name and number
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isConnected && (
        <>
          <div className="flex items-center mt-5 gap-2">
            <input
              type="text"
              placeholder="Enter index"
              onChange={(e) => handleCurrentChosenPersonIndex(e)}
            />
            <button
              className="text-white text-xl bg-yellow-500 px-3 py-1"
              onClick={getPersonByIndexHandler}
            >
              Get user by index
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Current index {currentChosenPersonIndex}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {currentChosenPersonIndex}
                  </th>
                  <td className="px-6 py-4">
                    {currentChosenPerson[0].toString() || "No data"}
                  </td>
                  <td className="px-6 py-4">
                    {currentChosenPerson[1] || "No Data"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
