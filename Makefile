start-backend:
	cd backend && \
	python3 -m venv venv && \
	source venv/bin/activate && \
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

start-frontend:
	cd frontend && \
	npm install && \
	npm run dev

start-mock:
	cd mock_backend && \
	npm install && \
	node server.js
	
start-worker:
	cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python worker.py

deploy-backend:
	cd backend && flyctl deploy
