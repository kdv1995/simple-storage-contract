import { BrowserProvider, Contract } from "ethers";
import "./App.css";
import { globalConstants } from "./contstants";
import ContractABI from "../../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json";

function App() {
  let signer;
  let provider;
  let contract;
  async function web3Provider() {
    if (window.ethereum) {
      provider = new BrowserProvider(window.ethereum);
      signer = provider.getSigner().then((signer) => {
        contract = new Contract(
          globalConstants.address,
          ContractABI.abi,
          signer
        );
        getOwner().then(() => storeNumber(10));
      });
    }
  }

  async function getOwner() {
    const owner = await contract.owner();
    console.log(owner);
  }

  async function storeNumber(num: number) {
    const tx = await contract.storeTheNumber(num);
    await tx.wait().then(() => {
      contract.retrieveTheNumber().then((res: any) => {
        console.log(res);
      });
    });
  }

  return (
    <div>
      <button onClick={web3Provider}>Connect</button>
    </div>
  );
}

export default App;
