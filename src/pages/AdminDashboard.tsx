import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLogin, useLogout, useAuth } from "@/hooks/useCMS";
import { LoginCredentials } from "@/types/cms";
import { Plane, Users, BookOpen, MessageSquare, LogOut, Settings } from "lucide-react";
import AircraftManager from "./AircraftManager";
import InstructorManager from "./InstructorManager";
import CourseManager from "./CourseManager";
import TestimonialManager from "./TestimonialManager";

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ identifier: '', password: '' });
  const [showError, setShowError] = useState(false);
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    
    try {
      await loginMutation.mutateAsync(credentials);
      onLogin();
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-8 w-8 text-sky-600 mr-2" />
            <span className="font-bold text-xl text-navy-900">Flight Academy CMS</span>
          </div>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {showError && (
              <Alert variant="destructive">
                <AlertDescription>
                  Invalid credentials. Please try again.
                </AlertDescription>
              </Alert>
            )}
            
            <div>
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                type="text"
                value={credentials.identifier}
                onChange={(e) => setCredentials(prev => ({ ...prev, identifier: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  const { isAuthenticated, user, isAdmin } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => window.location.reload()} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You don't have permission to access the admin dashboard.
            </p>
            
            {/* Debug information */}
            <div className="text-xs bg-gray-100 p-3 rounded mb-4 border">
              <strong>Debug Info:</strong><br/>
              <strong>User:</strong> {user?.username || 'None'}<br/>
              <strong>Email:</strong> {user?.email || 'None'}<br/>
              <strong>Role Name:</strong> {user?.role?.name || 'None'}<br/>
              <strong>Role Type:</strong> {user?.role?.type || 'None'}<br/>
              <strong>Role ID:</strong> {user?.role?.id || 'None'}<br/>
              <strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}
            </div>
            
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-sky-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-navy-900">Flight Academy CMS</h1>
                <p className="text-sm text-gray-600">Content Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.role?.name}</p>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="aircraft" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="aircraft" className="flex items-center space-x-2">
              <Plane className="h-4 w-4" />
              <span>Aircraft</span>
            </TabsTrigger>
            <TabsTrigger value="instructors" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Instructors</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Courses</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Testimonials</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="aircraft">
            <AircraftManager />
          </TabsContent>
          
          <TabsContent value="instructors">
            <InstructorManager />
          </TabsContent>
          
          <TabsContent value="courses">
            <CourseManager />
          </TabsContent>
          
          <TabsContent value="testimonials">
            <TestimonialManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
