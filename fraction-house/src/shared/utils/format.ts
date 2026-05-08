/*
 * @Author: echo heart0magic@163.com
 * @Date: 2026-05-08 09:32:13
 * @LastEditors: echo heart0magic@163.com
 * @LastEditTime: 2026-05-08 09:33:43
 * @FilePath: \RealEstateRWADApp\fraction-house\src\shared\utils\format.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function formatAddress(address?: string) {
    if (!address) return "-";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatEth(value: string | number) {
    return `${value} ETH`;
}
