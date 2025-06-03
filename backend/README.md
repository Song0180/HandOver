# Handover Backend

This is the backend service for the Handover application.

## Project Structure

```text
backend/
├── cmd/        # Application entry points
├── internal/   # Private application code
├── pkg/        # Public libraries that can be used by external applications
├── main.go     # Main application entry point
└── go.mod      # Go module definition
```

## Getting Started

1. Make sure you have Go installed (version 1.16 or later recommended)
2. Run the server:

   ```bash
   go run main.go
   ```

3. The server will start on port 8080

## Development

- Use `go mod tidy` to manage dependencies
- Follow Go best practices and standard project layout
