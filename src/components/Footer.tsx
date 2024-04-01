import Image from "next/image";
export default function Footer() {
  return (
    <footer className="footer items-center py-8 px-10 bg-base-100 text-center text-base-content border-t">
      <aside className="items-center grid-flow-col gap-10">
        <Image
          src="/images/ufc4.png"
          alt="ufc"
          width={200}
          height={20}
          className=""
        ></Image>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <p>Copyright © 2024 Todos os direitos reservados</p>
      </nav>
    </footer>
  );
}
