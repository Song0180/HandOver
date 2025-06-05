import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Link } from "react-router";
import { Plus } from "lucide-react";

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

export default function Tasks() {
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
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Active Tasks</CardTitle>
          <Link className="self-end" to="/tasks/new">
            <Button>
              <Plus />
              Create New Task
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
