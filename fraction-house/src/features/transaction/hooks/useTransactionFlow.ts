import { useMemo } from "react";
import {
    useWaitForTransactionReceipt,
    useWriteContract,
    type BaseError,
} from "wagmi";
import type { TransactionFlowState } from "../types";

export function useTransactionFlow() {
    const {
        writeContractAsync,
        data: hash,
        error: writeError,
        isPending: isWalletPending,
        reset,
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess,
        error: receiptError,
    } = useWaitForTransactionReceipt({
        hash,
    });

    const state = useMemo<TransactionFlowState>(() => {
        const error = writeError || receiptError;

        if (error) {
            const message =
                (error as BaseError).shortMessage ||
                error.message ||
                "Transaction failed";

            return {
                stage: "error",
                hash,
                errorMessage: message,
            };
        }

        if (isSuccess && hash) {
            return {
                stage: "success",
                hash,
            };
        }

        if (isConfirming && hash) {
            return {
                stage: "confirming",
                hash,
            };
        }

        if (hash) {
            return {
                stage: "submitted",
                hash,
            };
        }

        if (isWalletPending) {
            return {
                stage: "wallet",
            };
        }

        return {
            stage: "idle",
        };
    }, [
        writeError,
        receiptError,
        isSuccess,
        isConfirming,
        hash,
        isWalletPending,
    ]);

    const isProcessing = useMemo(() => {
        return ["wallet", "submitted", "confirming"].includes(state.stage);
    }, [state.stage]);

    function resetFlow() {
        reset();
    }

    return {
        state,
        hash,
        writeContractAsync,
        isProcessing,
        resetFlow,
    };
}
