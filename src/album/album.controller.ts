import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() file, @Body() dto: CreateAlbumDto) {
    const { picture } = file;
    let pictureData = picture ? picture[0] : null;
    return this.albumService.create(dto, pictureData);
  }

  @Get()
  getAll() {
    return this.albumService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.albumService.delete(id);
  }

  @Put(':albumId/:trackId')
  deleteTracks(
    @Param('albumId') albumId: string,
    @Param('trackId') trackId: string,
  ) {
    return this.albumService.deleteTracks(albumId, trackId);
  }
}
