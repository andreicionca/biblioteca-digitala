import { useState } from "react";
import { supabase } from "../supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Logat cu succes!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold mb-4 text-light-2">Autentificare</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4"
          required
        />
        <button type="submit" className="bg-brand-1 text-white p-2 rounded">
          Logare
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
