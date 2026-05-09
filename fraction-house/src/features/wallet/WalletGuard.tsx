import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

type WalletGuardProps = {
    children: React.ReactNode;
};

export default function WalletGuard({ children }: WalletGuardProps) {
    const { isConnected } = useAccount();

    if (!isConnected) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 py-16">
                <div className="mx-auto max-w-xl rounded-2xl border bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold">
                        Connect Wallet Required
                    </h1>
                    <p className="mt-6 flex justify-center">
                        Please connect your wallet to access this page.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <ConnectButton />
                    </div>
                </div>
            </main>
        );
    }

    return children;
}
