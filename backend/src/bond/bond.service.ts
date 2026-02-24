import { Injectable } from '@nestjs/common';
import { CalculateBondDto, CouponFrequency } from './dto/calculate-bond.dto';
import { calculateCurrentYield } from './calculators/current-yield';
import { calculateYTM } from './calculators/ytm';
import { generateCashFlowSchedule, CashFlow } from './calculators/schedule';
import { getPremiumDiscountStatus } from './calculators/premium-discount';

export interface BondCalculationResult {
  annualCouponPayment: number;
  currentYield: number;
  ytm: number;
  totalInterest: number;
  premiumDiscount: 'Premium' | 'Discount' | 'Par';
  cashFlowSchedule: CashFlow[];
}

@Injectable()
export class BondService {
  calculateBond(dto: CalculateBondDto): BondCalculationResult {
    const {
      faceValue,
      annualCouponRate,
      marketPrice,
      yearsToMaturity,
      couponFrequency,
    } = dto;

    // 1️⃣ Annual coupon per payment
    const periodsPerYear = couponFrequency === CouponFrequency.SEMI_ANNUAL ? 2 : 1;
    const couponPayment = (faceValue * annualCouponRate) / 100 / periodsPerYear;
    const annualCouponPayment = couponPayment * periodsPerYear;

    // 2️⃣ Current yield
    const currentYield = calculateCurrentYield(annualCouponPayment, marketPrice);

    // 3️⃣ Premium / Discount
    const premiumDiscount = getPremiumDiscountStatus(faceValue, marketPrice);

    // 4️⃣ Cash flow schedule
    const cashFlowSchedule = generateCashFlowSchedule(
      faceValue,
      annualCouponRate,
      yearsToMaturity,
      couponFrequency,
    );

    // 5️⃣ Total interest
    const totalInterest = couponPayment * yearsToMaturity * periodsPerYear;

    // 6️⃣ YTM
    const ytm = calculateYTM(
      faceValue,
      annualCouponRate,
      marketPrice,
      yearsToMaturity,
      couponFrequency,
    );

    return {
      annualCouponPayment,
      currentYield,
      ytm,
      totalInterest,
      premiumDiscount,
      cashFlowSchedule,
    };
  }
}
