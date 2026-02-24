import { Body, Controller, Post } from '@nestjs/common';
import { BondService } from './bond.service';
import { CalculateBondDto } from './dto/calculate-bond.dto';

@Controller('bond') // ✅ defines the prefix /bond
export class BondController {
  constructor(private readonly bondService: BondService) {}

  @Post('calculate') // ✅ defines /bond/calculate
  calculate(@Body() dto: CalculateBondDto) {
    return this.bondService.calculateBond(dto);
  }
}
