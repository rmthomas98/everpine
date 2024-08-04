"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="shadow rounded-lg border w-full fade-in-short-delayed opacity-0 mt-3">
      <div className="w-full flex justify-between items-center px-4 py-3 border-b space-x-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div className="w-full flex justify-between items-center p-4 border-b space-x-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div className="w-full flex justify-between items-center p-4 border-b space-x-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div className="w-full flex justify-between items-center p-4 space-x-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
};
