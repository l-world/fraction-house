/*
 * @Author: echo heart0magic@163.com
 * @Date: 2026-05-07 23:44:04
 * @LastEditors: echo heart0magic@163.com
 * @LastEditTime: 2026-05-08 09:27:42
 * @FilePath: \RealEstateRWADApp\fraction-house\src\features\property\mockProperties.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type PropertyStatus = "listed" | "sold" | "auction";

export type PropertyItem = {
    tokenId: number;
    title: string;
    location: string;
    priceEth: string;
    owner: string;
    image: string;
    status: PropertyStatus;
    description: string;
};

export const mockProperties: PropertyItem[] = [
    {
        tokenId: 1,
        title: "Singapore Marina Apartment",
        location: "Singapore",
        priceEth: "0.52",
        owner: "0x8b2a4c1f9d3e7a6b5c4d2e1f0a9b8c7d6e5f4a3b",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
        status: "listed",
        description: "A premium apartment located near Marina Bay.",
    },
    {
        tokenId: 2,
        title: "Tokyo Smart Studio",
        location: "Tokyo, Japan",
        priceEth: "0.31",
        owner: "0x2f4a6c8e1b3d5f7a9c0e2b4d6f8a1c3e5b7d9f0a",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
        status: "auction",
        description: "A compact smart studio suitable for young professionals.",
    },
    {
        tokenId: 3,
        title: "Dubai Fractional Villa",
        location: "Dubai, UAE",
        priceEth: "1.2",
        owner: "0x9a7b5c3d1e2f4a6b8c0d9e7f5a3b1c2d4e6f8a0b",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
        status: "listed",
        description: "Luxury villa designed for fractional ownership.",
    },
    {
        tokenId: 4,
        title: "Bangkok Rental Condo",
        location: "Bangkok, Thailand",
        priceEth: "0.22",
        owner: "0x1c3e5b7d9f0a2f4a6c8e1b3d5f7a9c0e2b4d6f8a",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200",
        status: "sold",
        description: "A rental-focused condo with strong yield potential.",
    },
];
