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

export const storeTheNumber = async (num: number, contract: Contract) => {
  const tx = await contract.storeTheNumber(num);
  await tx.wait();
  return tx;
};
