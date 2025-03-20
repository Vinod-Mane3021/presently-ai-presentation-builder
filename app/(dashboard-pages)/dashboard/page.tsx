"use client";

import { Heading } from "@/components/heading";
import { useProjectsQuery } from "@/hooks/api/use-projects-query";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomTooltip } from "@/components/custom-tooltip";
import { getDateDifference } from "@/lib/date";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

const DashboardPage = () => {
  const { data, isLoading } = useProjectsQuery();

  if (isLoading) {
    return (
      <div className="px-2 py-2 md:px-5 md:py-10">
        <Heading level={2}>Projects</Heading>
        <p className="text-muted-foreground">All your work at one place</p>

        {/* projects */}
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5">
          {new Array(8).fill(null).map((_, index) => (
            <Card key={index} className="w-full flex flex-col p-0 gap-0">
              <Skeleton className="w-full h-36 relative " />
              <CardFooter className="px-2 py-3 flex flex-col items-start">
                <Skeleton className="w-[70%] h-4 relative " />
                <div className="flex w-full justify-between items-center mt-3">
                  <Skeleton className="w-[50%] h-3 relative " />
                  <Skeleton className="w-[20%] h-6 relative " />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-0 py-0 md:px-5 md:py-10">
      <Heading level={2}>Projects</Heading>
      <p className="text-muted-foreground">All your work at one place</p>

      {/* projects */}
      <div
        className="grid gap-5 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 pt-5"
      >
        {data?.data?.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="w-full flex flex-col p-0 gap-0">
              <CardContent className="w-full h-36 relative flex-shrink-0 p-0">
                {" "}
                {/* Set a fixed height for the parent container */}
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
                  <p className="text-muted-foreground text-sm">
                    Created {getDateDifference(new Date(), project.created_at)}{" "}
                    ago
                  </p>
                  <CustomTooltip label="Move to trash">
                    <Button className="bg-accent" variant="outline" size="sm">
                      Delete
                    </Button>
                  </CustomTooltip>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
