"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { AddOfferDialog } from "@/components/offers/add-offer-dialog";
import { OffersTable } from "@/components/offers/offers-table";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const revenueData = [
    { month: "Jan", revenue: 4000, target: 5000 },
    { month: "Feb", revenue: 3000, target: 5000 },
    { month: "Mar", revenue: 2000, target: 5000 },
    { month: "Apr", revenue: 2780, target: 5000 },
    { month: "May", revenue: 1890, target: 5000 },
    { month: "Jun", revenue: 2390, target: 5000 },
  ];

  const leadsData = [
    { week: "Week 1", hot: 12, warm: 19, cold: 7 },
    { week: "Week 2", hot: 15, warm: 21, cold: 8 },
    { week: "Week 3", hot: 18, warm: 25, cold: 10 },
    { week: "Week 4", hot: 22, warm: 28, cold: 12 },
  ];

  const conversionData = [
    { name: "Converted", value: 35 },
    { name: "In Progress", value: 42 },
    { name: "Not Converted", value: 23 },
  ];

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
  ];

  const metrics = [
    { title: "Total Leads", value: "247", icon: Users, change: "+12.5%" },
    { title: "Active Offers", value: "8", icon: Target, change: "+2" },
    { title: "Conversion Rate", value: "35%", icon: TrendingUp, change: "+4.2%" },
    { title: "Total Revenue", value: "$45.2K", icon: DollarSign, change: "+8.1%" },
  ];

  return (
    // FIX: Added responsive horizontal padding for better spacing on all devices
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome back!
          </h2>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what’s happening with your business
          </p>
        </div>
        <Button className="w-full md:w-auto" onClick={() => setOpen(true)}>
          + Add Offer
        </Button>
      </div>

      {/* Add Offer Dialog */}
      <AddOfferDialog
        open={open}
        onOpenChange={setOpen}
        onOfferAdded={() => setRefreshKey((prev) => prev + 1)}
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-xl md:text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {metric.change}
                    </p>
                  </div>
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                target: { label: "Target", color: "hsl(var(--chart-2))" },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="var(--color-target)"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                converted: { label: "Converted", color: "hsl(var(--chart-1))" },
                progress: { label: "In Progress", color: "hsl(var(--chart-2))" },
                notConverted: {
                  label: "Not Converted",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    // FIX: Removed the 'label' prop to prevent overlapping text on mobile
                    labelLine={false} // FIX: Removed the line pointing to the label
                    outerRadius="80%"
                    dataKey="value"
                  >
                    {conversionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {/* FIX: Added a Legend to display labels clearly below the chart */}
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Leads Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Leads by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              hot: { label: "Hot", color: "hsl(var(--chart-1))" },
              warm: { label: "Warm", color: "hsl(var(--chart-2))" },
              cold: { label: "Cold", color: "hsl(var(--chart-3))" },
            }}
            className="h-[250px] sm:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="hot" fill="var(--color-hot)" />
                <Bar dataKey="warm" fill="var(--color-warm)" />
                <Bar dataKey="cold" fill="var(--color-cold)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Offers Table */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Your Offers</CardTitle>
          </CardHeader>
          <CardContent>
            {/*
              FIX: Added a wrapper div with 'overflow-x-auto'.
              This makes the table scrollable horizontally on small screens
              without breaking the entire page layout. This is the
              most important fix for responsive tables.
            */}
            <div className="overflow-x-auto">
              <OffersTable key={refreshKey} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
