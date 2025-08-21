"use client";

import { useEffect, useState } from "react";
import erpApi from "../../lib/api";

export default function TestErpItems() {
  const [items, setItems] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await erpApi.get(
          '/resource/Item?fields=["item_code"]'
        );
        console.log(data); // Logs ERPNext item data
        setItems(data.data.map((i: any) => i.item_code));
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchItems();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!items.length) return <div>Loading items...</div>;

  return (
    <div>
      <h2>ERPNext Items:</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
