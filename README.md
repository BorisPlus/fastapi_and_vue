# FULLSTACK-пример

Шаблон для проектов `FastAPI`+`Vue3` с авторизацией:

* `FastAPI`-приложение на базе https://fastapi.tiangolo.com/tutorial/response-model/.
* `Vue3`-приложение c `Orval` и интеграцией `Vue-Query` для автогенерации кода для запросов по `OpenApi`-спецификации от `FastAPI`.

Компоненты реализованы независимо, но на странице обновляют друг друга динамически:

* добавление данных в базу вызывает обновление выборки данных;
* при прохождении авторизации элемент "Login" меняется на "Logout" (и обратно).

Позиции `Items` доступны без авторизации, сообщения `Messages` - только с авторизацией.

__Замечание__: Учетная запись для проверок `admin`/`secret`.

## Вариант JWT в заголовке

Вариант подходит для реализации веб-приложений с нативным `RestAPI`, но "уязвим" к атакам на `LocalStorage`, где хранится `Token`.

### BACKEND

```shell
cd backend_by_fastapi
make venv 
source venv/bin/activate
make listen 
deactivate 
```

### FRONTEND

```shell
cd frontend_by_vue3
make install 
make listen 
```

## Вариант JWT в Cookies

Вариант подходит для реализации веб-приложений с `Cookies`, но тогда для интеграции с `RestAPI` у клиента необходима поддержка `Cookies`.

### BACKEND

```shell
cd backend_by_fastapi
make venv 
source venv/bin/activate
make listen_httponly_cookies 
deactivate 
```

### FRONTEND

```shell
cd frontend_by_vue3
make install_httponly_cookies
make listen_httponly_cookies
```

## Рабочие заметки

```shell
sudo apt install nodejs npm
```

```bash
npm create vue@latest project -- --typescript --router --pinia --prettier --bare
```

```bash
npm install -D @vue/tsconfig
```

```bash
npm run download:api
npx orval
npx --clear-cache orval
npm exec orval
npm run format
```
