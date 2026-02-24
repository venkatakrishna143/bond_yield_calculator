import { Module } from '@nestjs/common';
import { BondController } from './bond.controller';
import { BondService } from './bond.service';

@Module({
  controllers: [BondController], // ✅ controller registered here
  providers: [BondService], // ✅ service registered here
})
export class BondModule {}
