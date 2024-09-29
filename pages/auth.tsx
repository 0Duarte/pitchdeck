'use client'

import { useState, useEffect } from "react";
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        router.push('/demo');
      }, 3000); // Redireciona após 3 segundos
      return () => clearTimeout(timer);
    }
  }, [isRegistered, router]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password || !confirmPassword || !name || !age || !company) {
      setError('Todos os campos são obrigatórios');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name,
            age,
            company
          }
        }
      });
      if (signUpError) {
        setError(signUpError.message);
      } else {
        setIsRegistered(true);
      }
    } catch (err) {
      setError('Ocorreu um erro durante o registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#407BBF] to-[#7578b2] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          {isRegistered ? 'Registro Concluído' : 'Registre-se'}
        </h1>
        <div className="w-full max-w-md">
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {isRegistered ? (
            <div className="text-center">
              <p className="mb-4">Seu registro foi concluído com sucesso!</p>
              <p>Redirecionando para a página de demonstração...</p>
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-[8px] border border-[#e5e7eb] bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#407BBF]"
                required
              />
              <input
                type="number"
                placeholder="Idade"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="rounded-[8px] border border-[#e5e7eb] bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#407BBF]"
                required
              />
              <input
                type="text"
                placeholder="Empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="rounded-[8px] border border-[#e5e7eb] bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#407BBF]"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-[8px] border border-[#e5e7eb] bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#407BBF]"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-[8px] border border-[#e5e7eb] bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#407BBF]"
                required
              />
              <input
                type="password"
                placeholder="Confirme a Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-[8px] border border-[#e5e7eb] bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#407BBF]"
                required
              />
              <button 
                type="submit" 
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrar'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;