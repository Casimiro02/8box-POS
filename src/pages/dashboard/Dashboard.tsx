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
    <div className="relative min-h-full w-full overflow-hidden rounded-xl bg-white p-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Pink diagonal */}
        <div className="absolute bottom-0 left-0 w-full h-[55%] bg-pink-200 skew-y-[-6deg] origin-bottom-left" />
        {/* Dark red accent */}
        <div className="absolute bottom-0 left-0 w-[35%] h-[12%] bg-red-700 skew-y-[-6deg]" />
      </div>

      {/*HEADER*/}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          {formattedDate}
        </p>
      </div>

      {/*ALERT BAR*/}
      <Card className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-600 px-3 py-2 rounded-md">
          <AlertTriangleIcon className="h-5 w-5" />
          <span className="font-medium text-sm">
            Unsynced Transactions: 3
          </span>
        </div>

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

          <Button variant="destructive">Sync now</Button>
        </div>
      </Card>

      {/*STATS GRID (ROW 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Today's Sale"
          value="₱12,450"
          change="-10%"
          icon={<TrendingUpIcon className="h-6 w-6 text-orange-600" />}
          iconBg="bg-orange-100"
          negative
        />
        <StatCard
          title="Transactions"
          value="15"
          change="+20%"
          icon={<ShoppingBagIcon className="h-6 w-6 text-green-600" />}
          iconBg="bg-green-100"
        />
        <StatCard
          title="Avg Margin"
          value="₱50,000"
          change="+41%"
          icon={<ChartBarIcon className="h-6 w-6 text-yellow-600" />}
          iconBg="bg-yellow-100"
        />
      </div>

      {/* STATS GRID (ROW 2)*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Gross Margin"
          value="32%"
          change="-10%"
          icon={<WalletIcon className="h-6 w-6 text-purple-600" />}
          iconBg="bg-purple-100"
          negative
        />
        <StatCard
          title="Cash"
          value="₱75,000"
          change="-10%"
          icon={<WalletIcon className="h-6 w-6 text-green-600" />}
          iconBg="bg-green-100"
          negative
        />
        <StatCard
          title="GC"
          value="₱2,000"
          change="-10%"
          icon={<ShoppingBagIcon className="h-6 w-6 text-red-600" />}
          iconBg="bg-red-100"
          negative
        />
      </div>

      {/*LISTS*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DishList title="Popular Dishes" />
        <DishList title="Low on Stock Dishes" />
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{title}</div>
          <div
            className={`text-xs ${
              negative ? "text-red-600" : "text-green-600"
            }`}
          >
            {change} vs Last Month
          </div>
        </div>
        <div className={`p-2 rounded-full ${iconBg}`}>{icon}</div>
      </CardContent>
    </Card>
  );
}

function DishList({ title }: { title: string }) {
  const dishes = [
    { name: "Chicken Parmesan", price: "55.00", status: "Low on stock" },
    { name: "Beef Burger", price: "65.00", status: "In Stock" },
    { name: "Spaghetti Bolognese", price: "70.00", status: "Out of stock" },
    { name: "Fried Chicken", price: "50.00", status: "Low on stock" },
    { name: "Cheese Pizza", price: "80.00", status: "In Stock" },
    { name: "Carbonara", price: "75.00", status: "Low on stock" },
  ];

  return (
    <Card className="flex flex-col">
      {/* Sticky Header */}
      <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="sm">
          See All
        </Button>
      </CardHeader>

      {/* Scrollable Content */}
      <CardContent className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <span className="font-medium">{dish.name}</span>

            <div className="text-right">
              <div className="text-sm font-semibold">₱{dish.price}</div>
              <Badge
                variant={
                  dish.status === "In Stock"
                    ? "default"
                    : dish.status === "Low on stock"
                    ? "secondary"
                    : "destructive"
                }
              >
                {dish.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
