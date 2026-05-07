/*
 * @Author: echo heart0magic@163.com
 * @Date: 2026-05-07 15:54:25
 * @LastEditors: echo heart0magic@163.com
 * @LastEditTime: 2026-05-07 16:18:01
 * @FilePath: \RealEstateRWADApp\fraction-house\src\app\providers\AppProviders.tsx
 * @Description: 给整个 React 应用包上一层 Web3 能力 Provider，让子组件都能连接钱包、读链、发交易、管理异步状态
 */

//引入 RainbowKit 默认样式, 没有这句钱包连接弹窗可能会没有正常样式
import "@rainbow-me/rainbowkit/styles.css";

/*
    RainbowKitProvider 是 RainbowKit 的上下文容器。
    它负责提供：
        钱包连接弹窗
        钱包列表
        网络切换 UI
        钱包连接状态展示能力

*/
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

/*
    WagmiProvider 是 wagmi 的核心 Provider
    它负责把wagmiConfig配置，注入到整个 React 应用里
    这样子组件才能用 wagmi hooks，比如：
        useAccount()
        useReadContract()
        useWriteContract()
        useBalance()
    没有 WagmiProvider，这些 hooks 就无法正常工作
*/
import { WagmiProvider } from "wagmi";

/*
    wagmi 底层依赖 React Query 来管理异步请求状态
    比如：
        链上数据缓存
        loading 状态
        error 状态
        自动刷新
        请求去重
        refetch
*/
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../web3/wagmiConfig";

/*
    创建一个 React Query 的客户端实例
    前端异步数据请求的缓存管理器,它会帮你管理类似这种状态
        data,
        isLoading,
        error,
        refetch

*/
const queryClient = new QueryClient();

type AppProviderProps = {
    children: React.ReactNode; // React.ReactNode 表示 React 里所有可以被渲染的内容, 比如 <div />."文本",123,null,<App />
};

/*
    AppProviders
  └── WagmiProvider：提供 Web3 配置
        └── QueryClientProvider：提供请求缓存
              └── RainbowKitProvider：提供钱包连接 UI
                    └── App 页面组件

    WagmiProvider 提供 wagmi 的 Web3 配置,它让整个应用知道：
        当前支持哪些链
        钱包怎么连接
        RPC 怎么请求
        合约怎么读写
    QueryClientProvider ,中间层，
    提供异步请求缓存能力。
    wagmi 的 hooks 需要它。
    如果没有它，很多 wagmi hooks 会报错

    children 表示这个 Provider 包裹的子内容
*/
export function AppProviders({ children }: AppProviderProps) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
