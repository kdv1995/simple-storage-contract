import { JsonRpcSigner } from "ethers";
import { FC } from "react";

interface ConnectButtonProps {
  isConnected: boolean;
  connectButtonHandler: () => void;
  signer: JsonRpcSigner | undefined;
}
export const ConnectButton: FC<ConnectButtonProps> = ({
  isConnected,
  connectButtonHandler,
  signer,
}) => {
  return (
    <>
      {isConnected ? (
        <h3 className="text-red-500 text-lg">
          Connected with {signer?.address}
        </h3>
      ) : (
        <>
          <h1>Not Connected</h1>
          <button onClick={connectButtonHandler}>Connect</button>
        </>
      )}
    </>
  );
};
