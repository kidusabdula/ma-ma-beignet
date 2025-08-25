// app/items/add-item/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { motion } from "framer-motion";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  is_stock_item: number;
  is_fixed_asset: number;
  description?: string;
  brand?: string;
}

interface ApiError extends Error {
  message: string;
}

export default function AddItemPage() {
  const { push: toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [itemGroups, setItemGroups] = useState<string[]>([]);
  const [uoms, setUoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [uomSearchTerm, setUomSearchTerm] = useState<string>('');

  const [form, setForm] = useState<FormData>({
    item_code: '',
    item_name: '',
    item_group: '',
    stock_uom: 'Nos', // Default value
    is_stock_item: 1, // Default to maintain stock
    is_fixed_asset: 0, // Default to not fixed asset
    description: '',
    brand: '',
  });

  // Fetch item groups and UOMs on component mount
  useState(() => {
    const fetchData = async () => {
      try {
        const [groupsResponse, uomsResponse] = await Promise.all([
          fetch('/api/items?action=get-item-groups'),
          fetch('/api/items?action=get-uoms')
        ]);

        if (groupsResponse.ok) {
          const groupsData = await groupsResponse.json();
          setItemGroups(groupsData.data?.item_groups || []);
        }

        if (uomsResponse.ok) {
          const uomsData = await uomsResponse.json();
          setUoms(uomsData.data?.uoms || []);
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchData();
  });

  const handleFormChange = (field: keyof FormData, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FormData) => {
    handleFormChange(field, e.target.value);
  };

  const handleSelectChange = (field: keyof FormData, value: string) => {
    if (field === 'is_stock_item' || field === 'is_fixed_asset') {
      handleFormChange(field, parseInt(value));
    } else {
      handleFormChange(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.item_code || !form.item_name || !form.item_group || !form.stock_uom) {
      toast({ variant: "error", title: "Error", description: "Please fill in all required fields." });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        item_code: form.item_code,
        item_name: form.item_name,
        item_group: form.item_group,
        stock_uom: form.stock_uom,
        is_stock_item: form.is_stock_item,
        is_fixed_asset: form.is_fixed_asset,
        description: form.description,
        brand: form.brand,
      };

      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to create item");
      }

      const result = await response.json();
      
      toast({ 
        title: "Success", 
        description: `Item "${result.data.item.item_name}" created successfully.` 
      });
      
      // Redirect to items list or clear form
      router.push('/stock/item');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create item.";
      toast({ variant: "error", title: "Error", description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Filter item groups based on search
  const filteredItemGroups = itemGroups.filter(group =>
    group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter UOMs based on search
  const filteredUoms = uoms.filter(uom =>
    uom.toLowerCase().includes(uomSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-sans">
      <Card className="bg-card text-card-foreground border-border shadow-lg rounded-lg max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Code */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Item Code *
                </label>
                <Input
                  placeholder="Enter item code (e.g., ITM-001)"
                  value={form.item_code}
                  onChange={(e) => handleInputChange(e, "item_code")}
                  aria-label="Item Code"
                  className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  required
                />
              </div>

              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Item Name *
                </label>
                <Input
                  placeholder="Enter item name"
                  value={form.item_name}
                  onChange={(e) => handleInputChange(e, "item_name")}
                  aria-label="Item Name"
                  className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  required
                />
              </div>

              {/* Item Group */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Item Group *
                </label>
                <Select
                  value={form.item_group}
                  onValueChange={(value) => handleSelectChange("item_group", value)}
                  onOpenChange={(open) => !open && setSearchTerm('')}
                >
                  <SelectTrigger
                    aria-label="Select item group"
                    className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  >
                    <SelectValue placeholder="Begin typing for results..." />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    <div className="p-2">
                      <Input
                        placeholder="Search item groups..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-background text-foreground border-input mb-2"
                      />
                    </div>
                    {filteredItemGroups.map((group) => (
                      <SelectItem key={group} value={group} className="hover:bg-accent">
                        {group}
                      </SelectItem>
                    ))}
                    {filteredItemGroups.length === 0 && (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        No item groups found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Default Unit of Measure */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Default Unit of Measure *
                </label>
                <Select
                  value={form.stock_uom}
                  onValueChange={(value) => handleSelectChange("stock_uom", value)}
                  onOpenChange={(open) => !open && setUomSearchTerm('')}
                >
                  <SelectTrigger
                    aria-label="Select unit of measure"
                    className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  >
                    <SelectValue placeholder="Begin typing for results..." />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    <div className="p-2">
                      <Input
                        placeholder="Search UOMs..."
                        value={uomSearchTerm}
                        onChange={(e) => setUomSearchTerm(e.target.value)}
                        className="bg-background text-foreground border-input mb-2"
                      />
                    </div>
                    {filteredUoms.map((uom) => (
                      <SelectItem key={uom} value={uom} className="hover:bg-accent">
                        {uom}
                      </SelectItem>
                    ))}
                    {filteredUoms.length === 0 && (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        No UOMs found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Maintain Stock */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Maintain Stock
                </label>
                <Select
                  value={form.is_stock_item.toString()}
                  onValueChange={(value) => handleSelectChange("is_stock_item", value)}
                >
                  <SelectTrigger
                    aria-label="Maintain stock"
                    className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  >
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    <SelectItem value="1" className="hover:bg-accent">Yes</SelectItem>
                    <SelectItem value="0" className="hover:bg-accent">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Is Fixed Asset */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Is Fixed Asset
                </label>
                <Select
                  value={form.is_fixed_asset.toString()}
                  onValueChange={(value) => handleSelectChange("is_fixed_asset", value)}
                >
                  <SelectTrigger
                    aria-label="Is fixed asset"
                    className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  >
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    <SelectItem value="1" className="hover:bg-accent">Yes</SelectItem>
                    <SelectItem value="0" className="hover:bg-accent">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter item description"
                  value={form.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  aria-label="Description"
                  className="w-full bg-background text-foreground border-input focus:border-primary rounded-md p-2 border min-h-[80px]"
                  rows={3}
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Brand
                </label>
                <Input
                  placeholder="Enter brand name"
                  value={form.brand}
                  onChange={(e) => handleInputChange(e, "brand")}
                  aria-label="Brand"
                  className="bg-background text-foreground border-input focus:border-primary rounded-md"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border-border rounded-md transition-colors"
                >
                  {loading ? "Creating Item..." : "Create Item"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-input text-foreground hover:bg-accent rounded-md"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}