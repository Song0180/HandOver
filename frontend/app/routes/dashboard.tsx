import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Link } from "react-router";
import { ArrowUpRight, Handshake, House, Siren } from "lucide-react";

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "in progress":
      return "outline";
    case "completed":
      return "default";
    case "blocked":
      return "destructive";
    case "todo":
      return "secondary";
    default:
      return "default";
  }
};

type VariantClassKey =
  | "in progress"
  | "completed"
  | "blocked"
  | "todo"
  | "default";

const variantClasses: Record<VariantClassKey, string> = {
  "in progress": "bg-blue-50 text-blue-700 border border-blue-300",
  completed: "bg-green-50 text-green-700 border border-green-300",
  blocked: "bg-red-50 text-red-700 border border-red-300 dark:bg-red-50",
  todo: "bg-gray-50 text-gray-700 border border-gray-300",
  default: "bg-white text-gray-700 border border-gray-200",
};

export default function Dashboard() {
  // TODO: Replace with actual data fetching
  const createdTasks = [
    {
      id: "1",
      title: "Fix login bug",
      assignee: "John Doe",
      status: "In Progress",
      links: ["JIRA-123", "DOC-456"],
    },
    {
      id: "2",
      title: "Update API docs",
      assignee: "Jane Smith",
      status: "Todo",
      links: ["DOC-789"],
    },
  ];

  const assignedTasks = [
    {
      id: "3",
      title: "Review PR #123",
      assignee: "Current User",
      status: "Todo",
      links: ["PR-123"],
    },
    {
      id: "4",
      title: "Deploy hotfix",
      assignee: "Current User",
      status: "Blocked",
      links: ["JIRA-456"],
    },
  ];

  return (
    <div className="container mx-auto">
      <Card className="@container/card bg-gradient-to-br from-pink-100/20 via-background to-orange-100/20 dark:from-pink-500/20 dark:to-orange-500/20 border-none mb-4">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <House className="h-4 w-4 text-primary" />
            Good morning
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tracking-tight @[250px]/card:text-3xl">
            Welcome back, User
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-md">
          <p>
            Ready for your next leave? Create a handover task to keep things
            moving smoothly.
          </p>
        </CardFooter>
      </Card>

      <div className="grid auto-rows-min gap-4 md:grid-cols-2 mb-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Tasks Requiring Action</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              3
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="text-destructive">
                <Siren />
                Needs attention
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Tasks blocked or waiting review
            </div>
            <div className="text-muted-foreground">2 blockers identified</div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Active Tasks</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              12
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Handshake />
                Team-wide
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Across all team members
            </div>
            <div className="text-muted-foreground">4 teams involved</div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Tasks Assigned to You</CardTitle>
            <Link className="self-end" to="/tasks">
              <Button size="sm">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(task.status)}
                        className={
                          variantClasses[
                            task.status.toLowerCase() as VariantClassKey
                          ] || variantClasses.default
                        }
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/tasks/${task.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Tasks Created by You</CardTitle>
            <Link className="self-end" to="/tasks">
              <Button size="sm">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {createdTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(task.status)}
                        className={
                          variantClasses[
                            task.status.toLowerCase() as VariantClassKey
                          ] || variantClasses.default
                        }
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/tasks/${task.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
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
