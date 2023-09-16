import axios from 'axios';

export const getImagesBySearchQuery = async (searchQuery, page, perPage) => {
  const { data } = await axios(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}&key=38581445-6c76d31f6c77720205af17967`
  );
  return data;
};
