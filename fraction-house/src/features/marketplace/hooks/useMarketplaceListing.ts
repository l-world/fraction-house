// 根据 marketplace 合约地址和 listingIndex，读取某一条房产挂单信息，并把链上原始数据转换成前端好用的数据结构
// 把“读合约 + 数据格式转换 + loading/error 状态”封装在一起

// useReadContract作用读取智能合约里的数据，适合调用 Solidity 里的 view / pure 函数
import { useReadContract } from "wagmi";
// formatEther 作用是把 wei 转成 ETH 字符串
import { formatEther } from "viem";
import { marketplaceAbi } from "../../../contracts/ABIs/marketPlaceAbi";
import { mapListingType, type MarketplaceListing } from "../types";

type useMarketplaceListingParams = {
    marketplaceAddress: `0x${string}`;
    listingIndex: number;
    enabled?: boolean;
};

export function useMarketplaceListing({
    marketplaceAddress,
    listingIndex,
    enabled = true,
}: useMarketplaceListingParams) {
    /*
        query 返回值通常有：
            data
            isLoading
            isError
            error
            refetch
    */
    const query = useReadContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: "getListing",
        args: [BigInt(listingIndex)],
        query: {
            enabled: Boolean(marketplaceAddress) && enabled, // 决定是否真正发起读取请求,有当合约地址存在时才请求
        },
    });

    // 链上返回的数据
    const raw = query.data;

    const listing: MarketplaceListing | null = raw
        ? {
              listingIndex,
              tokenId: Number(raw.tokenId),
              lister: raw.lister,
              listingType: mapListingType(raw.listingType),
              priceWei: raw.priceWei,
              priceEth: formatEther(raw.priceWei),
              rentDurationSeconds: Number(raw.rentDurationSeconds),
              auctionEndTime: Number(raw.auctionEndTime),
              active: raw.active,
          }
        : null;
    return {
        ...query,
        listing,
    };
}
