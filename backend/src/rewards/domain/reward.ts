import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

// <database-block>
const idType = Number;
// </database-block>

export class Reward {
  @ApiProperty({
    type: idType,
  })
  id: number;

  @ApiProperty({
    type: () => User,
  })
  user: User;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  amount: number;

  @ApiProperty({
    type: String,
    example: 'Project X',
  })
  projectName: string;

  @ApiProperty({
    type: Date,
  })
  unlockTime: Date;

  @ApiProperty({
    type: String,
    example: 'Reward for completing milestone 1',
  })
  message: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
