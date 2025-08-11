"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type StockTxnType = "RECEIVE" | "ISSUE" | "MANUFACTURE" | "SELL" | "INIT";

export type StockLedgerEntry = {
  id: string;
  date: string; // ISO date
  type: StockTxnType;
  itemCode: string;
  itemName?: string;
  qty: number; // positive number; sign derived from type
  uom?: string;
  rate?: number; // unit cost for receive/manufacture, unit price for sell (optional)
  warehouse: string;
  reference?: string; // supplier, customer, or doc ref
};

export type StockBalance = {
  itemCode: string;
  qty: number;
  uom?: string;
  warehouse: string;
  lastRate?: number;
};

export type ItemRecord = {
  itemCode: string;
  warehouse: string;
  kind: "RAW" | "FINISHED" | "OTHER";
};

export type StockState = {
  items: ItemRecord[];
  balances: Record<string, StockBalance>; // key: itemCode
  ledger: StockLedgerEntry[];
  defaultWarehouse: string;
};

type ReceivePayload = {
  date: string;
  itemCode: string;
  qty: number;
  uom?: string;
  rate?: number;
  supplier?: string;
};

type IssuePayload = {
  date: string;
  lines: Array<{ itemCode: string; qty: number; uom?: string }>;
  reference?: string;
};

type ManufacturePayload = {
  date: string;
  itemCode: string; // finished good
  qty: number;
  uom?: string;
  reference?: string;
};

type SellPayload = {
  date: string;
  customer: string;
  lines: Array<{ itemCode: string; qty: number; uom?: string; rate?: number }>;
};

type InitPayload = {
  items: ItemRecord[];
  defaultWarehouse: string;
  initialBalances?: Record<string, StockBalance>;
  initialLedger?: StockLedgerEntry[];
};

type Action =
  | { type: "INIT"; payload: InitPayload }
  | { type: "RECEIVE"; payload: ReceivePayload }
  | { type: "ISSUE"; payload: IssuePayload }
  | { type: "MANUFACTURE"; payload: ManufacturePayload }
  | { type: "SELL"; payload: SellPayload }
  | { type: "UNDO" };

const DEFAULT_WAREHOUSE = "HQ Warehouse - Bole - Ma-BeignetD";

function stockReducer(state: StockState, action: Action): StockState {
  switch (action.type) {
    case "INIT": {
      const { items, defaultWarehouse, initialBalances, initialLedger } = action.payload;
      const balances: Record<string, StockBalance> = { ...state.balances };
      for (const it of items) {
        if (!balances[it.itemCode]) {
          balances[it.itemCode] = {
            itemCode: it.itemCode,
            qty: balances[it.itemCode]?.qty ?? 0,
            uom: balances[it.itemCode]?.uom,
            warehouse: it.warehouse || defaultWarehouse,
          };
        }
      }
      if (initialBalances) {
        for (const [code, bal] of Object.entries(initialBalances)) {
          const existing = balances[code] || {
            itemCode: code,
            qty: 0,
            uom: bal.uom,
            warehouse: bal.warehouse || defaultWarehouse,
          };
          balances[code] = {
            ...existing,
            qty: bal.qty,
            uom: bal.uom || existing.uom,
            lastRate: bal.lastRate || existing.lastRate,
            warehouse: bal.warehouse || existing.warehouse || defaultWarehouse,
          };
        }
      }
      return {
        ...state,
        items,
        balances,
        defaultWarehouse: defaultWarehouse || state.defaultWarehouse,
        ledger: initialLedger && initialLedger.length > 0 ? [...initialLedger, ...state.ledger] : state.ledger,
      };
    }
    case "RECEIVE": {
      const { date, itemCode, qty, uom, rate, supplier } = action.payload;
      if (!qty || qty <= 0) return state;
      const existing = state.balances[itemCode] || {
        itemCode,
        qty: 0,
        uom,
        warehouse: state.defaultWarehouse,
      };
      const newQty = existing.qty + qty;
      const balances = {
        ...state.balances,
        [itemCode]: { ...existing, qty: newQty, uom: uom || existing.uom, lastRate: rate ?? existing.lastRate },
      };
      const ledgerEntry: StockLedgerEntry = {
        id: `LR-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        date,
        type: "RECEIVE",
        itemCode,
        qty,
        uom,
        rate,
        warehouse: existing.warehouse || state.defaultWarehouse,
        reference: supplier,
      };
      return { ...state, balances, ledger: [ledgerEntry, ...state.ledger] };
    }
    case "ISSUE": {
      const { date, lines, reference } = action.payload;
      const balances = { ...state.balances };
      const newEntries: StockLedgerEntry[] = [];
      for (const line of lines) {
        if (!line.qty || line.qty <= 0) continue;
        const existing = balances[line.itemCode] || {
          itemCode: line.itemCode,
          qty: 0,
          uom: line.uom,
          warehouse: state.defaultWarehouse,
        };
        balances[line.itemCode] = {
          ...existing,
          qty: existing.qty - line.qty,
          uom: line.uom || existing.uom,
        };
        newEntries.push({
          id: `LI-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          date,
          type: "ISSUE",
          itemCode: line.itemCode,
          qty: line.qty,
          uom: line.uom || existing.uom,
          warehouse: existing.warehouse || state.defaultWarehouse,
          reference,
        });
      }
      return { ...state, balances, ledger: [...newEntries, ...state.ledger] };
    }
    case "MANUFACTURE": {
      const { date, itemCode, qty, uom, reference } = action.payload;
      if (!qty || qty <= 0) return state;
      const existing = state.balances[itemCode] || {
        itemCode,
        qty: 0,
        uom,
        warehouse: state.defaultWarehouse,
      };
      const balances = {
        ...state.balances,
        [itemCode]: { ...existing, qty: existing.qty + qty, uom: uom || existing.uom },
      };
      const ledgerEntry: StockLedgerEntry = {
        id: `LM-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        date,
        type: "MANUFACTURE",
        itemCode,
        qty,
        uom: uom || existing.uom,
        warehouse: existing.warehouse || state.defaultWarehouse,
        reference,
      };
      return { ...state, balances, ledger: [ledgerEntry, ...state.ledger] };
    }
    case "SELL": {
      const { date, customer, lines } = action.payload;
      const balances = { ...state.balances };
      const newEntries: StockLedgerEntry[] = [];
      for (const line of lines) {
        if (!line.qty || line.qty <= 0) continue;
        const existing = balances[line.itemCode] || {
          itemCode: line.itemCode,
          qty: 0,
          uom: line.uom,
          warehouse: state.defaultWarehouse,
        };
        balances[line.itemCode] = {
          ...existing,
          qty: existing.qty - line.qty,
          uom: line.uom || existing.uom,
        };
        newEntries.push({
          id: `LS-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          date,
          type: "SELL",
          itemCode: line.itemCode,
          qty: line.qty,
          uom: line.uom || existing.uom,
          rate: line.rate,
          warehouse: existing.warehouse || state.defaultWarehouse,
          reference: customer,
        });
      }
      return { ...state, balances, ledger: [...newEntries, ...state.ledger] };
    }
    case "UNDO": {
      // No-op here; actual undo handled at provider level via saved snapshot
      return state;
    }
    default:
      return state;
  }
}

function parseCSV(text: string): string[][] {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) =>
      line
        .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
        .map((cell) => cell.replace(/^\"|\"$/g, "").trim())
    );
}

async function fetchItemsFromCSV(): Promise<ItemRecord[]> {
  try {
    const res = await fetch("/Item.csv", { cache: "no-store" });
    const text = await res.text();
    if (!text.trim()) return [];
    const rows = parseCSV(text);
    const header = rows[0];
    const itemCodeIdx = header.findIndex((h) => h.toLowerCase().includes("item code"));
    const whIdx = header.findIndex((h) => h.toLowerCase().includes("warehouse"));
    const records: ItemRecord[] = rows.slice(1).filter((r) => r[itemCodeIdx]).map((r) => {
      const code = r[itemCodeIdx];
      const kind: ItemRecord["kind"] = code.startsWith("MB-RAW-")
        ? "RAW"
        : code.startsWith("MB-BEI-") || code.startsWith("MB-CRO-")
        ? "FINISHED"
        : "OTHER";
      return {
        itemCode: code,
        warehouse: r[whIdx] || DEFAULT_WAREHOUSE,
        kind,
      };
    });
    return records;
  } catch {
    return [];
  }
}

async function fetchMaterialRequestAsInit(): Promise<{ balances: Record<string, StockBalance>; ledger: StockLedgerEntry[] }> {
  try {
    const res = await fetch("/Material Request.csv", { cache: "no-store" });
    const text = await res.text();
    if (!text.trim()) return { balances: {}, ledger: [] };
    const rows = parseCSV(text);
    const header = rows[0];
    const codeIdx = header.findIndex((h) => h.toLowerCase().includes("item code"));
    const qtyIdx = header.findIndex((h) => h.toLowerCase().includes("quantity"));
    const uomIdx = header.findIndex((h) => h.toLowerCase().includes("uom"));
    const whIdx = header.findIndex((h) => h.toLowerCase().includes("warehouse"));
    const dateIdx = header.findIndex((h) => h.toLowerCase().includes("transaction date"));
    const balances: Record<string, StockBalance> = {};
    const ledger: StockLedgerEntry[] = [];
    for (const r of rows.slice(1)) {
      const code = r[codeIdx];
      if (!code) continue;
      const qty = Number(r[qtyIdx] || 0);
      const uom = r[uomIdx] || undefined;
      const wh = r[whIdx] || DEFAULT_WAREHOUSE;
      const date = (r[dateIdx] || new Date().toISOString().slice(0, 10)) as string;
      // Treat requests as planned issues (negative) to seed realistic consumption
      balances[code] = {
        itemCode: code,
        qty: (balances[code]?.qty ?? 0) - qty,
        uom,
        warehouse: wh,
      };
      ledger.push({
        id: `INIT-${code}-${date}`,
        date,
        type: "ISSUE",
        itemCode: code,
        qty,
        uom,
        warehouse: wh,
        reference: "Init MR",
      });
    }
    return { balances, ledger };
  } catch {
    return { balances: {}, ledger: [] };
  }
}

const StockContext = createContext<{
  state: StockState;
  dispatch: React.Dispatch<Action>;
  receive: (p: ReceivePayload) => void;
  issue: (p: IssuePayload) => void;
  manufacture: (p: ManufacturePayload) => void;
  sell: (p: SellPayload) => void;
  undo: () => void;
  getQty: (code: string) => number;
} | null>(null);

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(stockReducer, {
    items: [],
    balances: {},
    ledger: [],
    defaultWarehouse: DEFAULT_WAREHOUSE,
  });
  const lastSnapshotRef = React.useRef<StockState | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchItemsFromCSV(), fetchMaterialRequestAsInit()]).then(([items, initData]) => {
      if (!mounted) return;
      // Load saved state from localStorage
      const savedRaw = typeof window !== "undefined" ? window.localStorage.getItem("mb_stock_state") : null;
      let saved: Partial<StockState> | null = null;
      if (savedRaw) {
        try { saved = JSON.parse(savedRaw); } catch {}
      }
      dispatch({
        type: "INIT",
        payload: {
          items,
          defaultWarehouse: DEFAULT_WAREHOUSE,
          initialBalances: { ...initData.balances, ...(saved?.balances || {}) },
          initialLedger: [...(saved?.ledger || []), ...initData.ledger],
        },
      });
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { balances, ledger } = state;
    window.localStorage.setItem("mb_stock_state", JSON.stringify({ balances, ledger }));
  }, [state.balances, state.ledger]);

  const api = useMemo(() => ({
    state,
    dispatch,
    receive: (p: ReceivePayload) => { lastSnapshotRef.current = state; dispatch({ type: "RECEIVE", payload: p }); },
    issue: (p: IssuePayload) => { lastSnapshotRef.current = state; dispatch({ type: "ISSUE", payload: p }); },
    manufacture: (p: ManufacturePayload) => { lastSnapshotRef.current = state; dispatch({ type: "MANUFACTURE", payload: p }); },
    sell: (p: SellPayload) => { lastSnapshotRef.current = state; dispatch({ type: "SELL", payload: p }); },
    undo: () => {
      if (lastSnapshotRef.current) {
        // Restore snapshot into state by reinitializing balances and ledger
        const snap = lastSnapshotRef.current;
        lastSnapshotRef.current = null;
        // Re-dispatch INIT with snapshot balances/ledger while preserving items/defaultWarehouse
        dispatch({
          type: "INIT",
          payload: {
            items: snap.items.length ? snap.items : state.items,
            defaultWarehouse: snap.defaultWarehouse || state.defaultWarehouse,
            initialBalances: snap.balances,
            initialLedger: snap.ledger,
          },
        });
      }
    },
    getQty: (code: string) => state.balances[code]?.qty ?? 0,
  }), [state]);

  return <StockContext.Provider value={api}>{children}</StockContext.Provider>;
}

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStock must be used within StockProvider");
  return ctx;
}


