import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';

interface RegistrationModalProps {
  initialName: string;
  onClose: () => void;
  onRegister: (name: string, email: string) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ initialName, onClose, onRegister }) => {
  const [name, setName] = useState(initialName === 'Language Learner' ? '' : initialName);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError('Enter a name with at least 2 characters.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Your password must contain at least 6 characters.');
      return;
    }
    onRegister(name.trim(), email.trim().toLowerCase());
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <UserPlus className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Create your account</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Save your learning progress on this device.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200" aria-label="Close registration">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" placeholder="Your name" autoComplete="name" />
          </label>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" placeholder="At least 6 characters" autoComplete="new-password" />
          </label>
          {error && <p className="text-sm font-bold text-rose-600 dark:text-rose-400" role="alert">{error}</p>}
          <button type="submit" className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-black text-white transition hover:bg-emerald-600 active:scale-[.99]">Register</button>
        </form>
      </div>
    </div>
  );
};
