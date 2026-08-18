import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddMemberDto } from '../dto/members/AddMemberDto';
import { MusicianEntity } from '../entity/MusicianEntity';
import { MemberDto } from '../dto/members/MemberDto';
import { AboutEntity } from '../entity/AboutEntity';
import { UpdateBioDto } from '../dto/bio/UpdateBioDto';
import { MapToMemberDto } from '../shared/mappers';
import { AppDataSource } from 'src/core/database/db';

@Injectable()
export class AboutService {
  private readonly aboutRepository = AppDataSource.getRepository(AboutEntity);
  private readonly musicianRepository = AppDataSource.getRepository(MusicianEntity);

  async getBioAsync(): Promise<AboutEntity> {
    const bio = await this.aboutRepository.find();

    if (!bio?.length) {
      throw new NotFoundException('Band bio not found');
    }

    return bio[0];
  }

  async createBioAsync(bio: string): Promise<AboutEntity> {
    const newBio: Partial<AboutEntity> = {
      content: bio,
    };

    const savedBio = await this.aboutRepository.save(newBio);

    if (!savedBio) {
      throw new InternalServerErrorException('Failed to save bio');
    }

    return savedBio;
  }

  async updateBioAsync(newBio: UpdateBioDto): Promise<AboutEntity> {
    const foundBio = await this.aboutRepository.findOne({
      where: { id: newBio.id },
    });

    if (!foundBio) {
      throw new NotFoundException(`Bio with id ${newBio.id} not found`);
    }

    const updateResult = await this.aboutRepository.update(foundBio, {
      content: newBio.content,
    });

    if (!updateResult.affected) {
      throw new InternalServerErrorException('Failed to update bio');
    }

    return foundBio;
  }

  async getBandMembersInfoAsync(): Promise<MemberDto[]> {
    const members = await this.musicianRepository.find();

    const memberDtos: MemberDto[] = members.map((m) => MapToMemberDto(m));

    return memberDtos;
  }

  async getMemberInfo(id: string): Promise<MemberDto> {
    const foundMember = await this.musicianRepository.findOne({
      where: { id },
    });

    if (!foundMember) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    return MapToMemberDto(foundMember);
  }

  async addMemberInfoAsync(member: AddMemberDto): Promise<MusicianEntity> {
    const newMember: Partial<MusicianEntity> = {
      ...member,
    };

    const savedMember = await this.musicianRepository.save(newMember);
    return savedMember;
  }
}
