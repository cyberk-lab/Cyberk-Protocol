import { Reward } from '../../domain/reward';
import { CreateRewardDto } from '../../dto/create-reward.dto';
import { NullableType } from '../../../utils/types/nullable.type';

export abstract class RewardRepository {
  abstract create(createRewardDto: CreateRewardDto): Promise<Reward>;

  abstract findById(id: Reward['id']): Promise<NullableType<Reward>>;

  abstract findByUserId(userId: string | number): Promise<Reward[]>;

  abstract findAll(): Promise<Reward[]>;

  abstract remove(id: Reward['id']): Promise<void>;
}
