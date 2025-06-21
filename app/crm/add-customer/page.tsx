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
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

// Load existing customers from localStorage or initialize
const loadCustomers = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("customers");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

export default function AddCustomer() {
  const [customers, setCustomers] = 
  useState<unknown[]>(loadCustomers());
  const [formData, setFormData] = useState({
    customerName: "",
    contactName: "",
    email: "",
    phone: "",
    mobile: "",
    billingAddress: { line1: "", line2: "", city: "", state: "", postalCode: "", country: "Ethiopia" },
    shippingAddress: { line1: "", line2: "", city: "", state: "", postalCode: "", country: "Ethiopia" },
    sameAsBilling: false,
    taxId: "",
    paymentTerms: "Net 30",
    preferredPaymentMethod: "Bank Transfer",
    creditLimit: 0,
    loyaltyPoints: 0,
    bakeryPreferences: { preferredProducts: [] as string[], deliveryFrequency: "Weekly" },
    notes: "",
    status: "Active",
    customerType: "Retail",
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleAddressChange = (type: "billingAddress" | "shippingAddress", field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handlePreferenceChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bakeryPreferences: { ...prev.bakeryPreferences, [field]: value },
    }));
  };

  const handleProductToggle = (product: string) => {
    setFormData((prev) => {
      const preferences = { ...prev.bakeryPreferences };
      const products = preferences.preferredProducts.includes(product)
        ? preferences.preferredProducts.filter((p: string) => p !== product)
        : [...preferences.preferredProducts, product];
      return { ...prev, bakeryPreferences: { ...preferences, preferredProducts: products } };
    });
  };

  // Save customer to localStorage
  const handleSave = () => {
    const newCustomer = {
      id: `CUST-${Date.now()}`,
      ...formData,
      lastUpdated: "0m",
      createdDate: new Date().toISOString().split("T")[0],
    };
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    if (typeof window !== "undefined") {
      localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    }
    alert("Customer saved! Check localStorage or future integration for details.");
  };

  // Sync with localStorage on mount
  useEffect(() => {
    const handleStorageChange = () => setCustomers(loadCustomers());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          New Customer <span className="text-red-600 text-sm font-bold">Not Saved</span>
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-[var(--border)] text-[var(--card-foreground)]"
          >
            Import Customers
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

      {/* Tabs/Sections */}
      <div className="flex space-x-4 text-[var(--card-foreground)]">
        <span className="cursor-pointer">Basic Info</span>
        <span className="cursor-pointer">Contact Details</span>
        <span className="cursor-pointer">Addresses</span>
        <span className="cursor-pointer">Financials</span>
        <span className="cursor-pointer">Preferences</span>
        <span className="cursor-pointer">Notes</span>
      </div>

      {/* Basic Info Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Customer Name *</label>
            <Input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="e.g., Amanuel Tadesse"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Contact Name</label>
            <Input
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="e.g., Selam Getachew"
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Customer Type</label>
            <Select
              value={formData.customerType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, customerType: value }))}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Retail" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Wholesale">Wholesale</SelectItem>
                <SelectItem value="Distributor">Distributor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Email</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., amanuel@example.com"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +251 911 234 567"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Mobile</label>
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="e.g., +251 912 345 678"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Addresses</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <Checkbox
              id="same-as-billing"
              checked={formData.sameAsBilling}
              onCheckedChange={(checked: boolean) => setFormData((prev) => ({ ...prev, sameAsBilling: checked }))}
            />
            <label htmlFor="same-as-billing" className="text-[var(--card-foreground)] text-sm ml-2">
              Same as Billing Address
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-[var(--card-foreground)] mb-2">Billing Address</h4>
              <Input
                name="billingLine1"
                value={formData.billingAddress.line1}
                onChange={(e) => handleAddressChange("billingAddress", "line1", e.target.value)}
                placeholder="Line 1"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
              />
              <Input
                name="billingLine2"
                value={formData.billingAddress.line2}
                onChange={(e) => handleAddressChange("billingAddress", "line2", e.target.value)}
                placeholder="Line 2"
                className="bg-[var(--input)] text-[var(--card-foreground] border-[var(--border)] mb-2"
              />
              <Input
                name="billingCity"
                value={formData.billingAddress.city}
                onChange={(e) => handleAddressChange("billingAddress", "city", e.target.value)}
                placeholder="City"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
              />
              <Input
                name="billingState"
                value={formData.billingAddress.state}
                onChange={(e) => handleAddressChange("billingAddress", "state", e.target.value)}
                placeholder="State/Region"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
              />
              <Input
                name="billingPostalCode"
                value={formData.billingAddress.postalCode}
                onChange={(e) => handleAddressChange("billingAddress", "postalCode", e.target.value)}
                placeholder="Postal Code"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
              />
              <Input
                name="billingCountry"
                value={formData.billingAddress.country}
                onChange={(e) => handleAddressChange("billingAddress", "country", e.target.value)}
                placeholder="Country"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
              />
            </div>
            <div>
              <h4 className="text-[var(--card-foreground)] mb-2">Shipping Address</h4>
              <Input
                name="shippingLine1"
                value={formData.sameAsBilling ? formData.billingAddress.line1 : formData.shippingAddress.line1}
                onChange={(e) => handleAddressChange("shippingAddress", "line1", e.target.value)}
                placeholder="Line 1"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
                disabled={formData.sameAsBilling}
              />
              <Input
                name="shippingLine2"
                value={formData.sameAsBilling ? formData.billingAddress.line2 : formData.shippingAddress.line2}
                onChange={(e) => handleAddressChange("shippingAddress", "line2", e.target.value)}
                placeholder="Line 2"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
                disabled={formData.sameAsBilling}
              />
              <Input
                name="shippingCity"
                value={formData.sameAsBilling ? formData.billingAddress.city : formData.shippingAddress.city}
                onChange={(e) => handleAddressChange("shippingAddress", "city", e.target.value)}
                placeholder="City"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
                disabled={formData.sameAsBilling}
              />
              <Input
                name="shippingState"
                value={formData.sameAsBilling ? formData.billingAddress.state : formData.shippingAddress.state}
                onChange={(e) => handleAddressChange("shippingAddress", "state", e.target.value)}
                placeholder="State/Region"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
                disabled={formData.sameAsBilling}
              />
              <Input
                name="shippingPostalCode"
                value={formData.sameAsBilling ? formData.billingAddress.postalCode : formData.shippingAddress.postalCode}
                onChange={(e) => handleAddressChange("shippingAddress", "postalCode", e.target.value)}
                placeholder="Postal Code"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] mb-2"
                disabled={formData.sameAsBilling}
              />
              <Input
                name="shippingCountry"
                value={formData.sameAsBilling ? formData.billingAddress.country : formData.shippingAddress.country}
                onChange={(e) => handleAddressChange("shippingAddress", "country", e.target.value)}
                placeholder="Country"
                className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
                disabled={formData.sameAsBilling}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Financials Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Financial Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Tax ID</label>
            <Input
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder="e.g., ET123456789"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Payment Terms</label>
            <Select
              value={formData.paymentTerms}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentTerms: value }))}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Select Payment Terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Net 15">Net 15</SelectItem>
                <SelectItem value="Net 30">Net 30</SelectItem>
                <SelectItem value="Net 60">Net 60</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Preferred Payment Method</label>
            <Select
              value={formData.preferredPaymentMethod}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredPaymentMethod: value }))}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Select Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Mobile Money">Mobile Money</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Credit Limit (ETB)</label>
            <Input
              name="creditLimit"
              type="number"
              value={formData.creditLimit}
              onChange={handleChange}
              placeholder="e.g., 50000"
              className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
            />
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Bakery Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Preferred Products</label>
            <div className="space-y-2">
              {["Bread", "Pastries", "Injera", "Cakes"].map((product) => (
                <div key={product} className="flex items-center">
                  <Checkbox
                    id={product}
                    checked={formData.bakeryPreferences.preferredProducts.includes(product)}
                    onCheckedChange={() => handleProductToggle(product)}
                  />
                  <label htmlFor={product} className="text-[var(--card-foreground)] ml-2">
                    {product}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[var(--card-foreground)] block mb-1">Delivery Frequency</label>
            <Select
              value={formData.bakeryPreferences.deliveryFrequency}
              onValueChange={(value) => handlePreferenceChange("deliveryFrequency", value)}
            >
              <SelectTrigger className="w-full bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]">
                <SelectValue placeholder="Select Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-[var(--card-foreground)] block mb-1">Loyalty Points</label>
          <Input
            name="loyaltyPoints"
            type="number"
            value={formData.loyaltyPoints}
            onChange={handleChange}
            placeholder="e.g., 100"
            className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)]"
          />
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
        <h3 className="text-[var(--card-foreground)] mb-4">Additional Notes</h3>
        <Input
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="e.g., Prefers early morning delivery"
          className="bg-[var(--input)] text-[var(--card-foreground)] border-[var(--border)] w-full"
        />
      </div>
    </div>
  );
}