import { StockEntryCreateRequest } from '@/types/stock-entry';
import { frappeClient } from './frappe-client';

// Validate Stock Entry items based on stock_entry_type
export async function validateStockEntryItems(
  stockEntry: StockEntryCreateRequest
): Promise<void> {
  const { stock_entry_type, items, from_warehouse, to_warehouse } = stockEntry;

  // Validate required fields for items
  for (const item of items) {
    if (!item.item_code || !item.qty || item.qty <= 0) {
      throw new Error('Each item must have a valid item_code and qty greater than 0');
    }

    // Validate warehouse requirements based on stock_entry_type
    if (stock_entry_type === 'Material Issue' && !item.s_warehouse && !from_warehouse) {
      throw new Error('Source warehouse is required for Material Issue');
    }
    if (stock_entry_type === 'Material Receipt' && !item.t_warehouse && !to_warehouse) {
      throw new Error('Target warehouse is required for Material Receipt');
    }
    if (stock_entry_type === 'Material Transfer' && (!item.s_warehouse || !item.t_warehouse) && (!from_warehouse || !to_warehouse)) {
      throw new Error('Both source and target warehouses are required for Material Transfer');
    }

    // Validate item exists in Frappe
    const itemExists = await frappeClient.db.getDoc('Item', item.item_code);
    if (!itemExists) {
      throw new Error(`Item ${item.item_code} does not exist`);
    }
  }
}

// Set default values for posting date and time
export function setStockEntryDefaults(stockEntry: StockEntryCreateRequest): StockEntryCreateRequest {
  const now = new Date();
  return {
    ...stockEntry,
    posting_date: stockEntry.posting_date || now.toISOString().split('T')[0],
    posting_time: stockEntry.posting_time || now.toTimeString().split(' ')[0],
  };
}