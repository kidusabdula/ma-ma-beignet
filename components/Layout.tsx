"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  AlertCircle,
  Lock,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText as FileTextIcon,
  Receipt,
  BookOpen,
  UtensilsCrossed,
  Package,
  Box,
  ClipboardCheck,
  PackagePlus,
  ShoppingCart,
  ArrowDownToLine,
  ArrowUpFromLine,
  Factory,
  Truck,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);
  const [isManufacturingOpen, setIsManufacturingOpen] = useState(false);
  const [isCRMOpen, setIsCRMOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Close all dropdowns when collapsing
    if (!isCollapsed) {
      setIsAccountingOpen(false);
      setIsManufacturingOpen(false);
      setIsCRMOpen(false);
      setIsStockOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] dark">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)]`}>
        {/* Fixed header section */}
        <div className="p-4 border-b border-[var(--sidebar-border)] flex items-center justify-between">
          {!isCollapsed ? (
            <h2 className="text-lg font-extrabold flex items-center">
              <UtensilsCrossed className="mr-2 h-6 w-6" />
              Ma Beignet
            </h2>
          ) : (
            <div className="flex justify-center w-full">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-6 w-6"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Scrollable navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-6">
            {/* General Section */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  General
                </h3>
              )}
              <div className="space-y-1">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                    title="Dashboard"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {!isCollapsed && "Dashboard"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tasks Section */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Tasks
                </h3>
              )}
              <div className="space-y-1">
                {/* Sales Link */}
                <Link href="/pos">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                    title="Sales"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {!isCollapsed && "Sales"}
                  </Button>
                </Link>

                {/* Accounting Dropdown */}
                <div className="space-y-1">
                  {isCollapsed ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-center px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                      title="Accounting"
                      onClick={() => setIsAccountingOpen(!isAccountingOpen)}
                    >
                      <ClipboardList className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-between px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                      onClick={() => setIsAccountingOpen(!isAccountingOpen)}
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        Accounting
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isAccountingOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  )}
                  {isAccountingOpen && (
                    <div className={`space-y-1 ${isCollapsed ? '' : 'pl-8'}`}>
                      <Link href="/accounting/sales-invoice">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Sales Invoice"
                        >
                          <FileTextIcon className="h-4 w-4" />
                          {!isCollapsed && "Sales Invoice"}
                        </Button>
                      </Link>
                      <Link href="/accounting/purchase-invoice">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Purchase Invoice"
                        >
                          <Receipt className="h-4 w-4" />
                          {!isCollapsed && "Purchase Invoice"}
                        </Button>
                      </Link>
                      <Link href="/accounting/journal-entry">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Journal Entry"
                        >
                          <BookOpen className="h-4 w-4" />
                          {!isCollapsed && "Journal Entry"}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* CRM Dropdown */}
                <div className="space-y-1">
                  {isCollapsed ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-center px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                      title="CRM"
                      onClick={() => setIsCRMOpen(!isCRMOpen)}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-between px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                      onClick={() => setIsCRMOpen(!isCRMOpen)}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        CRM
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isCRMOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  )}
                  {isCRMOpen && (
                    <div className={`space-y-1 ${isCollapsed ? '' : 'pl-8'}`}>
                      <Link href="/crm/lead">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Lead"
                        >
                          <FileTextIcon className="h-4 w-4" />
                          {!isCollapsed && "Lead"}
                        </Button>
                      </Link>
                      <Link href="/crm/customer">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Customer"
                        >
                          <Receipt className="h-4 w-4" />
                          {!isCollapsed && "Customer"}
                        </Button>
                      </Link>
                      <Link href="/crm/sales-analytics">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Sales Analytics"
                        >
                          <BookOpen className="h-4 w-4" />
                          {!isCollapsed && "Sales Analytics"}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Users Section */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Users
                </h3>
              )}
              <div className="space-y-1">
                {/* Manufacturing Dropdown */}
                <div className="space-y-1">
                  {isCollapsed ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-center px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                      title="Manufacturing"
                      onClick={() => setIsManufacturingOpen(!isManufacturingOpen)}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                  ) : (
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
                  )}
                  {isManufacturingOpen && (
                    <div className={`space-y-1 ${isCollapsed ? '' : 'pl-8'}`}>
                      <Link href="/manufacturing/bom">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="BOM"
                        >
                          <FileTextIcon className="h-4 w-4" />
                          {!isCollapsed && "BOM"}
                        </Button>
                      </Link>
                      <Link href="/manufacturing/bom-stock-report">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="BOM Stock Report"
                        >
                          <BookOpen className="h-4 w-4" />
                          {!isCollapsed && "BOM Stock Report"}
                        </Button>
                      </Link>
                      <Link href="/manufacturing/production-planning-report">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Production Planning Report"
                        >
                          <BookOpen className="h-4 w-4" />
                          {!isCollapsed && "Production Planning Report"}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pages Section */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Pages
                </h3>
              )}
              <div className="space-y-1">
                {/* Stock Dropdown */}
                <div className="space-y-1">
                  {isCollapsed ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-center px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                      title="Stock"
                      onClick={() => setIsStockOpen(!isStockOpen)}
                    >
                      <Package className="h-4 w-4" />
                    </Button>
                  ) : (
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
                  )}
                  {isStockOpen && (
                    <div className={`space-y-1 ${isCollapsed ? '' : 'pl-8'}`}>
                      <Link href="/stock">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Dashboard"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          {!isCollapsed && "Dashboard"}
                        </Button>
                      </Link>
                      <Link href="/stock/receive">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Receive"
                        >
                          <ArrowDownToLine className="h-4 w-4" />
                          {!isCollapsed && "Receive"}
                        </Button>
                      </Link>
                      <Link href="/stock/issue">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Issue to Production"
                        >
                          <ArrowUpFromLine className="h-4 w-4" />
                          {!isCollapsed && "Issue to Production"}
                        </Button>
                      </Link>
                      <Link href="/stock/manufacture">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Manufacture"
                        >
                          <Factory className="h-4 w-4" />
                          {!isCollapsed && "Manufacture"}
                        </Button>
                      </Link>
                      <Link href="/stock/sell">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Delivery Note / Sell"
                        >
                          <Truck className="h-4 w-4" />
                          {!isCollapsed && "Delivery Note / Sell"}
                        </Button>
                      </Link>
                      <Link href="/stock/report">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Stock Reports"
                        >
                          <BarChart3 className="h-4 w-4" />
                          {!isCollapsed && "Stock Reports"}
                        </Button>
                      </Link>
                      <Link href="/stock/item">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Items"
                        >
                          <Box className="h-4 w-4" />
                          {!isCollapsed && "Items"}
                        </Button>
                      </Link>
                      <Link href="/stock/material-request">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Material Request"
                        >
                          <ClipboardCheck className="h-4 w-4" />
                          {!isCollapsed && "Material Request"}
                        </Button>
                      </Link>
                      <Link href="/stock/stock-entry">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                          title="Stock Entry"
                        >
                          <PackagePlus className="h-4 w-4" />
                          {!isCollapsed && "Stock Entry"}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link href="/assets">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                    title="Asset Management"
                  >
                    <Lock className="h-4 w-4" />
                    {!isCollapsed && "Asset Management"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Other Section */}
            <div>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Other
                </h3>
              )}
              <div className="space-y-1">
                <Link href="/help">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] ${isCollapsed ? 'justify-center' : ''}`}
                    title="Help"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {!isCollapsed && "Help"}
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Fixed footer section */}
        <div className="p-4 border-t border-[var(--sidebar-border)]">
          {isCollapsed ? (
            <div className="flex justify-center">
              <div className="rounded-full bg-[var(--sidebar-primary)] p-1">
                <User className="h-4 w-4 text-[var(--sidebar-primary-foreground)]" />
              </div>
            </div>
          ) : (
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
          )}
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