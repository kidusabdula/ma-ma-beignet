import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] dark">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)]">
        <h2 className="text-2xl font-bold mb-6">Ma Ma Beignet</h2>
        <nav className="space-y-2">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/accounting">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              Accounting
            </Button>
          </Link>
          <Link href="/hr">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              Human Resource
            </Button>
          </Link>
          <Link href="/crm">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              CRM
            </Button>
          </Link>
          <Link href="/manufacturing">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              Manufacturing
            </Button>
          </Link>
          <Link href="/order">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              Order Management
            </Button>
          </Link>
          <Link href="/assets">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              Asset Management
            </Button>
          </Link>
          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              Settings
            </Button>
          </Link>
          <Link href="/help">
            <Button
              variant="ghost"
              className="w-full justify-start mb-2 text-[var(--sidebar-foreground)] hover:text-[var(--sidebar-primary-foreground)] hover:bg-[var(--sidebar-accent)]"
            >
              Help
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content with Header */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-[var(--card)] border-b border-[var(--border)] flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[var(--card-foreground)]">Dashboard</h1>
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
        <main className="p-6 overflow-auto text-[var(--foreground)]">{children}</main>
      </div>
    </div>
  );
}