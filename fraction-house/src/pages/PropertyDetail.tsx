import { Link, useParams } from "react-router-dom";
import { mockProperties } from "../features/property/mockProperties";
import { formatAddress, formatEth } from "../shared/utils/format";

export default function PropertyDetail() {
    const { tokeId } = useParams();

    const property = mockProperties.find(
        (item) => item.tokenId === Number(tokeId),
    );

    if (!property) {
        return (
            <main className="min-h-screen p-8">
                <p>Property not found.</p>
                <Link to="/marketplace" className="text-blue-600">
                    Back to MarketPlace
                </Link>
            </main>
        );
    }

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

                            <p></p>
                        </section>

                        <aside className="space-y-4 rounded-2xl border bg-gray-50 p-5">
                            <div>
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="text-2xl font-bold">
                                    {formatEth(property.priceEth)}
                                </p>
                            </div>
                        </aside>

                        <div>
                            <p className="text-sm text-gray-500">Owner</p>
                            <p className="text-sm">
                                {formatAddress(property.owner)}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Token ID</p>
                            <p>#{property.tokenId}</p>
                        </div>

                        <button className="w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white disabled:opacity-50">
                            Buy Property
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
