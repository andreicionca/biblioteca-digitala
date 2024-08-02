import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email sau parolă incorectă. Dacă ai uitat parola, contactează administratorul site-ului pentru resetare.");
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 md:mt-14">
      <div className="max-w-md w-full space-y-10 p-4 md:rounded-xl md:shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl md:text-5xl font-extrabold text-light-3 gradient-text">
            Conectare
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-md -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Adresă de email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 my-6 border border-light-1 placeholder-light-1 text-light-3 focus:outline-none focus:ring-brand-1 focus:border-brand-1 focus:z-10 text-sm md:text-lg bg-dark-1"
                placeholder="Adresă de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Parola
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-light-1 placeholder-light-1 text-light-3 focus:outline-none focus:ring-brand-1 focus:border-brand-1 focus:z-10 text-sm md:text-lg bg-dark-1"
                placeholder="Parola"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm md:text-lg font-medium rounded-md text-dark-0 bg-brand-1 hover:bg-brand-1-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-1 transition duration-150 ease-in-out"
            >
              Intră în cont
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
