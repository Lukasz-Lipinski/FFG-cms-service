import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddMemberDto } from '../dto/members/AddMemberDto';
import { MusicianEntity } from '../entity/MusicianEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MemberDto } from '../dto/members/MemberDto';
import { ObjectId } from 'mongodb';
import { AboutEntity } from '../entity/AboutEntity';
import { UpdateBioDto } from '../dto/bio/UpdateBioDto';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(MusicianEntity)
    private readonly musicianRepository: MongoRepository<MusicianEntity>,
    @InjectRepository(AboutEntity)
    private readonly aboutRepository: MongoRepository<AboutEntity>,
  ) {}

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
      where: { _id: new ObjectId(newBio.id) },
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

  getBandMembersInfo(): string {
    return 'Band members information';
  }

  async getMemberInfo(id: string): Promise<MemberDto> {
    const foundMember = await this.musicianRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!foundMember) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    const member: MemberDto = {
      ...foundMember,
      id: foundMember._id?.toString() ?? '',
    };

    return member;
  }

  async addMemberInfoAsync(member: AddMemberDto): Promise<MusicianEntity> {
    const newMember: Partial<MusicianEntity> = {
      ...member,
    };

    const savedMember = await this.musicianRepository.save(newMember);
    return savedMember;
  }
}
