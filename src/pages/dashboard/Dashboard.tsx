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
  Utensils, // Added this import for the placeholder image
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
    // MAIN CONTAINER
    <div className="flex h-[calc(100vh-2rem)] w-full flex-col overflow-hidden rounded-xl bg-white p-4">
      
      <div className="flex-none mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Dashboard</h1>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      <div className="flex-none mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2 rounded-lg border border-black-100 bg-white-1000 p-2">
        <div className="flex items-center gap-2 text-yellow-700">
          <AlertTriangleIcon className="h-4 w-4" />
          <span className="font-medium text-xs md:text-sm">
            Unsynced Transactions: 3
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 text-[10px] md:text-xs bg-white">
                <CalendarIcon className="mr-2 h-3 w-3" />
                Last 7 days
                <ChevronDownIcon className="ml-2 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="destructive" size="sm" className="h-7 text-[10px] md:text-xs">Sync now</Button>
        </div>
      </div>

      <div className="flex-none mb-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {/* ROW 1 */}
            <StatCard
            title="Today's Sale"
            value="₱12,450"
            change="-10%"
            icon={<TrendingUpIcon className="h-4 w-4 text-orange-600" />}
            iconBg="bg-orange-100"
            negative
            />
            <StatCard
            title="Transactions"
            value="15"
            change="+20%"
            icon={<ShoppingBagIcon className="h-4 w-4 text-green-600" />}
            iconBg="bg-green-100"
            />
            <StatCard
            title="Avg Margin"
            value="₱50,000"
            change="+41%"
            icon={<ChartBarIcon className="h-4 w-4 text-yellow-600" />}
            iconBg="bg-yellow-100"
            />
            
            {/* ROW 2 */}
            <StatCard
            title="Gross Margin"
            value="32%"
            change="-10%"
            icon={<WalletIcon className="h-4 w-4 text-purple-600" />}
            iconBg="bg-purple-100"
            negative
            />
            <StatCard
            title="Cash"
            value="₱75,000"
            change="-10%"
            icon={<WalletIcon className="h-4 w-4 text-green-600" />}
            iconBg="bg-green-100"
            negative
            />
            <StatCard
            title="GC"
            value="₱2,000"
            change="-10%"
            icon={<ShoppingBagIcon className="h-4 w-4 text-red-600" />}
            iconBg="bg-red-100"
            negative
            />
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DishList title="Popular Dishes" type="popular" />
        <DishList title="Low on Stock Dishes" type="stock" />
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
      <CardContent className="p-3 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-base md:text-lg font-bold leading-none">{value}</div>
          <p className="text-[10px] font-medium text-muted-foreground uppercase">{title}</p>
          <div
            className={`text-[10px] font-semibold ${
              negative ? "text-red-600" : "text-green-600"
            }`}
          >
            {change} <span className="text-muted-foreground/60 font-normal">vs last month</span>
          </div>
        </div>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${iconBg}`}>
            {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function DishList({ title, type }: { title: string, type: 'popular' | 'stock' }) {
  const dishes = [
    { id: "001", name: "Chicken Parmesan", price: "55.00", status: "Low on stock", orders: 120, imageColor: "bg-orange-100 text-orange-600" },
    { id: "002", name: "Beef Burger", price: "65.00", status: "In Stock", orders: 95, imageColor: "bg-red-100 text-red-600" },
    { id: "003", name: "Spaghetti", price: "70.00", status: "Out of stock", orders: 88, imageColor: "bg-yellow-100 text-yellow-600" },
    { id: "004", name: "Fried Chicken", price: "50.00", status: "Low on stock", orders: 76, imageColor: "bg-amber-100 text-amber-600" },
    { id: "005", name: "Cheese Pizza", price: "80.00", status: "In Stock", orders: 65, imageColor: "bg-orange-100 text-orange-600" },
    { id: "006", name: "Carbonara", price: "75.00", status: "Low on stock", orders: 54, imageColor: "bg-yellow-100 text-yellow-600" },
    { id: "007", name: "Sisig", price: "120.00", status: "In Stock", orders: 40, imageColor: "bg-red-100 text-red-600" },
    { id: "008", name: "Halo-Halo", price: "85.00", status: "In Stock", orders: 35, imageColor: "bg-purple-100 text-purple-600" },
  ];

  return (
    <Card className="flex h-full flex-col overflow-hidden border shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-none flex-row items-center justify-between py-3 px-4 bg-white border-b sticky top-0 z-10">
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        <Button variant="ghost" size="sm" className="h-6 text-[10px] font-medium text-muted-foreground hover:text-primary">
          See All
        </Button>
      </CardHeader>

      {/* List Content */}
      <CardContent className="flex-1 overflow-y-auto p-0">
        <div className="divide-y divide-gray-100">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50/80 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {/* Image Placeholder */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${dish.imageColor}`}>
                  <Utensils className="h-5 w-5" />
                </div>
                
                {/* Name and ID */}
                <div>
                  <p className="text-xs font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {dish.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Dish ID: #{dish.id}
                  </p>
                </div>
              </div>

              {/* Right Side Info: Conditional Rendering based on type */}
              <div className="text-right">
                <div className="text-xs font-bold text-gray-900">₱{dish.price}</div>
                {type === 'stock' ? (
                   <Badge
                   variant="outline"
                   className={`mt-1 h-5 border-0 px-2 text-[10px] font-medium ${
                     dish.status === "In Stock"
                       ? "bg-green-50 text-green-700"
                       : dish.status === "Low on stock"
                       ? "bg-yellow-50 text-yellow-700"
                       : "bg-red-50 text-red-700"
                   }`}
                 >
                   {dish.status}
                 </Badge>
                ) : (
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {dish.orders} orders
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}