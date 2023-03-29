import Navbar from "@/components/auth/layout/navbar";
import Footer from "@/components/auth/layout/footer";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative h-full min-h-screen w-full py-40">
          <div
            className="absolute top-0 h-full w-full bg-blueGray-800 bg-full bg-no-repeat"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          <Footer absolute />
        </section>
      </main>
    </>
  );
}
