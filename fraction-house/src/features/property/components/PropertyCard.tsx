import { Link } from "react-router-dom";

import type { PropertyItem } from "../mockProperties";
import { formatAddress, formatEth } from "../../../shared/utils/format";

type PropertyCardProps = {
    property: PropertyItem;
};

const statusMap = {
    listed: "For Sale",
    sold: "Sold",
    auction: "Auction",
};

export function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link
            to={`/properties/${property.tokenId}`}
            className="verflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
            <img
                src={property.image}
                alt={property.title}
                className="h-48 w-full object-caover"
            />
            <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            {property.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {property.location}
                        </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                        {statusMap[property.status]}
                    </span>
                </div>

                <div>
                    <p className="text-lg font-bold">
                        {formatEth(property.priceEth)}
                    </p>
                    <p className="text-xs text-gray-500">
                        Owner: {formatAddress(property.owner)}
                    </p>
                </div>
            </div>
        </Link>
    );
}
