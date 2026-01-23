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
      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Bottom Left Red Shape */}
        <div
          className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-red-700 opacity-20 rotate-[-15deg] rounded-tl-3xl"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
          }}
        />
        {/* Top Right Pink Gradient */}
        <div
          className="absolute top-0 right-0 w-[40%] h-[50%] bg-gradient-to-br from-pink-100 to-pink-200 opacity-30 rounded-bl-3xl"
          style={{
            clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>

      {/* Header - Responsive */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">{formattedDate}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded-md">
            <AlertTriangleIcon className="h-5 w-5" />
            <span className="text-sm">Unsynced Transactions: 3</span>
          </div>

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

          <Button variant="destructive" className="w-full sm:w-auto">
            Sync now
          </Button>
        </div>
      </div>

      {/* Stats Cards - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Today's Sale */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Today's Sale</CardTitle>
              <p className="text-xs text-muted-foreground">-10% vs Last Month</p>
            </div>
            <div className="bg-orange-100 p-2 rounded-full">
              <TrendingUpIcon className="h-6 w-6 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">₱12,450</div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <p className="text-xs text-muted-foreground">+20% vs Last Month</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <ShoppingBagIcon className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">15</div>
          </CardContent>
        </Card>

        {/* Avg Margin */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Avg Margin:</CardTitle>
              <p className="text-xs text-muted-foreground">+41% vs Last Month</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <ChartBarIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">₱50,000</div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row Stats - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Gross Margin */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Gross Margin</CardTitle>
              <p className="text-xs text-muted-foreground">-10% vs Last Month</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <WalletIcon className="h-6 w-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">32%</div>
          </CardContent>
        </Card>

        {/* Cash */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Cash</CardTitle>
              <p className="text-xs text-muted-foreground">-10% vs Last Month</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <WalletIcon className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">₱75,000</div>
          </CardContent>
        </Card>

        {/* GC */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-sm font-medium">GC</CardTitle>
              <p className="text-xs text-muted-foreground">-10% vs Last Month</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <ShoppingBagIcon className="h-6 w-6 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">₱2,000</div>
          </CardContent>
        </Card>
      </div>

      {/* Popular and Low Stock Dishes - Responsive */}
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