import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      setToken(token);
    } else {
      setMessage("Tokenul de confirmare lipsește.");
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("Tokenul de confirmare lipsește.");
      return;
    }

    const { data: userData, error: authError } = await supabase.auth.updateUser({ token, password });
    if (authError) {
      setMessage(authError.message);
    } else {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: userData.user.id, name, email }]);
      if (profileError) {
        setMessage(profileError.message);
      } else {
        setMessage("Parola a fost setată cu succes! Acum vei fi redirecționat către pagina de conectare.");
        setTimeout(() => navigate('/login'), 3000); // Redirecționare după 3 secunde
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 md:mt-14">
      <div className="max-w-md w-full space-y-10">
        <h1 className="text-3xl md:text-5xl text-center font-bold mb-4 text-light-2 p-4">
          Setează parola
        </h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Prenumele tău"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-2 mb-4 border border-dark-2 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-4 border border-dark-2 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Parola nouă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-4 border border-dark-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-brand-1 block w-full text-white p-2 rounded hover:bg-brand-1-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-1 transition duration-150 ease-in-out"
          >
            Înregistrare
          </button>
        </form>
        {message && (
          <p
            className={`px-4 py-3 rounded relative ${
              message.includes("succes") ? "bg-green-100 border border-green-400 text-green-700" : "bg-brand-3 bg-opacity-10 border border-brand-3 text-dark-0"
            }`}
            role="alert"
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
