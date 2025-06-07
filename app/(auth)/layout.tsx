const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <div className="bg-primary hidden lg:flex"></div>
      <div className="flex items-center justify-center">
        <div>
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="text-2xl font-bold">📦 Next.js Starter Kit</div>
            <div className="text-muted-foreground text-md mx-auto max-w-xs text-center">
              A modern, unidirectional, feature-based architecture for Next.js
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
