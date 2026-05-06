import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { InstrumentEnum } from '../../shared/models';

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @IsEnum(InstrumentEnum)
  instrument: InstrumentEnum;

  @IsString()
  @IsNotEmpty()
  bio: string;
}
