import QueryProvider from "./query-provider";

const GlobalProvidersWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default GlobalProvidersWrapper;
