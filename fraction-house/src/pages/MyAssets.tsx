import { useAccount } from "wagmi";
import { WalletGuard } from "../features/wallet/WalletGuard";
import { mockProperties } from "../features/property/mockProperties";
import { PropertyCard } from "../features/property/components/PropertyCard";

function MyAssetsContent() {
    const { address } = useAccount();

    const myProperties = mockProperties.filter(
        (property) => property.owner.toLowerCase() === address?.toLowerCase(),
    );

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <section>
                    <p className="text-sm font-medium text-gray-500">
                        Portfolio
                    </p>
                    <h1 className="text-3xl font-bold">My Assets</h1>
                    <p className="mt-2 text-gray-500">
                        View property NFTs owned by your connected wallet.
                    </p>
                </section>

                {myProperties.length === 0 ? (
                    <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
                        No property assets found for this wallet.
                    </div>
                ) : (
                    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {myProperties.map((property) => (
                            <PropertyCard
                                key={property.tokenId}
                                property={property}
                            />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}

export default function MyAssetsPage() {
    return (
        <WalletGuard>
            <MyAssetsContent />
        </WalletGuard>
    );
}
