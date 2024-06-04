import { Dispatch, FC, SetStateAction, useContext } from "react";
import { globalConstants } from "../constants";
import { main } from "../utils/smartContractHandlers";
import { ConnectButton } from "./ConnectButton";
import { Web3Context } from "../context/Web3ProviderContext";
import { JsonRpcSigner } from "ethers";

interface HeaderProps {
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | undefined>>;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  signer: JsonRpcSigner | undefined;
}

export const Header: FC<HeaderProps> = ({
  setSigner,
  isConnected,
  setIsConnected,
  signer,
}) => {
  const { provider } = useContext(Web3Context);
  const connectButtonHandler = async () => {
    await main(provider, setIsConnected, setSigner).catch(console.error);
  };
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-white text-4xl mb-3">SSSC</h1>
      <ConnectButton
        connectButtonHandler={connectButtonHandler}
        isConnected={isConnected}
        signer={signer}
      />
    </div>
  );
};
