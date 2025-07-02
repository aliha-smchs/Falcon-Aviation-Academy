import { useState } from 'react';
import { useAircraft, useCreateAircraft, useUpdateAircraft, useDeleteAircraft } from "@/hooks/useCMS";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { CMSAircraft } from "@/types/cms";
import { ErrorState, NetworkError } from "@/components/ui/error-state";
import { AircraftCardSkeleton, LoadingGrid } from "@/components/ui/loading-skeletons";

const AircraftManager = () => {
  const { data: aircraft, isLoading, error, refetch } = useAircraft();
  const createMutation = useCreateAircraft();
  const updateMutation = useUpdateAircraft();
  const deleteMutation = useDeleteAircraft();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    type: 'Single-Engine Piston' as 'Single-Engine Piston' | 'Multi-Engine Piston' | 'Full Motion Simulator' | 'Fixed Base Simulator',
    seats: 1,
    engineType: '',
    speed: '',
    range: '',
    features: '',
    category: 'training' as 'training' | 'multi-engine' | 'simulators',
    description: '',
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      model: '',
      type: 'Single-Engine Piston',
      seats: 1,
      engineType: '',
      speed: '',
      range: '',
      features: '',
      category: 'training',
      description: '',
      isActive: true,
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const aircraftData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f.length > 0),
    };

    try {
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
    setFormData({
      name: aircraftItem.attributes.name,
      model: aircraftItem.attributes.model,
      type: aircraftItem.attributes.type,
      seats: aircraftItem.attributes.seats,
      engineType: aircraftItem.attributes.engineType,
      speed: aircraftItem.attributes.speed,
      range: aircraftItem.attributes.range,
      features: aircraftItem.attributes.features.join(', '),
      category: aircraftItem.attributes.category,
      description: aircraftItem.attributes.description || '',
      isActive: aircraftItem.attributes.isActive,
    });
    setEditingId(aircraftItem.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
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
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single-Engine Piston">Single-Engine Piston</SelectItem>
                      <SelectItem value="Multi-Engine Piston">Multi-Engine Piston</SelectItem>
                      <SelectItem value="Full Motion Simulator">Full Motion Simulator</SelectItem>
                      <SelectItem value="Fixed Base Simulator">Fixed Base Simulator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="training">Training Aircraft</SelectItem>
                      <SelectItem value="multi-engine">Multi-Engine Aircraft</SelectItem>
                      <SelectItem value="simulators">Flight Simulators</SelectItem>
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
                    value={formData.engineType}
                    onChange={(e) => setFormData(prev => ({ ...prev, engineType: e.target.value }))}
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
        {aircraft?.map((aircraftItem) => (
          <Card key={aircraftItem.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{aircraftItem.attributes.name}</CardTitle>
                <Badge variant={aircraftItem.attributes.isActive ? "default" : "secondary"}>
                  {aircraftItem.attributes.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{aircraftItem.attributes.type}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Model:</strong> {aircraftItem.attributes.model}</p>
                <p><strong>Seats:</strong> {aircraftItem.attributes.seats}</p>
                <p><strong>Engine:</strong> {aircraftItem.attributes.engineType}</p>
                <p><strong>Speed:</strong> {aircraftItem.attributes.speed}</p>
                <p><strong>Range:</strong> {aircraftItem.attributes.range}</p>
                <p><strong>Category:</strong> {aircraftItem.attributes.category}</p>
                
                {aircraftItem.attributes.features.length > 0 && (
                  <div>
                    <strong>Features:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {aircraftItem.attributes.features.map((feature, index) => (
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
                  onClick={() => handleDelete(aircraftItem.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AircraftManager;
