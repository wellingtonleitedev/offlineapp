import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from '../schemas';

import Post from '../models/Post';
import Comment from '../models/Comment';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'myapptest3',
});

const database = new Database({
  adapter,
  modelClasses: [Post, Comment],
  actionsEnabled: true,
});

export default database;
