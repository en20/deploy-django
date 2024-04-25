/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  ExecuteSection1,
  ExecuteSection2,
  ExecuteSection3,
} from "@/components/pages/executeSections";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useEffect, useState } from "react";
import { Robot } from "@/types/api";
import dataService from "@/services/dataService";
import { useRouter } from "next/navigation";

interface ExecutePageProps {
  params: { botId: string };
}

const sectionMap = new Map([
  ["section1", ExecuteSection1],
  ["section2", ExecuteSection2],
  ["section3", ExecuteSection3],
]);

function Execute({ params }: ExecutePageProps) {
  const [robot, setRobot] = useState<Robot | null>(null);

  const router = useRouter();

  function getSection(robot: Robot): JSX.Element | null {
    const Section = sectionMap.get(robot.section_name);

    if (!Section) {
      return null;
    }
    return <Section botId={robot.id} />;
  }

  useEffect(() => {
    const fetchRobot = async () => {
      try {
        const response = await dataService.fetchRobot(params.botId);

        setRobot(response.robot);
      } catch (error) {
        alert(error);
        router.push("/page-404");
      }
    };
    fetchRobot();
  }, []);

  return (
    <main className="flex flex-col min-h-[calc(100vh-6rem)]">
      {robot && getSection(robot)}
    </main>
  );
}

const ProtectedPage = ProtectedRoute(Execute);

export default ProtectedPage;
