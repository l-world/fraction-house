import { useChainId } from "wagmi";
import { marketplaceAbi } from "../../../contracts/ABIs/marketPlaceAbi";
import { getContractAddresses } from "../../../contracts/addresses";
import { useTransactionFlow } from "../../transaction/hooks/useTransactionFlow";

type BuyListingParams = {
    listingIndex: number;
    priceWei: bigint;
};

export function useBuylisting() {
    const chainId = useChainId();
    const addresses = getContractAddresses(chainId);
    const marketplaceAddress = addresses?.marketplace as
        | `0x${string}`
        | undefined;

    const transaction = useTransactionFlow();

    async function buyListing({ listingIndex, priceWei }: BuyListingParams) {
        if (!marketplaceAddress) {
            throw new Error("Marketplace contract address is not configured");
        }

        return transaction.writeContractAsync({
            address: marketplaceAddress,
            abi: marketplaceAbi,
            functionName: "buyListing",
            args: [BigInt(listingIndex)],
            value: priceWei,
        });
    }

    return {
        buyListing,
        ...transaction,
    };
}
