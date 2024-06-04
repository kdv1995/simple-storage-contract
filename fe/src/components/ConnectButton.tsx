import { JsonRpcSigner } from "ethers";
import { FC } from "react";
import { FaEthereum } from "react-icons/fa6";

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
          <h1 className="text-2xl text-red-500">Not Connected</h1>
          <div>
            <button
              type="button"
              onClick={connectButtonHandler}
              className=" flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Connect to Metamask
              <FaEthereum size={25} />
            </button>
          </div>
        </>
      )}
    </>
  );
};
