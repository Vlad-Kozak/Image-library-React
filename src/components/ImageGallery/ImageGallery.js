import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './ImageGallery.module.css';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import { fetchImages } from 'service/api';

function ImageGallery({ keyword, page, setPage, images, setImages }) {
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (keyword === '') {
      return;
    }

    setLoading(true);

    fetchImages(keyword, page)
      .then(r => {
        if (r.total === 0) {
          toast.info('По вашему запросу ничего не найдено!');
          return;
        }
        if (r.total > 15) {
          setShowLoadMore(true);
        }
        if (page * 15 >= r.total) {
          setShowLoadMore(false);
        }
        setImages(images => {
          return [...images, ...r.hits];
        });
      })
      .catch(console.log)
      .finally(r => setLoading(false));
  }, [keyword, page, setImages]);

  const onLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {images && (
        <ul className={s.gallery}>
          <ImageGalleryItem images={images} />
        </ul>
      )}

      {loading && <Loader />}

      {showLoadMore && <Button onClick={onLoadMoreClick} />}
    </>
  );
}

ImageGallery.propTypes = { keyword: PropTypes.string.isRequired };

export default ImageGallery;
