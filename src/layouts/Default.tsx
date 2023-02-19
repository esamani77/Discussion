import Header from "../components/Header";
import "./layout.scss";
function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="h-head">
        <Header />
      </header>
      <main className="h-remain bg-white">{children}</main>
    </>
  );
}

export default DefaultLayout;
