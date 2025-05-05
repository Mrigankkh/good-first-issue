# Dockerfile

FROM python:3.11-slim

WORKDIR /app

# Copy all files
COPY . /app

# Install Python deps
RUN pip install --no-cache-dir -r requirements.txt

# Start FastAPI via Uvicorn
#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
