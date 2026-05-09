import { useMemo } from "react";
import { useChainId, useReadContract } from "wagmi";
import { marketplaceAbi } from "../../../contracts/ABIs/marketPlaceAbi";
import { getContractAddresses } from "../../../contracts/addresses";
import { useMarketplaceListing } from "./useMarketplaceListing";
import { mockProperties } from "../../property/mockProperties";
import type { MarketplaceListing } from "../types";
import { parseEther } from "viem";

const USE_MOCK = true;

function getMockListings(): MarketplaceListing[] {
    return mockProperties.map((property, index) => ({
        listingIndex: index,
        tokenId: property.tokenId,
        lister: property.owner as `0x${string}`,
        listingType: property.status === "auction" ? "auction" : "sale",
        priceWei: parseEther(property.priceEth),
        priceEth: property.priceEth,
        rentDurationSeconds: 0,
        auctionEndTime: 0,
        active: property.status !== "sold",
    }));
}

export function useMarketplaceListings() {
    const chainId = useChainId();
    const addresses = getContractAddresses(chainId);
    const marketplaceAddress = addresses?.marketplace as
        | `0x${string}`
        | undefined;

    const lengthQuery = useReadContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: "listingsLength",
        query: {
            enabled: Boolean(marketplaceAddress) && !USE_MOCK,
        },
    });

    const listingCount = Number(lengthQuery.data ?? 0);

    const listingIndexes = useMemo(() => {
        return Array.from({ length: listingCount }, (_, index) => index);
    }, [listingCount]);

    const listing0 = useMarketplaceListing({
        marketplaceAddress,
        listingIndex: listingIndexes[0] ?? 0,
        enabled: !USE_MOCK && listingIndexes.length > 0,
    });

    const listing1 = useMarketplaceListing({
        marketplaceAddress,
        listingIndex: listingIndexes[1] ?? 1,
        enabled: !USE_MOCK && listingIndexes.length > 1,
    });

    const listing2 = useMarketplaceListing({
        marketplaceAddress,
        listingIndex: listingIndexes[2] ?? 2,
        enabled: !USE_MOCK && listingIndexes.length > 2,
    });

    const contractListing = [
        listing0.listing,
        listing1.listing,
        listing2.listing,
    ] as MarketplaceListing[];

    if (USE_MOCK) {
        return {
            listings: getMockListings(),
            isLoading: false,
            error: null,
            mode: "mock" as const,
        };
    }

    return {
        listings: contractListing.filter((listing) => listing.active),
        isLoading:
            lengthQuery.isLoading ||
            listing0.isLoading ||
            listing1.isLoading ||
            listing2.isLoading,
        error:
            lengthQuery.error ||
            listing0.error ||
            listing1.error ||
            listing2.error ||
            null,
        mode: "contract" as const,
    };
}
