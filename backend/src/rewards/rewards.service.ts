import { Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardRepository } from './infrastructure/persistence/reward.repository';
import { Reward } from './domain/reward';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class RewardsService {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    return this.rewardRepository.create(createRewardDto);
  }

  async findById(id: Reward['id']): Promise<NullableType<Reward>> {
    return this.rewardRepository.findById(id);
  }

  async findByUserId(userId: number): Promise<Reward[]> {
    return this.rewardRepository.findByUserId(userId);
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardRepository.findAll();
  }

  async remove(id: Reward['id']): Promise<void> {
    return this.rewardRepository.remove(id);
  }
}
