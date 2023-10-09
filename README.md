откройте два терминала, один для запуска Frontend, другой для запуска Backend

## для работы Frontend требуется запустить Backend 
перейдите в папку backend (FL-B в архиве релиза) 
выполните команду
```bash
docker-compose up build
docker-compose up
```
последовательно  выполните команды для популяции базы данных
```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser --email <email> --username <username>

```
откройте браузер и перейдите по адресу http://localhost:8000/admin и введите логин и пароль созданного пользователя администратора
создайте пользователя для тестирования приложения с помощью веб интерфейса задав ему email и password под которым он будет пользоваться приложением Frontend

## Frontend docker image
в другом терминале перейдите в папку frontend (FL-F в архиве релиза)
создайте контейнер и запустите его
```bash
docker build -t firstliners-frontend-dev .
docker run -p 3000:3000 -d firstliners-frontend-dev
```
проверить, что контейнер запущен
```bash
docker ps
```
вывод команды - это список container_id запущенных контейнеров, в котором нужно найти контейнер с именем nextjs13-firstliners-frontend-dev 

проверить, что приложение доступно по адресу http://localhost:3000
откройте браузер и перейдите по адресу http://localhost:3000 

остановить контейнер
```bash
docker stop <container_id>
```
или cntrl+c в терминале, где запущен контейнер
