import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AboutService } from '../services/about.service';
import { AddMemberDto } from '../dto/members/AddMemberDto';
import { MusicianEntity } from '../entity/MusicianEntity';
import { MemberDto } from '../dto/members/MemberDto';
import { AboutEntity } from '../entity/AboutEntity';
import { UpdateBioDto } from '../dto/bio/UpdateBioDto';
import { AddBioDto } from '../dto/bio/AddBioDto';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get('bio')
  async getBandBio(): Promise<AboutEntity> {
    return await this.aboutService.getBioAsync();
  }

  @Post('bio')
  async createBio(@Body() AddBioDto: AddBioDto): Promise<AboutEntity> {
    const { bio } = AddBioDto;

    if (!bio?.trim()) {
      throw new BadRequestException('Bio cannot be empty');
    }

    return await this.aboutService.createBioAsync(bio);
  }

  @Patch('bio')
  async updateBandBio(@Body() bio: UpdateBioDto): Promise<AboutEntity> {
    return await this.aboutService.updateBioAsync(bio);
  }

  @Get('members')
  async getBandMembersInfo(): Promise<MemberDto[]> {
    return await this.aboutService.getBandMembersInfoAsync();
  }

  @Get('members/:id')
  async getMemberInfo(@Param('id') id: string): Promise<MemberDto> {
    if (!id.trim()) {
      throw new BadRequestException('Member ID is required');
    }

    return await this.aboutService.getMemberInfo(id);
  }

  @Post('members')
  async addMemberInfo(
    @Body() memberInfo: AddMemberDto,
  ): Promise<MusicianEntity> {
    return await this.aboutService.addMemberInfoAsync(memberInfo);
  }
}
