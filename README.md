
[![auto-format](https://github.com/FirstLiners/Frontend/actions/workflows/autoformat_on_pull_req.yml/badge.svg)](https://github.com/FirstLiners/Frontend/actions/workflows/autoformat_on_pull_req.yml)

# Фронтенд веб-приложения Hackathon Lenta

## Описание:
Веб приложение проекта по созданию предсказательной модели и интерфейса по прогнозированию спроса на товары заказчика собственного производства ООО “Лента”.

## Технологии:
- NextJS 13.5
- React 18.2
- Redux Toolkit/RTK Query
- Axios
- Recharts  
- Tailwindcss 
- Shadcn-ui  

## Для разработчиков:
```bash
gh repo clone FirstLiners/Frontend
cd Frontend ; pnpm install
pnpm run dev
```

#### Пример файла с переменными среды:
".example.env.local"

#### Линтер:
- eslint

#### Форматер:
- prettier

## Запуск приложения вне среды разработки:

Скачайте последний доступный [релиз](https://github.com/FirstLiners/Frontend/releases) распакуйте архив zip

Для запуска приложения необходим `Docker`. Для операционной системы Windows необходимо установить и активировать WSL2 (https://docs.docker.com/desktop/wsl/).

## для работы Frontend требуется сначала запустить Backend (также информация о запуске доступна на странице https://github.com/FirstLiners/Backend) 

откройте два терминала, один для запуска Frontend, другой для запуска Backend
перейдите в папку backend (FL-B FL-B в архиве релиза)
выполните команду

```команды для настройки проекта
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py collectstatic --noinput
docker-compose exec backend python manage.py createsuperuser
```

Для загрузки данных необходимо выполнить следующие команды:
Загрузка данных о товарной иерархии:
```
docker-compose exec backend python manage.py import_skus
```
Загрузка данных о магазинах:
```
docker-compose exec backend python manage.py import_stores
```
Загрузка исторических данных о продажах:
```
docker-compose exec backend python manage.py import_sales
```
Загрузка уникальных пар товар-магазин:
```
docker-compose exec backend python manage.py upload_pairs

```

Авторизация пользователей веб-приложения происходит на backend, стартовав докер при первом запуске нужно выполнить команду создания администратора Джанго:

```bash
docker-compose exec backend python manage.py createsuperuser --email <email> --username <username>

```
далее, 
откройте браузер и перейдите по адресу http://localhost:8000/admin и введите логин и пароль созданного пользователя администратора
создайте пользователя для веб-приложения с помощью веб интерфейса укажите email и password под которым он будет пользоваться веб-приложением Frontend

## Запуск Frontend docker image
в другом терминале перейдите в папку frontend (FL-F FL-B в архиве релиза)
установите зависимости node_modules

```bash
pnpm install
``` 
создайте контейнер и запустите его

```bash
docker build -t firstliners-frontend-dev .
docker run -p 3000:3000 -d firstliners-frontend-dev
```
проверить, что контейнер запущен
```bash
docker ps
```
вывод команды - это список container_id запущенных контейнеров, в котором можно увидеть контейнер с именем nextjs13-firstliners-frontend-dev 

проверьте, что приложение доступно по адресу http://localhost:3000
откройте браузер и перейдите по адресу http://localhost:3000 

остановить контейнер
```bash
docker stop <container_id>
```
или <kbd>Ctrl</kbd> + <kbd>C</kbd>в терминале, где запущен контейнер

## Фронтенд команда проекта:
- Алексей (github: https://github.com/LEH1CH)
- Юрий (github: https://github.com/uyriq)
