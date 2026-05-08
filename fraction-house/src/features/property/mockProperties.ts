import Mock from "mockjs";

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

const statusList: PropertyStatus[] = ["listed", "sold", "auction"];

const locations = [
    "Singapore",
    "Tokyo, Japan",
    "Dubai, UAE",
    "Bangkok, Thailand",
    "Seoul, Korea",
    "Hong Kong",
];

const propertyNames = [
    "Marina Apartment",
    "Smart Studio",
    "Fractional Villa",
    "Rental Condo",
    "Luxury Residence",
    "Urban Loft",
];

const images = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200",
];

function createMockProperty(index: number): PropertyItem {
    const location = Mock.Random.pick(locations);
    const name = Mock.Random.pick(propertyNames);

    return {
        tokenId: index + 1,
        title: `${location} ${name}`,
        location,
        priceEth: Mock.Random.float(0.1, 2, 1, 2).toString(),
        owner: `0x${Mock.Random.string("abcdef0123456789", 40)}`,
        image: Mock.Random.pick(images),
        status: Mock.Random.pick(statusList),
        description: Mock.Random.sentence(12, 20),
    };
}
export const mockProperties: PropertyItem[] = Array.from(
    { length: 12 },
    (_, index) => createMockProperty(index),
);

// export const mockProperties: PropertyItem[] = [
//     {
//         tokenId: 1,
//         title: "Singapore Marina Apartment",
//         location: "Singapore",
//         priceEth: "0.52",
//         owner: "0x8b2a4c1f9d3e7a6b5c4d2e1f0a9b8c7d6e5f4a3b",
//         image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
//         status: "listed",
//         description: "A premium apartment located near Marina Bay.",
//     },
//     {
//         tokenId: 2,
//         title: "Tokyo Smart Studio",
//         location: "Tokyo, Japan",
//         priceEth: "0.31",
//         owner: "0x2f4a6c8e1b3d5f7a9c0e2b4d6f8a1c3e5b7d9f0a",
//         image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
//         status: "auction",
//         description: "A compact smart studio suitable for young professionals.",
//     },
//     {
//         tokenId: 3,
//         title: "Dubai Fractional Villa",
//         location: "Dubai, UAE",
//         priceEth: "1.2",
//         owner: "0x9a7b5c3d1e2f4a6b8c0d9e7f5a3b1c2d4e6f8a0b",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
//         status: "listed",
//         description: "Luxury villa designed for fractional ownership.",
//     },
//     {
//         tokenId: 4,
//         title: "Bangkok Rental Condo",
//         location: "Bangkok, Thailand",
//         priceEth: "0.22",
//         owner: "0x1c3e5b7d9f0a2f4a6c8e1b3d5f7a9c0e2b4d6f8a",
//         image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200",
//         status: "sold",
//         description: "A rental-focused condo with strong yield potential.",
//     },
// ];
