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
  item_name: string;
  item_group: string;
  stock_uom: string;
  disabled: boolean;
  modified: string;
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

interface ItemsResponse {
  data: Item[];
}

interface ApiError extends Error {
  message: string;
}

const fetcher = async (url: string): Promise<ItemsResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
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

  const { data: itemsData, error } = useSWR<ItemsResponse, ApiError>("/api/items", fetcher);
  const items = itemsData?.data || [];

  // Fetch item groups for dropdown
  const { data: groupsData } = useSWR<ItemsResponse, ApiError>("/api/items?fields=[\"item_group\"]", fetcher);
  const itemGroups = [...new Set(groupsData?.data?.map(item => item.item_group) || [])];

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredItems = items.filter((item) =>
    (filters.name ? item.item_name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
    (filters.group !== "all" ? item.item_group.toLowerCase().includes(filters.group.toLowerCase()) : true) &&
    (filters.status !== "all" ? (filters.status === "Enabled" ? !item.disabled : item.disabled) : true) &&
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
      
      if (editId) {
        await fetch(`/api/items?name=${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast({ title: "Success", description: "Item updated." });
      } else {
        await fetch("/api/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast({ title: "Success", description: "Item added." });
      }
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
      disabled: item.disabled,
    });
    setEditId(item.name);
    setIsFormOpen(true);
  };

  const handleDelete = async (name: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    try {
      await fetch(`/api/items?name=${name}`, { method: "DELETE" });
      toast({ title: "Success", description: "Item deleted." });
      mutate("/api/items");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete item.";
      toast({ variant: "error", title: "Error", description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2a44] text-white p-8">
      <Card className="bg-[#2a3a5a] border-[#00b7eb]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#00b7eb]">Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button
              className="bg-[#00b7eb] hover:bg-[#00a3d3] text-white"
              onClick={() => {
                setForm({ item_name: "", item_group: "", stock_uom: "", disabled: false });
                setEditId(null);
                setIsFormOpen(!isFormOpen);
              }}
            >
              {isFormOpen ? "Cancel" : "Add Item"}
            </Button>
          </div>

          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-[#1e2a44] border border-[#00b7eb] rounded"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Item Name"
                  value={form.item_name}
                  onChange={(e) => handleInputChange(e, "item_name")}
                  aria-label="Item Name"
                  className="bg-[#1e2a44] text-white border-[#00b7eb]"
                />
                <Select
                  value={form.item_group}
                  onValueChange={(value) => handleSelectChange("item_group", value)}
                >
                  <SelectTrigger aria-label="Select item group">
                    <SelectValue placeholder="Select Item Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="placeholder" disabled>
                      Select Item Group
                    </SelectItem>
                    {itemGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Stock UOM (e.g., Kg, Unit)"
                  value={form.stock_uom}
                  onChange={(e) => handleInputChange(e, "stock_uom")}
                  aria-label="Stock UOM"
                  className="bg-[#1e2a44] text-white border-[#00b7eb]"
                />
                <Select
                  value={form.disabled ? "Disabled" : "Enabled"}
                  onValueChange={(value) => handleSelectChange("disabled", value)}
                >
                  <SelectTrigger aria-label="Select status">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Enabled">Enabled</SelectItem>
                    <SelectItem value="Disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00b7eb] hover:bg-[#00a3d3] text-white"
                >
                  {loading ? "Submitting..." : editId ? "Update Item" : "Add Item"}
                </Button>
              </form>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-[#00b7eb] block mb-1">Item Name</label>
              <Input
                placeholder="Item Name"
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
                aria-label="Filter by Item Name"
                className="bg-[#1e2a44] text-white border-[#00b7eb]"
              />
            </div>
            <div>
              <label className="text-[#00b7eb] block mb-1">Item Group</label>
              <Select
                value={filters.group}
                onValueChange={(value) => handleFilterChange("group", value)}
              >
                <SelectTrigger aria-label="Filter by Item Group">
                  <SelectValue placeholder="All Groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {itemGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[#00b7eb] block mb-1">Status</label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger aria-label="Filter by Status">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Enabled">Enabled</SelectItem>
                  <SelectItem value="Disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[#00b7eb] block mb-1">ID</label>
              <Input
                placeholder="ID"
                value={filters.id}
                onChange={(e) => handleFilterChange("id", e.target.value)}
                aria-label="Filter by ID"
                className="bg-[#1e2a44] text-white border-[#00b7eb]"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500">Error loading items: {error.message}</p>
          )}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#00b7eb] w-4">
                    <input type="checkbox" aria-label="Select all items" />
                  </TableHead>
                  <TableHead className="text-[#00b7eb]">Item</TableHead>
                  <TableHead className="text-[#00b7eb]">Status</TableHead>
                  <TableHead className="text-[#00b7eb]">Item Group</TableHead>
                  <TableHead className="text-[#00b7eb]">ID</TableHead>
                  <TableHead className="text-[#00b7eb]">Last Updated</TableHead>
                  <TableHead className="text-[#00b7eb]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item, index) => (
                  <motion.tr
                    key={item.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TableCell>
                      <input type="checkbox" aria-label={`Select ${item.item_name}`} />
                    </TableCell>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.disabled ? "bg-red-500" : "bg-green-500"
                        } text-white`}
                      >
                        {item.disabled ? "Disabled" : "Enabled"}
                      </span>
                    </TableCell>
                    <TableCell>{item.item_group}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{new Date(item.modified).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="mr-2 border-[#00b7eb] text-[#00b7eb]"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item.name)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span>Showing {filteredItems.length} of {items.length} items</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}