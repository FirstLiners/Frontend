/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com', 'avatars.mds.yandex.net'],
        remotePatterns: [
            // github avatars
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
            // yandex avatars 
            // все равно ошибка - яндекс скрывает внутренний домен картинок пользователей TODO найти правильный адрес
            {
                protocol: 'https',
                hostname: 'avatars.mds.yandex.net',
                port: '',
                pathname: '/**/**',

            }
        ],
    },
}

module.exports = nextConfig
