import { MemberDto } from '../dto/members/MemberDto';
import { MusicianEntity } from '../entity/MusicianEntity';

export function MapToMemberDto(musicianEntity: MusicianEntity): MemberDto {
  return {
    id: musicianEntity.id,
    name: musicianEntity.name,
    bio: musicianEntity.bio,
    instrument: musicianEntity.instrument,
    surname: musicianEntity.surname,
  };
}
