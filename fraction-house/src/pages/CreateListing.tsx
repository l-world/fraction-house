import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    listingSchema,
    type ListingFormValues,
} from "../features/marketplace/schemas/listingSchema";
import { useCreateListing } from "../features/marketplace/hooks/useCreateListing";
import { WalletGuard } from "../features/wallet/WalletGuard";

function CreateListingContent() {
    const { createListing, state, isProcessing, resetFlow } =
        useCreateListing();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(listingSchema),
        defaultValues: {
            tokenId: 1,
            priceEth: "0.1",
            listingType: "sale",
        },
    });

    async function onSubmit(values: ListingFormValues) {
        try {
            await createListing(values);
        } catch {
            // useTransactionFlow handles error state
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="mx-auto max-w-3xl space-y-6">
                <section>
                    <p className="text-sm font-medium text-gray-500">
                        Marketplace
                    </p>
                    <h1 className="text-3xl font-bold">Create Listing</h1>
                    <p className="mt-2 text-gray-500">
                        List your property NFT for sale, rent, or auction.
                    </p>
                </section>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Token ID</label>
                        <input
                            {...register("tokenId")}
                            type="number"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-900"
                        />
                        {errors.tokenId && (
                            <p className="text-sm text-red-600">
                                {errors.tokenId.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price ETH</label>
                        <input
                            {...register("priceEth")}
                            placeholder="0.1"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-900"
                        />
                        {errors.priceEth && (
                            <p className="text-sm text-red-600">
                                {errors.priceEth.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Listing Type
                        </label>
                        <select
                            {...register("listingType")}
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-gray-900"
                        >
                            <option value="sale">Sale</option>
                            <option value="auction">Auction</option>
                            <option value="rent">Rent</option>
                        </select>
                        {errors.listingType && (
                            <p className="text-sm text-red-600">
                                {errors.listingType.message}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={isProcessing}
                        className="w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isProcessing ? "Processing..." : "Create Listing"}
                    </button>
                </form>

                {state.stage !== "idle" && (
                    <div className="space-y-2 rounded-2xl border bg-white p-5 text-sm shadow-sm">
                        <p>
                            <span className="text-gray-500">Stage: </span>
                            <span className="font-medium">{state.stage}</span>
                        </p>

                        {state.hash && (
                            <p className="break-all">
                                <span className="text-gray-500">Tx Hash: </span>
                                {state.hash}
                            </p>
                        )}

                        {state.errorMessage && (
                            <p className="text-red-600">{state.errorMessage}</p>
                        )}

                        {(state.stage === "success" ||
                            state.stage === "error") && (
                            <button
                                onClick={resetFlow}
                                className="rounded-lg border px-3 py-2"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function CreateListingPage() {
    return (
        <WalletGuard>
            <CreateListingContent />
        </WalletGuard>
    );
}
