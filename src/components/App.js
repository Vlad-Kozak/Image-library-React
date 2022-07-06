import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

function App() {
  const [keyword, setKeyword] = useState('');

  const onSubmit = keyword => {
    setKeyword(keyword);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery keyword={keyword} />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
