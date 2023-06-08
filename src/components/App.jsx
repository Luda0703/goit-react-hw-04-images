import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import * as Service from '../Service/Service';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import './App.module.css';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (query !== '') {
      getPhotos(query, page);
    }
  }, [query, page]);

  const getPhotos = async (query, page) => {
    setIsLoading(true);

    try {
      const { hits, totalHits } = await Service.getImages(query, page);

      if (hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      setImages(prevImages => [...prevImages, ...hits]);
      setTotal(totalHits);
    } catch (error) {
      setError(error.massage);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSubmite = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  const totalPage = total / images.length;

  return (
    <>
      <Searchbar onSubmit={onHandleSubmite} />
      {error && <h2>Please enter a search term!!</h2>}
      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}
      {showModal && (
        <Modal onClose={closeModal} tags={tags} largeImage={largeImage} />
      )}
      {isLoading && <Loader />}
      {totalPage > 1 && !isLoading && images.length > 0 && (
        <Button onClick={onLoadMore} />
      )}
    </>
  );
}

// первый рендер в useEffect
//  const isFirstRender = useRef(true)

// if(isFirstRender.current) {
//   isFirstRender.current = false;
//   return ;
// }
