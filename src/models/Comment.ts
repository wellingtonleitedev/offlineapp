import { Model } from '@nozbe/watermelondb';
import {
  date,
  field,
  readonly,
  relation,
} from '@nozbe/watermelondb/decorators';
import Post from './Post';

export default class Comment extends Model {
  static table = 'comments';

  static associations = {
    posts: { type: 'belongs_to', key: 'post_id' },
  };

  @field('body') body: string;

  @field('post_id') postId: boolean;

  @relation('posts', 'post_id') Post: Post;

  @readonly @date('created_at') createdAt: number;

  @readonly @date('updated_at') updatedAt: number;
}
