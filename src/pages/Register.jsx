import { useState } from "react";
import { supabase } from "../supabaseClient";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Cont creat cu succes! Verifică email-ul pentru confirmare.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold mb-4 text-light-2">Înregistrare</h1>
      <form onSubmit={handleRegister}>
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
          Înregistrare
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
