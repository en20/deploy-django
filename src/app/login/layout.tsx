import { BsRobot } from "react-icons/bs";
import { AuthContextProvider } from "@/context/authContext";

interface LoginLayoutProps {
  children: React.ReactNode;
}

function Header () {
  return (
    <div className="navbar bg-base-100 border-b lg:px-6">
      <div className="navbar-start">
        <div className="flex items-center gap-4 px-4 normal-case text-xl font-semibold cursor-pointer">        
          <BsRobot className="hidden md:block text-primary hover:scale-110 transition-all duration-200 ease-out text-[2.5rem]" />
          <span>UFC Autobots</span>
          </div>
      </div>
    </div>
  )
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <AuthContextProvider>
        <Header />
        {children}
      </AuthContextProvider>
    </>
  );
}
