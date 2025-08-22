'use client';
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

// Type definitions
interface Item {
  name: string;
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  is_stock_item: number;
  brand?: string;
  disabled?: number;
  modified?: string;
}

interface ItemsApiResponse {
  success: boolean;
  data: {
    items: Item[];
  };
  message?: string;
}

interface Filters {
  name: string;
  group: string;
  status: string;
  id: string;
}

interface FormData {
  item_name: string;
  item_group: string;
  stock_uom: string;
  disabled: boolean;
}

interface ApiError extends Error {
  message: string;
}

const fetcher = async (url: string): Promise<ItemsApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details || "Failed to fetch items");
  }
  return response.json();
};

export default function ItemPage() {
  const { push: toast } = useToast();
  const [filters, setFilters] = useState<Filters>({
    name: "",
    group: "all",
    status: "all",
    id: "",
  });
  const [form, setForm] = useState<FormData>({
    item_name: "",
    item_group: "",
    stock_uom: "",
    disabled: false,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: itemsData, error } = useSWR<ItemsApiResponse, ApiError>("/api/items", fetcher);
  const items = itemsData?.data?.items || [];

  const itemGroups = [...new Set(items.map(item => item.item_group).filter(Boolean))];

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredItems = items.filter((item) =>
    (filters.name ? item.item_name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
    (filters.group !== "all" ? item.item_group === filters.group : true) &&
    (filters.status !== "all" ?
      (filters.status === "Enabled" ? !item.disabled : item.disabled) : true) &&
    (filters.id ? item.name.toLowerCase().includes(filters.id.toLowerCase()) : true)
  );

  const handleFormChange = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    handleFormChange(field, e.target.value);
  };

  const handleSelectChange = (field: keyof FormData, value: string) => {
    if (field === 'disabled') {
      handleFormChange(field, value === "Disabled");
    } else {
      handleFormChange(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.item_name || !form.item_group || !form.stock_uom) {
      toast({ variant: "error", title: "Error", description: "All fields except status are required." });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        item_name: form.item_name,
        item_group: form.item_group,
        stock_uom: form.stock_uom,
        disabled: form.disabled,
      };

      const url = editId ? `/api/items?name=${editId}` : '/api/items';
      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Failed to ${editId ? 'update' : 'create'} item`);
      }

      toast({
        title: "Success",
        description: `Item ${editId ? 'updated' : 'added'} successfully.`
      });

      mutate("/api/items");
      setForm({ item_name: "", item_group: "", stock_uom: "", disabled: false });
      setEditId(null);
      setIsFormOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save item.";
      toast({ variant: "error", title: "Error", description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Item) => {
    setForm({
      item_name: item.item_name,
      item_group: item.item_group,
      stock_uom: item.stock_uom,
      disabled: Boolean(item.disabled),
    });
    setEditId(item.name);
    setIsFormOpen(true);
  };

  const handleDelete = async (name: string) => {
    // Replaced confirm with a direct action for this example.
    // In a real app, you'd use a custom modal for confirmation.
    setLoading(true);
    try {
      const response = await fetch(`/api/items?name=${name}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to delete item");
      }

      toast({ title: "Success", description: "Item deleted successfully." });
      mutate("/api/items");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete item.";
      toast({ variant: "error", title: "Error", description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <Card className="bg-black border border-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-white font-semibold">Items Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Button
              className="bg-white text-black hover:bg-gray-200 border border-gray-700 rounded-md"
              onClick={() => {
                setForm({ item_name: "", item_group: "", stock_uom: "", disabled: false });
                setEditId(null);
                setIsFormOpen(!isFormOpen);
              }}
            >
              {isFormOpen ? "Cancel" : "Add New Item"}
            </Button>
          </div>

          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-6 bg-gray-900/50 border border-gray-800 rounded-lg"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                {editId ? "Edit Item" : "Create New Item"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Item Name *
                  </label>
                  <Input
                    placeholder="Enter item name"
                    value={form.item_name}
                    onChange={(e) => handleInputChange(e, "item_name")}
                    aria-label="Item Name"
                    className="bg-black text-white border-gray-700 focus:border-white rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Item Group *
                  </label>
                  <Select
                    value={form.item_group}
                    onValueChange={(value) => handleSelectChange("item_group", value)}
                  >
                    <SelectTrigger
                      aria-label="Select item group"
                      className="bg-black text-white border-gray-700 focus:border-white rounded-md"
                    >
                      <SelectValue placeholder="Select Item Group" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-gray-700">
                      <SelectItem value="">Select Item Group</SelectItem>
                      {itemGroups.map((group) => (
                        <SelectItem key={group} value={group} className="focus:bg-gray-800">
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Stock Unit of Measure *
                  </label>
                  <Input
                    placeholder="e.g., Nos, Kg, Unit"
                    value={form.stock_uom}
                    onChange={(e) => handleInputChange(e, "stock_uom")}
                    aria-label="Stock UOM"
                    className="bg-black text-white border-gray-700 focus:border-white rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Status
                  </label>
                  <Select
                    value={form.disabled ? "Disabled" : "Enabled"}
                    onValueChange={(value) => handleSelectChange("disabled", value)}
                  >
                    <SelectTrigger
                      aria-label="Select status"
                      className="bg-black text-white border-gray-700 focus:border-white rounded-md"
                    >
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-gray-700">
                      <SelectItem value="Enabled" className="focus:bg-gray-800">Enabled</SelectItem>
                      <SelectItem value="Disabled" className="focus:bg-gray-800">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-black hover:bg-gray-200 border border-gray-700 rounded-md"
                >
                  {loading ? "Processing..." : editId ? "Update Item" : "Create Item"}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Item Name</label>
              <Input
                placeholder="Filter by name"
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
                aria-label="Filter by Item Name"
                className="bg-black text-white border-gray-700 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Item Group</label>
              <Select
                value={filters.group}
                onValueChange={(value) => handleFilterChange("group", value)}
              >
                <SelectTrigger aria-label="Filter by Item Group" className="bg-black text-white border-gray-700 rounded-md">
                  <SelectValue placeholder="All Groups" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-gray-700">
                  <SelectItem value="all" className="focus:bg-gray-800">All Groups</SelectItem>
                  {itemGroups.map((group) => (
                    <SelectItem key={group} value={group} className="focus:bg-gray-800">
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger aria-label="Filter by Status" className="bg-black text-white border-gray-700 rounded-md">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-gray-700">
                  <SelectItem value="all" className="focus:bg-gray-800">All Status</SelectItem>
                  <SelectItem value="Enabled" className="focus:bg-gray-800">Enabled</SelectItem>
                  <SelectItem value="Disabled" className="focus:bg-gray-800">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">ID</label>
              <Input
                placeholder="Filter by ID"
                value={filters.id}
                onChange={(e) => handleFilterChange("id", e.target.value)}
                aria-label="Filter by ID"
                className="bg-black text-white border-gray-700 rounded-md"
              />
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-500/30 rounded-lg">
              <p className="text-red-400">Error loading items: {error.message}</p>
            </div>
          )}

          {/* Items Table */}
          <div className="overflow-x-auto border border-gray-800 rounded-lg">
            <Table>
              <TableHeader className="bg-gray-900/50">
                <TableRow className="border-b border-gray-800">
                  <TableHead className="text-white font-medium w-12">
                    <input
                      type="checkbox"
                      aria-label="Select all items"
                      className="bg-black border-gray-600 rounded text-white focus:ring-white"
                    />
                  </TableHead>
                  <TableHead className="text-white font-medium">Item Name</TableHead>
                  <TableHead className="text-white font-medium">Status</TableHead>
                  <TableHead className="text-white font-medium">Item Group</TableHead>
                  <TableHead className="text-white font-medium">Item Code</TableHead>
                  <TableHead className="text-white font-medium">UOM</TableHead>
                  <TableHead className="text-white font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item, index) => (
                  <motion.tr
                    key={item.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-800 hover:bg-gray-900"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        aria-label={`Select ${item.item_name}`}
                        className="bg-black border-gray-600 rounded text-white focus:ring-white"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-white">{item.item_name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.disabled
                            ? "bg-gray-700 text-gray-300"
                            : "bg-green-900/50 text-green-400"
                        }`}
                      >
                        {item.disabled ? "Disabled" : "Enabled"}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-400">{item.item_group}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-500">{item.item_code}</TableCell>
                    <TableCell className="text-gray-400">{item.stock_uom}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="border-gray-700 text-white hover:bg-gray-800 rounded-md"
                          onClick={() => handleEdit(item)}
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          className="border-red-500/50 text-red-500 hover:bg-red-900/20 rounded-md"
                          onClick={() => handleDelete(item.name)}
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
          {filteredItems.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found matching your filters.</p>
            </div>
          )}

          {/* Summary */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
            <span className="text-sm text-gray-500">
              Showing {filteredItems.length} of {items.length} items
            </span>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
                    