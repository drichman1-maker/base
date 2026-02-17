// @ts-nocheck
"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockData = [
    { date: 'Jan 24', price: 1200 },
    { date: 'Feb 24', price: 1150 },
    { date: 'Mar 24', price: 1300 },
    { date: 'Apr 24', price: 1250 },
    { date: 'May 24', price: 1400 },
    { date: 'Jun 24', price: 1350 },
    { date: 'Jul 24', price: 1500 },
    { date: 'Aug 24', price: 1550 },
    { date: 'Sep 24', price: 1480 },
    { date: 'Oct 24', price: 1600 },
]

export function PriceHistoryChart() {
    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Price History (PSA 10)</CardTitle>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="cursor-pointer bg-primary/10">1Y</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">3Y</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">All</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                }}
                                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                                itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                                formatter={(value: number) => [`$${value}`, "Price"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="hsl(var(--primary))"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
