import { Button } from "~/components/ui/button";
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
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex justify-between items-center mb-6">
        <Link className="self-end" to="/tasks/new">
          <Button>Create New Task</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Tasks</CardTitle>
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
                  <TableCell>{task.status}</TableCell>
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
