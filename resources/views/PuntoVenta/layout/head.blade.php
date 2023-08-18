<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}?v={{now()->day}}">
    <link rel="stylesheet" href="{{asset('assets/fonts/fontawesome/css/fontawesome-all.min.css')}}">

    <script src="{{asset('PDV/Datatable/js/jquery-3.5.1.js')}}"></script>
    <script src="{{asset('PDV/Datatable/js/jquery.dataTables.min.js')}}"></script>
    <script src="{{asset('PDV/Datatable/js/dataTables.responsive.min.js')}}"></script>


    <link rel="stylesheet" href="{{asset('PDV/Datatable/css/jquery.dataTables.min.css')}}">
    <link rel="stylesheet" href="{{asset('PDV/Datatable/css/responsive.dataTables.min.css')}}">
    @yield('head_extra')
    <title>Punto de venta</title>
</head>
<body>