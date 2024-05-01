"use client";
import { ChangeEvent, useState, FormEvent } from "react";
import FormRow from "../../common/form/FormInput";
import LinkButton from "../../common/LinkButton";
import { useRouter } from "next/navigation";
import executeRobotService from "@/services/executeRobotService";
import Breadcrumbs from "../../common/Breadcrumbs";

interface ExecuteSectionProps {
  botId: string;
}

export interface Data {
  url: string;
}

export default function ExecuteSection2({ botId }: ExecuteSectionProps) {
  const [data, setData] = useState<Data>({ url: "" });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setData((previous) => {
      return {
        ...previous,
        [target.id]: target.value,
      };
    });
  };
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await executeRobotService.executeRobot2(botId, data.url); 

      alert(response.message)

      router.push(`/robots/${botId}/details/${response.run}`)
    } catch (error) {
      console.log(error) 
    }
  }
  
  const breadcrumbItems = [
    {
      path: "/",
      name: "Robô",
    },
    {
      path: `/execute/${botId}/#`,
      name: "Histórico de execuções",
    },
    {
      path: `/execute/${botId}/#`,
      name: "Nova execução ( Infomar dados )",
    },
  ];

  return (
    <section className="flex flex-col container-wrapper py-4">
      <Breadcrumbs items={breadcrumbItems} />
      <h2 className="text-primary text-3xl">
        Executar Bot <span className="text-primary">{botId}</span>
      </h2>
      <h3 className="text-lg">Informe os dados</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-8 mt-8 px-6 w-full gap-6 rounded-lg shadow-lg">
          <div className="border relative border-gray-300 py-12 px-8 rounded-lg">
            <h3 className="bg-base-100 absolute top-[-14px] px-2">
              Informações de execução
            </h3>
            <div className="grid lg:grid-cols-2 gap-10">
              <FormRow
                key="url"
                labelText="URL"
                inputId="url"
                inputType="text"
                inputValue={data.url}
                inputRequired={true}
                handleChange={handleChange}
                rowClassName="w-full lg:w-2/3"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end p-4 gap-4">
          <LinkButton path={`/robots/${botId}`}>Voltar</LinkButton>
          <button
            type="submit"
            className={`
              block bg-primary text-base-100 font-bold py-2 px-4 rounded-md
              transition-all duration-200 ease-out 
              hover:scale-105 hover:bg-accent 
              focus:scale-105 focus:bg-accent 
            `}
          >
            Executar 
          </button>
        </div>
      </form>
    </section>
  );
}
