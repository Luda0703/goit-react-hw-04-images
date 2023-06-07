import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import * as Service from '../Service/Service';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import './App.module.css';



export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    total: 0,
    error: null,
    showModal: false,
    largeImage: '',
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const {query, page} = this.state;
    if(prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page)
    }
  }

  getPhotos = async (query, page) => {
    if(!query) {
      return;
    }

    this.setState({isLoading: true});

    try {
      
      const {hits, totalHits} = await Service.getImages(query, page);
      
      if(hits.length === 0) {
        return (Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
      }
     
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits
      }))
     
    } catch (error) {this.setState({error: error.massage})
  } finally {
    this.setState({isLoading: false})
  }
  }
  
  onHandleSubmite = value => {
    this.setState({query: value, page: 1, images: []})
  };

  onLoadMore = () => {
    this.setState(prevState => ({page: prevState.page +1}))
  }

  toggleModal = (largeImage, tags) => {
    this.setState({
      showModal: true,
      largeImage,
      tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImage: '',
      tags: '',
    });
  };
  
  render() {
    const {images, total, isLoading, error, showModal, tags, largeImage} = this.state
    const totalPage = total/images.length
    return (
      <>
        <Searchbar onSubmit={this.onHandleSubmite}/>
        {error && <h2>Please enter a search term!!</h2>}
        {images.length > 0 && <ImageGallery images={images} toggleModal={this.toggleModal} />}
        {showModal && <Modal onClose={this.closeModal} tags={tags} largeImage={largeImage}/>}
        {isLoading && <Loader/>}
        {totalPage>1 && !isLoading && images.length>0 && <Button onClick={this.onLoadMore}/>}
      </>
    )
  }
}






      
      

