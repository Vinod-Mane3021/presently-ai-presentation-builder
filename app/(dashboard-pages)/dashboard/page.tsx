"use client";

import { Heading } from "@/components/heading";
import { useGetProjects } from "@/hooks/api/use-get-projects";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomTooltip } from "@/components/custom-tooltip";
import { getDateDifference } from "@/lib/date";

const DashboardPage = () => {
  const allProjects = useGetProjects();
  useEffect(() => {
    console.log({ allProjects: allProjects.data });
  }, [allProjects.data]);
  return (
    <div className="px-5 py-10">
      <Heading level={2}>Projects</Heading>
      <p className="text-muted-foreground">All your work at one place</p>

      {/* projects */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5">
        {allProjects.data?.data?.map((project) => (
          <Card key={project.id} className="w-full flex flex-col p-0 gap-0">
            <CardContent className="w-full h-36 relative flex-shrink-0 p-0"> {/* Set a fixed height for the parent container */}
              <Image
                alt={project.title}
                src={project.thumbnail ?? ""}
                fill // Makes the image fill the parent container
                className="object-cover rounded-xl" // Ensures the image covers the container without distortion
              />
            </CardContent>
            <CardFooter className="px-2 py-3 flex flex-col items-start">
              <p className="max-w-full truncate">{project.title}</p>
              <div className="flex w-full justify-between items-center">
                <p className="text-muted-foreground text-sm">Created {getDateDifference(new Date(), project.createdAt)} ago</p>
                <CustomTooltip label="Move to trash">
                  <Button className="bg-accent" variant="outline" size="sm">Delete</Button>
                </CustomTooltip>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
