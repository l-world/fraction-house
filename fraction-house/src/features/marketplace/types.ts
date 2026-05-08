//定义前端 marketplace 挂单的数据类型，提供一个函数，把合约里的数字挂单类型转换成前端可读的字符串类型

export type ListingType = "sale" | "rent" | "auction";

export type MarketplaceListing = {
    listingIndex: number;
    tokenId: number;
    lister: `0x${string}`;
    listingType: ListingType;
    priceWei: bigint;
    priceEth: string;
    rentDurationSeconds: number;
    auctionEndTime: number;
    active: boolean;
};

export function mapListingType(value: number): ListingType {
    if (value === 1) return "rent";
    if (value === 2) return "auction";
    return "sale";
}
