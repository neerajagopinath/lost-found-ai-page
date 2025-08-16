import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload, CheckCircle, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link, useSearchParams } from "react-router-dom";

export default function ReportItem() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "lost";
  const isLostItem = type === "lost";
  
  const [date, setDate] = useState<Date>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    location: "",
  });
  
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.itemName || !formData.description || !formData.category || !formData.location || !date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    
    toast({
      title: "Success!",
      description: `Your ${isLostItem ? "lost" : "found"} item has been submitted to Reunite.`,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background hero-gradient">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <CheckCircle className="mx-auto w-16 h-16 text-primary mb-4" />
                <h1 className="text-2xl font-bold text-foreground mb-4">
                  Success!
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your item has been submitted to Reunite – our campus Lost & Found system.
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setIsSubmitted(false)} 
                    variant="hero" 
                    className="w-full"
                  >
                    Submit Another Item
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/">Back to Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background hero-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Report {isLostItem ? "Lost" : "Found"} Item
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Post lost or found items from our campus so the community can help you reunite with them.
            </p>
          </div>

          {/* Form */}
          <Card className="card-gradient border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {isLostItem ? "What did you lose?" : "What did you find?"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Item Name */}
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name *</Label>
                  <Input
                    id="itemName"
                    placeholder="e.g., iPhone 15, Blue Notebook, Silver Ring..."
                    value={formData.itemName}
                    onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                    className="rounded-lg"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description (color, brand, distinctive features, etc.)"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="rounded-lg min-h-[100px]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location on Campus *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Library, Cafeteria, Lab..."
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="rounded-lg"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date {isLostItem ? "Lost" : "Found"} *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-lg",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image (Optional)</Label>
                  <div className="space-y-4">
                    <Label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload an image
                        </p>
                      </div>
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Label>
                    
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  Submit {isLostItem ? "Lost" : "Found"} Item
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}