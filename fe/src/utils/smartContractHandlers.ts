import { BrowserProvider } from "ethers";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import { Dispatch, SetStateAction } from "react";

export const main = async (
  provider: BrowserProvider,
  setIsConnected: Dispatch<SetStateAction<boolean>>,
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | undefined>>
) => {
  await provider.getSigner().then((signer) => {
    try {
      if (signer) {
        setIsConnected(true);
        setSigner(signer);

        localStorage.setItem("address", signer.address);
      }
    } catch (error) {
      localStorage.removeItem("address");
      console.error(error);
    }
  });
};
export const getCurrentFavouriteNumber = async (contract: Contract) => {
  const favouriteNumber = await contract.retrieveTheNumber();
  return favouriteNumber;
};

export const storeTheNumber = async (
  num: number,
  contract: Contract,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  setIsLoading(true);
  let receipt;
  const tx = await contract.storeTheNumber(num);
  receipt = await tx.wait();
  if (receipt) setIsLoading(false);
  return receipt;
};

export const storeTheNumberFromSomeone = async (
  num: number,
  name: string,
  contract: Contract,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  let receipt;
  const tx = await contract.storeTheNumberFromSomeone(num, name);
  receipt = await tx.wait();
  if (receipt) setIsLoading(false);
  return receipt;
};

export const getPerson = async (index: number, contract: Contract) => {
  let person = await contract.getPerson(index);
  return person;
};
