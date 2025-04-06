import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardEntity } from './entities/reward.entity';
import { RewardsRelationalRepository } from './repositories/reward.repository';
import { RewardRepository } from '../reward.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RewardEntity])],
  providers: [
    {
      provide: RewardRepository,
      useClass: RewardsRelationalRepository,
    },
  ],
  exports: [RewardRepository],
})
export class RelationalRewardPersistenceModule {}
