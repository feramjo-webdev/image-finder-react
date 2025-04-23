import { useGlobalContext } from './Context';

const SearchForm = () => {
  const { setSearchedImage } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;
    setSearchedImage(searchValue);
  };

  return (
    <section>
      <h1 className='title'>PixSearch</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-input search-input'
          placeholder='find your perfect high-quality images'
          name='search'
        />
        <button type='button' className='btn'>
          submit
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
