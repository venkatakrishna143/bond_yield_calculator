// src/bond/dto/calculate-bond.dto.ts
import { IsNumber, IsPositive, IsEnum } from 'class-validator';

export enum CouponFrequency {
  ANNUAL = 'annual',
  SEMI_ANNUAL = 'semi-annual',
}

export class CalculateBondDto {
  @IsNumber()
  @IsPositive()
  faceValue!: number;

  @IsNumber()
  @IsPositive()
  annualCouponRate!: number;

  @IsNumber()
  @IsPositive()
  marketPrice!: number;

  @IsNumber()
  @IsPositive()
  yearsToMaturity!: number;

  @IsEnum(CouponFrequency)
  couponFrequency!: CouponFrequency;
}
