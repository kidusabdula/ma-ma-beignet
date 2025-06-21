"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  // FileText,
  Settings,
  AlertCircle,
  Lock,
  User,
  ChevronDown,
  FileText as FileTextIcon,
  Receipt,
  BookOpen,
  UtensilsCrossed,
  Package,
  Box,
  ClipboardCheck,
  PackagePlus,
} from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);
  const [isManufacturingOpen, setIsManufacturingOpen] = useState(false);
  const [isCRMOpen, setIsCRMOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] dark">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
        {/* Fixed header section */}
        <div className="p-4 border-b border-[var(--sidebar-border)]">
          <h2 className="text-lg font-extrabold flex items-center">
            <UtensilsCrossed className="mr-2 h-6 w-6" />
            Ma Ma Beignet
          </h2>
        </div>

        {/* Scrollable navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-6">
            {/* General Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                General
              </h3>
              <div className="space-y-1">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tasks Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                Tasks
              </h3>
              <div className="space-y-1">
                {/* Accounting Dropdown */}
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                    onClick={() => setIsAccountingOpen(!isAccountingOpen)}
                  >
                    <Link href="/accounting" className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" />
                      Accounting
                    </Link>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isAccountingOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  {isAccountingOpen && (
                    <div className="pl-8 space-y-1">
                      <Link href="/accounting/sales-invoice">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <FileTextIcon className="h-4 w-4" />
                          Sales Invoice
                        </Button>
                      </Link>
                      <Link href="/accounting/purchase-invoice">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <Receipt className="h-4 w-4" />
                          Purchase Invoice
                        </Button>
                      </Link>
                      <Link href="/accounting/journal-entry">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <BookOpen className="h-4 w-4" />
                          Journal Entry
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                <Link href="/hr">
                  {/* <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                  >
                    <Users className="h-4 w-4" />
                    Human Resource
                  </Button> */}
                </Link>

                {/* CRM Dropdown */}
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                    onClick={() => setIsCRMOpen(!isCRMOpen)}
                  >
                    <Link
                      href="/crm"
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      CRM
                    </Link>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isCRMOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  {isCRMOpen && (
                    <div className="pl-8 space-y-1">
                      <Link href="/crm/lead">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <FileTextIcon className="h-4 w-4" />
                          Lead
                        </Button>
                      </Link>
                      <Link href="/crm/customer">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <Receipt className="h-4 w-4" />
                          Customer
                        </Button>
                      </Link>
                      <Link href="/crm/sales-analytics">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <BookOpen className="h-4 w-4" />
                          Sales Analytics
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Users Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                Users
              </h3>
              <div className="space-y-1">
                {/* Manufacturing Dropdown */}
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                    onClick={() => setIsManufacturingOpen(!isManufacturingOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Manufacturing
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isManufacturingOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  {isManufacturingOpen && (
                    <div className="pl-8 space-y-1">
                      <Link href="/manufacturing/bom">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <FileTextIcon className="h-4 w-4" />
                          BOM
                        </Button>
                      </Link>
                      <Link href="/manufacturing/production-plan">
                        {/* <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <Receipt className="h-4 w-4" />
                          Production Plan
                        </Button> */}
                      </Link>
                      <Link href="/manufacturing/bom-stock-report">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <BookOpen className="h-4 w-4" />
                          BOM Stock Report
                        </Button>
                      </Link>
                      <Link href="/manufacturing/production-planning-report">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <BookOpen className="h-4 w-4" />
                          Production Planning Report
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                {/* <Link href="/order">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                  >
                    <FileText className="h-4 w-4" />
                    Order Management
                  </Button>
                </Link> */}
              </div>
            </div>

            {/* Pages Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                Pages
              </h3>
              <div className="space-y-1">
                {/* Stock Dropdown */}
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                    onClick={() => setIsStockOpen(!isStockOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Stock
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isStockOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  {isStockOpen && (
                    <div className="pl-8 space-y-1">
                      <Link href="/stock/items">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <Box className="h-4 w-4" />
                          Items
                        </Button>
                      </Link>
                      <Link href="/stock/material-request">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <ClipboardCheck className="h-4 w-4" />
                          Material Request
                        </Button>
                      </Link>
                      <Link href="/stock/stock-entry">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                        >
                          <PackagePlus className="h-4 w-4" />
                          Stock Entry
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link href="/assets">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                  >
                    <Lock className="h-4 w-4" />
                    Asset Management
                  </Button>
                </Link>
                {/* <Link href="/settings">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </Link> */}
              </div>
            </div>

            {/* Other Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                Other
              </h3>
              <div className="space-y-1">
                <Link href="/help">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Help
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Fixed footer section */}
        <div className="p-4 border-t border-[var(--sidebar-border)]">
          <div className="flex items-center gap-2 py-2 rounded hover:bg-[var(--sidebar-accent)]">
            <div className="rounded-full bg-[var(--sidebar-primary)] p-1">
              <User className="h-4 w-4 text-[var(--sidebar-primary-foreground)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Kidus Abdula</p>
              <p className="text-xs text-muted-foreground">
                kidus489@gmail.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 text-[var(--foreground)]">
          {children}
        </main>
      </div>
    </div>
  );
}