/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import RunCard from "@/components/common/RunCard";
import { LogsTable2 } from "@/components/common/Table";
import { LogsResponse } from "@/types/api";
import dataService from "@/services/dataService";
import { DEFAULT_PAGE_SIZE } from "@/utils/api";
import Pagination from "./Pagination";

interface LogsSectionProps {
  botId: string;
  taskId: string;
}

export default function LogsSection({ botId, taskId }: LogsSectionProps) {
  const [data, setData] = useState<LogsResponse | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [logsCount, setLogsCount] = useState<number>(0);
  const pageCount = Math.ceil(logsCount / pageSize);
  const pageSizeList = [5, 10, 15];

  const pollingInterval = useRef<null | NodeJS.Timeout>(null);

  function handleStop() {
    if (!pollingInterval.current) return;
    clearInterval(pollingInterval.current);
  }

  function changePageSize(size: number) {
    setPageSize(size);
  }

  function previousPage() {
    setPage(page - 1);
  }

  function nextPage() {
    setPage(page + 1);
  }

  if (data?.run.status !== "PENDING") {
    handleStop();
  }

  const fetchLogs = async () => {
    try {
      const logs = await dataService.fetchLogs(
        botId,
        taskId,
        page * pageSize,
        (page + 1) * pageSize,
      );

      const logsCount = await dataService.fetchLogsCount(botId, taskId);

      setData(logs);
      setLogsCount(logsCount.count);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (page >= pageCount) {
      setPage(0);
    }

    pollingInterval.current = setInterval(() => fetchLogs(), 500);

    fetchLogs();

    return () => handleStop();
  }, [page, pageSize]);

  return (
    <>
      {data && (
        <section className="w-full my-2">
          <RunCard run={data.run} />
        </section>
      )}
      <section className="w-full my-4 max-h-[42.5vh] overflow-auto shadow-lg rounded-lg px-2">
        <LogsTable2 logs={data ? data.logs : []} />
      </section>
      <Pagination
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        itemsCount={logsCount}
        pageSizeList={pageSizeList}
        changePageSize={changePageSize}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
}
