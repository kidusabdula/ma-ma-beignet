"use client";

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
import useSWR from "swr";
import { useState } from "react";
import { StockEntryCreateRequest, StockEntryItem } from "@/types/stock-entry";

// Type definitions
interface StockEntriesApiResponse {
  success: boolean;
  data: {
    stockEntries: { name: string; stock_entry_type: string }[];
  };
}

// ✅ Updated StockEntryItem to include optional source_warehouse
interface CustomStockEntryItem extends StockEntryItem {
  source_warehouse?: string;
  target_warehouse?: string;
}

interface FormData {
  naming_series: string;
  stock_entry_type: "Material Issue" | "Material Receipt" | "Material Transfer" | "";
  company: string;
  posting_date: string;
  items: CustomStockEntryItem[];
}

interface ApiError extends Error {
  message: string;
}

const fetcher = async (url: string): Promise<StockEntriesApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details || "Failed to fetch stock entries");
  }
  return response.json();
};

export default function AddStockEntryPage() {
  const { push: toast } = useToast();
  const [form, setForm] = useState<FormData>({
    naming_series: "MAT-STE-.YYYY.-",
    stock_entry_type: "",
    company: "Ma Beignet (Demo)",
    posting_date: new Date().toISOString().split('T')[0],
    items: [{ item_code: "", qty: 0, basic_rate: 0, source_warehouse: "", target_warehouse: "" }],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { data: stockEntriesData } = useSWR<StockEntriesApiResponse, ApiError>(
    "/api/stock-entry?limit=100",
    fetcher
  );

  const erpnextStockEntryTypes = [
    "Material Issue",
    "Material Receipt",
    "Material Transfer",
    "Subcontracting Receipt",
    "Manufacturing (Production)",
    "Repack",
    "Customer Return",
    "Supplier Return"
  ];

  const stockEntryTypes = [
    ...new Set([
      ...(stockEntriesData?.data?.stockEntries.map((entry) => entry.stock_entry_type).filter(Boolean) || []),
      ...erpnextStockEntryTypes
    ])
  ].sort();

  const handleFormChange = (
    field: keyof Omit<FormData, "items">,
    value: string | number
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (
    index: number,
    field: keyof CustomStockEntryItem,
    value: string | number
  ) => {
    const updatedItems = [...form.items];
    const item = updatedItems[index] as CustomStockEntryItem;
    (item[field] as string | number) = value;
    setForm((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { item_code: "", qty: 0, basic_rate: 0, source_warehouse: "", target_warehouse: "" }],
    }));
  };

  const removeItem = (index: number) => {
    if (form.items.length === 1) {
      toast({ variant: "error", title: "Error", description: "At least one item is required." });
      return;
    }
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.stock_entry_type) {
      toast({ variant: "error", title: "Validation Error", description: "Please select a Stock Entry Type." });
      return;
    }
    const hasMissingFields = form.items.some(item => {
      const isBaseInvalid = !item.item_code || item.qty <= 0 || item.basic_rate < 0;
      if (isBaseInvalid) return true;
    
      switch (form.stock_entry_type) {
        case "Material Issue":
          return !item.source_warehouse?.trim();
        case "Material Receipt":
          return !item.target_warehouse?.trim();
        case "Material Transfer":
          return !item.source_warehouse?.trim() || !item.target_warehouse?.trim();
        default:
          return false;
      }
    });

    if (hasMissingFields) {
      toast({
        variant: "error",
        title: "Validation Error",
        description: "Please fill all required fields for each item, including the correct Source/Target Warehouse.",
      });
      return;
    }

    setLoading(true);
    try {
      const payload: StockEntryCreateRequest = {
        stock_entry_type: form.stock_entry_type,
        posting_date: form.posting_date,
        company: form.company,
        items: form.items.map(item => {
          const newItem: any = {
            item_code: item.item_code,
            qty: item.qty,
            basic_rate: item.basic_rate,
          };
      
          switch (form.stock_entry_type) {
            case "Material Issue":
              newItem.s_warehouse = item.source_warehouse;
              break;
            case "Material Receipt":
              newItem.t_warehouse = item.target_warehouse;
              break;
            case "Material Transfer":
              newItem.s_warehouse = item.source_warehouse;
              newItem.t_warehouse = item.target_warehouse;
              break;
          }
      
          return newItem as StockEntryItem;
        })
      };
      
      const response = await fetch("/api/stock-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to create stock entry");
      }

      toast({
        title: "Stock Entry Created",
        description: "Your new stock entry has been successfully created.",
        variant: "success",
      });

      setForm({
        naming_series: "MAT-STE-.YYYY.-",
        stock_entry_type: "",
        company: "Ma Beignet (Demo)",
        posting_date: new Date().toISOString().split('T')[0],
        items: [{ item_code: "", qty: 0, basic_rate: 0, source_warehouse: "", target_warehouse: "" }],
      });
    } catch (error: Error) {
      toast({
        title: "Error Creating Stock Entry",
        description: error.message || "An unexpected error occurred.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-sans">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-muted-foreground flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-primary"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          />
        </svg>
        <span className="text-primary hover:underline cursor-pointer">Home</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-primary hover:underline cursor-pointer">Stock</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-primary hover:underline cursor-pointer">Add Stock Entry</span>
      </div>

      <Card className="bg-card text-card-foreground border-border shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Add New Stock Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Naming Series *
                </label>
                <Select
                  value={form.naming_series}
                  onValueChange={(value) => handleFormChange("naming_series", value)}
                >
                  <SelectTrigger
                    className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  >
                    <SelectValue placeholder="Select Naming Series" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    <SelectItem value="MAT-STE-.YYYY.-" className="hover:bg-accent">
                      MAT-STE-.YYYY.-
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Stock Entry Type *
                </label>
                <Select
                  value={form.stock_entry_type}
                  onValueChange={(value) => handleFormChange("stock_entry_type", value)}
                >
                  <SelectTrigger
                    className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  >
                    <SelectValue placeholder="Select Stock Entry Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    {stockEntryTypes.map((type) => (
                      <SelectItem key={type} value={type} className="hover:bg-accent">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Company *
                </label>
                <Select
                  value={form.company}
                  onValueChange={(value) => handleFormChange("company", value)}
                >
                  <SelectTrigger
                    className="bg-background text-foreground border-input focus:border-primary rounded-md"
                  >
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    <SelectItem value="Ma Beignet (Demo)" className="hover:bg-accent">
                      Ma Beignet (Demo)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Items *
              </label>
              {form.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 p-4 bg-muted/50 border border-border rounded-lg"
                >
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Item Code *
                    </label>
                    <Input
                      placeholder="e.g., ITEM-001"
                      value={item.item_code}
                      onChange={(e) => handleItemChange(index, "item_code", e.target.value)}
                      className="bg-background text-foreground border-input focus:border-primary rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Quantity *
                    </label>
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, "qty", Number(e.target.value))}
                      className="bg-background text-foreground border-input focus:border-primary rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Basic Rate *
                    </label>
                    <Input
                      type="number"
                      placeholder="Rate"
                      value={item.basic_rate}
                      onChange={(e) => handleItemChange(index, "basic_rate", Number(e.target.value))}
                      className="bg-background text-foreground border-input focus:border-primary rounded-md"
                    />
                  </div>

                  {["Material Issue", "Material Transfer"].includes(form.stock_entry_type) && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Source Wh. *
                      </label>
                      <Input
                        placeholder="e.g., Stores - MB"
                        value={item.source_warehouse}
                        onChange={(e) => handleItemChange(index, "source_warehouse", e.target.value)}
                        className="bg-background text-foreground border-input focus:border-primary rounded-md"
                      />
                    </div>
                  )}

                  {["Material Receipt", "Material Transfer"].includes(form.stock_entry_type) && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Target Wh. *
                      </label>
                      <Input
                        placeholder="e.g., Stores - MB"
                        value={item.target_warehouse}
                        onChange={(e) => handleItemChange(index, "target_warehouse", e.target.value)}
                        className="bg-background text-foreground border-input focus:border-primary rounded-md"
                      />
                    </div>
                  )}

                  <div className="md:col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-destructive/50 text-destructive-foreground hover:bg-destructive/20 rounded-md"
                      onClick={() => removeItem(index)}
                      disabled={form.items.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-border rounded-md transition-colors"
                onClick={addItem}
              >
                Add Item
              </Button>
            </div>

            <Button
              type="submit"
              disabled={loading || !form.stock_entry_type}
              className="bg-primary text-primary-foreground hover:bg-primary/90 border-border rounded-md transition-colors"
            >
              {loading ? "Processing..." : "Create Stock Entry"}
            </Button>
          </motion.form>
        </CardContent>
      </Card>
    </div>
  );
}