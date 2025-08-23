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

interface FormData {
  stock_entry_type: string;
  posting_date: string;
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
  const [form, setForm] = useState<FormData>({
    stock_entry_type: "",
    posting_date: new Date().toISOString().split("T")[0],
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleFormChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    handleFormChange(field, e.target.value);
  };

  const handleSelectChange = (field: keyof FormData, value: string) => {
    if (value === "placeholder") {
      setForm(prev => ({ ...prev, [field]: "" }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.stock_entry_type || !form.posting_date) {
      toast({ variant: "error", title: "Error", description: "Stock Entry Type and Posting Date are required." });
      return;
    }

    setLoading(true);
    try {
      const payload: StockEntryCreateRequest = {
        stock_entry_type: form.stock_entry_type as 'Material Issue' | 'Material Receipt' | 'Material Transfer',
        posting_date: form.posting_date,
        items: [],
        company: "Default Company",
      };

      const url = editId ? `/api/stock-entry?name=${editId}` : '/api/stock-entry';
      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Failed to ${editId ? 'update' : 'create'} stock entry`);
      }

      toast({
        title: "Success",
        description: `Stock Entry ${editId ? 'updated' : 'created'} successfully.`,
      });

      mutate("/api/stock-entry?limit=100");
      setForm({ stock_entry_type: "", posting_date: new Date().toISOString().split('T')[0] });
      setEditId(null);
      setIsFormOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save stock entry.";
      toast({ variant: "error", title: "Error", description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry: StockEntry) => {
    setForm({
      stock_entry_type: entry.stock_entry_type,
      posting_date: entry.posting_date,
    });
    setEditId(entry.name);
    setIsFormOpen(true);
  };

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
      <Card className="bg-card text-card-foreground border-border shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Stock Entries Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 border-border rounded-md transition-colors"
              onClick={() => {
                setForm({ stock_entry_type: "", posting_date: new Date().toISOString().split('T')[0] });
                setEditId(null);
                setIsFormOpen(!isFormOpen);
              }}
            >
              {isFormOpen ? "Cancel" : "Add New Stock Entry"}
            </Button>
          </div>

          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-6 bg-muted/50 border border-border rounded-lg"
            >
              <h3 className="text-lg font-medium text-foreground mb-4">
                {editId ? "Edit Stock Entry" : "Create New Stock Entry"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Stock Entry Type *
                  </label>
                  <Select
                    value={form.stock_entry_type || "placeholder"}
                    onValueChange={(value) => handleSelectChange("stock_entry_type", value)}
                  >
                    <SelectTrigger
                      aria-label="Select stock entry type"
                      className="bg-background text-foreground border-input focus:border-primary rounded-md"
                    >
                      <SelectValue placeholder="Select Stock Entry Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background text-foreground border-border">
                      <SelectItem value="placeholder" className="hover:bg-accent">
                        Select Stock Entry Type
                      </SelectItem>
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
                    Posting Date *
                  </label>
                  <Input
                    type="date"
                    value={form.posting_date}
                    onChange={(e) => handleInputChange(e, "posting_date")}
                    aria-label="Posting Date"
                    className="bg-background text-foreground border-input focus:border-primary rounded-md"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border-border rounded-md transition-colors"
                >
                  {loading ? "Processing..." : editId ? "Update Stock Entry" : "Create Stock Entry"}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 border border-border rounded-lg">
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

          {/* Error State */}
          {error && (
            <div className="mb-4 p-4 bg-destructive/20 border border-destructive/50 rounded-lg">
              <p className="text-destructive-foreground">Error loading stock entries: {error.message}</p>
            </div>
          )}

          {/* Stock Entries Table */}
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
                  <TableHead className="text-foreground font-medium">Entry Name</TableHead>
                  <TableHead className="text-foreground font-medium">Type</TableHead>
                  <TableHead className="text-foreground font-medium">Posting Date</TableHead>
                  <TableHead className="text-foreground font-medium">Status</TableHead>
                  <TableHead className="text-foreground font-medium">Actions</TableHead>
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
                          onClick={() => handleEdit(entry)}
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

          {/* Empty State */}
          {filteredStockEntries.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No stock entries found matching your filters.</p>
            </div>
          )}

          {/* Summary */}
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