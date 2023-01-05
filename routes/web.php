<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CajaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\FarmaciaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProveedorController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
/* Grupo de rutas que solo puede accesar un administrador autenticado */
Route::POST('/Auth',[LoginController::class,'AuthAdmin']);


Route::GET('HomeAdmin',[DashboardController::class,'index'])->name('HomeAdmin');
/*  ------------------- Rutas de modulo Proveedores ------------------------------------ */
    Route::GET('Proveedores',[ProveedorController::class,'index'])->name('Proveedores');
    Route::POST('GuardarProveedor',[ProveedorController::class,'store'])->name('GuardarProveedor');
    Route::POST('ActualizarProveedor/{Proveedor}',[ProveedorController::class,'update'])->name('ActualizarProveedor');
    Route::POST('EliminarProveedor/{Proveedor}',[ProveedorController::class,'destroy'])->name('EliminarProveedor');
    Route::POST('TblProveedores',[ProveedorController::class,'DataTableProveedor'])->name('TblProveedores');
/* -------------------------------------------------------------------------------------- */

/* ----------------------- Rutas del modulo de Farmacias ----------------- */
    Route::GET('Farmacias',[FarmaciaController::class,'index'])->name('Farmacias');
    Route::POST('GuardarFarmacia',[FarmaciaController::class,'store'])->name('GuardarFarmacia');
    Route::POST('ActualizarFarmacia/{Farmacia}',[FarmaciaController::class,'update'])->name('ActualizarFarmacia');
    Route::POST('TblFarmacia',[FarmaciaController::class,'DataTableFarmacia'])->name('TblFarmacias');
/* -------------------------------------------------------------------------- */
/*  ------------------- Rutas de modulo Administradores------------------------------- */
Route::GET('Administradores',[UserController::class,'index'])->name('Administradores');
Route::POST('GuardarAdministrador',[UserController::class,'store'])->name('GuardarProveedor');

/* Punto de venta */
Route::POST('PuntoDeVenta/Productos',[CajaController::class,'tbl']);
Route::GET('PuntoDeVenta/{Farmacia}',[CajaController::class,'show'])->name('PuntoVenta');
Route::POST('RegistrarVenta',[CajaController::class,'store']);
Route::GET('PuntoDeVenta/{Farmacia}/Ventas',[VentaController::class,'ventas'])->name('Ventas');

Route::GET('PuntoDeVenta/{Farmacia}/Almacen',[ProductoController::class,'almacen'])->name('Almacen');
Route::POST('PuntoDeVenta/ProductoEnAlmacen',[ProductoController::class,'ProductoEnAlmacen'])->name('Productos');
Route::POST('AlmacenarProducto',[ProductoController::class,'store'])->name('GuardarProducto');