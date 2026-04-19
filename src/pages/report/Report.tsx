import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  DollarSign,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// SAMPLE DATA 

const salesData = [
  { name: 'Mon', total: 1100 },
  { name: 'Tue', total: 2000 },
  { name: 'Wed', total: 1700 },
  { name: 'Thu', total: 2500 },
  { name: 'Fri', total: 3400 },
  { name: 'Sat', total: 4200 },
  { name: 'Sun', total: 3600 },
];

const recentSales = [
  {
    id: "ORD-001",
    date: "2023-10-25",
    customer: "Liam Johnson",
    status: "Completed",
    method: "Credit Card",
    amount: "₱1,250.00",
  },
  {
    id: "ORD-002",
    date: "2023-10-25",
    customer: "Olivia Smith",
    status: "Pending",
    method: "GCash",
    amount: "₱450.50",
  },
  {
    id: "ORD-003",
    date: "2023-10-24",
    customer: "Noah Williams",
    status: "Completed",
    method: "Cash",
    amount: "₱3,200.00",
  },
  {
    id: "ORD-004",
    date: "2023-10-24",
    customer: "Emma Brown",
    status: "Failed",
    method: "Credit Card",
    amount: "₱850.00",
  },
  {
    id: "ORD-005",
    date: "2023-10-23",
    customer: "Ava Jones",
    status: "Completed",
    method: "GCash",
    amount: "₱2,100.00",
  },
   {
    id: "ORD-006",
    date: "2023-10-23",
    customer: "Sophia Garcia",
    status: "Completed",
    method: "Cash",
    amount: "₱1,800.00",
  },
  {
    id: "ORD-007",
    date: "2023-10-22",
    customer: "Isabella Miller",
    status: "Completed",
    method: "Credit Card",
    amount: "₱2,500.00",
  },
   {
    id: "ORD-008",
    date: "2023-10-22",
    customer: "Mia Davis",
    status: "Completed",
    method: "Cash",
    amount: "₱950.00",
  },
];

export default function Reports() {
  return (
    // MAIN CONTAINER
    <div className="flex h-[calc(100vh-2rem)] w-full flex-col gap-4 overflow-hidden p-4">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-none items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-sm text-muted-foreground">
            Overview of your sales performance and transactions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date Filter Simulation */}
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <CalendarIcon className="mr-2 h-4 w-4" />
            This Month
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Separator className="flex-none" />

      {/* KPI CARDS SECTION */}
      <div className="grid flex-none gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱850.00</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid flex-1 min-h-0 gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        <Card className="col-span-4 flex flex-col overflow-hidden">
          <CardHeader className="flex-none">
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>
              Daily sales performance for the current week.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pl-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs text-muted-foreground"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₱${value}`}
                  className="text-xs text-muted-foreground"
                />
                <Tooltip
                 content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Sales
                              </span>
                              <span className="font-bold text-muted-foreground">
                                ₱{payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area type="monotone" dataKey="total" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 flex flex-col overflow-hidden">
          <CardHeader className="flex-none flex-row items-center justify-between space-y-0">
            <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs">View All</Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-auto p-0">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>
                        <Badge
                            variant={sale.status === 'Completed' ? 'default' : sale.status === 'Pending' ? 'secondary' : 'destructive'}
                            className={`
                                ${sale.status === 'Completed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                                ${sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : ''}
                                ${sale.status === 'Failed' ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                                border-0 font-medium
                            `}
                        >
                        {sale.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{sale.method}</TableCell>
                    <TableCell className="text-right font-bold">{sale.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}