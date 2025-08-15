"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Trash2,
  Minus,
  Plus,
  Donut,
  Croissant,
  CakeSlice,
  Cake,
  Wheat,
  Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MenuItem = {
  id: string;
  name: string;
  price: number;
};

type OrderItem = MenuItem & {
  quantity: number;
};

type MenuCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  itemCount: number;
};

const menuData = {
  categories: [
    { id: "breads", name: "Breads", icon: Cake , color: "bg-green-300/10 text-green-300", itemCount: 15 },
    { id: "pastries", name: "Pastries", icon: Croissant, color: "bg-purple-300/10 text-purple-300", itemCount: 12 },
    { id: "cakes", name: "Cakes", icon: CakeSlice, color: "bg-pink-300/10 text-pink-300", itemCount: 8 },
    { id: "donuts", name: "Donuts", icon: Donut, color: "bg-blue-300/10 text-blue-300", itemCount: 10 },
    { id: "flours", name: "Flours", icon: Wheat, color: "bg-orange-300/10 text-orange-300", itemCount: 5 },
    { id: "ingredients", name: "Ingredients", icon: Utensils, color: "bg-yellow-300/10 text-yellow-300", itemCount: 20 },
  ] as MenuCategory[],
  items: {
    breads: [
      { id: "b1", name: "Sourdough Loaf", price: 555.50 },
      { id: "b2", name: "Baguette", price: 370.75 },
      { id: "b3", name: "Whole Wheat Bread", price: 435.25 },
      { id: "b4", name: "Rye Bread", price: 555.00 },
      { id: "b5", name: "Brioche", price: 600.50 },
    ],
    pastries: [
      { id: "p1", name: "Croissant (Pack of 6)", price: 899.50 },
      { id: "p2", name: "Danish Pastry (Pack of 6)", price: 569.00 },
      { id: "p3", name: "Puff Pastry Sheet", price: 476.75 },
      { id: "p4", name: "Palmier Cookies", price: 985.25 },
    ],
    cakes: [
      { id: "c1", name: "Chocolate Cake (Whole)", price: 258.00 },
      { id: "c2", name: "Vanilla Cake (Whole)", price: 229.00 },
      { id: "c3", name: "Red Velvet Cake (Whole)", price: 287.00 },
      { id: "c4", name: "Cheesecake (Whole)", price: 307.00 },
    ],
    donuts: [
      { id: "d1", name: "Glazed Donut (Dozen)", price: 127.00 },
      { id: "d2", name: "Chocolate Donut (Dozen)", price: 135.50 },
      { id: "d3", name: "Jelly Donut (Dozen)", price: 148.00 },
      { id: "d4", name: "Boston Cream (Dozen)", price: 158.00 },
    ],
    flours: [
      { id: "f1", name: "All-Purpose Flour (50lb)", price: 355.00 },
      { id: "f2", name: "Bread Flour (50lb)", price: 358.00 },
      { id: "f3", name: "Cake Flour (50lb)", price: 403.00 },
      { id: "f4", name: "Whole Wheat Flour (50lb)", price: 427.00 },
    ],
    ingredients: [
      { id: "i1", name: "Yeast (1lb)", price: 877.00 },
      { id: "i2", name: "Baking Powder (5lb)", price: 123.50 },
      { id: "i3", name: "Vanilla Extract (32oz)", price: 253.00 },
      { id: "i4", name: "Chocolate Chips (10lb)", price: 284.00 },
      { id: "i5", name: "Sprinkles (5lb)", price: 155.00 },
    ],
  } as Record<string, MenuItem[]>,
};

export default function PosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleAddItem = (itemToAdd: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setOrderItems((prevItems) => {
      const itemToUpdate = prevItems.find((item) => item.id === itemId);
      if (itemToUpdate && itemToUpdate.quantity + delta === 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      );
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  
  const { subtotal, tax, total } = useMemo(() => {
    const sub = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.10;
    const taxAmount = sub * taxRate;
    const totalAmount = sub + taxAmount;
    return { subtotal: sub, tax: taxAmount, total: totalAmount };
  }, [orderItems]);

  const MenuHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--card-foreground)]" size={20} />
        <Input placeholder="Search for items..." className="bg-[var(--input)] border-[var(--border)] rounded-lg pl-12 h-12 text-[var(--card-foreground)] placeholder:text-[var(--muted-foreground)] focus:ring-1 focus:ring-offset-0 focus:ring-[var(--primary)] focus:border-[var(--primary)]" />
      </div>
    </div>
  );

  const CategoryView = () => (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-[var(--card-foreground)]">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuData.categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => setSelectedCategory(cat.id)} 
            className={`p-6 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-black/20 hover:scale-105 ${cat.color}`}
          >
            <cat.icon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-[var(--card-foreground)]">{cat.name}</h3>
            <p className="text-sm opacity-70">{cat.itemCount} items</p>
          </div>
        ))}
      </div>
    </>
  );

  const ItemView = () => {
    if (!selectedCategory) return null;
    const categoryDetails = menuData.categories.find(c => c.id === selectedCategory);
    const items = menuData.items[selectedCategory];

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--card-foreground)]">{categoryDetails?.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleAddItem(item)} 
              className="bg-[var(--card)] p-3 rounded-lg text-center cursor-pointer transition-transform hover:scale-105 group border border-[var(--border)]"
            >
              <div className="w-full h-20 bg-[var(--input)] rounded-md flex items-center justify-center mb-2 group-hover:bg-[var(--primary)]/10">
                <Utensils className="w-10 h-10 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <h4 className="font-medium text-[var(--card-foreground)]">{item.name}</h4>
              <p className="text-[var(--muted-foreground)]">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden flex">
        {/* Left & Center Panel (Menu) */}
        <div className="flex-1 overflow-y-auto bg-[var(--card)] p-6">
          <MenuHeader />
          <CategoryView />
          {selectedCategory && <ItemView />}
        </div>

        {/* Right Panel (Order) */}
        <div className="w-96 flex flex-col bg-[var(--card)] border-l border-[var(--border)] h-full overflow-hidden">
          <div className="p-6 h-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--card-foreground)]">Order</h2>
            
            {orderItems.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-[var(--muted-foreground)]">
                <Utensils size={48} />
                <p className="mt-4 text-lg">No Items Added</p>
                <p className="text-sm text-center">Click on items from the menu to add them to the order.</p>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto pr-2 -mr-4 space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="flex-grow">
                        <p className="font-medium text-[var(--card-foreground)]">{item.name}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center bg-[var(--input)] rounded-lg">
                        <Button 
                          onClick={() => handleUpdateQuantity(item.id, -1)} 
                          size="icon" 
                          className="bg-transparent hover:bg-[var(--sidebar-accent)] h-8 w-8"
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="px-3 w-10 text-center font-semibold text-[var(--card-foreground)]">{item.quantity}</span>
                        <Button 
                          onClick={() => handleUpdateQuantity(item.id, 1)} 
                          size="icon" 
                          className="bg-transparent hover:bg-[var(--sidebar-accent)] h-8 w-8"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <span className="w-20 text-right font-semibold text-[var(--card-foreground)]">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                      <Button 
                        onClick={() => handleRemoveItem(item.id)} 
                        size="icon" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 ml-2 h-10 w-10"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--border)] pt-4 mt-auto">
                  <div className="space-y-2 text-[var(--muted-foreground)] mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-[var(--card-foreground)] text-xl mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-[var(--card-foreground)]">Payment Method</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["Cash", "Debit Card", "E-Wallet"].map(method => (
                        <Button 
                          key={method} 
                          onClick={() => setPaymentMethod(method)} 
                          variant={paymentMethod === method ? "default" : "outline"} 
                          className={`h-12 text-sm ${paymentMethod === method ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]' : 'bg-transparent text-[var(--card-foreground)] border-[var(--border)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--card-foreground)]'}`}
                        >
                          {method}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-[var(--primary)] hover:bg-opacity-80 text-[var(--primary-foreground)] font-bold py-3 h-14 text-lg rounded-lg">
                    Place Order
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}