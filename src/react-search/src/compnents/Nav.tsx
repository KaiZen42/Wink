import axios from 'axios';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import Grid from './Grid';
import List from './List';
import Paginator from './Paginator';

export default function Nav() {
  const [book, setBook] = useState<string | null>(null);
  const [result, setResult] = useState<[]>([]);
  const [maxResults, setMaxResults] = useState(5);
  const [view, setView] = useState('');
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    console.log(page + '<>' + maxPage + '<>' + maxResults);
    if (book) {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=${maxResults}&startIndex=${
            page * maxResults
          }`
        )
        .then(({ data }) => {
          setResult(data.items);
          console.log(data.totalItems);
          setMaxPage(Math.floor(data.totalItems / maxResults));
        });
    }
  }, [book, maxResults, page]);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const book = event.target.value;
    setBook(book);
  }
  function handleResults(e: MouseEvent<HTMLButtonElement>): void {
    const val: number = Number(e.currentTarget.getAttribute('value'));
    setPage(0);
    setMaxResults(val);
  }
  return (
    <div>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3">
          My Search App
        </a>
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
              value={5}
              onClick={handleResults}
            >
              5
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              value={10}
              onClick={handleResults}
            >
              10
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              value={15}
              onClick={handleResults}
            >
              15
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              value={20}
              onClick={handleResults}
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
          </div>
        </div>
      </nav>

      {result === undefined && (
        <div className="alert alert-dark" role="alert">
          Nothing has been found!
        </div>
      )}
      {(book === null || book === '') && (
        <div>
          <img src={'/lib-bg.jpg'} alt={'some_image'}></img>
        </div>
      )}
      {result && book && (
        <div className="container-fluid">
          <div className="row">
            {view === 'list' ? (
              <List result={result} maxResult={maxResults} page={page} />
            ) : (
              <Grid result={result} />
            )}
          </div>
          <div className="mt-3">
            <Paginator page={page} lastPage={maxPage} pageChanged={setPage} />
          </div>
        </div>
      )}
    </div>
  );
}
