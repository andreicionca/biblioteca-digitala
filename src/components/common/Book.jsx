import PropTypes from 'prop-types';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import supabase from '../../supabaseClient';
import { useAuth } from '../../context/auth';

function Book({ book }) {
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const imgRef = useRef();
  const { user } = useAuth();

  const handleImageError = () => {
    setImageError(true);
  };

  const checkIfFavorite = async () => {
    if (user) {
      const { data, error } = await supabase
        .from('favoritebooks')
        .select('*')
        .eq('user_id', user.id)
        .eq('book_id', book.id);
      
      if (!error && data.length > 0) {
        setIsFavorite(true);
      }
    }
  };

  const handleFavorite = async () => {
    if (user) {
      if (isFavorite) {
        const { error } = await supabase
          .from('favoritebooks')
          .delete()
          .eq('user_id', user.id)
          .eq('book_id', book.id);
        if (error) {
          console.error('Error removing favorite book:', error);
        } else {
          setIsFavorite(false);
        }
      } else {
        const { error } = await supabase.from('favoritebooks').insert([{ user_id: user.id, book_id: book.id }]);
        if (error) {
          console.error('Error adding favorite book:', error);
        } else {
          setIsFavorite(true);
        }
      }
    }
  };

  useEffect(() => {
    checkIfFavorite();
  }, [user]);

  useEffect(() => {
    const imgElement = imgRef.current;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => {
      if (imgElement) {
        observer.unobserve(imgElement);
      }
    };
  }, []);

  const getFormatButtonStyle = (format) => {
    switch (format) {
      case 'PDF':
        return 'bg-red-500';
      case 'DOC':
        return 'bg-blue-500';
      case 'EPUB':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 rounded-lg overflow-hidden border border-light-2 p-2 flex transition-transform transform hover:border-light-3 hover:shadow-xl">
      <a href={book.link_view} target="_blank" rel="noopener noreferrer" className="w-32 h-48 flex-shrink-0">
        {!imageError ? (
          <img
            className="h-full w-full object-cover rounded-lg"
            data-src={`https://drive.google.com/thumbnail?id=${book.id_cover}`}
            alt="Book Cover"
            onError={handleImageError}
            ref={imgRef}
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </a>
      <div className="pl-2 flex flex-col justify-between w-full">
        <div className="flex justify-between items-start mb-2">
          <a href={book.link_view} target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg lg:text-xl font-semibold text-light-2">
            {book.book}
            <span className={`ml-1 px-0.5 rounded text-white text-xs md:px-2 md:py-1 md:text-sm ${getFormatButtonStyle(book.format)}`}>
              {book.format}
            </span>
          </a>
          <button onClick={handleFavorite} className="text-light-2 hover:text-light-3">
            {isFavorite ? <HeartIconSolid className="h-5 w-5 text-brand-2" /> : <HeartIcon className="h-5 w-5" />}
          </button>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs md:text-md lg:text-lg text-light-1 w-1/2">
            {book.categories}
          </p>
          <a
            href={book.link_download}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-1 text-dark-2 px-2 py-1 rounded hover:bg-brand-1-hover hover:text-slate-50 text-center text-xs md:text-sm font-semibold"
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
    id: PropTypes.number.isRequired,
    book: PropTypes.string.isRequired,
    categories: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    link_download: PropTypes.string.isRequired,
    link_view: PropTypes.string.isRequired,
    id_cover: PropTypes.string.isRequired,
  }).isRequired,
};

export default Book;
