<!DOCTYPE html>
<html lang="en">
<head>
    <title>FarmaPlus</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    {{-- Icono titulo --}}
    <link rel="shortcut icon" href="{{asset('assets_/img/FP.ico')}}">
    {{-- Bootstrap --}}
    <link rel="stylesheet" href="{{asset('assets_/css/style.css')}}?v={{now()->day}}">
    {{-- Fonts  mi--}}
    <link rel="stylesheet" href="{{asset('assets_/fonts/fontawesome/css/fontawesome-all.min.css')}}">
    {{-- Vendor js --}}
    <script src="{{asset('assets_/main/vendor-all.min.js')}}"></script>

    
    {{-- Token de sesión --}}
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script>
            const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
        </script>
    
    
   
    {{-- DataTable css min --}}
    <link rel="stylesheet" href="{{asset('assets_/plugin/DataTable/css/datatables.min.css')}}">
     @yield('extras_header')
</head>
<body class="layout-6">
