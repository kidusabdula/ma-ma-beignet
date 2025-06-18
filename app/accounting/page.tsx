import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockData = {
  totalSales: "$5,000.00",
  totalPurchases: "$2,500.00",
  totalJournalEntries: 10,
  bakeryStats: {
    dailySales: "$1,200.00",
    flourPurchases: "$800.00",
    cashBalance: "$3,000.00",
  },
};

export default function Accounting() {
  return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-[var(--card-foreground)]">
          Accounting Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sales Invoice Card */}
          <Card className="bg-[var(--card)] text-[var(--card-foreground)]">
            <CardHeader>
              <CardTitle>Sales Invoice</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Sales: {mockData.totalSales}</p>
              <p>Daily Bakery Sales: {mockData.bakeryStats.dailySales}</p>
              <Link href="/accounting/sales-invoice">
                <Button
                  variant="outline"
                  className="mt-2 border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                >
                  View Sales
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Purchase Invoice Card */}
          <Card className="bg-[var(--card)] text-[var(--card-foreground)]">
            <CardHeader>
              <CardTitle>Purchase Invoice</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Purchases: {mockData.totalPurchases}</p>
              <p>Flour Purchases: {mockData.bakeryStats.flourPurchases}</p>
              <Link href="/accounting/purchase-invoice">
                <Button
                  variant="outline"
                  className="mt-2 border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                >
                  View Purchases
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Journal Entry Card */}
          <Card className="bg-[var(--card)] text-[var(--card-foreground)]">
            <CardHeader>
              <CardTitle>Journal Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Entries: {mockData.totalJournalEntries}</p>
              <p>Cash Balance: {mockData.bakeryStats.cashBalance}</p>
              <Link href="/accounting/journal-entry">
                <Button
                  variant="outline"
                  className="mt-2 border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                >
                  View Entries
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}