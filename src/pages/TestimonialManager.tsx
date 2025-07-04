import { useState } from 'react';
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from "@/hooks/useCMS";
import { cmsService } from "@/services/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, Upload, User } from "lucide-react";
import { CMSTestimonial } from "@/types/cms";
import { ErrorState, NetworkError } from "@/components/ui/error-state";

const TestimonialManager = () => {
  const { data: testimonialsResponse, isLoading, error, refetch } = useTestimonials();
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();
  
  // Extract testimonials from the response
  const testimonials = testimonialsResponse?.data || [];
  
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
    quote: '',
    name: '',
    title: '',
    isActive: true,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      quote: '',
      name: '',
      title: '',
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
      
      const testimonialData = {
        ...formData,
        ...(imageId && { image: imageId }),
      };

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: testimonialData });
      } else {
        await createMutation.mutateAsync(testimonialData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleEdit = (testimonial: any) => {
    setFormData({
      quote: renderRichText(testimonial.quote),
      name: testimonial.name,
      title: testimonial.title,
      isActive: testimonial.isActive || true,
    });
    
    // Set existing image preview if available
    if (testimonial.image?.url) {
      const imageUrl = cmsService.getImageUrl(testimonial.image.url);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
    setSelectedImage(null);
    
    setEditingId(testimonial.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Testimonial Management</h2>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded mb-1 w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
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
        <h2 className="text-2xl font-bold">Testimonial Management</h2>
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
        <h2 className="text-2xl font-bold">Testimonial Management</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Author Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="title">Author Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Private Pilot Student"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="quote">Testimonial Quote</Label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                  placeholder="Share your experience with our flight training..."
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Author Photo</Label>
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
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial: any) => {
            return (
              <Card key={testimonial.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-100">
                        {testimonial.image?.url ? (
                          <img 
                            src={cmsService.getImageUrl(testimonial.image.url)}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <User className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{testimonial.name || 'Unknown Author'}</h3>
                        <p className="text-xs text-gray-600">{testimonial.title || 'N/A'}</p>
                      </div>
                    </div>
                    <Badge variant={testimonial.publishedAt ? "default" : "secondary"}>
                      {testimonial.publishedAt ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Quote */}
                  <div className="mb-4">
                    <blockquote className="text-sm text-gray-700 italic border-l-4 border-sky-200 pl-3">
                      "{renderRichText(testimonial.quote) || 'No testimonial text'}"
                    </blockquote>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(testimonial.id)}
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
            <p>No testimonials found. Click "Add Testimonial" to create your first testimonial.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialManager;
