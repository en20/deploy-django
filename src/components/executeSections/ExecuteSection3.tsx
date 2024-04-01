"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UploadPopUp from "../UploadPopUp";
import MultiStepForm, { FormStep } from "../form/MultiStepForm";
import FormRow from "../form/FormInput";
import { UploadsTable2 } from "../Table";
import { FaFileUpload } from "react-icons/fa";
import executeRobotService from "@/services/executeRobotService";
import LinkButton from "../LinkButton";
import Breadcrumbs from "../Breadcrumbs";

interface ExecuteSectionProps {
  botId: string;
}

export type SectionType = ({ botId }: ExecuteSectionProps) => JSX.Element;

export interface Credentials {
  cpf: string;
  password: string;
  year: string;
  sector: string;
}

export default function ExecuteSection({ botId }: ExecuteSectionProps) {
  const [credentials, setCredentials] = useState<Credentials>({
    cpf: "",
    password: "",
    year: "",
    sector: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const router = useRouter();

  const handleProgress = (progress: number) => {
    setProgress(progress);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setCredentials((previous) => {
      return {
        ...previous,
        [target.id]: target.value,
      };
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileEvent(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) return;

    const uploaded = [...files];

    setUploadedFiles(uploaded);
  }

  function removeFile(name: string) {
    const uploaded = uploadedFiles.filter((file) => file.name !== name);

    setUploadedFiles(uploaded);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setUploading(true);

    if (uploadedFiles.length === 0) {
      alert("Nenhum arquivo escolhido");
      return;
    }

    const formData = new FormData();

    formData.set("cpf", credentials.cpf);
    formData.set("password", credentials.password);
    formData.set("year", credentials.year);
    formData.set("sector", credentials.sector);
    formData.set("file", uploadedFiles[0])

    try {
      const response = await executeRobotService.executeRobot(
        botId,
        formData,
        handleProgress,
      );
      alert(response.message);
      router.push(`/robots/${botId}/details/${response.run}`);
    } catch (error) {
      alert("Falha ao executar robo");
      return;
    } finally {
      setUploading(false);
    }
  }
  const stepOneItems = [
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
  const stepTwoItems = [
    {
      path: "/",
      name: "Robô",
    },
    {
      path: `/robots/${botId}`,
      name: "Histórico de execuções",
    },
    {
      path: `/execute/${botId}/#`,
      name: "Nova execução ( Infomar dados )",
      onClick: prevStep,
    },
    {
      path: `/execute/${botId}/#`,
      name: "Nova execução ( Selecionar Planilhas )",
    },
  ];

  return (
    <section className="flex">
      <MultiStepForm
        currentStep={currentStep}
        handleSubmit={handleSubmit}
        formRef={formRef}
      >
        <FormStep className="justify-center w-full py-4" position={0}>
          <section className="justify-center w-full container-wrapper">
            <Breadcrumbs items={stepOneItems} />
            <h2 className="text-primary text-3xl">
              Executar Bot <span className="text-primary">{botId}</span>
            </h2>
            <h3 className="text-lg">Informe os dados</h3>
            <div className="flex flex-col py-8 mt-8 px-6 w-full gap-6 rounded-lg shadow-lg">
              <div className="border relative border-gray-300 py-12 px-8 rounded-lg">
                <h3 className="bg-base-100 absolute top-[-14px] px-2">
                  Credenciais de Acesso
                </h3>
                <div className="grid lg:grid-cols-2 gap-10">
                  <FormRow
                    key="cpf"
                    labelText="CPF"
                    inputId="cpf"
                    inputType="text"
                    inputValue={credentials.cpf}
                    inputRequired={true}
                    handleChange={handleChange}
                    rowClassName="w-full lg:w-2/3"
                  />
                  <FormRow
                    key="passwrod"
                    labelText="Senha"
                    inputId="password"
                    inputType="password"
                    inputValue={credentials.password}
                    inputRequired={true}
                    handleChange={handleChange}
                    rowClassName="w-full lg:w-2/3"
                  />
                </div>
              </div>
              <div className="border relative border-gray-300 py-12 px-8 rounded-lg">
                <h3 className="bg-base-100 absolute top-[-14px] px-2">
                  Planejamento
                </h3>
                <div className="grid w-full lg:grid-cols-2 gap-10">
                  <FormRow
                    key="sector"
                    labelText="Orgão"
                    inputId="sector"
                    inputType="text"
                    inputValue={credentials.sector}
                    inputRequired={true}
                    handleChange={handleChange}
                    rowClassName="w-full lg:w-2/3"
                  />
                  <FormRow
                    key="year"
                    labelText="Ano"
                    inputId="year"
                    inputType="number"
                    inputValue={credentials.year}
                    inputRequired={true}
                    handleChange={handleChange}
                    rowClassName="w-full lg:w-2/3"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full p-4 justify-end gap-4">
              <LinkButton path={`/robots/${botId}`}>Voltar</LinkButton>
              <button
                onClick={nextStep}
                type="button"
                className={`
                    block bg-primary text-base-100 font-bold py-2 px-4 rounded-md
                    transition-all duration-200 ease-out 
                    hover:scale-105 hover:bg-accent 
                    focus:scale-105 focus:bg-accent 
                  `}
              >
                Próximo
              </button>
            </div>
          </section>
        </FormStep>
        <FormStep className="justify-center w-full py-4" position={1}>
          <section className="justify-center w-full container-wrapper">
            <Breadcrumbs items={stepTwoItems} />
            <h2 className="text-primary text-3xl">
              Executar Bot <span className="text-primary">{botId}</span>
            </h2>
            <h3 className="text-lg">Selecione as planilhas</h3>

            <div className="shadow-lg mt-8 px-4 py-4 rounded-md">
              <div className="relative flex flex-col items-center">
                {uploading && <UploadPopUp progress={progress} />}
                <div className="relative flex items-center justify-center h-[200px] w-full rounded-lg ">
                  <label
                    htmlFor="file"
                    className="flex bg-white text-primary hover:bg-primary hover:text-white py-1 px-4 rounded-md
                        transition-all duration-200 ease-in justify-between cursor-pointer border-2 border-primary
                        hover:scale-105 
                        focus:scale-105 "
                  >
                    <span className="text-xl">Enviar Arquivo</span>
                    <FaFileUpload className="text-3xl ml-2" />
                  </label>
                  <input
                    className="hidden"
                    onChange={handleFileEvent}
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    id="file"
                    accept=".csv"
                  />
                </div>
              </div>
              <section className="w-full my-4 overflow-x-auto border rounded-lg">
                {uploadedFiles.length > 0 && (
                  <UploadsTable2 files={uploadedFiles} remove={removeFile} />
                )}
              </section>
            </div>
            <div className="flex w-full p-4 justify-end gap-4">
              <button
                onClick={prevStep}
                type="button"
                className={`
                    block bg-primary text-base-100 font-bold py-2 px-4 rounded-md
                    transition-all duration-200 ease-out 
                    hover:scale-105 hover:bg-accent 
                    focus:scale-105 focus:bg-accent 
                  `}
              >
                Anterior
              </button>
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
          </section>
        </FormStep>
      </MultiStepForm>
    </section>
  );
}
