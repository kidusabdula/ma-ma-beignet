"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  FileText,
  Settings,
  AlertCircle,
  Lock,
  User,
  ChevronDown,
  FileText as FileTextIcon,
  Receipt,
  BookOpen,
} from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);
  const [isManufacturingOpen, setIsManufacturingOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] dark">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)] flex flex-col">
        {/* Logo/Title */}
        <h2 className="text-2xl font-bold mb-8 px-2">Ma Ma Beignet</h2>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {/* General Section */}
          <div className="mb-6">
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
          <div className="mb-6">
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
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                >
                  <Users className="h-4 w-4" />
                  Human Resource
                </Button>
              </Link>
              <Link href="/crm">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                >
                  <User className="h-4 w-4" />
                  CRM
                </Button>
              </Link>
            </div>
          </div>

          {/* Users Section */}
          <div className="mb-6">
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
                  <Link href="/manufacturing" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Manufacturing
                  </Link>
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
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                      >
                        <Receipt className="h-4 w-4" />
                        Production Plan
                      </Button>
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
              <Link href="/order">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                >
                  <FileText className="h-4 w-4" />
                  Order Management
                </Button>
              </Link>
            </div>
          </div>

          {/* Pages Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
              Pages
            </h3>
            <div className="space-y-1">
              <Link href="/assets">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                >
                  <Lock className="h-4 w-4" />
                  Asset Management
                </Button>
              </Link>
              <Link href="/settings">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>

          {/* Other Section */}
          <div className="mb-6">
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

        {/* User Profile - Bottom */}
        <div className="mt-auto pt-4 border-t border-[var(--sidebar-border)]">
          <div className="flex items-center gap-2 px-2 py-2 rounded hover:bg-[var(--sidebar-accent)]">
            <div className="rounded-full bg-[var(--sidebar-primary)] p-1">
              <User className="h-4 w-4 text-[var(--sidebar-primary-foreground)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">ausrobdev</p>
              <p className="text-xs text-muted-foreground">
                robb@shadonblocks.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content with Header - Unchanged */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-[var(--card)] border-b border-[var(--border)] flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[var(--card-foreground)]">
            Dashboard
          </h1>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="text-[var(--card-foreground)] border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            >
              Past Performance
            </Button>
            <Button
              variant="outline"
              className="text-[var(--card-foreground)] border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            >
              Key Personnel
            </Button>
            <Button
              variant="outline"
              className="text-[var(--card-foreground)] border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            >
              Focus Documents
            </Button>
          </div>
        </header>
        <main className="p-6 overflow-auto text-[var(--foreground)]">
          {children}
        </main>
      </div>
    </div>
  );
}