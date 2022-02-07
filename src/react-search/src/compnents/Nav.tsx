import axios from 'axios';
import {
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { Books } from '../models/Books.interface';
import Paginator from './Paginator';

export default function Nav() {
  let i: number = 0;
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [maxResults, setMaxResults] = useState(5);
  const [view, setView] = useState('');
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  let test: number = 0;

  // function setMaxRes()
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=${maxResults}&startIndex=${
          page * maxResults
        }`
      )
      .then(({ data }) => {
        console.log(data.totalItems);

        setResult(data.items);
        setMaxPage(data.totalItems / maxResults);
      });
  }, [book, maxResults, page]);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const book = event.target.value;
    setBook(book);
    // if (maxRes) setMaxResults(maxRes);
    // console.log(maxResults);
  }

  return (
    <body>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3">
          My Search App
        </a>
        {/* <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}
        <input
          className="form-control form-control-dark w-100"
          onChange={handleChange}
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => setMaxResults(5)}
            >
              5
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => setMaxResults(10)}
            >
              10
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => setMaxResults(15)}
            >
              15
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => setMaxResults(20)}
            >
              20
            </button>
            <div className="btn-group mr-2">
              <button
                type="button"
                style={{ color: 'white' }}
                className="btn btn-sm btn-outline-secondary"
                onClick={(e) => setView('list')}
              >
                List
              </button>
              <button
                type="button"
                style={{ color: 'white' }}
                className="btn btn-sm btn-outline-secondary"
                onClick={(e) => setView('grid')}
              >
                Grid
              </button>
            </div>
            {/* <p style={{color: "white"}}>max{ maxResults}</p> */}
          </div>
        </div>

        {/* <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#" onClick={(e) => handleChange}>
              Search
            </a>
          </li>
        </ul> */}
      </nav>

      {result === undefined || book === '' ? (
        <div className="alert alert-dark" role="alert">
          Nothing has been found!
          <div>
            <img src={'/lib-bg.jpg'} alt={'some_image'}></img>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            {view === 'list' ? (
              <main role="main" className="col-md-9 ml-sm-auto col-lg px-md-4">
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        {/* <th>Info Link</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {result.map((book: Books) => {
                        return (
                          <tr key={book.id}>
                            <td>{(i += 1)}</td>
                            <img
                              className="card-img-top"
                              style={{ width: '5rem', height: '7.5rem' }}
                              src={
                                book.volumeInfo.imageLinks !== undefined
                                  ? book.volumeInfo.imageLinks.smallThumbnail
                                  : '/book.png'
                              }
                              alt={book.volumeInfo.title}
                            />
                            <td>{book.volumeInfo.title}</td>
                            <td className="multi-line-2">
                              {book.volumeInfo.description === undefined
                                ? 'Description is non available'
                                : book.volumeInfo.description}
                            </td>
                            <td>
                              <a
                                href={book.volumeInfo.infoLink}
                                target="_blank"
                                rel="noreferrer"
                                className="nav-link"
                              >
                                Preview
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </main>
            ) : (
              <div className="container">
                <div className="row">
                  {result.map((book: Books) => (
                    <div className="col-sm-3" key={book.id}>
                      <div
                        className="card"
                        style={{
                          marginTop: '5rem',
                          width: '15rem',
                          height: '32rem',
                        }}
                      >
                        <a
                          href={book.volumeInfo.infoLink}
                          style={{
                            width: '10rem',
                            height: '15rem',
                            alignSelf: 'center',
                          }}
                        >
                          <img
                            className="card-img-top"
                            src={
                              book.volumeInfo.imageLinks !== undefined
                                ? book.volumeInfo.imageLinks.thumbnail
                                : ''
                            }
                            alt={book.volumeInfo.title}
                          />
                        </a>
                        <div className="card-body">
                          <h6 className="card-title multi-line-5 mt-3">
                            {book.volumeInfo.title}
                          </h6>
                          <p className="card-text multi-line-5">
                            {book.volumeInfo.description === undefined
                              ? 'Description is non available'
                              : book.volumeInfo.description}
                          </p>
                          {/* <a href={book.volumeInfo.infoLink} className="link">
                          Preview
                        </a> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mx-auto-center mt-3">
            <Paginator lastPage={maxPage} pageChanged={setPage} />
          </div>
        </div>
      )}
    </body>
  );
}
