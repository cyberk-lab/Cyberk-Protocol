import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RewardRepository } from '../../reward.repository';
import { CreateRewardDto } from '../../../../dto/create-reward.dto';
import { Reward } from '../../../../domain/reward';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { RewardEntity } from '../entities/reward.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class RewardsRelationalRepository implements RewardRepository {
  constructor(
    @InjectRepository(RewardEntity)
    private rewardRepository: Repository<RewardEntity>,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = this.rewardRepository.create({
      ...createRewardDto,
      user: { id: Number(createRewardDto.user.id) } as UserEntity,
      unlockTime: new Date(createRewardDto.unlockTime),
    });
    const savedReward = await this.rewardRepository.save(reward);
    return this.toReward(savedReward);
  }

  async findById(id: number): Promise<NullableType<Reward>> {
    const reward = await this.rewardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return reward ? this.toReward(reward) : null;
  }

  async findByUserId(userId: number): Promise<Reward[]> {
    const rewards = await this.rewardRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return rewards.map((reward) => this.toReward(reward));
  }

  async findAll(): Promise<Reward[]> {
    const rewards = await this.rewardRepository.find({
      relations: ['user'],
    });
    return rewards.map((reward) => this.toReward(reward));
  }

  async remove(id: number): Promise<void> {
    await this.rewardRepository.delete(id);
  }

  private toReward(entity: RewardEntity): Reward {
    return {
      id: entity.id,
      user: entity.user,
      amount: entity.amount,
      projectName: entity.projectName,
      unlockTime: entity.unlockTime,
      message: entity.message,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
