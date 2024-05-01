"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/authContext";
import authService from "@/services/authService";
import FormRow from "./FormInput";

interface FormData {
  email: string;
  password: string;
}

const DEFAULT_DATA = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_DATA);

  const router = useRouter();
  const { login } = useAuthContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setFormData((previous) => {
      return {
        ...previous,
        [target.id]: target.value,
      };
    });
  }

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();

      await login(formData.email, formData.password);

      setFormData(DEFAULT_DATA);
      alert("Logado com sucesso");
      router.push("/");
    } catch (error) {
      alert((error as Error).message);
    }
  }

  // useEffect(() => {
  //   const setCsrf = async () => {
  //     try {
  //       await authService.getCsrf();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   setCsrf();
  // }, []);

  return (
    <form
      className={`
        flex flex-col gap-4 w-full h-[450px] max-w-[350px] py-6 px-4 md:px-6
        shadow-lg rounded-lg
      `}
      onSubmit={handleSubmit}
    >
      <h2 className="text-primary text-4xl font-bold mb-8">Login</h2>
      <div className="flex flex-col gap-8">
        <FormRow
          rowClassName="w-full"
          labelText="Email"
          inputId="email"
          inputType="email"
          inputValue={formData.email}
          handleChange={handleChange}
          inputRequired={true}
        />
        <FormRow
          rowClassName="w-full"
          labelText="Senha"
          inputId="password"
          inputType="password"
          inputValue={formData.password}
          handleChange={handleChange}
          inputRequired={true}
        />
      </div>
      <div className="flex">
        <Link
          href={"/recover"}
          className="text-sm ml-auto block text-primary transition-all duration-200 ease-out hover:text-accent hover:scale-105 focus:text-accent focus:scale-105"
        >
          Esqueci minha senha
        </Link>
      </div>
      <button
        type="submit"
        className={`
          w-3/5 block bg-primary text-white mt-auto py-2 rounded-md 
          transition-all duration-200 ease-out 
          hover:scale-105 hover:bg-accent 
          focus:scale-105 focus:bg-accent
        `}
      >
        Logar
      </button>
    </form>
  );
}
