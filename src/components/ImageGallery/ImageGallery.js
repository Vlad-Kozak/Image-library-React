import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './ImageGallery.module.css';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import { getImages } from 'service/api';

function ImageGallery({ keyword }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    setImages([]);
    setLoading(true);
    setShowLoadMore(false);

    getImages(keyword, 1)
      .then(r => {
        if (r.total === 0) {
          toast.info('По вашему запросу ничего не найдено!');
          return;
        }
        if (r.total > 12) {
          setShowLoadMore(true);
        }
        setImages(r.hits);
      })
      .catch(console.log)
      .then(setLoading(false));
  }, [keyword]);

  const onLoadMoreClick = () => {
    setLoading(true);

    const page = images.length / 12 + 1;

    getImages(keyword, page)
      .then(r => {
        if (r.total - images.length <= 12) {
          setShowLoadMore(false);
        }
        setImages(images => {
          return [...images, ...r.hits];
        });
      })
      .catch(console.log)
      .then(setLoading(false));
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
