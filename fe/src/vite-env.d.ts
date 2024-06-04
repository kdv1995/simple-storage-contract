/// <reference types="vite/client" />

import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: BrowserProvider;
  }
}
