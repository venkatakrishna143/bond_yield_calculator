import { CouponFrequency } from '../dto/calculate-bond.dto';

export interface CashFlow {
  period: number;
  paymentDate: Date;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export function generateCashFlowSchedule(
  faceValue: number,
  annualCouponRate: number,
  yearsToMaturity: number,
  couponFrequency: CouponFrequency,
  startDate: Date = new Date(),
): CashFlow[] {
  const schedule: CashFlow[] = [];
  const periodsPerYear =
    couponFrequency === CouponFrequency.SEMI_ANNUAL ? 2 : 1;
  const totalPeriods = yearsToMaturity * periodsPerYear;
  const couponPayment = (faceValue * annualCouponRate) / 100 / periodsPerYear;

  let cumulativeInterest = 0;

  for (let period = 1; period <= totalPeriods; period++) {
    cumulativeInterest += couponPayment;

    const paymentDate = new Date(startDate);
    paymentDate.setMonth(startDate.getMonth() + (12 / periodsPerYear) * period);

    schedule.push({
      period,
      paymentDate,
      couponPayment:
        period === totalPeriods ? couponPayment + faceValue : couponPayment,
      cumulativeInterest: cumulativeInterest,
      remainingPrincipal: period === totalPeriods ? 0 : faceValue,
    });
  }

  return schedule;
}
