// types/item.ts
export interface Item {
    name: string;
    item_code: string;
    item_name: string;
    stock_uom?: string;
    description?: string;
    item_group?: string;
    brand?: string;
    has_serial_no?: 0 | 1;
    has_batch_no?: 0 | 1;
    is_stock_item?: 0 | 1;
    disabled?: 0 | 1;
    // Standard fields
    owner?: string;
    creation?: string;
    modified?: string;
    modified_by?: string;
    docstatus?: 0 | 1 | 2;
  }
  
  // For items with stock information (this would require a separate API call)
  export interface ItemWithStock extends Item {
    actual_qty?: number;
    reserved_qty?: number;
    ordered_qty?: number;
    projected_qty?: number;
  }