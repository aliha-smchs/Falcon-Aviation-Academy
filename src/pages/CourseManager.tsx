import { useState } from 'react';
import { useCourses, useInstructors, useCreateCourse, useUpdateCourse, useDeleteCourse } from "@/hooks/useCMS";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, BookOpen } from "lucide-react";
import { ErrorState, NetworkError } from "@/components/ui/error-state";

const CourseManager = () => {
  const { data: courses, isLoading, error, refetch } = useCourses();
  const { data: instructors } = useInstructors();
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();
  
  // Helper function to safely render rich text content
  const renderRichText = (content: any): string => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content.map(block => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      }).join(' ');
    }
    if (typeof content === 'object' && content.children) {
      return content.children.map((child: any) => child.text || '').join('');
    }
    return String(content);
  };
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    details: '',
    category: '' as 'core-licenses' | 'advanced-training' | 'endorsements' | '',
    instructorId: '',
    isActive: true,
    flightHours: '',
    groundHours: '',
    maxStudents: 10,
    certification: '',
    location: 'Melbourne Flight Academy - Moorabbin Airport',
    nextStartDate: 'Contact for dates',
    prerequisites: 'Valid ID, Medical clearance if required',
    curriculum: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      price: '',
      details: '',
      category: '',
      instructorId: 'none',
      isActive: true,
      flightHours: '',
      groundHours: '',
      maxStudents: 10,
      certification: '',
      location: 'Melbourne Flight Academy - Moorabbin Airport',
      nextStartDate: 'Contact for dates',
      prerequisites: 'Valid ID, Medical clearance if required',
      curriculum: '',
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const courseData = {
        title: formData.title,
        description: formData.description,
        fullDescription: [
          {
            type: "paragraph",
            children: [{ type: "text", text: formData.description }]
          }
        ],
        details: formData.details,
        category: formData.category,
        price: formData.price,
        flightHours: formData.flightHours,
        groundHours: formData.groundHours,
        maxStudents: formData.maxStudents,
        certification: formData.certification || `${formData.title} Certificate`,
        location: formData.location,
        nextStartDate: formData.nextStartDate,
        prerequisites: formData.prerequisites.split(',').map(p => p.trim()).filter(p => p.length > 0),
        curriculum: formData.curriculum.split(',').map(c => c.trim()).filter(c => c.length > 0),
        isActive: formData.isActive,
        instructor: formData.instructorId && formData.instructorId !== "none" ? parseInt(formData.instructorId) : null,
      };

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: courseData });
      } else {
        await createMutation.mutateAsync(courseData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course: any) => {
    // API returns flat structure, not nested in attributes
    setFormData({
      title: course.title,
      description: renderRichText(course.fullDescription) || course.description,
      duration: `${course.flightHours || ''}h flight, ${course.groundHours || ''}h ground`,
      price: course.price || '',
      details: Array.isArray(course.details) ? course.details.join(', ') : course.details || '',
      category: course.category,
      instructorId: course.instructor?.id?.toString() || "none",
      isActive: course.isActive,
      flightHours: course.flightHours || '',
      groundHours: course.groundHours || '',
      maxStudents: course.maxStudents || 10,
      certification: course.certification || '',
      location: course.location || 'Melbourne Flight Academy - Moorabbin Airport',
      nextStartDate: course.nextStartDate || 'Contact for dates',
      prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites.join(', ') : course.prerequisites || '',
      curriculum: Array.isArray(course.curriculum) ? course.curriculum.join(', ') : course.curriculum || '',
    });
    
    setEditingId(course.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'core-licenses': return 'Core Licenses';
      case 'advanced-training': return 'Advanced Training';
      case 'endorsements': return 'Endorsements';
      default: return category;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Course Management</h2>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Course Management</h2>
        {error.status >= 500 ? (
          <NetworkError onRetry={refetch} />
        ) : (
          <ErrorState error={error} onRetry={refetch} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Course' : 'Add New Course'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="certification">Certification</Label>
                  <Input
                    id="certification"
                    value={formData.certification}
                    onChange={(e) => setFormData(prev => ({ ...prev, certification: e.target.value }))}
                    placeholder="Private Pilot License (PPL)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="flightHours">Flight Hours</Label>
                  <Input
                    id="flightHours"
                    value={formData.flightHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, flightHours: e.target.value }))}
                    placeholder="1.5"
                    type="number"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="groundHours">Ground Hours</Label>
                  <Input
                    id="groundHours"
                    value={formData.groundHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, groundHours: e.target.value }))}
                    placeholder="0.5"
                    type="number"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="$299"
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input
                    id="maxStudents"
                    value={formData.maxStudents}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: parseInt(e.target.value) || 1 }))}
                    type="number"
                    min="1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core-licenses">Core Licenses</SelectItem>
                      <SelectItem value="advanced-training">Advanced Training</SelectItem>
                      <SelectItem value="endorsements">Endorsements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="nextStartDate">Next Start Date</Label>
                  <Input
                    id="nextStartDate"
                    value={formData.nextStartDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, nextStartDate: e.target.value }))}
                    placeholder="Available Daily"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Melbourne Flight Academy - Moorabbin Airport"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="instructor">Assigned Instructor</Label>
                  <Select value={formData.instructorId || "none"} onValueChange={(value) => setFormData(prev => ({ ...prev, instructorId: value === "none" ? "" : value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No instructor assigned</SelectItem>
                      {instructors?.map((instructor: any) => {
                        // Handle both nested and flat instructor data
                        const instrData = instructor.attributes || instructor;
                        return (
                          <SelectItem key={instructor.id} value={instructor.id.toString()}>
                            {instrData.name} - {instrData.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Course description..."
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="details">Course Details (comma-separated)</Label>
                <Input
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  placeholder="Ground school, Flight training, Written exam preparation"
                />
              </div>
              
              <div>
                <Label htmlFor="prerequisites">Prerequisites (comma-separated)</Label>
                <Textarea
                  id="prerequisites"
                  value={formData.prerequisites}
                  onChange={(e) => setFormData(prev => ({ ...prev, prerequisites: e.target.value }))}
                  placeholder="Minimum age: 14 years, Valid photo identification, No medical certificate required"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="curriculum">Curriculum (comma-separated)</Label>
                <Textarea
                  id="curriculum"
                  value={formData.curriculum}
                  onChange={(e) => setFormData(prev => ({ ...prev, curriculum: e.target.value }))}
                  placeholder="Aircraft familiarization, Basic flight controls, Take-off procedures"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses && courses.length > 0 ? (
          courses.map((course: any) => {
            // API returns flat structure now
            if (!course) return null;
            
            return (
              <Card key={course.id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title || 'Unknown Course'}</CardTitle>
                    <Badge variant={course.isActive ? "default" : "secondary"}>
                      {course.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {getCategoryLabel(course.category)}
                  </Badge>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>Flight Hours:</strong> {course.flightHours || 'N/A'}</p>
                    <p><strong>Ground Hours:</strong> {course.groundHours || 'N/A'}</p>
                    {course.price && <p><strong>Price:</strong> {course.price}</p>}
                    
                    {course.instructor && (
                      <p><strong>Instructor:</strong> {course.instructor.name || course.instructor.data?.attributes?.name || 'TBD'}</p>
                    )}
                    
                    {course.description && (
                      <div>
                        <strong>Description:</strong>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                          {renderRichText(course.fullDescription) || course.description}
                        </p>
                      </div>
                    )}
                    
                    {course.details && course.details.length > 0 && (
                      <div>
                        <strong>Details:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(Array.isArray(course.details) ? course.details : [course.details]).map((detail: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {detail}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {course.certification && (
                      <p><strong>Certification:</strong> {course.certification}</p>
                    )}
                    
                    {course.location && (
                      <p><strong>Location:</strong> {course.location}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(course)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(course.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>No courses found. Click "Add Course" to create your first course.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManager;
