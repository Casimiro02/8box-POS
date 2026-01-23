// src/pages/dashboard/Dashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
  WalletIcon,
  AlertTriangleIcon,
  ChevronDownIcon,
} from "lucide-react";

// For date formatting without date-fns
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

export default function Dashboard() {
  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <div className="relative flex flex-col gap-4 p-4 md:p-6 w-full h-full bg-gray-50">
      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[40%] h-[50%] bg-gradient-to-br from-pink-100 to-pink-200 opacity-30 rounded-bl-3xl"
          style={{
            clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-red-700 opacity-10 rotate-[-15deg] rounded-tl-3xl"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
          }}
        />
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">{formattedDate}</p>
      </div>

      {/* Unified Action Card: Unsynced + Filter + Sync */}
      <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 mb-6">
        {/* Left: Unsynced Transactions */}
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-600 px-3 py-2 rounded-md">
          <AlertTriangleIcon className="h-5 w-5" />
          <span className="font-medium text-sm">Unsynced Transactions: 3</span>
        </div>

        {/* Right: Filter + Sync Button */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Last 7 days</span>
                <ChevronDownIcon className="h-4 w-4 sm:hidden" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>This month</DropdownMenuItem>
              <DropdownMenuItem>Last month</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="destructive" className="px-4 py-2">
            Sync now
          </Button>
        </div>
      </Card>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Today's Sale */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold">₱12,450</div>
              <div className="text-xs text-muted-foreground">Today's Sale</div>
              <div className="text-xs text-red-600">-10% vs Last Month</div>
            </div>
            <div className="bg-orange-100 p-2 rounded-full">
              <TrendingUpIcon className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold">15</div>
              <div className="text-xs text-muted-foreground">Transactions</div>
              <div className="text-xs text-green-600">+20% vs Last Month</div>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <ShoppingBagIcon className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Margin */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold">₱50,000</div>
              <div className="text-xs text-muted-foreground">Avg Margin:</div>
              <div className="text-xs text-green-600">+41% vs Last Month</div>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <ChartBarIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Gross Margin */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold">32%</div>
              <div className="text-xs text-muted-foreground">Gross Margin</div>
              <div className="text-xs text-red-600">-10% vs Last Month</div>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <WalletIcon className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* Cash */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold">₱75,000</div>
              <div className="text-xs text-muted-foreground">Cash</div>
              <div className="text-xs text-red-600">-10% vs Last Month</div>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <WalletIcon className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* GC */}
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold">₱2,000</div>
              <div className="text-xs text-muted-foreground">GC</div>
              <div className="text-xs text-red-600">-10% vs Last Month</div>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <ShoppingBagIcon className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular & Low Stock Dishes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Popular Dishes */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Popular Dishes</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
              {[
                { name: "Chicken Parmesan", serving: "01 person", price: "55.00", status: "Low on stock" },
                { name: "Beef Burger", serving: "01 person", price: "65.00", status: "In Stock" },
                { name: "Spaghetti Bolognese", serving: "01 person", price: "70.00", status: "Low on stock" },
                { name: "Grilled Salmon", serving: "01 person", price: "95.00", status: "In Stock" },
                { name: "Caesar Salad", serving: "01 person", price: "45.00", status: "Out of stock" },
                { name: "Mango Smoothie", serving: "01 glass", price: "35.00", status: "In Stock" },
              ].map((dish, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img
                    src="https://via.placeholder.com/40"
                    alt={dish.name}
                    className="w-10 h-10 rounded-md"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm md:text-base">{dish.name}</div>
                    <div className="text-xs text-muted-foreground">Serving: {dish.serving}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm md:text-base">₱{dish.price}</div>
                    <Badge
                      variant={
                        dish.status === "In Stock"
                          ? "default"
                          : dish.status === "Low on stock"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {dish.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low on Stock Dishes */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Low on Stock Dishes</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">See All</Button>
          </CardHeader>
          <CardContent>
            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
              {[
                { name: "Chicken Parmesan", order: "x1", price: "55.00", status: "Low on stock" },
                { name: "Beef Burger", order: "x3", price: "65.00", status: "Low on stock" },
                { name: "Spaghetti Bolognese", order: "x2", price: "70.00", status: "Out of stock" },
                { name: "Grilled Salmon", order: "x1", price: "95.00", status: "In Stock" },
                { name: "Caesar Salad", order: "x4", price: "45.00", status: "Out of stock" },
                { name: "Mango Smoothie", order: "x2", price: "35.00", status: "In Stock" },
              ].map((dish, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img
                    src="https://via.placeholder.com/40"
                    alt={dish.name}
                    className="w-10 h-10 rounded-md"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm md:text-base">{dish.name}</div>
                    <div className="text-xs text-muted-foreground">Order: {dish.order}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm md:text-base">₱{dish.price}</div>
                    <Badge
                      variant={
                        dish.status === "In Stock"
                          ? "default"
                          : dish.status === "Low on stock"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {dish.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}