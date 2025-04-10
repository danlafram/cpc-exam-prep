import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const storage = new Storage({

  storageBackend: AsyncStorage,

  // Null means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,
});

// This function should only ever run the first time the user opens the app to populate the quiz data.
storage.sync = {
  async certData(){
    try{
      const quizName = "Certified Professional Coder";
      const res = await axios.get(`${apiUrl}/api/search?quiz=${quizName}`)
      storage.save({
        key: 'certData',
        data: res.data
      })
      return res.data;
    }catch(e){
      console.log(e)
    }
    
  }
}

export default storage;