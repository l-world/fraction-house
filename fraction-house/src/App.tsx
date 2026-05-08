import { WalletPanel } from "./features/wallet/WalletPanel";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MarketPlace from "./pages/MarketPlace";
import PropertyDetail from "./pages/PropertyDetail";

function App() {
    return (
        <BrowserRouter>
            <div>
                <div>
                    <h1></h1>
                    <div>
                        <WalletPanel />
                    </div>
                </div>
            </div>

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
