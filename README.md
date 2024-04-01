# UFC Autobots 

## Tecnologias usuadas 

- Nextjs
- Typescript
- TailwindCSs
- Django 
- Celery

## Como rodar a aplicação 

- Clone o repositorio e entre na pasta

```
git clone https://github.com/marciocorreia/ufc_autobots.git
cd ufc_autobots/next-django-api
```

- Instale as dependencias 

```
npm install
```

- Adicione o arquivo .env no frontend (copie .env.example)

- Adicione o arquivo .env no backend (copie .env.example)

- Buildar e inicializar os containers

```
cd backend/ 
docker compose build
docker compose up
```

- Entre no container e crie um usuario admin 
```
docker exec -it backend-api-1 sh 
python manage.py createsuperuser 
# user: admin
# password: 12345
```

- Inicialize a seed do banco de dados 
```
python manage.py shell
# dentro do shell 
exec(open("./database_seed.py").read())
```

- Rode o servidor de testes
```
npm run dev
```
