import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useChainId } from "wagmi";
import { formatUnits } from "viem";

export const WalletPanel = () => {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();

    const { data: balance } = useBalance({
        address,
        query: {
            enabled: Boolean(address),
        },
    });

    return (
        <div className="rounded-xl border p-4 space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Wallet</h2>
                <ConnectButton />
            </div>

            {!isConnected ? (
                <p className="text-sm text-gray-500">
                    Please connect your walllet.
                </p>
            ) : (
                <div className="space-y-1 text-sm">
                    <p>
                        <span className="text-gray-500">Address:</span>{" "}
                        <span>{address}</span>
                    </p>
                    <p>
                        <span className="text-gray-500">Chain Id</span>{" "}
                        <span>{chainId}</span>
                    </p>
                    <p>
                        <span className="text-gray-500">Balance:</span>{" "}
                        <span>
                            {balance
                                ? `${formatUnits(balance.value, balance.decimals)} ${balance.symbol}`
                                : "Loading..."}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};
