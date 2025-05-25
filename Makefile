REDIS_CONTAINER_NAME=redis-dev


start-backend:
	cd backend && \
	python3 -m venv venv && \
	source venv/bin/activate && \
	pip install -r requirements.txt && \
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

start-frontend:
	cd frontend && \
	npm install && \
	npm run dev


start-worker:
	cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python worker.py -f



# Mock

start-mock:
	cd mock_backend && \
	npm install && \
	node server.js
	
# Redis
start-local-redis:
	docker run -d --rm --name $(REDIS_CONTAINER_NAME) -p 6379:6379 redis:7

stop-local-redis:
	docker stop $(REDIS_CONTAINER_NAME)