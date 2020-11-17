import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import withObservables from '@nozbe/with-observables';
import { Database, Model } from '@nozbe/watermelondb';
import Post from '../../components/Post';

interface IDatabase {
  database: Database;
}

interface FeedProps {
  posts: Model[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  const database = useDatabase();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = useCallback(async () => {
    const postsCollection = database.collections.get('posts');

    await database.action(async () => {
      await postsCollection.create(post => {
        Object.assign(post, { title, body });
      });
    });

    setTitle('');
    setBody('');
  }, [title, body, database]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Comece uma publicação</Text>
        <TextInput
          style={styles.input}
          placeholder="Titulo"
          defaultValue={title}
          onChangeText={value => setTitle(value)}
        />
        <TextInput
          style={styles.textarea}
          placeholder="Corpo"
          multiline
          numberOfLines={5}
          defaultValue={body}
          onChangeText={value => setBody(value)}
        />
        <Button title="Publicar" onPress={onSubmit}></Button>
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: post }) => <Post post={post} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textarea: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
});

export default withDatabase(
  withObservables([], ({ database }: IDatabase) => ({
    posts: database.collections.get('posts').query().observe(),
  }))(Feed),
);
