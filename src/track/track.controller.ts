import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  Put,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;
    const firstElem = (file: any): any | null => {
      if (file && file.length > 0) {
        return file[0];
      } else {
        console.log('is Empty');
      }
    };
    return this.trackService.create(dto, firstElem(picture), firstElem(audio));
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll({ count, offset });
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search({ query });
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }
  @Post('/comments')
  addComments(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Put('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }

  @Put(':trackId/:albumId')
  addTracks(
    @Param('trackId') trackId: string,
    @Param('albumId') albumId: string,
  ) {
    return this.trackService.addTracks(trackId, albumId);
  }
}
