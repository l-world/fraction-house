import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import MarketPlace from "./pages/MarketPlace";
import PropertyDetail from "./pages/PropertyDetail";
import CreateListing from "./pages/CreateListing";
import MyAssets from "./pages/MyAssets";
import { WalletPanel } from "./features/wallet/WalletPanel";

export default function App() {
    return (
        <BrowserRouter>
            <header className="border-b bg-white px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
                    <Link to="/marketplace" className="text-xl font-bold">
                        FractionHouse
                    </Link>

                    <nav className="flex items-center gap-4 text-sm">
                        <Link
                            to="/marketplace"
                            className="text-gray-600 hover:text-black"
                        >
                            Marketplace
                        </Link>
                        <Link
                            to="/create-listing"
                            className="text-gray-600 hover:text-black"
                        >
                            Create Listing
                        </Link>
                        <Link
                            to="/my-assets"
                            className="text-gray-600 hover:text-black"
                        >
                            My Assets
                        </Link>
                    </nav>

                    <div className="w-fit">
                        <WalletPanel />
                    </div>
                </div>
            </header>

            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/marketplace" replace />}
                />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route
                    path="/properties/:tokenId"
                    element={<PropertyDetail />}
                />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/my-assets" element={<MyAssets />} />
            </Routes>
        </BrowserRouter>
    );
}
