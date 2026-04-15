import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TrendingUpIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  WalletIcon,
  CreditCardIcon,
  CircleDollarSignIcon,
  PrinterIcon,
  LogOutIcon,
  RefreshCwIcon,
} from "lucide-react";

export default function EndOfDay() {
  const [cashierName, setCashierName] = useState("");
  const [terminal, setTerminal] = useState("");

  return (
    <div className="p-3 md:p-4"> 
      {/* Header Section */}
      <Card className="mb-4 shadow-sm border">
        <CardContent className="p-3 md:p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"> 
          <div className="flex-1 min-w-0">
            <label htmlFor="cashierName" className="block text-xs font-medium text-muted-foreground mb-1">
               Name
            </label>
            <Input
              id="cashierName"
              value={cashierName}
              onChange={(e) => setCashierName(e.target.value)}
              className="text-base h-10 px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="terminal" className="block text-xs font-medium text-muted-foreground mb-1">
              Terminal
            </label>
            <Input
              id="terminal"
              value={terminal}
              onChange={(e) => setTerminal(e.target.value)}
              className="text-base h-10 px-3 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4"> 
        {/* Today's Sale */}
        <StatCard
          title="Today's Sale"
          value="₱12,450"
          change="-10%"
          icon={<TrendingUpIcon className="h-4 w-4 text-orange-600" />}
          iconBg="bg-orange-100"
          negative
        />
        {/* Transactions */}
        <StatCard
          title="Transactions"
          value="15"
          change="+20%"
          icon={<ShoppingBagIcon className="h-4 w-4 text-green-600" />}
          iconBg="bg-green-100"
        />
        {/* Avg Margin */}
        <StatCard
          title="Avg Margin"
          value="₱50,000"
          change="+41%"
          icon={<ChartBarIcon className="h-4 w-4 text-yellow-600" />}
          iconBg="bg-yellow-100"
        />
        {/* Gross Margin */}
        <StatCard
          title="Gross Margin"
          value="32%"
          change="-10%"
          icon={<WalletIcon className="h-4 w-4 text-purple-600" />}
          iconBg="bg-purple-100"
          negative
        />
        {/* Cash */}
        <StatCard
          title="Cash"
          value="₱75,000"
          change="-10%"
          icon={<CreditCardIcon className="h-4 w-4 text-emerald-600" />}
          iconBg="bg-emerald-100"
          negative
        />
        {/* GC */}
        <StatCard
          title="GC"
          value="₱2,000"
          change="-10%"
          icon={<CircleDollarSignIcon className="h-4 w-4 text-rose-600" />}
          iconBg="bg-rose-100"
          negative
        />
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-1"> 
        <Card className="shadow-sm border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Expenses Logged</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                <CircleDollarSignIcon className="size-4 text-blue-600" />
              </div>
              <span className="text-lg font-bold">₱1,200</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Cash Drop</CardTitle>
            <div className="text-xs text-red-600 mt-1">+10%</div>
          </CardHeader>
          <CardContent className="pt-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center">
                <PrinterIcon className="size-4 text-purple-600" />
              </div>
              <span className="text-lg font-bold">₱2,300</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-3">
        <Button variant="outline" size="sm" className="h-10 px-3 text-sm">
          <PrinterIcon className="mr-2 size-4" />
          Print Z Reading
        </Button>
        <Button variant="destructive" size="sm" className="h-10 px-3 text-sm">
          <LogOutIcon className="mr-2 size-4" />
          Logout Terminal
        </Button>
        <Button variant="destructive" size="sm" className="h-10 px-3 text-sm bg-green-600 hover:bg-green-700">
          <RefreshCwIcon className="mr-2 size-4" />
          Sync Now
        </Button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
  iconBg,
  negative,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  negative?: boolean;
}) {
  return (
    <Card className="shadow-sm border">
      <CardContent className="p-3 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-lg font-bold mt-1">{value}</p>
          <p className={`text-xs mt-1 ${negative ? "text-red-600" : "text-green-600"}`}>
            {change} vs Last Month
          </p>
        </div>
        <div className={`${iconBg} size-10 rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}