let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js/app.js').sass('resources/scss/app.scss','public/css/login.css');
mix.sass('resources/scss/book.scss','public/css/book.css')
// mix.sass('resources/scss/track.scss','public/css/track.css')
// mix.js('resources/js/register.js', 'public/js/register.js').sass('resources/scss/register.scss','public/css/register.css');
// mix.sass('resources/scss/dashboard.scss','public/css/dashboard.css');