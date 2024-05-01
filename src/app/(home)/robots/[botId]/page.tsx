/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { RunsTable2 } from "@/components/common/Table";
import LinkButton from "@/components/common/LinkButton";
import { RunsResponse } from "@/types/api";
import dataService from "@/services/dataService";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { DEFAULT_PAGE_SIZE } from "@/utils/api";
import Pagination from "@/components/common/Pagination";

interface RobotPageProps {
  params: { botId: string };
}

function Robot({ params }: RobotPageProps) {
  const [data, setData] = useState<RunsResponse | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [runsCount, setRunsCount] = useState<number>(0);
  const pageCount = Math.ceil(runsCount / pageSize);
  const pageSizeList = [5, 10, 15];

  function changePageSize(size: number) {
    setPageSize(size);
  }

  function previousPage() {
    setPage(page - 1);
  }

  function nextPage() {
    setPage(page + 1);
  }

  useEffect(() => {
    if (page >= pageCount) {
      setPage(0);
    }

    async function fetchRuns() {
      try {
        const data = await dataService.fetchRuns(
          params.botId,
          page * pageSize,
          (page + 1) * pageSize,
        );
        const runsCount = await dataService.fetchRunsCount(params.botId);

        setRunsCount(runsCount.count);
        setData(data);
      } catch (error: unknown) {
        console.error(error);
        return;
      }
    }
    fetchRuns();
  }, [page, pageSize]);

  const breadcrumbItems = [
    {
      path: "/",
      name: "Robô",
    },
    {
      path: `/robots/${params.botId}`,
      name: "Histórico de execuções",
    },
  ];

  return (
    <main className="flex flex-col min-h-[calc(100vh - 4rem)] container-wrapper py-4">
      <section className="flex flex-col">
        <Breadcrumbs items={breadcrumbItems} />
        <h2 className="text-primary text-3xl">
          Bot <span className="text-primary">{params.botId}</span>
        </h2>
        <h3 className="text-lg">Histórico de execuções</h3>
      </section>
      <section className="w-full my-4 py-4 overflow-auto shadow-lg rounded-lg">
        <RunsTable2 runs={!data ? [] : data.runs} />
      </section>
      <Pagination
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        itemsCount={runsCount}
        pageSizeList={pageSizeList}
        changePageSize={changePageSize}
        previousPage={previousPage}
        nextPage={nextPage}
      />
      <section className="flex w-full p-4 gap-4 justify-end">
        <LinkButton path="/">Voltar</LinkButton>
        <LinkButton path={`/execute/${params.botId}`}>Nova execução</LinkButton>
      </section>
    </main>
  );
}

const ProtectedPage = ProtectedRoute(Robot);

export default ProtectedPage;
