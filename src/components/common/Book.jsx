import PropTypes from 'prop-types';
import { HeartIcon } from '@heroicons/react/24/outline';

function Book({ book }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-4 rounded-lg overflow-hidden border p-2 flex transition-transform transform hover:scale-105 hover:shadow-lg">
      <div>
        <img
          className="h-full object-cover rounded-lg"
          src={`https://drive.google.com/thumbnail?id=${book.id_cover}`}
          alt="Book Cover"
        />
      </div>
      <div className="pl-2 flex flex-col justify-between w-full">
        {/* Randul 1 */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-sm md:text-lg lg:text-xl font-semibold text-light-2">
            {book.carte}
          </h2>
          <button className="text-brand-2">
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Randul 2 */}
        <div className="flex justify-between items-center">
          <p className="text-xs md:text-md lg:text-lg text-light-1 w-1/2">
            Format: {book.format}
          </p>
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-1 text-dark-2 px-2 py-1 rounded hover:bg-brand-2 hover:text-dark-2 text-center text-xs md:text-sm"
          >
            Descarcă
          </a>
        </div>
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    carte: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    id_cover: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
