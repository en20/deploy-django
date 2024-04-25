import Navbar from "@/components/layout/Navbar";
import { AuthContextProvider } from "@/context/authContext";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "UFC Autobots • Home",
  description: "Projeto de automação de processos",
}

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        {children}
      </AuthContextProvider>
    </>
  );
}
