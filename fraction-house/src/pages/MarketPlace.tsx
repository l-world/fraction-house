import { useMemo, useState } from "react";
import { PropertyCard } from "../features/property/components/PropertyCard";
import {
    mockProperties,
    type PropertyStatus,
} from "../features/property/mockProperties";

type StatusFilter = "all" | PropertyStatus;

export default function MarketPlace() {
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState<StatusFilter>("all");
    const [maxPrice, setMaxPrice] = useState("");

    const filteredProperties = useMemo(() => {
        return mockProperties.filter((property) => {
            const matchKeyword =
                property.title.toLowerCase().includes(keyword.toLowerCase()) ||
                property.location.toLowerCase().includes(keyword.toLowerCase());

            const matchStatus = status === "all" || property.status === status;

            const matchPrice =
                !maxPrice || Number(property.priceEth) <= Number(maxPrice);

            return matchKeyword && matchStatus && matchPrice;
        });
    }, [keyword, status, maxPrice]);

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <section>
                    <p className="text-sm font-medium text-gray-500">
                        MarketPlace
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Tokenized Real Estate Assets
                    </h1>
                    <p className="mt-2 max-w-2xl text-gray-500">
                        Browse real estate NFTs, fractional ownership
                        opportunities, and auction listings.
                    </p>
                </section>

                <section className="grid gap-4 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-3">
                    <input
                        type={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search by title or location"
                        className="rounded-xl border px-4 py-2 outline-none focus:border-gray-900"
                    />
                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as StatusFilter)
                        }
                    >
                        <option value="all">All</option>
                        <option value="listed">For Sale</option>
                        <option value="auction">Auction</option>
                        <option value="sold">Sold</option>
                    </select>
                    <input
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max price in ETH"
                        type="number"
                        min="0"
                        className="rounded-xl border px-4 py-2 outline-none focus:border-gray-900"
                    />
                </section>

                {filteredProperties.length === 0 ? (
                    <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
                        No properties found.
                    </div>
                ) : (
                    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProperties.map((property) => (
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
