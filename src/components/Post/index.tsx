import React, { useCallback, useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Model } from '@nozbe/watermelondb';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import withObservables from '@nozbe/with-observables';
import Icon from 'react-native-vector-icons/FontAwesome';
import Comment from '../Comment';
import styles from './styles';

interface PostsProps {
  post: IPost;
  comments: Model[];
}

interface IPost {
  id: string;
  title: string;
  body: string;
  isLiked: boolean;
}

const Post: React.FC<PostsProps> = ({ post, comments }) => {
  const database = useDatabase();
  const [, setLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  const onLike = useCallback(
    async (id, isLiked) => {
      const somePost = await database.collections.get('posts').find(id);

      await database.action(async () => {
        await somePost.update(item => {
          Object.assign(item, { ...item, isLiked: !isLiked });
        });
      });

      setLoad(state => !state);
    },
    [database],
  );

  const onDelete = useCallback(
    async id => {
      const somePost = await database.collections.get('posts').find(id);
      await database.action(async () => {
        await somePost.destroyPermanently();
      });
    },
    [database],
  );

  const onAddComment = useCallback(
    async (postId: string) => {
      if (!comment) return;

      const commentCollection = database.collections.get('comments');

      await database.action(async () => {
        await commentCollection.create(item => {
          Object.assign(item, { body: comment, postId });
        });
      });

      setComment('');
    },
    [database, comment],
  );

  return (
    <>
      <View style={styles.container}>
        <View style={{ ...styles.row, justifyContent: 'space-between' }}>
          <Text style={styles.title}>{post.title}</Text>
          <Icon name="times" size={18} onPress={() => onDelete(post.id)} />
        </View>
        <Text style={styles.body}>{post.body}</Text>
        <View
          style={{
            ...styles.row,
            marginVertical: 10,
            borderTopColor: '#ccc',
            borderTopWidth: 1,
            paddingVertical: 10,
          }}
        >
          <Icon
            style={styles.icon}
            name={post.isLiked ? 'heart' : 'heart-o'}
            size={20}
            color={post.isLiked ? '#ed4956' : '#000'}
            onPress={() => onLike(post.id, post.isLiked)}
          />
          <Icon
            style={styles.icon}
            name="comment-o"
            size={20}
            color="#000"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.commentInput}
            placeholder="Deixe seus comentários aqui..."
            defaultValue={comment}
            onChangeText={value => setComment(value)}
          />
          <Icon
            style={styles.iconSend}
            name="send"
            size={20}
            onPress={() => onAddComment(post.id)}
          />
        </View>
      </View>
      <Comment
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        comments={[comments]}
      />
    </>
  );
};

export default withObservables(['post'], ({ post }) => ({
  post: post.observe(),
  comments: post.comments.observe(),
}))(Post);
