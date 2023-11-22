"use client";
import { Card, Skeleton } from "@nextui-org/react";
import { useState } from "react";

export const ViewFileSkeleton = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className="p-2">
        <h1 className="text-md font-semibold mb-8">Folders</h1>
        <div className="flex flex-col gap-3">
          <Card
            className="w-[200px] space-y-5 p-4"
            radius="lg">
            <Skeleton
              isLoaded={isLoaded}
              className="rounded-lg">
              <div className=" h-10 rounded-lg bg-secondary"></div>
            </Skeleton>
          </Card>
        </div>

        <h1 className="text-md font-semibold mb-8 mt-5">Files</h1>

        <div className="flex flex-col gap-3">
          <Card
            className="w-[200px] space-y-5 p-4"
            radius="lg">
            <Skeleton
              isLoaded={isLoaded}
              className="w-4/5 rounded-lg justify-center">
              <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
            </Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              className="rounded-lg">
              <div className="h-[200px] rounded-lg bg-secondary"></div>
            </Skeleton>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ViewFileSkeleton;
