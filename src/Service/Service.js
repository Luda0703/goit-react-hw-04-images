import axios from 'axios'

export async function getImages(query, page) {
  const BASE_URL = `https://pixabay.com/api/`;
  const KEY = `35573875-4d45445cc9cc07d3b69f02897`;
  const options = `image_type=photo&orientation=horizontal&per_page=12`;
  try {
    const resolve = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${query}&${options}&page=${page}`
    );
    return resolve.data;
  } catch (error) {
    console.log(error);
  }
}

// const KEY = "35573875-4d45445cc9cc07d3b69f02897";
// axios.defaults.BASE_URL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = KEY;
// axios.defaults.params = {
//     orientation: 'horizontal',
//     image_type: 'photo',
//     per_page: 12,
//   };

// export const getImages = async (query, page) => {
//     const { data } = await axios.get(`?q=${query}&page=${page}`) 
//     return data
    
//  };

  


