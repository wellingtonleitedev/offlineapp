import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  commentInput: {
    backgroundColor: '#ebebeb',
    borderColor: '#ccc',
    borderRadius: 25,
    borderWidth: 1,
    flex: 1,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  iconSend: {
    marginBottom: 10,
    marginLeft: 8,
  },
});
