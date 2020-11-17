import { appSchema } from '@nozbe/watermelondb';
import CommentSchema from './commentSchema';
import PostSchema from './postSchema';

export default appSchema({
  version: 1,
  tables: [PostSchema, CommentSchema],
});
