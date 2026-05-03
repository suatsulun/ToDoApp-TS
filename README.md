# ToDoApp

An advanced full-stack To-Do app with family system integration. 


## Stack

- Frontend: React + TypeScript + Vite + Tailwind + shadcn/ui
- Backend: FastAPI + SQLAlchemy
- Database: PostgreSQL

## Features

- **Authentication & accounts** — Uses JWTs for authentication
- **Todo management** — You can add, remove or edit ToDos.
- **Filtering, sorting & pagination** — You can filter, sort and paginate the list of ToDos. Pagination is customizable as well.
- **Family system** — It has an integrated family system. You can create or delete families and invite people to join them.
- **Shared family todos** — Families share all the ToDos. You can view every ToDo created by your family members with creators name attached to it. You cannot edit or remove them however. 
- **Modern UI & theming** — Uses shadcn ui components for a modern look.



## Run locally with Docker

Requires [Docker](https://www.docker.com/) with the Compose plugin.

```bash
git clone https://github.com/suatsulun/ToDoApp-TS.git
cd ToDoApp-TS

cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

docker compose up --build
```

Then open **http://localhost:5173** in your browser.

The stack:
- **Frontend** — Vite preview on port `5173`
- **Backend** — FastAPI on port `8000` (Swagger docs at `/docs`)
- **Database** — Postgres on port `5432`

To stop everything and wipe the database volume:

```bash
docker compose down -v
```

## Project structure

```
ToDoApp-TS/
├── backend/                         FastAPI service
│   ├── main.py                      Routes
│   ├── auth.py                      Login / register / JWT
│   ├── models.py                    SQLAlchemy models
│   ├── schemas.py                   Pydantic schemas
│   ├── database.py                  DB engine + session
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                        React + Vite + Tailwind app
│   ├── src/
│   │   ├── pages/                   Dashboard, Login, Register, Settings
│   │   ├── components/
│   │   │   ├── todos/               List, card, filter, pagination
│   │   │   ├── profile/             Profile, password, family tabs
│   │   │   ├── auth/                Route guards
│   │   │   ├── hooks/               useAuth, useTodos, useFamily
│   │   │   └── ui/                  shadcn/ui primitives
│   │   ├── context/                 AuthContext
│   │   ├── lib/                     utils, status colors
│   │   ├── types/                   Shared TS types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── functions/api/[[path]].js    Cloudflare Pages proxy → Render
│   ├── public/                      Static assets, _redirects
│   ├── index.html
│   ├── vite.config.ts
│   └── Dockerfile
│
└── docker-compose.yml               Local dev stack (db + backend + frontend)
```



## License

Released under the [MIT License](LICENSE).
