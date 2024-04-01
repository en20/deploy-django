"use client";
import RobotCard from "@/components/RobotCard";
import { useEffect, useState } from "react";
import { RobotsResponse } from "@/types/api";
import dataService from "@/services/dataService";

export default function CarouselSection() {
  const [data, setData] = useState<RobotsResponse | null>(null);

  useEffect(() => {
    async function fetchRobots() {
      try {
        const data = await dataService.fetchRobots();

        setData(data);
      } catch (error: unknown) {
        console.error(error);
        return;
      }
    }
    fetchRobots();
  }, []);

  return (
    <section className="flex h-[60vh] w-full">
      <div className="carousel rounded-box w-full">
        {data &&
          data.robots.map((robot, index) => (
            <div
              key={"slide-" + index}
              className="carousel-item items-center justify-center px-2 py-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <RobotCard
                id={robot.id}
                name={robot.name}
                description={robot.description}
              />
            </div>
          ))}
      </div>
    </section>
  );
}
