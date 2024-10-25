import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonCard() {
  return (
    <div>
      <Skeleton className="w-full h-60" />
      <div className="flex justify-between mt-5">
        <Skeleton className="w-[75%] h-12" />
        <Skeleton className="w-[20%] h-12" />
      </div>
    </div>
  );
}

export default SkeletonCard;
