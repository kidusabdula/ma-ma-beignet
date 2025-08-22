export interface StockEntryItem {
    item_code: string;
    qty: number;
    s_warehouse?: string; // Source warehouse for Material Issue/Transfer
    t_warehouse?: string; // Target warehouse for Material Receipt/Transfer
    serial_no?: string;   // Optional for serialized items
    batch_no?: string;    // Optional for batched items
    basic_rate?: number;  // Cost per unit
    uom?: string;         // Unit of Measure
  }
  
  export interface StockEntry {
    name: string;
    stock_entry_type: 'Material Issue' | 'Material Receipt' | 'Material Transfer';
    posting_date: string; // Format: YYYY-MM-DD
    posting_time: string; // Format: HH:MM:SS
    items: StockEntryItem[];
    from_warehouse?: string;
    to_warehouse?: string;
    remarks?: string;
    company: string;
    docstatus: 0 | 1 | 2; // 0: Draft, 1: Submitted, 2: Cancelled
    // Standard Frappe fields
    owner?: string;
    creation?: string;
    modified?: string;
    modified_by?: string;
  }
  
  export interface StockEntryCreateRequest {
    name?: string;
    stock_entry_type: 'Material Issue' | 'Material Receipt' | 'Material Transfer';
    posting_date?: string; // Defaults to current date if not provided
    posting_time?: string; // Defaults to current time if not provided
    items: StockEntryItem[];
    from_warehouse?: string;
    to_warehouse?: string;
    remarks?: string;
    company: string;
  }
  
  export interface StockEntryUpdateRequest extends Partial<StockEntryCreateRequest> {
    name?: string;
  }