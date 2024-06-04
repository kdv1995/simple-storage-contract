import { FC, createContext, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

export const Web3Context = createContext<Web3ContextProps>({
  provider: new BrowserProvider(window.ethereum),
});

interface Web3ContextProps {
  provider: BrowserProvider;
}

interface Web3ProviderContextProps {
  children: React.ReactNode;
}

export const Web3ContextProvider: FC<Web3ProviderContextProps> = ({
  children,
}) => {
  const [provider, setProvider] = useState<BrowserProvider>(
    new BrowserProvider(window.ethereum)
  );

  async function main() {
    try {
      if (window.ethereum) {
        setProvider(new BrowserProvider(window.ethereum));
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    main().catch(console.error);
  }, []);

  const contextValues = {
    provider,
  };

  return (
    <Web3Context.Provider value={contextValues}>
      {children}
    </Web3Context.Provider>
  );
};
