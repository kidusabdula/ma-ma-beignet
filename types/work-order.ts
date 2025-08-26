export interface WorkOrder {
    name: string;
    production_item: string;
    item_name?: string;
    bom_no?: string;
    qty: number;
    material_transferred_for_manufacturing?: number;
    produced_qty?: number;
    status: 'Draft' | 'Submitted' | 'Not Started' | 'In Process' | 'Completed' | 'Stopped' | 'Closed';
    company?: string;
    wip_warehouse?: string;
    fg_warehouse?: string;
    planned_start_date?: string;
    planned_end_date?: string;
    actual_start_date?: string;
    actual_end_date?: string;
    // Standard Frappe fields
    owner?: string;
    creation?: string;
    modified?: string;
    modified_by?: string;
    docstatus?: 0 | 1 | 2;
  }
  
  export interface WorkOrderCreateRequest {
    production_item: string;
    qty: number;
    bom_no?: string;
    company?: string;
    wip_warehouse?: string;
    fg_warehouse?: string;
    planned_start_date?: string;
    planned_end_date?: string;
  }
  
  export interface WorkOrderUpdateRequest extends Partial<WorkOrderCreateRequest> {
    name: string;
    status?: WorkOrder['status'];
  }
  
  export interface WorkOrderItem {
    item_code: string;
    item_name?: string;
    required_qty: number;
    transferred_qty?: number;
    consumed_qty?: number;
    source_warehouse?: string;
  }
  
  export interface WorkOrderWithItems extends WorkOrder {
    required_items?: WorkOrderItem[];
  }