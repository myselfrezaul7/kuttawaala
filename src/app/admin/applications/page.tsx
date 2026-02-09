"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";

const applications = [
    { id: 1, applicant: "Rahim Ahmed", dog: "Balu", status: "pending", date: "2023-10-25" },
    { id: 2, applicant: "Sarah Khan", dog: "Lali", status: "approved", date: "2023-10-24" },
    { id: 3, applicant: "Kazi Islam", dog: "Tiger", status: "rejected", date: "2023-10-23" },
    { id: 4, applicant: "Nadia H.", dog: "Snowy", status: "pending", date: "2023-10-22" },
    { id: 5, applicant: "Tanvir Hasan", dog: "Balu", status: "approved", date: "2023-10-21" },
];

export default function ApplicationsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-heading">Adoption Applications</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Dog</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.applicant}</TableCell>
                                    <TableCell>{app.dog}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            app.status === 'approved' ? 'default' : // default is primary/greenish usually or black
                                                app.status === 'rejected' ? 'destructive' : 'secondary'
                                        } className={
                                            app.status === 'approved' ? 'bg-green-500 hover:bg-green-600' :
                                                app.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''
                                        }>
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{app.date}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="ghost" title="View Details">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            {app.status === 'pending' && (
                                                <>
                                                    <Button size="icon" variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50" title="Approve">
                                                        <Check className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" title="Reject">
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
