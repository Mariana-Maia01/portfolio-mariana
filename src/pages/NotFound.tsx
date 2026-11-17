const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center bg-background px-6">
    <div className="text-center">
      <p className="text-sm font-medium text-primary mb-2">404</p>
      <h1 className="mb-4 text-3xl font-display font-bold">Página não encontrada</h1>
      <a href="/" className="text-primary underline hover:text-primary/90">
        Voltar para o início
      </a>
    </div>
  </main>
);

export default NotFound;
