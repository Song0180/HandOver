import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useParams, useNavigate } from "react-router";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: Replace with actual data fetching
  const task = {
    id,
    title: "Fix login bug",
    assignee: "John Doe",
    status: "In Progress",
    links: ["JIRA-123", "DOC-456"],
    description:
      "Investigate and fix the login issue where users are unable to authenticate.",
    context:
      "The login functionality has been experiencing issues since the last deployment. Users are reporting authentication failures.",
    actionables: [
      "Review the authentication flow in the codebase",
      "Check the API logs for error patterns",
      "Test the login flow in different environments",
      "Update error handling in the authentication middleware",
    ],
    workflow: [
      "Step 1: Review Jira ticket and gather requirements",
      "Step 2: Analyze the authentication flow",
      "Step 3: Identify the root cause",
      "Step 4: Implement the fix",
      "Step 5: Test in staging environment",
      "Step 6: Deploy to production",
    ],
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{task.title}</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold">Assignee</h3>
                <p>{task.assignee}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <p>{task.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">Links</h3>
                <div className="flex gap-2">
                  {task.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="context" className="w-full">
          <TabsList>
            <TabsTrigger value="context">Context</TabsTrigger>
            <TabsTrigger value="actionables">Actionables</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
          </TabsList>
          <TabsContent value="context">
            <Card>
              <CardHeader>
                <CardTitle>Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{task.context}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="actionables">
            <Card>
              <CardHeader>
                <CardTitle>Actionables</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {task.actionables.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="workflow">
            <Card>
              <CardHeader>
                <CardTitle>Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-6 space-y-2">
                  {task.workflow.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
