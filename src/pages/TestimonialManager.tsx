import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TestimonialManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testimonial Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Testimonial management functionality will be available once the Strapi backend is configured.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialManager;
