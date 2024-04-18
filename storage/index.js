import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const storage = new Storage({

  storageBackend: AsyncStorage,

  // Null means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // This function should only ever run the first time the user opens the app to populate the quiz data.
  sync: {
    async certData(){
      console.log('making API call')
      const res = await axios.get('http://localhost:8000/api/quiz/1')
      return res.data;
    }
  }
});

export default storage;