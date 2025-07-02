import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CourseManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Course management functionality will be available once the Strapi backend is configured.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseManager;
