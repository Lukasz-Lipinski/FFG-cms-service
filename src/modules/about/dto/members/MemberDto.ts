import { InstrumentEnum } from '../../shared/models';

export class MemberDto {
  id: string;

  name: string;

  surname: string;

  instrument: InstrumentEnum;

  bio: string;
}
