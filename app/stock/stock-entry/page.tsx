"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { motion } from "framer-motion";
import useSWR, { mutate } from "swr";
import { useState, ChangeEvent } from "react";
import { StockEntry, StockEntryCreateRequest } from "@/types/stock-entry";
import { useRouter } from "next/navigation";

// Type definitions
interface StockEntriesApiResponse {
  success: boolean;
  data: {
    stockEntries: StockEntry[];
  };
  message?: string;
}

interface Filters {
  name: string;
  stock_entry_type: string;
  docstatus: string;
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

export default function StockEntryPage() {
  const { push: toast } = useToast();
  const [filters, setFilters] = useState<Filters>({
    name: "",
    stock_entry_type: "all",
    docstatus: "all",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { data: stockEntriesData, error } = useSWR<StockEntriesApiResponse, ApiError>(
    "/api/stock-entry?limit=100",
    fetcher
  );
  const stockEntries = stockEntriesData?.data?.stockEntries || [];

  const stockEntryTypes = [...new Set(stockEntries.map(entry => entry.stock_entry_type).filter(Boolean))];

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredStockEntries = stockEntries.filter((entry) =>
    (filters.name ? entry.name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
    (filters.stock_entry_type !== "all" ? entry.stock_entry_type === filters.stock_entry_type : true) &&
    (filters.docstatus !== "all"
      ? filters.docstatus === "Draft"
        ? entry.docstatus === 0
        : filters.docstatus === "Submitted"
        ? entry.docstatus === 1
        : entry.docstatus === 2
      : true)
  );

  const handleDelete = async (name: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/stock-entry?name=${name}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to delete stock entry");
      }

      toast({ title: "Success", description: "Stock Entry deleted successfully." });
      mutate("/api/stock-entry?limit=100");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete stock entry.";
      toast({ variant: "error", title: "Error", description: errorMessage });
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
        <span className="text-muted-foreground">Stock Entry</span>
      </div>

      <Card className="bg-card text-card-foreground border-border shadow-lg rounded-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-primary">Stock Entries</CardTitle>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 border-border rounded-md transition-colors"
            onClick={() => {
              router.push("/stock/stock-entry/add-stock-entry");
            }}
          >
            Add New Stock Entry
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Entry Name</label>
                <Input
                  placeholder="Filter by name"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  aria-label="Filter by Entry Name"
                  className="bg-background text-foreground border-input rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Stock Entry Type</label>
                <Select
                  value={filters.stock_entry_type}
                  onValueChange={(value) => handleFilterChange("stock_entry_type", value)}
                >
                  <SelectTrigger aria-label="Filter by Stock Entry Type" className="bg-background text-foreground border-input rounded-md">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    <SelectItem value="all" className="hover:bg-accent">All Types</SelectItem>
                    {stockEntryTypes.map((type) => (
                      <SelectItem key={type} value={type} className="hover:bg-accent">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
                <Select
                  value={filters.docstatus}
                  onValueChange={(value) => handleFilterChange("docstatus", value)}
                >
                  <SelectTrigger aria-label="Filter by Status" className="bg-background text-foreground border-input rounded-md">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-foreground border-border">
                    <SelectItem value="all" className="hover:bg-accent">All Status</SelectItem>
                    <SelectItem value="Draft" className="hover:bg-accent">Draft</SelectItem>
                    <SelectItem value="Submitted" className="hover:bg-accent">Submitted</SelectItem>
                    <SelectItem value="Cancelled" className="hover:bg-accent">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-destructive/20 border border-destructive/50 rounded-lg">
              <p className="text-destructive-foreground">Error loading stock entries: {error.message}</p>
            </div>
          )}

          <div className="overflow-x-auto border border-border rounded-lg">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-b border-border">
                  <TableHead className="text-foreground font-medium w-12">
                    <input
                      type="checkbox"
                      aria-label="Select all stock entries"
                      className="bg-background border-input rounded text-primary focus:ring-primary"
                    />
                  </TableHead>
                  <TableHead className="text-foreground font-medium">Number</TableHead>
                  <TableHead className="text-foreground font-medium">Start Date</TableHead>
                  <TableHead className="text-foreground font-medium">End Date</TableHead>
                  <TableHead className="text-foreground font-medium">Description</TableHead>
                  {/* <TableHead className="text-foreground font-medium">Bill Number</TableHead>
                  <TableHead className="text-foreground font-medium">Initial Value</TableHead>
                  <TableHead className="text-foreground font-medium">Current Value</TableHead>
                  <TableHead className="text-foreground font-medium">Department</TableHead>
                  <TableHead className="text-foreground font-medium">Vendor</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStockEntries.map((entry, index) => (
                  <motion.tr
                    key={entry.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/30"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        aria-label={`Select ${entry.name}`}
                        className="bg-background border-input rounded text-primary focus:ring-primary"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{entry.name}</TableCell>
                    <TableCell className="text-muted-foreground">{entry.stock_entry_type}</TableCell>
                    <TableCell className="text-muted-foreground">{entry.posting_date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.docstatus === 0
                            ? "bg-yellow-500/20 text-yellow-400"
                            : entry.docstatus === 1
                            ? "bg-green-500/20 text-green-400"
                            : "bg-destructive/20 text-destructive-foreground"
                        }`}
                      >
                        {entry.docstatus === 0 ? "Draft" : entry.docstatus === 1 ? "Submitted" : "Cancelled"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="border-input text-foreground hover:bg-accent rounded-md"
                          onClick={() => {
                            router.push(`/stock/stock-entry/add-stock-entry?name=${entry.name}`);
                          }}
                          size="sm"
                          disabled={loading}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          className="border-destructive/50 text-destructive-foreground hover:bg-destructive/20 rounded-md"
                          onClick={() => handleDelete(entry.name)}
                          disabled={loading}
                          size="sm"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStockEntries.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No stock entries found matching your filters.</p>
            </div>
          )}

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Showing {filteredStockEntries.length} of {stockEntries.length} stock entries
            </span>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}