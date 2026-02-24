import { Module } from '@nestjs/common';
import { BondModule } from './bond/bond.module'; // ✅ correct path

@Module({
  imports: [BondModule], // ← must include BondModule here
  controllers: [],
  providers: [],
})
export class AppModule {}
