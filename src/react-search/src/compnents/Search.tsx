import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Books } from '../models/Books.interface';
import Paginator from './Paginator';

function googleBooksSearch() {
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const book = event.target.value;
    setBook(book);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
      .then(({ data }) => {
        console.log(data.items);
        setResult(data.items);
      });
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
      .then(({ data }) => {
        console.log(data.items);
        setResult(data.items);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="card-header main-search">
        <div className="row">
          <div className="col-12 col-md-3 col-xl-3">
            <input
              onChange={handleChange}
              className="AutoFocus form-control"
              placeholder="Type something..."
              type="text"
            />
          </div>
          <div className="ml-auto">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary search-btn"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {result.map((book: Books) => (
            <div className="col-sm-3" key={book.id}>
              <div
                className="card"
                style={{ marginTop: '5rem', width: '15rem', height: '28rem' }}
              >
                <img
                  className="card-img-top"
                  style={{
                    width: '10rem',
                    height: '15rem',
                    alignSelf: 'center',
                  }}
                  src={
                    book.volumeInfo.imageLinks !== undefined
                      ? book.volumeInfo.imageLinks.thumbnail
                      : ''
                  }
                  alt={book.volumeInfo.title}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {book.volumeInfo.title.length < 40
                      ? book.volumeInfo.title
                      : book.volumeInfo.title.slice(0, 40) + '...'}
                  </h5>
                  <p className="card-text">
                    {
                      'book.volumeInfo.description.length < 80 ? book.volumeInfo.title : book.volumeInfo.description.slice(0,80)+'
                    }
                  </p>
                  <a
                    href={book.volumeInfo.infoLink}
                    className="btn btn-primary"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Paginator lastPage={5}/> */}
    </form>
  );
}

export default googleBooksSearch;
