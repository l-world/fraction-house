export type TransactionStage =
    | "idle"
    | "wallet"
    | "submitted"
    | "confirming"
    | "success"
    | "error";
export type TransactionFlowState = {
    stage: TransactionStage;
    hash?: `0x${string}`;
    errorMessage?: string;
};
