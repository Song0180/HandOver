.PHONY: run lint db-upgrade db-downgrade help

# Development server
run:
	uv run fastapi dev app/main.py

lint:
	uv run ruff check app --fix

# Database upgrade (apply latest migrations)
db-upgrade:
	uv run alembic upgrade head

# Database downgrade (rollback one migration)
db-downgrade:
	uv run alembic downgrade -1

# Show available commands
help:
	@echo "Available commands:"
	@echo "  run         - Start the development server"
	@echo "  db-upgrade  - Apply latest database migrations"
	@echo "  db-downgrade - Rollback one database migration"
	@echo "  help        - Show this help message"