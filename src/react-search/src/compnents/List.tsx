import { Books } from '../models/Books.interface';
import '../../src/PopUp.css';
import { useState } from 'react';

const List = (props: { result: []; maxResult: number; page: number }) => {
  const [state, setState] = useState('');
  function popUp(e: any, val: string): void {
    var popup: any = document.getElementById(val);
    if (!state) {
      popup.classList.toggle('show');
      setState(val);
    } else if (state === val) {
      popup.classList.toggle('show');
      setState('');
    }
  }

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg px-md-4">
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Info Link</th>
            </tr>
          </thead>
          <tbody>
            {props.result.map((book: Books, i) => {
              return (
                <tr key={book.id}>
                  <td>{i + props.maxResult * props.page + 1}</td>
                  <td>
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
                  </td>
                  <td>{book.volumeInfo.title}</td>
                  <td className="multi-line-2 mt-0">
                    {book.volumeInfo.description === undefined
                      ? 'Description is non available'
                      : book.volumeInfo.description}
                  </td>
                  <td>
                    <button
                      className="popup btn btn-light"
                      onClick={(e) => popUp(e, String(book.id))}
                    >
                      Preview
                      <span className="popuptext" id={book.id}>
                        <img
                          className="card-img-top"
                          style={{ width: '10rem', height: '15rem' }}
                          src={
                            book.volumeInfo.imageLinks !== undefined
                              ? book.volumeInfo.imageLinks.thumbnail
                              : '/book.png'
                          }
                          alt={book.volumeInfo.title}
                        />
                        <h4 className="mt-3">{book.volumeInfo.title}</h4>
                        <p className="mt-3 px-3">
                          {book.volumeInfo.description === undefined
                            ? 'Description is non available'
                            : book.volumeInfo.description}
                        </p>

                        <a
                          href={book.volumeInfo.infoLink}
                          style={{
                            color: 'black',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                          }}
                          target="_blank"
                          rel="noreferrer"
                          className="nav-link"
                        >
                          Info link
                          {/* <button type="button" className="btn btn-light">
                          Info link
                        </button> */}
                        </a>
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default List;
