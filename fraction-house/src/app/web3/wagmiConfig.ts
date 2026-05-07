/*
 * @Author: echo heart0magic@163.com
 * @Date: 2026-05-07 15:06:28
 * @LastEditors: echo heart0magic@163.com
 * @LastEditTime: 2026-05-07 15:48:30
 * @FilePath: \RealEstateRWADApp\fraction-house\src\app\web3\wagmiConfig.ts
 * @Description: 配置 Web3 钱包连接环境，主要用于 RainbowKit + Wagmi，让 DApp 可以连接钱包、切换链、发送交易、读取链上数据等
 */

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, mainnet } from "viem/chains";
import { http } from "wagmi";

export const wagmiConfig = getDefaultConfig({
    appName: "FractionHouse",
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "demo",
    chains: [sepolia, mainnet],
    transports: {
        [sepolia.id]: http(), //告诉 wagmi：访问 Sepolia 网络时，用 HTTP RPC 默认通道
        [mainnet.id]: http(),
    },
});
