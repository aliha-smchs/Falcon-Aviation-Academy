import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const AircraftCardSkeleton = () => {
  return (
    <Card className="overflow-hidden h-full">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        
        <div className="mt-4">
          <Skeleton className="h-4 w-16 mb-2" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const InstructorCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-60 w-full" />
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <Skeleton className="h-4 w-32 mb-2" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
        </div>
      </CardContent>
    </Card>
  );
};

export const TestimonialCardSkeleton = () => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <Skeleton className="h-20 w-full mb-6" />
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full mr-4" />
          <div className="flex-1">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CourseTabSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-36" />
        <Skeleton className="h-12 w-40" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-lg">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface LoadingGridProps {
  count?: number;
  Component: React.ComponentType;
  className?: string;
}

export const LoadingGrid = ({ count = 6, Component, className = "" }: LoadingGridProps) => {
  return (
    <div className={className}>
      {[...Array(count)].map((_, index) => (
        <Component key={index} />
      ))}
    </div>
  );
};
