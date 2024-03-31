"use client";
import LinkButton from "@/components/LinkButton";
import LogsSection from "@/components/LogsSection";
import ProtectedRoute from "@/components/ProtectedRoute";
import Breadcrumbs from "@/components/Breadcrumbs";

interface DetailsPageProps {
  params: { botId: string; taskId: string };
}

function Details({ params }: DetailsPageProps) {
  const breadcrumbItems = [
    {
      path: "/",
      name: "Robô",
    },
    {
      path: `/robots/${params.botId}`,
      name: "Histórico de execuções",
    },
    {
      path: `/robots/${params.botId}/details/${params.taskId}`,
      name: "Detalhes da execução",
    },
  ];
    
  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col">
        <Breadcrumbs items={breadcrumbItems} />
        <h2 className="text-primary text-3xl">
          Bot <span className="text-primary">{params.botId}</span>
        </h2>
        <h3 className="text-lg">Detalhes da execução</h3>
      </section>
      <LogsSection botId={params.botId} taskId={params.taskId} />

      <section className="flex w-full p-4 justify-end">
        <LinkButton path={`/robots/${params.botId}`}>Voltar</LinkButton>
      </section>
    </main>
  );
}

const ProtectedPage = ProtectedRoute(Details);

export default ProtectedPage;
