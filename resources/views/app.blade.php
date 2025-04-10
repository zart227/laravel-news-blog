<!DOCTYPE html>
<html lang="ru" class="h-full bg-gray-100">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">

        {{-- Vite Environment Variables --}}
        <script>
            window.VITE_REVERB_APP_KEY = '{{ config('broadcasting.connections.reverb.key') }}';
            window.VITE_REVERB_HOST = '{{ config('broadcasting.connections.reverb.host') }}';
            window.VITE_REVERB_PORT = {{ config('broadcasting.connections.reverb.port') }};
            window.VITE_REVERB_SCHEME = '{{ config('broadcasting.connections.reverb.scheme') }}';
        </script>

        {{-- Inertia --}}
        @routes
        @vite('resources/js/app.js')
        @inertiaHead
    </head>
    <body class="font-sans leading-none text-gray-700 antialiased">
        @inertia
    </body>
</html> 