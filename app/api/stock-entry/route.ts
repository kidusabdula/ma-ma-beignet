import { NextRequest } from 'next/server';
import { frappeClient } from '@/lib/frappe-client';
import { handleApiRequest, withEndpointLogging } from '@/lib/api-template';
import { StockEntry, StockEntryCreateRequest, StockEntryUpdateRequest } from '@/types/stock-entry';

// GET - Fetch all stock entries
export async function GET(request: NextRequest) {
  return handleApiRequest<{ stockEntries: StockEntry[] }>(
    withEndpointLogging('/api/stock-entries - GET')(async () => {
      const { searchParams } = new URL(request.url);
      const limit = searchParams.get('limit') || '100';

      const stockEntries = await frappeClient.db.getDocList('Stock Entry', {
        fields: [
          'name',
          'stock_entry_type',
          'posting_date',
          'posting_time',
          'total_outgoing_value',
          'total_incoming_value',
          'docstatus',
        ],
        orderBy: { field: 'modified', order: 'desc' },
        limit: parseInt(limit),
      });

      return { stockEntries };
    }),
    { requireAuth: true }
  );
}

// POST - Create new stock entry
export async function POST(request: NextRequest) {
  return handleApiRequest<{ stockEntry: StockEntry }>(
    withEndpointLogging('/api/stock-entries - POST')(async () => {
      const data: StockEntryCreateRequest = await request.json();

      if (!data.stock_entry_type || !data.posting_date) {
        throw new Error('Missing required fields: stock_entry_type and posting_date');
      }

      // Generate name if not provided
      if (!data.name) {
        data.name = `STE-${data.stock_entry_type}-${Date.now()}`;
      }

      const stockEntry = await frappeClient.db.createDoc<StockEntryCreateRequest>('Stock Entry', data);
      return { stockEntry: stockEntry as StockEntry };
    }),
    { requireAuth: true }
  );
}

// PUT - Update stock entry
export async function PUT(request: NextRequest) {
  return handleApiRequest<{ stockEntry: StockEntry }>(
    withEndpointLogging('/api/stock-entries - PUT')(async () => {
      const { searchParams } = new URL(request.url);
      const name = searchParams.get('name');

      if (!name) throw new Error('Stock Entry name parameter is required');

      const data: StockEntryUpdateRequest = await request.json();
      
      const stockEntry = await frappeClient.db.updateDoc<StockEntryUpdateRequest>('Stock Entry', name, data);
      return { stockEntry: stockEntry as StockEntry };
    }),
    { requireAuth: true }
  );
}

// DELETE - Delete stock entry
export async function DELETE(request: NextRequest) {
  return handleApiRequest<{ message: string }>(
    withEndpointLogging('/api/stock-entries - DELETE')(async () => {
      const { searchParams } = new URL(request.url);
      const name = searchParams.get('name');

      if (!name) throw new Error('Stock Entry name parameter is required');

      await frappeClient.db.deleteDoc('Stock Entry', name);
      return { message: `Stock Entry ${name} deleted successfully` };
    }),
    { requireAuth: true }
  );
}