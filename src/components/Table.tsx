import { removeWhitespace } from "@/utils/string";
import { Log, Run } from "@/types/api";
import Link from "next/link";

interface RunTableProps {
  runs: Run[];
  className?: string;
}

export function statusToColor(status: string) {
  const parsed = removeWhitespace(status);

  if (parsed === "SUCCESS") {
    return <span className="text-success font-semibold">sucesso</span>;
  }

  if (parsed === "PENDING") {
    return <span className="text-warning font-semibold">pendente</span>;
  }

  if (parsed === "FAILURE") {
    return <span className="text-error font-semibold">falha</span>;
  }
}

export function logLevelToColor(content: string, level: string) {
  const parsed = removeWhitespace(level);

  if (parsed === "WARNING") {
    return <span className="text-warning font-semibold">{content}</span>;
  }

  if (parsed === "ERROR") {
    return <span className="text-error font-semibold">{content}</span>;
  }

  return content;
}

export function RunsTable2({ runs, className }: RunTableProps) {
  const headers = ["Data / Hora", "Tarefa", "Status", "Detalhes"];

  return (
    <table className={`table table-pin-rows ${className}`}>
      <thead className="bg-base-100">
        <tr>
          {headers.map((header, index) => {
            return (
              <th
                className="text-primary text-xl"
                key={"table-header-" + index}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {runs.map((run) => {
          return (
            <tr key={run.id}>
              <td>{run.started_at}</td>
              <td>{run.task}</td>
              <td>{statusToColor(run.status)}</td>
              <td>
                <Link
                  className="link hover:link-primary transition-all duration-300 ease-out"
                  key={`run-${run.id}-details`}
                  href={`/robots/${run.robot}/details/${run.id}`}
                >
                  Detalhes
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

interface LogsTableProps {
  logs: Log[];
  className?: string;
}

export function LogsTable2({ logs, className }: LogsTableProps) {
  const headers = ["Data / Hora", "Mensagem"];

  return (
    <table className={`table table-pin-rows ${className}`}>
      <thead className="bg-base-100">
        <tr>
          {headers.map((header, index) => {
            return (
              <th className="text-primary text-xl" key={"table-header-" + index}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => {
          return (
            <tr key={log.id}>
              <td>{log.executed_at}</td>
              <td>
                {logLevelToColor(log.content, log.level)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// The use cannot send more than FILE_LIMIT files
const KYLOBYTE = 1000;
const MEGABYTE = KYLOBYTE * 1000;

export function fileSizeToString(size: number): string {
  if (size < KYLOBYTE) {
    return `${size} B`;
  } else if (size >= KYLOBYTE && size < MEGABYTE) {
    return `${size / KYLOBYTE} KB`;
  } else {
    return `${size / MEGABYTE} MB`;
  }
}

interface UploadsTableProps {
  files: File[];
  remove: (name: string) => void;
  className?: string;
}

export function UploadsTable2({ files, remove, className }: UploadsTableProps) {
  const headers = ["Nome do Arquivo", "Tamanho (Bytes)", "Ação"];

  return (
    <table
      className={`table ${className}`}
    >
      <thead>
        <tr>
          {headers.map((header, index) => {
            return (
              <th
                className="text-primary text-lg"
                key={"table-header-" + index}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => {
          return (
            <tr
              key={`${file.name}-${index}`}
            >
              <td>{file.name}</td>
              <td>
                {fileSizeToString(file.size)}
              </td>
              <td>
                <button
                  className={
                    "link transition-colors duration-200 ease-out hover:text-error"
                  }
                  onClick={() => remove(file.name)}
                  key={file.name}
                >
                  Remover
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
