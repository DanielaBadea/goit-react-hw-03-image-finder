import React  from "react";
import SearchBar from "./Searchbar/Searchbar";
import Button from "./ButtonLoadMore/Button";
import { config } from "data/config";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import Messaje from "./Messaje/Message";
import ScrollButton from "./ScrollButton/ScrollButton";
export class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gallery:[],
      isLoading:false,
      query:'',
      page:1,
      error:null,
      isLoadMOre:true,
      isOpenModal: false,
      modalImage:'',
      isMesaje:true,
      isScroll:false,
    }
  }
// componentDidMount(){
// const {query, page} = this.state;
// this.abortController = new AbortController();
//     const { signal } = this.abortController;
// fetch(`${config.URL}?q=${query}&page=${page}&key=${config.KEY}&image_type=photo&orientation=horizontal&per_page=12`, {signal})
// .then(response => response.json())
// .then(data => {
//   this.setState((prevState) => ({
//     gallery:[...prevState.gallery, ...data.hits],
//     isLoading:false,
//     page:1,
//   }))
// }).catch((error) => {
//   console.error('Error fetching gallery:', error);
//   this.setState({isLoading:false, error});
// });
// }

fetchGallery = async () => {
  this.abortController = new AbortController();
  const { signal } = this.abortController;
  const { query, page } = this.state;
  this.setState({ isLoading: true });

  try {
    const response = await fetch(`${config.URL}?q=${query}&page=${page}&key=${config.KEY}&image_type=photo&orientation=horizontal&per_page=12`, { signal });
    const data = await response.json();
    this.setState(prevState => ({
      gallery: [...prevState.gallery, ...data.hits],
      isLoading: false,
      error: null, 
      isScroll:true
    }));
  } catch (error) {
    console.error('Error fetching gallery:', error);
    this.setState({ isLoading: false, error });
  } finally {
    console.log('Fetching gallery completed');
  }
}
componentDidUpdate(prevProps, prevState) {
  const { query, page, gallery } = this.state;
  
  if (query !== prevState.query || page !== prevState.page) {
    fetch(`${config.URL}?q=${query}&page=${page}&key=${config.KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...data.hits],
          isLoading: false,
        }));
      })
      .catch(error => {
        console.error('Error fetching gallery:', error);
        this.setState({ isLoading: false, error });
      });
  } else if (gallery.length === 0 && prevState.gallery.length > 0) {
    this.setState({ gallery: [] });
  }
}
componentWillUnmount() {
  if (this.abortController) {
    this.abortController.abort();
  }
}
// re-randa la fiecare fiecare schimbare de tasta  si nu astepta sa termin cuvantul ca sa dau submit ca sa-mi afiseze imaginile
// handleChange = (ev) => {
//   this.setState({
//     query: ev.target.value,
//   })
// }
//  căutarea și actualizarea stării se va face doar la submit
handleSubmit = async (ev) => {
  ev.preventDefault();
  const newQuery = ev.target.elements.query.value;
  
  if (newQuery.toLowerCase().trim() !== "") {
    await this.setState({
      query: newQuery,
      page: 1, 
      gallery: [], 
      isMesaje:false,
    });
    
    this.fetchGallery(); 
  }
  
  ev.target.reset();
}
handlerLoadMore = () => {
 
  this.setState(prevState => ({
    page: prevState.page + 1,
  }), () => {
    this.fetchGallery(); // apeleam metoda pentru a solicita mai multe imagini
  });
}
// handlerLoadMore = () => {
//   const { query, page } = this.state;
//   fetch(`${config.URL}?q=${query}&page=${page}&key=${config.KEY}&image_type=photo&orientation=horizontal&per_page=12`)
//       .then(response => response.json())
//       .then(data => {
//           this.setState(prevState => ({
//               gallery: [...prevState.gallery, ...data.hits],
//               isLoading: false,
//               page: prevState.page + 1,
//               isLoadMore: true
//           }));
//       })
//       .catch(error => {
//           console.error('Error fetching gallery:', error);
//           this.setState({ isLoading: false, error });
//       });
// }
openModal= (image) => {
  console.log(image);
  this.setState({
    isOpenModal: true,
    modalImage:image.largeImageURL,
  })
}
closeModal= () => {
  this.setState({
    isOpenModal: false,
    modalImage:'',
  })
}

render() {
  const { gallery, query, isLoading, isOpenModal, modalImage,isMesaje, isScroll } = this.state;
  const totalImages = gallery.length;
  const showLoadMore = totalImages > 0 && !isLoading;

  return (
      <>
          <SearchBar onSubmit={this.handleSubmit}  value={query} />
          {isMesaje && <Messaje/>}
          {isLoading ? <Loader /> : <ImageGallery images={gallery} openModal={this.openModal} />}
          {showLoadMore && <Button onLoadMore={this.handlerLoadMore} />}
          {isOpenModal && <Modal closeModal={this.closeModal} image={modalImage} />}
          {isScroll && <ScrollButton/> }

      </>
  );
}
}