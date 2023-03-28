import Navbar from "@/components/auth/Navbar";
import FooterSmall from "@/components/auth/FooterSmall";

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
            className="bg-blueGray-800 bg-full absolute top-0 h-full w-full bg-no-repeat"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
