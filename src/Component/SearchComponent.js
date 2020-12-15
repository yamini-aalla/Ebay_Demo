import React, { Component } from 'react';
import axios from "axios";
import _ from 'lodash'

class Search extends Component {
constructor(props) {
  super(props);
  this.state = {
    searchInput: '',
    allBooks: { items: []},
    addlist: [],
    flag: false,
  };
};

onBookSearch(event) {
  if (!this.debouncedFn) { 
    this.debouncedFn =  _.debounce(() => {  
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${event.target.value}`)
    .then(response => {
      this.setState({ allBooks: response.data })
    });
    }, 500);
  }
  this.debouncedFn();
}

onKeyChange = (event) => {
  this.setState({
    searchInput: event.target.value
  });
  this.onBookSearch(event);
}
addToList = (value, ind) => {
  const list = Array.from(new Set([...this.state.addlist, value]));
  this.setState({addlist: list});
}
removeFromList = (val, ind) => {
  const list = this.state.addlist.filter((val, i) => i !== ind);
  this.setState({ addlist: [...list]});
}
  render() {
    const { searchInput, allBooks, addlist} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="search-container col-sm-12 col-md-8">
            <div className="search-bar input-group pl-0">
              <input className="form-control my-0 py-1 amber-border"
              aria-label="search books"
                placeholder="Search Books"
                value={searchInput}
                onInput={(event) => this.onKeyChange(event)}
              />
              <div className="search-btn input-group-append">
                <button aria-label="search" className="btn btn-primary" onClick={() => this.onBookSearch()}>Search</button>
              </div>
            </div>
  
  
  
            {allBooks.items.map((books, i) => {
              return (
                <div className="details" key={i}>
                  <div className="name row">
                    <div className="book col-12 col-sm-12 col-md-3">
                      <img
                        alt={`${books.volumeInfo.title} book`}
                        src={`http://books.google.com/books/content?id=${books.id
                          }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                      />
                    </div>
                    <div className="book-details col-12 col-sm-12 col-md-9">
                      <h4>{books.volumeInfo.title}</h4>
                      <p><b>Author</b>: {books.volumeInfo.authors}</p>
                      <p><b>Publisher</b>: {books.volumeInfo.publisher}</p>
                      <p><b>Published Date</b> : {books.volumeInfo.publishedDate}</p>
                    </div>
                  </div>
  
                  <div className="description">
                    {books.volumeInfo.description && <p><b>Description</b> :{books.volumeInfo.description}</p>}
  
                  </div>
                  <div className="list-btns">
                    <button aria-label="add to list"  onClick={() => this.addToList(books, i)}>Add to list</button>
                  </div>
                </div>
              );
            })}
  
          </div>
          <div className="col-sm-12 col-md-4 reading-box">
            <div className="selected-book-container">
              <h2>My Reading Wishlist {addlist.length}</h2>
              {addlist && addlist.map((val, i) => {
  
                return (<div key={i} className="added-books">
                  <h1>{val.volumeInfo.title}
                    <button aria-label="remove book from list"  onClick={() => this.removeFromList(val, i)} ><span aria-hidden="true">&times;</span></button></h1>
                </div>)
              })}
  
            </div>
          </div>
        </div>
      </div>  
    );
  }
}
export default Search;
