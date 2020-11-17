import React from 'react';
import { StatusBar } from 'react-native';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import database from './src/config/database';
import Feed from './src/screens/Feed';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <DatabaseProvider database={database}>
        <Feed />
      </DatabaseProvider>
    </>
  );
};

export default App;
