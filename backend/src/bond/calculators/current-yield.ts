export function calculateCurrentYield(
  annualCoupon: number,
  marketPrice: number,
): number {
  return annualCoupon / marketPrice;
}
