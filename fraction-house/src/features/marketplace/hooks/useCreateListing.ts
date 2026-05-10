import { parseEther } from "viem";
import { useChainId } from "wagmi";
import { marketplaceAbi } from "../../../contracts/ABIs/marketPlaceAbi";
import { getContractAddresses } from "../../../contracts/addresses";
import { useTransactionFlow } from "../../transaction/hooks/useTransactionFlow";
import type { ListingFormValues } from "../schemas/listingSchema";

export function useCreateListing() {
    const chainId = useChainId();
    const addresses = getContractAddresses(chainId);
    const marketplaceAddress = addresses?.marketplace as
        | `0x${string}`
        | undefined;

    const transaction = useTransactionFlow();

    async function createListing(values: ListingFormValues) {
        if (!marketplaceAddress) {
            throw new Error("Marketplace contract address is not configured");
        }

        const listingTypeMap = {
            sale: 0,
            rent: 1,
            auction: 2,
        } as const;

        return transaction.writeContractAsync({
            address: marketplaceAddress,
            abi: marketplaceAbi,
            functionName: "list",
            args: [
                BigInt(values.tokenId),
                listingTypeMap[values.listingType],
                parseEther(values.priceEth),
                BigInt(0),
                BigInt(0),
            ],
        });
    }

    return {
        createListing,
        ...transaction,
    };
}
