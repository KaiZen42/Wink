import { Books } from '../models/Books.interface';
import '../../src/PopUp.css';

function myFunction(): void {
  var popup: any = document.getElementById('myPopup');
  popup.classList.toggle('show');
}

const List = (props: { result: []; maxResult: number; page: number }) => {
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
      <button type="button" className="popup" onClick={myFunction}>
        Click me!
        <span className="popuptext" id="myPopup">
          Popup text...
        </span>
      </button>
    </main>
  );
};

export default List;
