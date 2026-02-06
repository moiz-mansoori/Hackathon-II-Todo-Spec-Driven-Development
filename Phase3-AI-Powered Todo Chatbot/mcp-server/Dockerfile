FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy server code
COPY server.py .

# Environment variables
ENV BACKEND_URL="http://backend-service:8888"

# Expose port (MCP server typically runs on 8000 by default in server mode)
EXPOSE 8000

# Command to run the FastMCP server
CMD ["python", "server.py"]
