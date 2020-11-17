import { tableSchema } from '@nozbe/watermelondb';

const PostSchema = tableSchema({
  name: 'posts',
  columns: [
    { name: 'title', type: 'string' },
    { name: 'body', type: 'string' },
    { name: 'is_liked', type: 'boolean' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});

export default PostSchema;
