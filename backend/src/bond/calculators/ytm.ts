import { CouponFrequency } from '../dto/calculate-bond.dto';

export function calculateYTM(
  faceValue: number,
  annualCouponRate: number,
  marketPrice: number,
  yearsToMaturity: number,
  couponFrequency: CouponFrequency,
  precision = 1e-6,
  maxIterations = 1000,
): number {
  const periodsPerYear = couponFrequency === CouponFrequency.SEMI_ANNUAL ? 2 : 1;
  const totalPeriods = yearsToMaturity * periodsPerYear;
  const couponPayment = (faceValue * annualCouponRate) / 100 / periodsPerYear;

  let lower = 0;
  let upper = 1; // 100% annual yield
  let ytm = 0;

  for (let i = 0; i < maxIterations; i++) {
    ytm = (lower + upper) / 2;

    let presentValue = 0;
    for (let t = 1; t <= totalPeriods; t++) {
      const payment = t === totalPeriods ? couponPayment + faceValue : couponPayment;
      presentValue += payment / Math.pow(1 + ytm / periodsPerYear, t);
    }

    if (Math.abs(presentValue - marketPrice) < precision) {
      break;
    }

    if (presentValue > marketPrice) {
      lower = ytm;
    } else {
      upper = ytm;
    }
  }

  return ytm * 100; // return annualized percentage
}
