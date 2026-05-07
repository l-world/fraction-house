import { WalletPanel } from "./features/wallet/WalletPanel";

function App() {
    return (
        <main className="min-h-screen p-8">
            <div className="mx-auto max-w-4xl space-y-6">
                <h1 className="text-3xl font-bold">FractionHouse</h1>
                <p className="text-gray-500">
                    A Web3 real estate marketplace frontend.
                </p>

                <WalletPanel />
            </div>
        </main>
    );
}

export default App;
