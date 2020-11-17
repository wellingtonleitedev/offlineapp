import React from 'react';
import { View, Text, FlatList, Modal, ModalBaseProps } from 'react-native';
import withObservables from '@nozbe/with-observables';
import styles from './styles';

interface CommentProps extends ModalBaseProps {
  comments: IComment[];
}

interface IComment {
  id: string;
  body: string;
}

const Comment: React.FC<CommentProps> = ({ comments, ...props }) => {
  return (
    <Modal animationType="slide" {...props}>
      <View style={styles.modal}>
        <FlatList
          keyExtractor={item => item.id}
          data={comments}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: comment }) => (
            <View style={styles.container}>
              <Text>{comment.body}</Text>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

export default withObservables(['comments'], ({ comments }) => ({
  comments,
}))(Comment);
