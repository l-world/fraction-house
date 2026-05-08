/* 维护不同网络对应的合约地址表，并提供一个函数，让前端根据当前链 ID 获取正确的合约地址*/

// wagmi 内置链配置里引入两个网络
// sepolia 是以太坊测试网,hardhat 是本地开发链，通常用于本地测试智能合约
import { sepolia, hardhat } from "viem/chains";

// 定义并导出一个合约地址配置对象,用来保存不同链上的不同合约地址
export const CONTRACT_ADDRESSED = {
    [sepolia.id]: {
        marketplace: "0x0000000000000000000000000000000000000000",
        propertyNft: "0x0000000000000000000000000000000000000000",
    },
    [hardhat.id]: {
        marketplace: "0x0000000000000000000000000000000000000000",
        propertyNft: "0x0000000000000000000000000000000000000000",
    },
} as const;
// as const 让TypeScript 把这个对象变成“只读的精确类型”, 并且不允许随便修改
/*
    没有 as const 时，TypeScript 可能理解成：marketplace: string
    有了 as const 后，它会更精确地理解为：marketplace: "0x0000000000000000000000000000000000000000"
*/

// typeof CONTRACT_ADDRESSES 表示获取 CONTRACT_ADDRESSES 这个对象的类型
// keyof typeof CONTRACT_ADDRESSES:表示获取这个对象所有 key 的联合类型
// 大概等价于 type SupportedChainId = 11155111 | 31337,意思是：当前项目支持的链 ID 类型
export type SupportedChainId = keyof typeof CONTRACT_ADDRESSED;

export function getContractAddresses(chainId?: number) {
    if (!chainId) return null;

    // 根据 chainId 去 CONTRACT_ADDRESSES 里找对应的合约地址配置
    // chainId as SupportedChainId: 类型断言, 告诉 TypeScript先把这个 chainId 当成我支持的链 ID 来查
    return CONTRACT_ADDRESSED[chainId as SupportedChainId] ?? null;
}
