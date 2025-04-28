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

start-mock:
	cd mock_backend && \
	npm install && \
	node server.js

run-local:
	make start-backend & \
	make start-frontend & \

