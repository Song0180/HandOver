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
import {
  ArrowUpRight,
  Handshake,
  LoaderCircle,
  Siren,
  TrendingUp,
} from "lucide-react";

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
  blocked: "bg-red-50 text-red-700 border border-red-300",
  todo: "bg-gray-50 text-gray-700 border border-gray-300",
  default: "bg-white text-gray-700 border border-gray-200",
};

export default function Dashboard() {
  // TODO: Replace with actual data fetching
  const tasks = [
    {
      id: "1",
      title: "Fix login bug",
      assignee: "John Doe",
      status: "In Progress",
      links: ["JIRA-123", "DOC-456"],
    },
  ];

  return (
    <div className="container mx-auto pb-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {}</h1>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Tasks Assigned to You</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              5
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <LoaderCircle className="mr-1 animate-spin" />2 in progress
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              3 tasks pending review
            </div>
            <div className="text-muted-foreground">Updated just now</div>
          </CardFooter>
        </Card>

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

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Active Tasks</CardTitle>
          <Link className="self-end" to="/tasks">
            <Button>
              <ArrowUpRight />
              View All Tasks
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
              {tasks.map((task) => (
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
  );
}
