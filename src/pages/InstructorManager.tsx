import { useState } from 'react';
import { useInstructors, useCreateInstructor, useUpdateInstructor, useDeleteInstructor } from "@/hooks/useCMS";
import { cmsService } from "@/services/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, Upload, User } from "lucide-react";
import { CMSInstructor } from "@/types/cms";
import { ErrorState, NetworkError } from "@/components/ui/error-state";

const InstructorManager = () => {
  const { data: instructors, isLoading, error, refetch } = useInstructors();
  const createMutation = useCreateInstructor();
  const updateMutation = useUpdateInstructor();
  const deleteMutation = useDeleteInstructor();
  
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
    name: '',
    title: '',
    experience: '',
    qualifications: '',
    bio: '',
    email: '',
    phone: '',
    isActive: true,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      experience: '',
      qualifications: '',
      bio: '',
      email: '',
      phone: '',
      isActive: true,
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageId = null;
      
      // Upload image if selected
      if (selectedImage) {
        const uploadedImage = await cmsService.uploadFile(selectedImage);
        imageId = uploadedImage.id;
      }
      
      const instructorData = {
        ...formData,
        qualifications: formData.qualifications.split(',').map(q => q.trim()).filter(q => q.length > 0),
        ...(imageId && { image: imageId }),
      };

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: instructorData });
      } else {
        await createMutation.mutateAsync(instructorData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving instructor:', error);
    }
  };

  const handleEdit = (instructor: CMSInstructor) => {
    const attributes = (instructor as any).attributes || instructor;
    
    setFormData({
      name: attributes.name,
      title: attributes.title,
      experience: attributes.experience,
      qualifications: attributes.qualifications ? attributes.qualifications.join(', ') : '',
      bio: renderRichText(attributes.bio),
      email: attributes.email || '',
      phone: attributes.phone || '',
      isActive: attributes.isActive,
    });
    
    // Set existing image preview if available
    if (attributes.image?.data) {
      const imageUrl = cmsService.getImageUrl(attributes.image.data.attributes?.url || attributes.image.data.url);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
    setSelectedImage(null);
    
    setEditingId(instructor.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting instructor:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Instructor Management</h2>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Instructor
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
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
        <h2 className="text-2xl font-bold">Instructor Management</h2>
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
        <h2 className="text-2xl font-bold">Instructor Management</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Instructor' : 'Add New Instructor'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="title">Title/Position</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Chief Flight Instructor"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="15 years"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="instructor@flightacademy.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="qualifications">Qualifications (comma-separated)</Label>
                <Input
                  id="qualifications"
                  value={formData.qualifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, qualifications: e.target.value }))}
                  placeholder="CFI, CFII, MEI, ATP"
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Brief biography and background..."
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Profile Photo</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
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
        {instructors && instructors.length > 0 ? (
          instructors.map((instructor) => {
            const attributes = (instructor as any).attributes || instructor;
            
            if (!attributes) {
              return null;
            }
            
            return (
              <Card key={instructor.id} className="relative">
                <div className="w-full h-48 overflow-hidden rounded-t-lg bg-gray-100">
                  {attributes.image?.data ? (
                    <img 
                      src={cmsService.getImageUrl(attributes.image.data.attributes?.url || attributes.image.data.url)}
                      alt={attributes.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User className="h-12 w-12" />
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{attributes.name || 'Unknown Instructor'}</CardTitle>
                    <Badge variant={attributes.isActive ? "default" : "secondary"}>
                      {attributes.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>Title:</strong> {attributes.title || 'N/A'}</p>
                    <p><strong>Experience:</strong> {attributes.experience || 'N/A'}</p>
                    <p><strong>Email:</strong> {attributes.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> {attributes.phone || 'N/A'}</p>
                    
                    {attributes.qualifications && attributes.qualifications.length > 0 && (
                      <div>
                        <strong>Qualifications:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {attributes.qualifications.map((qual: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {qual}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {attributes.bio && (
                      <div>
                        <strong>Bio:</strong>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                          {renderRichText(attributes.bio)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(instructor)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(instructor.id)}
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
            <p>No instructors found. Click "Add Instructor" to create your first instructor profile.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorManager;
