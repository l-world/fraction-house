import { Link, useParams } from "react-router-dom";
import { mockProperties } from "../features/property/mockProperties";
import { formatAddress, formatEth } from "../shared/utils/format";
import { useMarketplaceListings } from "../features/marketplace/hooks/useMarketplaceListings";
import { useBuyListing } from "../features/marketplace/hooks/useBuyListing";

export default function PropertyDetailPage() {
    const { tokenId } = useParams();

    const property = mockProperties.find(
        (item) => item.tokenId === Number(tokenId),
    );

    const { listings, mode } = useMarketplaceListings();
    const { buyListing, state, isProcessing, resetFlow } = useBuyListing();

    const listing = listings.find(
        (item) => item.tokenId === Number(tokenId) && item.active,
    );

    async function handleBuy() {
        if (!listing) return;

        try {
            await buyListing({
                listingIndex: listing.listingIndex,
                priceWei: listing.priceWei,
            });
        } catch {
            // 错误已经由 useTransactionFlow 处理
        }
    }

    if (!property) {
        return (
            <main className="min-h-screen p-8">
                <p>Property not found.</p>
                <Link to="/marketplace" className="text-blue-600">
                    Back to marketplace
                </Link>
            </main>
        );
    }

    const isBuyDisabled =
        !listing ||
        property.status === "sold" ||
        property.status === "auction" ||
        isProcessing ||
        mode === "mock";

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="mx-auto max-w-5xl space-y-6">
                <Link to="/marketplace" className="text-sm text-gray-500">
                    ← Back to marketplace
                </Link>

                <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="h-96 w-full object-cover"
                    />

                    <div className="grid gap-8 p-6 md:grid-cols-[1.5fr_1fr]">
                        <section className="space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {property.title}
                                </h1>
                                <p className="text-gray-500">
                                    {property.location}
                                </p>
                            </div>

                            <p className="text-gray-700">
                                {property.description}
                            </p>

                            <div className="rounded-2xl border bg-gray-50 p-4 text-sm text-gray-500">
                                Current data mode: {mode}. In mock mode, real
                                blockchain transactions are disabled.
                            </div>
                        </section>

                        <aside className="space-y-4 rounded-2xl border bg-gray-50 p-5">
                            <div>
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="text-2xl font-bold">
                                    {listing
                                        ? formatEth(listing.priceEth)
                                        : formatEth(property.priceEth)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Owner</p>
                                <p className="text-sm">
                                    {formatAddress(property.owner)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Token ID
                                </p>
                                <p>#{property.tokenId}</p>
                            </div>

                            <button
                                disabled={isBuyDisabled}
                                onClick={handleBuy}
                                className="w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isProcessing
                                    ? "Processing..."
                                    : "Buy Property"}
                            </button>

                            {mode === "mock" && (
                                <p className="text-xs text-gray-500">
                                    Buy is disabled in mock mode. We will enable
                                    it after contract deployment.
                                </p>
                            )}

                            {state.stage !== "idle" && (
                                <div className="space-y-2 rounded-xl border bg-white p-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">
                                            Stage:{" "}
                                        </span>
                                        <span className="font-medium">
                                            {state.stage}
                                        </span>
                                    </div>

                                    {state.hash && (
                                        <div className="break-all">
                                            <span className="text-gray-500">
                                                Tx Hash:{" "}
                                            </span>
                                            {state.hash}
                                        </div>
                                    )}

                                    {state.errorMessage && (
                                        <p className="text-red-600">
                                            {state.errorMessage}
                                        </p>
                                    )}

                                    {(state.stage === "success" ||
                                        state.stage === "error") && (
                                        <button
                                            onClick={resetFlow}
                                            className="rounded-lg border px-3 py-2 text-xs"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}
