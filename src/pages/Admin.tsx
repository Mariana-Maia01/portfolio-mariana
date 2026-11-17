import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Lock, LogOut } from "lucide-react";
import { usePdi } from "@/context/PdiProvider";

/** /admin — login da administradora para editar o PDI pelo site. */
const Admin = () => {
  const { admin, configured, signIn, signOut } = usePdi();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(password);
      navigate("/#pdi");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <Link to="/#pdi" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} aria-hidden /> Voltar ao portfólio
        </Link>

        <div className="liquid-glass rounded-3xl p-8">
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Lock size={22} aria-hidden />
          </span>
          <h1 className="font-display text-2xl font-bold">Área administrativa</h1>

          {admin ? (
            <>
              <p className="mt-2 text-sm text-muted-foreground">Você está logada e pode editar o PDI.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/#pdi"
                  className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
                >
                  Editar PDI
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary/50"
                >
                  <LogOut size={15} aria-hidden /> Sair
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {!configured && (
                <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-500">
                  O login só funciona no site publicado na Vercel (ou com <code>npx vercel dev</code>), depois de
                  configurar o banco e as variáveis ADMIN_PASSWORD e SESSION_SECRET.
                </p>
              )}
              <label className="block text-sm font-medium" htmlFor="admin-password">
                Senha
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              {error && (
                <p role="alert" className="text-sm text-rose-500">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || !password}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {loading && <Loader2 size={15} className="animate-spin" aria-hidden />}
                Entrar
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Admin;
