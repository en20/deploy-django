"use client";
import { BsRobot } from "react-icons/bs";
import LinkButton from "@/components/common/LinkButton";

interface RobotCardProps {
  id: string;
  name: string;
  description: string;
}

export default function RobotCard({ id, name, description }: RobotCardProps) {
  return (
    <section className="card card-compact h-full max-h-[400px] w-full max-w-[280px] shadow-lg rounded-lg">
      <figure className="bg-base-200 h-1/2 border-b">
        <BsRobot className="w-24 h-24"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary text-2xl">{name}</h2>
        <p>{description.slice(0, 100)}</p>
        <div className="card-actions justify-end">
          <LinkButton path={`/robots/${id}`}>Selecionar</LinkButton>
        </div>
      </div>
    </section>
  );
}
