<?php

use App\Http\Middleware\General;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CajaController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Administradores;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\EntradaController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\ContableController;
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

Route::get('/Inicio', function () {
    return view('welcome');
})->name('login')->middleware('guest');
/* Grupo de rutas que solo puede accesar un administrador autenticado */
Route::POST('/Auth',[LoginController::class,'AuthAdmin']);
Route::POST('/AuthVendedor',[LoginController::class,'AuthVendedor']);
Route::POST('/logout',[LoginController::class,'logout'])->middleware('auth');

Route::middleware(["Administradores"])->group(function () {
    //Inicio de Administrador
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
  Route::POST('ActualizarFarmacia/{Farmacia}',[FarmaciaController::class,'ActualizarFarmacia'])->name('ActualizarFarmacia');
  Route::POST('TblFarmacia',[FarmaciaController::class,'DataTableFarmacia'])->name('TblFarmacias');
/* -------------------------------------------------------------------------- */
/*  ------------------- Rutas de modulo Administradores------------------------------- */
Route::GET('Usuarios',[UserController::class,'index'])->name('Usuarios');
Route::POST('Guardarusuario',[UserController::class,'Guardarusuario'])->name('Guardarusuario');
Route::POST('TblUsuarios',[UserController::class,'TblUsuarios'])->name('TblUsuarios');
Route::POST('ActualizarUsuario/{usuario}',[UserController::class,'ActualizarUsuario'])->name('ActualizarUsuario');
Route::POST('EliminarUsuario/{usuario}',[UserController::class,'EliminarUsuario'])->name('EliminarUsuario');

Route::GET('Contable',[ContableController::class,'index'])->name('Contable');
Route::POST('tblCortes',[ContableController::class,'DataTableCortesHoy'])->name('tblCortes');
Route::POST('CorteGeneral',[ContableController::class,'CorteGeneral'])->name('CorteGeneral');
Route::POST('CortesIndividuales',[ContableController::class,'Cortes_Individuales'])->name('CortesIndividuales');
Route::POST('HistorialCG',[ContableController::class,'HistorialCG'])->name('HistorialCG');
Route::POST('EliminarCG/{CorteGeneral}',[ContableController::class,'EliminarCG'])->name('EliminarCG');
Route::POST('EliminarTodosCG',[ContableController::class,'EliminarTodosCG'])->name('EliminarTodosCG');
Route::POST('HistorialCF',[ContableController::class,'HistorialCF'])->name('HistorialCF');
Route::POST('EliminarCF',[ContableController::class,'EliminarCF'])->name('EliminarCF');
Route::POST('HistorialV',[ContableController::class,'HistorialV'])->name('HistorialV');
Route::POST('HistorialVD',[ContableController::class,'HistorialVD'])->name('HistorialVD');

Route::GET('Compras',[FacturaController::class,'index'])->name('Compras');
Route::POST('GuardarFactura',[FacturaController::class,'store'])->name('GuardarFactura');
Route::POST('ActualizarFactura/{Factura}',[FacturaController::class,'update'])->name('ActualizarFactura');
Route::POST('Facturas',[FacturaController::class,'tbl_facturas'])->name('Facturas');
Route::POST('DetalleFactura',[FacturaController::class,'DetalleFactura'])->name('DetalleFactura');
Route::POST('ProductosFactura',[FacturaController::class,'DetalleFactura'])->name('ProductosFactura');
Route::POST('GuardarAsignacion',[FacturaController::class,'GuardarAsignacion'])->name('GuardarAsignacion');
Route::POST('OtrasAsignaciones',[FacturaController::class,'OtrasAsignaciones'])->name('OtrasAsignaciones');
Route::POST('PrecioUnidad/{FacturaProducto}',[FacturaController::class,'PrecioUnidad'])->name('PrecioUnidad');
Route::POST('PrecioPieza/{FacturaProducto}',[FacturaController::class,'PrecioPieza'])->name('PrecioPieza');
Route::POST('EliminarFactura/{Factura}',[FacturaController::class,'EliminarFactura'])->name('EliminarFactura');
Route::POST('Asignacion/{Producto}/{Factura}',[FacturaController::class,'Asignacion'])->name('Asignacion');

        /* ALMACEN */
Route::POST('PuntoDeVenta/{Farmacia}/ProductoEnAlmacen/',[ProductoController::class,'ProductoEnAlmacen'])->name('Productos');
Route::POST('Traspaso/{Producto}',[ProductoController::class,'Traspaso'])->name('Traspaso');
Route::GET('PuntoDeVenta/{Farmacia}/Almacen',[ProductoController::class,'almacen'])->name('Almacen');

    /* Control de entradas de personal*/
    Route::GET('CtrlEntradas',[EntradaController::class,'index'])->name('CtrlEntradas');
    Route::POST('tbl_entradas',[EntradaController::class,'tbl_entradas'])->name('tbl_entradas');
});

Route::middleware(["General"])->group(function () {
    /* Punto de venta */
    Route::POST('/ProductosVenta/{Farmacia}',[CajaController::class,'tbl']);
    Route::GET('PuntoDeVenta/{Farmacia}',[CajaController::class,'show'])->name('PuntoVenta');
    Route::POST('RegistrarVenta',[CajaController::class,'store']);
    
    Route::GET('PuntoDeVenta/{Farmacia}/Ventas',[VentaController::class,'ventas'])->name('Ventas');
    Route::POST('PuntoDeVenta/{farmacia_id}/TblVentas',[VentaController::class,'TblVentas'])->name('TblVentas');
    Route::POST('PuntoDeVenta/{farmacia_id}/CorteDeCaja',[VentaController::class,'corte'])->name('Corte');
    Route::POST('Detalle/{Venta}',[VentaController::class,'detalles'])->name('DetalleVenta');
    
   
    
    Route::POST('AlmacenarProducto',[ProductoController::class,'store'])->name('GuardarProducto');
    Route::POST('ActualizarProducto/{Producto}',[ProductoController::class,'update'])->name('EditarProducto');
    Route::POST('EliminarProducto/{Producto}',[ProductoController::class,'destroy'])->name('EliminarProducto');
    Route::POST('ProveedoresProducto',[ProductoController::class,'Productos_Proveedores'])->name('ProveedoresProducto');
    
});

