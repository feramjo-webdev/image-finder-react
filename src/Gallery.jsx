import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from './Context';
import axios from 'axios';

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}&page=1`;

const Gallery = () => {
  const { searchedImage } = useGlobalContext();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['images', searchedImage],
    queryFn: async () => {
      const { data } = await axios.get(`${url}&query=${searchedImage}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <section
        className='image-container'
        style={{ gridTemplateColumns: '1fr' }}
      >
        <div className='loading'></div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        className='image-container'
        style={{ placeItems: 'center', gridTemplateColumns: '1fr' }}
      >
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = data?.results || [];

  if (results.length < 1) {
    return (
      <section className='image-container'>
        <h4>No results found</h4>
      </section>
    );
  }

  return (
    <section className='image-container'>
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            alt={item.alt_description}
            key={item.id}
            className='img'
          />
        );
      })}
    </section>
  );
};

export default Gallery;
