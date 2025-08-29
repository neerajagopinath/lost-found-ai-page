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
  const pathname = window.location.pathname;

  let type = "lost";
  if (pathname.includes("found") || searchParams.get("type") === "found") {
    type = "found";
  } else if (pathname.includes("lost") || searchParams.get("type") === "lost") {
    type = "lost";
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.itemName || !formData.description || !formData.category || !formData.location || !date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Not logged in",
          description: "You must be logged in to report an item.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch("http://localhost:5000/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemName: formData.itemName,
          description: formData.description,
          category: formData.category,
          location: formData.location,
          date: date.toISOString(),
          type: type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: `Your ${isLostItem ? "lost" : "found"} item has been submitted.`,
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit item.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Network Error",
        description: "Could not connect to server. Try again later.",
        variant: "destructive",
      });
    }
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
                  Your item has been submitted to Reunite.
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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto">
          <Card className="border-0 shadow-lg card-gradient">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Report an Item</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/" className="flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Item Name */}
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input id="itemName" placeholder="Enter item name" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the item" />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
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
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-3 w-full h-48 object-cover rounded-md"
                    />
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

