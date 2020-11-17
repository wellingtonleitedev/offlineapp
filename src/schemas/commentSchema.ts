import { tableSchema } from '@nozbe/watermelondb';

const CommentSchema = tableSchema({
  name: 'comments',
  columns: [
    { name: 'body', type: 'string' },
    { name: 'post_id', type: 'string', isIndexed: true },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});

export default CommentSchema;
