export const marketplaceAbi = [
    {
        type: "function",
        name: "listingsLength",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        type: "function",
        name: "getListing",
        stateMutability: "view",
        inputs: [{ name: "listingIndex", type: "uint256" }],
        outputs: [
            {
                name: "",
                type: "tuple",
                components: [
                    { name: "tokenId", type: "uint256" },
                    { name: "lister", type: "address" },
                    { name: "listingType", type: "uint8" },
                    { name: "priceWei", type: "uint256" },
                    { name: "rentDurationSeconds", type: "uint256" },
                    { name: "auctionEndTime", type: "uint256" },
                    { name: "active", type: "bool" },
                ],
            },
        ],
    },
] as const;
