import { Model } from '@nozbe/watermelondb';
import {
  children,
  date,
  field,
  readonly,
} from '@nozbe/watermelondb/decorators';
import Comment from './Comment';

export default class Post extends Model {
  static table = 'posts';

  static associations = {
    comments: { type: 'has_many', foreignKey: 'post_id' },
  };

  @field('title') title: string;

  @field('body') body: string;

  @field('is_liked') isLiked: boolean;

  @children('comments') comments: Comment[];

  @readonly @date('created_at') createdAt: number;

  @readonly @date('updated_at') updatedAt: number;
}
