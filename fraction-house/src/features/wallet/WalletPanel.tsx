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
        <div>
            <div>
                <h2>Wallet</h2>
                <ConnectButton></ConnectButton>
            </div>

            {!isConnected ? (
                <p>Please connect your walller.</p>
            ) : (
                <div>
                    <p>
                        <span>Address:</span> <span>{address}</span>
                    </p>
                    <p>
                        <span>Chain Id</span> <span>{chainId}</span>
                    </p>
                    <p>
                        <span>Balance:</span>{" "}
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
