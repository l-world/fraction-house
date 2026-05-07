import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, mainnet } from "viem/chains";
import { http } from "wagmi";

export const wagmiConfig = getDefaultConfig({
    appName: "FractionHouse",
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "demo",
    chains: [sepolia, mainnet],
    transports: {
        [sepolia.id]: http(),
        [mainnet.id]: http(),
    },
});
