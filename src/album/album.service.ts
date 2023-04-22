import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Track, TrackDocument } from '../track/schemas/track.schema';
import { FileService, FileType } from 'src/files/file.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileServise: FileService,
  ) {}
  async create(dto: CreateAlbumDto, picture: any): Promise<Album> {
    const picturePath = this.fileServise.createFile(FileType.IMAGE, picture);

    const album = await this.albumModel.create({
      ...dto,
      picture: picturePath,
    });
    return album;
  }

  async getAll(): Promise<Album[]> {
    const albums = await this.albumModel.find();
    return albums;
  }
  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    return album;
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const album = await this.albumModel.findByIdAndDelete(id);
    return album.id;
  }

  async deleteTracks(albumId: string, trackId: string): Promise<Album> {
    const album = await this.albumModel.findById(albumId);
    const track = await this.trackModel.findById(trackId);
    album.tracks = [
      ...album.tracks.filter((elem) => String(elem._id) !== String(track._id)),
    ];
    await album.save();
    return album;
  }
}
