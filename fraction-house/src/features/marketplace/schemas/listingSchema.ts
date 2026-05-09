// 创建挂单表单的校验规则：tokenId 必须是大于等于 0 的整数，priceEth 必须是大于 0 的字符串价格，listingType 只能是 sale / auction / rent

import { z } from "zod";

export const listingSchema = z.object({
    tokenId: z.coerce
        .number()
        .int("Token ID must be an integer")
        .min(0, "Token ID must be greater than or equal to 0"),
    priceEth: z
        .string()
        .min(1, "Price is required")
        .refine((value) => Number(value) > 0, "Price must be greater than 0"),

    listingType: z.enum(["sale", "auction", "rent"]),
});

// 根据 listingSchema 自动推导出 TypeScript 类型
/*
    大概等价于：
        type ListingFormValues = {
            tokenId: number;
            priceEth: string;
            listingType: "sale" | "auction" | "rent";
        };
*/
export type ListingFormValues = z.infer<typeof listingSchema>;
