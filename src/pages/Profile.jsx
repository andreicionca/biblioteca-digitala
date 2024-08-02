import { useState, useEffect } from "react";
import { useAuth } from '../context/auth';
import supabase from '../supabaseClient';
import FavoriteBook from '../components/common/FavoriteBook';

function Profile() {
  const { user, signOut } = useAuth();
  const [name, setName] = useState("");
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
        } else {
          setName(data.name);
        }
      }
    };

    const fetchFavoriteBooks = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('favoritebooks')
          .select('id, books (id, book, categories, format, link_download, link_view, id_cover)')
          .eq('user_id', user.id);

        if (error) {
          console.error("Error fetching favorite books:", error);
        } else {
          setFavoriteBooks(data);
        }
      }
    };

    fetchUserProfile();
    fetchFavoriteBooks();
  }, [user]);

  const handleRemoveFavorite = async (bookId) => {
    const { error } = await supabase
      .from('favoritebooks')
      .delete()
      .eq('user_id', user.id)
      .eq('book_id', bookId);

    if (error) {
      console.error("Error removing favorite book:", error);
    } else {
      setFavoriteBooks((prevFavorites) => prevFavorites.filter((book) => book.books.id !== bookId));
    }
  };

  return (
    <div className="container mx-auto">
      {user && (
        <div className="mb-8">
          <p className="text-xl pb-3 text-brand-1 md:text-6xl md:pb-6">Bună, {name}!</p>
          <p className="text-base md:text-1xl md:text-xl text-light-1">
            Bine ai venit la Biblioteca digitală! Pe această platformă te poți bucura de accesul rapid și ușor la mii de cărți în format electronic, disponibile pentru a fi descărcate și citite oricând și oriunde. În pagina de profil, poți regăsi titlurile salvate ca favorite pentru a le accesa rapid și ușor.
          </p>
          <p className="text-light-1 mt-4 md:text-xl ">Te rog să reții că toate cărțile disponibile pe această platformă sunt destinate exclusiv uzului personal. Este interzisă vânzarea sau distribuirea acestora. Respectarea drepturilor de autor este esențială pentru a evita sancțiunile legale.</p>
         
          <h2 className="text-xl text-center md:text-4xl md:pt-8 gradient-text font-semibold mt-3">Cărți favorite</h2>
          {favoriteBooks.length > 0 ? (
            favoriteBooks.map((item) => (
              <FavoriteBook key={item.books.id} book={item.books} onRemoveFavorite={handleRemoveFavorite} />
            ))
          ) : (
            <p className="text-light-2 md:text-center md:text-lg mt-2">Nu ai nicio carte la favorite. Poți adăuga cărți la favorite accesând detaliile cărților și apăsând pe simbolul ♡ .</p>
          )}
        </div>
      )}
      <div className="flex justify-center items-center">
      <button
        onClick={signOut}
        className="px-3 py-2 md:mt-20 bg-red-500 text-sm md:text-lg text-white rounded-md"
      >
        Deconectare
      </button>
      </div>
    </div>
  );
}

export default Profile;
