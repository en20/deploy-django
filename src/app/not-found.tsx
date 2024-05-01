import { BsRobot } from "react-icons/bs";
import LinkButton from "@/components/common/LinkButton";

export default function NotFound() {
  return (
    <main className="flex flex-col h-screen container-wrapper py-4">
      <section className="flex flex-col h-full w-full items-center gap-2 py-32">
        <span className="flex items-center gap-8">
          <BsRobot className="text-description h-[8rem] w-[8rem]" />
          <h1 className="text-primary text-[8rem]">Erro 404</h1>
          <BsRobot className="text-description h-[8rem] w-[8rem]" />
        </span>
        <h2 className="text-description text-5xl">Página não encontrada</h2>
        <LinkButton path="/" className="mt-8 px-6 py-3 text-xl ">
          Página inicial
        </LinkButton>
      </section>
    </main>
  );
}
