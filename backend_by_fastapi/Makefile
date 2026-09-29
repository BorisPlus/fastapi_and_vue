PYTHON = python3.11
PIP = venv/bin/pip3

venv:
	$(PYTHON) -m venv venv
	$(PIP) install -r src/requirements.txt
	@printf "Run for activate venv:\033[32m\n\tsource venv/bin/activate\033[0m\n" # Зелен
	@printf "Run for deactivate venv:\033[32m\n\tdeactivate\033[0m\n" # Зелен

requirements:
	$(PIP) install -r src/requirements.txt

listen:
	@printf "Go to:\033[32m\n\thttp://localhost:8100/docs\033[0m\n"
	@printf "And CTRL+C for shutting down"
	uvicorn src.project.main:app --reload --port 8100

listen_httponly_cookies:
	@printf "Go to:\033[32m\n\thttp://localhost:8100/docs\033[0m\n"
	@printf "And CTRL+C for shutting down"
	uvicorn src.project_httponly_cookies.main:app --reload --port 8100

.PHONY: venv requirements listen listen_httponly_cookies
