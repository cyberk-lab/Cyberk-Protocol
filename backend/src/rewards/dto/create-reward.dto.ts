import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';
import { Type } from 'class-transformer';

export class CreateRewardDto {
  @ApiProperty({
    type: () => UserDto,
  })
  @IsNotEmpty()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: String,
    example: 'Project X',
  })
  @IsNotEmpty()
  @IsString()
  projectName: string;

  @ApiProperty({
    type: String,
    example: '2024-03-20T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  unlockTime: string;

  @ApiProperty({
    type: String,
    example: 'Reward for completing milestone 1',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
