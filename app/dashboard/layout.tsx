"use client"

import Navbar from "@/components/dashboard/layout/navbar";
import Sidebar from "@/components/dashboard/layout/sidebar";
import HeaderStats from "@/components/dashboard/layout/header";
import Footer from "@/components/dashboard/layout/footer";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (<>
    <Sidebar />
    <div className="relative bg-blueGray-100 md:ml-64">
      <Navbar />
      {/* Header */ }
      <HeaderStats />
      <div className="w-full min-h-full px-4 mx-auto -m-24 md:px-10">
        { children }
        <Footer />
      </div>
    </div>
  </>
  );
}
