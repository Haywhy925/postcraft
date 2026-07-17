import Footer from "../general/Footer";
import Navbar from "../navbar/Navbar";

function ContainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="xl:w-[75%] w-[95%] mx-auto overflow-hidden">
      <Navbar />
      <div className="mt-20 px-7 sm:px-0">{children}</div>
      <Footer />
    </section>
  );
}

export default ContainerLayout;
