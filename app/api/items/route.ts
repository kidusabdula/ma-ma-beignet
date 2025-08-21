import { NextRequest } from 'next/server';
import { frappeClient } from '@/lib/frappe-client';
import { handleApiRequest, withEndpointLogging } from '@/lib/api-template';
import { Item, ItemCreateRequest, ItemUpdateRequest } from '@/types/item';

// GET - Fetch all items
export async function GET(request: NextRequest) {
  return handleApiRequest<{ items: Item[] }>(
    withEndpointLogging('/api/items - GET')(async () => {
      const { searchParams } = new URL(request.url);
      const limit = searchParams.get('limit') || '100';

      const items = await frappeClient.db.getDocList('Item', {
        fields: ['name', 'item_code', 'item_name', 'stock_uom', 'item_group', 'brand', 'is_stock_item'],
        orderBy: { field: 'modified', order: 'desc' },
        limit: parseInt(limit),
      });

      return { items };
    })
  );
}

// POST - Create new item
export async function POST(request: NextRequest) {
  return handleApiRequest<{ item: Item }>(
    withEndpointLogging('/api/items - POST')(async () => {
      const data: ItemCreateRequest = await request.json();

      if (!data.item_name || !data.stock_uom) {
        throw new Error('Missing required fields: item_name and stock_uom');
      }

      if (!data.item_code) {
        data.item_code = data.item_name
          .toLowerCase()
          .replace(/\\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
      }

      const item = await frappeClient.db.createDoc('Item', data);
      return { item };
    })
  );
}

// PUT - Update item
export async function PUT(request: NextRequest) {
  return handleApiRequest<{ item: Item }>(
    withEndpointLogging('/api/items - PUT')(async () => {
      const { searchParams } = new URL(request.url);
      const name = searchParams.get('name');

      if (!name) throw new Error('Item name parameter is required');

      const data: ItemUpdateRequest = await request.json();
      const { name: _, ...updateData } = data;

      const item = await frappeClient.db.updateDoc('Item', name, updateData);
      return { item };
    })
  );
}

// DELETE - Delete item
export async function DELETE(request: NextRequest) {
  return handleApiRequest<{ message: string }>(
    withEndpointLogging('/api/items - DELETE')(async () => {
      const { searchParams } = new URL(request.url);
      const name = searchParams.get('name');

      if (!name) throw new Error('Item name parameter is required');

      await frappeClient.db.deleteDoc('Item', name);
      return { message: `Item ${name} deleted successfully` };
    })
  );
}
