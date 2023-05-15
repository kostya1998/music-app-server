import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { FileService, FileType } from 'src/files/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';
import { Album, AlbumDocument } from 'src/album/schemas/album.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileServise: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture: any, audio: any): Promise<Track> {
    const audioPath = this.fileServise.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileServise.createFile(FileType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }
  async getAll({
    count = 10,
    offset = 0,
  }: { count?: number; offset?: number } = {}): Promise<Track[]> {
    return await this.trackModel.find().skip(offset).limit(count);
  }
  async search({ query = '' }: { query?: string } = {}): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: {
        $regex: new RegExp(query, 'i'),
      },
    });
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');

    return track;
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const albums = await this.albumModel.find({ tracks: id });
    const track = await this.trackModel.findByIdAndDelete(id);

    track.comments.map(async (comment) => {
      return await this.commentModel.findByIdAndDelete(comment);
    });
    albums.map((album) => {
      album.tracks.map(async (track) => {
        return await this.trackModel.findByIdAndDelete(track);
      });
    });
    await this.albumModel.updateMany({ tracks: id }, { $pull: { tracks: id } });
    return track.id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment.id);

    await track.save();
    return comment;
  }
  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }
  async addTracks(trackId: string, albumId: string): Promise<Album> {
    const track = await this.trackModel.findById(trackId);
    const album = await this.albumModel.findById(albumId);
    const isduplicate = album.tracks.some(
      (item) => String(item._id) === String(track._id),
    );
    if (!isduplicate) {
      album.tracks.push(track);
      await album.save();
    }

    return album;
  }
}
