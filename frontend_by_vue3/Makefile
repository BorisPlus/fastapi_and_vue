install:
	cd src/project/ && npm install && npm install -D orval @vue/tsconfig

listen:
	@printf "Go to:\033[32m\n\thttp://localhost:5173\033[0m\n"
	@printf "And CTRL+C for shutting down"
	cd src/project/ && npm run dev

install_httponly_cookies:
	cd src/project_httponly_cookies/ && npm install && npm install -D orval @vue/tsconfig

listen_httponly_cookies:
	@printf "Go to:\033[32m\n\thttp://localhost:5173\033[0m\n"
	@printf "And CTRL+C for shutting down"
	cd src/project_httponly_cookies/ && npm run dev

.PHONY: install listen listen_httponly_cookies
