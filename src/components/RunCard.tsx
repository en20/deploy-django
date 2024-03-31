import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { ReactNode } from "react";
import { removeWhitespace } from "@/utils/string";

interface Run {
  id: string;
  robot: string;
  task: string;
  status: string;
  started_at: string;
}

interface RunCardProps {
  run: Run;
}

function statusLine(status: string): ReactNode {
  const parsed = removeWhitespace(status);

  if (parsed === "SUCCESS") {
    return (
      <>
        <AiOutlineCheckCircle className="text-success text-lg" />
        <span className="text-success">Status: sucesso</span>
      </>
    );
  }

  if (parsed === "PENDING") {
    return (
      <>
        <AiOutlineMinusCircle className="text-warning text-lg" />
        <span className="text-warning">Status: pendente</span>
      </>
    );
  }

  if (parsed === "FAILURE") {
    return (
      <>
        <AiOutlineCloseCircle className="text-error text-lg" />
        <span className="text-error">Status: falha</span>
      </>
    );
  }
}

export default function RunCard({ run }: RunCardProps) {
  return (
    <section className="w-full px-2 py-4 shadow-md rounded-lg">
      <h2 className="text-primary text-2xl lg:text-3xl font-bold mb-2">Informações</h2>
      <div className="grid md:grid-cols-2 gap-2">
        <div className="flex gap-2 text-description items-center">
          <MdSettings className="text-primary text-lg" />
          <span>ID: {run.id}</span>
        </div>
        <div className="flex gap-2 text-description items-center">
          <AiOutlineClockCircle className="text-primary text-lg" />{" "}
          <span>Data / Hora: {run.started_at}</span>
        </div>
        <div className="flex gap-2 text-description items-center">
          <AiOutlinePlayCircle className="text-primary text-lg" />{" "}
          <span>Ação: {run.task}</span>
        </div>
        <div className="flex gap-2 text-description items-center">
          {statusLine(run.status)}
        </div>
      </div>
    </section>
  );
}
