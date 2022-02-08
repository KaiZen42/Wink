import { Books } from '../models/Books.interface';

const Grid = (props: { result: [] }) => {
  return (
    <div className="container">
      <div className="row">
        {props.result.map((book: Books) => (
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
