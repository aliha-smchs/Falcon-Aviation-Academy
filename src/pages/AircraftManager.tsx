import { useState } from 'react';
import { useAircraft, useCreateAircraft, useUpdateAircraft, useDeleteAircraft } from "@/hooks/useCMS";
import { cmsService } from "@/services/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, Upload } from "lucide-react";
import { CMSAircraft } from "@/types/cms";
import { ErrorState, NetworkError } from "@/components/ui/error-state";
import { AircraftCardSkeleton, LoadingGrid } from "@/components/ui/loading-skeletons";

const AircraftManager = () => {
  const { data: aircraft, isLoading, error, refetch } = useAircraft();
  const createMutation = useCreateAircraft();
  const updateMutation = useUpdateAircraft();
  const deleteMutation = useDeleteAircraft();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    seats: 1,
    enginetype: '',
    speed: '',
    range: '',
    features: '',
    category: '',
    isActive: true,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      name: '',
      model: '',
      seats: 1,
      enginetype: '',
      speed: '',
      range: '',
      features: '',
      category: '',
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
      const aircraftData: any = {
        name: formData.name,
        model: formData.model,
        seats: formData.seats,
        enginetype: formData.enginetype,
        speed: formData.speed,
        range: formData.range,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f.length > 0), // Keep as array for JSON field
        category: formData.category, // Single value, not array (it's an enumeration in Strapi)
        isActive: formData.isActive,
      };
      
      // Only upload and set image if a new image was selected
      if (selectedImage) {
        const uploadedImage = await cmsService.uploadFile(selectedImage);
        aircraftData.image = uploadedImage.id;
      }

      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: aircraftData });
      } else {
        await createMutation.mutateAsync(aircraftData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving aircraft:', error);
    }
  };

  const handleEdit = (aircraftItem: CMSAircraft) => {
    // Handle both possible data structures
    const attributes = (aircraftItem as any).attributes || aircraftItem;
    
    setFormData({
      name: attributes.name,
      model: attributes.model,
      seats: attributes.seats,
      enginetype: attributes.enginetype,
      speed: attributes.speed,
      range: attributes.range,
      features: attributes.features ? attributes.features.join(', ') : '',
      category: attributes.category || '', // Single value, not array
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
    
    setEditingId((aircraftItem as any).documentId || aircraftItem.id.toString());
    setShowAddForm(true);
  };

  const handleDelete = async (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting aircraft:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Aircraft Management</h2>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Aircraft
          </Button>
        </div>
        <LoadingGrid 
          count={6} 
          Component={AircraftCardSkeleton}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Aircraft Management</h2>
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
        <h2 className="text-2xl font-bold">Aircraft Management</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Aircraft
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Aircraft' : 'Add New Aircraft'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Aircraft Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    required
                  />
                </div>
                
                
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Training Aircraft">Training Aircraft</SelectItem>
                      <SelectItem value="Multi-Engine Aircarft">Multi-Engine Aircraft</SelectItem>
                      <SelectItem value="Flight Simulators">Flight Simulators</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="seats">Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    min="1"
                    value={formData.seats}
                    onChange={(e) => setFormData(prev => ({ ...prev, seats: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="engineType">Engine Type</Label>
                  <Input
                    id="engineType"
                    value={formData.enginetype}
                    onChange={(e) => setFormData(prev => ({ ...prev, enginetype: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="speed">Speed</Label>
                  <Input
                    id="speed"
                    value={formData.speed}
                    onChange={(e) => setFormData(prev => ({ ...prev, speed: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="range">Range</Label>
                  <Input
                    id="range"
                    value={formData.range}
                    onChange={(e) => setFormData(prev => ({ ...prev, range: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="G1000 Glass Cockpit, Autopilot, ADS-B"
                />
              </div>
              
              <div>
                <Label htmlFor="image">Aircraft Image</Label>
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

      {!(showAddForm || editingId) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aircraft && aircraft.length > 0 ? (
          aircraft.map((aircraftItem) => {
            // Handle both possible data structures with proper typing
            const attributes = (aircraftItem as any).attributes || aircraftItem;
            
            // Safety check for attributes
            if (!attributes) {
              console.warn('Aircraft item has no attributes:', aircraftItem);
              return null;
            }
            
            return (
              <Card key={aircraftItem.id} className="relative">
                {/* Image display */}
                <div className="w-full h-48 overflow-hidden rounded-t-lg bg-gray-100">
                  {attributes.image?.data ? (
                    <img 
                      src={cmsService.getImageUrl(attributes.image.data.attributes?.url || attributes.image.data.url)}
                      alt={attributes.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Upload className="h-12 w-12" />
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{attributes.name || 'Unknown Aircraft'}</CardTitle>
                    <Badge variant={attributes.isActive ? "default" : "secondary"}>
                      {attributes.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>Model:</strong> {attributes.model || 'N/A'}</p>
                    <p><strong>Seats:</strong> {attributes.seats || 'N/A'}</p>
                    <p><strong>Engine:</strong> {attributes.enginetype || 'N/A'}</p>
                    <p><strong>Speed:</strong> {attributes.speed || 'N/A'}</p>
                    <p><strong>Range:</strong> {attributes.range || 'N/A'}</p>
                    <p><strong>Category:</strong> {attributes.category || 'N/A'}</p>
                    
                    {attributes.features && attributes.features.length > 0 && (
                      <div>
                        <strong>Features:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {attributes.features.map((feature: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(aircraftItem)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete((aircraftItem as any).documentId || aircraftItem.id)}
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
            <p>No aircraft found. Click "Add Aircraft" to create your first aircraft.</p>
          </div>
        )}
        </div>
      )}
    </div>
  );
};

export default AircraftManager;
