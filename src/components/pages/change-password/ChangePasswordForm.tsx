"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormRow from "../../common/form/FormInput";

interface FormData {
  password: string;
  newpassword: string;
  repeat: string;
}

const DEFAULT_DATA = {
  password: "",
  newpassword: "",
  repeat: "",
};

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_DATA);

  const router = useRouter();

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
    e.preventDefault();

    if (formData.newpassword !== formData.repeat) {
      alert("The passwords do not match");
      return;
    }

    const body = {
      password: formData.password,
      newpassword: formData.newpassword,
    };

    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }
    setFormData(DEFAULT_DATA);
    alert(data.message);

    router.push("/login");
  }

  return (
    <form
      className={`
        flex flex-col w-full h-[450px] max-w-[350px] py-4 px-4 md:px-6
        shadow-lg rounded-lg gap-6
      `}
      onSubmit={handleSubmit}
    >
      <h2 className="text-primary text-4xl font-bold mb-6">Alterar Senha</h2>
      <div className="flex flex-col gap-7">
        <FormRow
          rowClassName="w-full"
          inputClassName="input-sm"
          labelActiveStyle="-translate-y-7"
          labelText="Senha"
          inputId="password"
          inputType="password"
          inputValue={formData.password}
          handleChange={handleChange}
          inputRequired={true}
        />
        <FormRow
          rowClassName="w-full"
          inputClassName="input-sm"
          labelActiveStyle="-translate-y-7"
          labelText="Nova Senha"
          inputId="newpassword"
          inputType="password"
          inputValue={formData.newpassword}
          handleChange={handleChange}
          inputRequired={true}
        />
        <FormRow
          rowClassName="w-full"
          inputClassName="input-sm"
          labelActiveStyle="-translate-y-7"
          labelText="Nova Senha"
          inputId="repeat"
          inputType="password"
          inputValue={formData.repeat}
          handleChange={handleChange}
          inputRequired={true}
        />
      </div>
      <div className="flex">
        <Link
          href={"/"}
          className="text-sm ml-auto block text-primary transition-all duration-200 ease-out hover:text-accent hover:scale-105 focus:text-accent focus:scale-105"
        >
          página inicial
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
        Mudar Senha
      </button>
    </form>
  );
}
