"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Image URLs for each item
const itemImages = {
  "Beignet Mix": "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Croissant Dough": "https://images.unsplash.com/photo-1589010588553-46e7c21788?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Sugar Glaze": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Chocolate Filling": "https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Almond Paste": "https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Baguette Flour": "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Pastry Cream": "https://images.unsplash.com/photo-1562440499-64c9a111f713?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Brioche Dough": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Fruit Jam": "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
  "Sourdough Starter": "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
};

export default function AddItem() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    group: "",
    status: "Enabled",
    id: "",
    lastUpdated: "0m",
    imageUrl: "",
  });
  const [items, setItems] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("items");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (value:unknown) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: itemImages[value as keyof typeof itemImages] || "",
    }));
  };

  const handleSave = () => {
    const newItem = {
      ...formData,
      id: `BAKE-${String(items.length + 1).padStart(3, "0")}`,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    if (typeof window !== "undefined") {
      localStorage.setItem("items", JSON.stringify(updatedItems));
    }
    console.log("Item saved:", newItem);
    alert("Item saved! Returning to item list.");
    router.push("/items"); // Adjust route as per your setup
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("items");
      setItems(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          New Item <span className="text-red-600 text-sm font-bold">Not Saved</span>
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
            onClick={() => router.push("/items")} // Adjust route as per your setup
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Item Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Item Name *</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Beignet Mix"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Item Group *</label>
            <Input
              name="group"
              value={formData.group}
              onChange={handleChange}
              placeholder="e.g., Flour Products"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Enabled">Enabled</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Image</label>
            <Select
              value={Object.keys(itemImages).find(key => itemImages[key as keyof typeof itemImages] === formData.imageUrl) || ""}
              onValueChange={handleImageChange}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Select Image" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(itemImages).map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}