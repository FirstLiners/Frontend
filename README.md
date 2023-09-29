
## Frontend docker image

убедится, что env.local на верхнем уровне проекта содержит переменные окружения для фронтенда

сбилдить образ
```bash
docker build -t nextjs13-firstliners-frontend-dev . 
````
запустить контейнер
```bash
docker run -p 3000:3000 -d nextjs13-firstliners-frontend-dev
```
проверить, что контейнер запущен
```bash
docker ps
```
вывод команды - это список container_id запущенных контейнеров, в котором нужно найти контейнер с именем nextjs13-firstliners-frontend-dev 

проверить, что приложение доступно по адресу http://localhost:3000

остановить контейнер
```bash
docker stop <container_id>
```

