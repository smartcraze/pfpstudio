import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { User } from "@/models/User";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { Coins, History, User as UserIcon, CreditCard } from "lucide-react";
import Image from "next/image";

async function getDashboardData(userId: string) {
    await dbConnect();

    const user = await User.findById(userId);
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

    const totalSpent = transactions.reduce((acc, curr) => acc + (curr.status === "success" ? curr.amount : 0), 0);
    const totalCreditsPurchased = transactions.reduce((acc, curr) => acc + (curr.status === "success" ? curr.credits : 0), 0);

    return {
        user,
        transactions: JSON.parse(JSON.stringify(transactions)), // Serialize for client components if passed
        stats: {
            credits: user?.credits || 0,
            totalSpent,
            totalCreditsPurchased
        }
    };
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/");
    }

    // @ts-ignore
    const { user, transactions, stats } = await getDashboardData(session.user.id);

    return (
        <div className="container mx-auto p-6 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your account and view your history.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full border border-border/50">
                        {session.user.image ? (
                            <Image
                                src={session.user.image}
                                alt={session.user.name || "User"}
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                        ) : (
                            <UserIcon className="h-8 w-8 p-1 bg-amber-100 rounded-full text-amber-600" />
                        )}
                        <span className="font-medium text-sm">{session.user.name}</span>
                    </div>
                    <LogoutButton />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Available Credits
                        </CardTitle>
                        <Coins className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.credits}</div>
                        <p className="text-xs text-muted-foreground">
                            Tokens ready to use
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Spent
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{stats.totalSpent}</div>
                        <p className="text-xs text-muted-foreground">
                            Lifetime spend on platform
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Credits Purchased
                        </CardTitle>
                        <History className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalCreditsPurchased}</div>
                        <p className="text-xs text-muted-foreground">
                            Lifetime total tokens
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Transactions Table */}
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>
                        View all your recent transactions and credit purchases.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {transactions.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Credits</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((t: any) => (
                                    <TableRow key={t._id}>
                                        <TableCell>{new Date(t.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">{t.orderId}</TableCell>
                                        <TableCell>+{t.credits}</TableCell>
                                        <TableCell>₹{t.amount}</TableCell>
                                        <TableCell>
                                            <Badge variant={t.status === "success" ? "default" : t.status === "pending" ? "secondary" : "destructive"}>
                                                {t.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            No transactions found.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
