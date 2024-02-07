@extends('PuntoVenta.layout.master')
@section('head_extra')
<link rel="stylesheet" href="{{asset('PDV/css/principal.css')}}?v={{now()->day}}">
<link rel="stylesheet" href="{{asset('assets_/plugin/glow/css/notification.min.css')}}">
{{-- <link rel="stylesheet" href="{{asset('assets/plugins/animation/css/animate.min.css')}}">
 --}}
@endsection
@section('cont_PDV')
<main>
        <div class="contenido_productos">
          
            <div class="card table-card">
                <div class="row-table">
                    <div class="col-auto bg-primary text-white p-t-10 p-b-10">
                        <i class="fas fa-dollar-sign f-30"></i>
                    </div>
                    <div class="col text-center">
                        <span class="text-uppercase d-block m-b-10">Total de compra</span>
                        <h3 class="f-w-300"><b id="TotalCompra">$ 0.00</b></h3>
                        <button id='btnVentanilla' type="button" class="btn btn-primary btn-sm col-12">COBRAR</button>
                    </div>
                </div>
            </div>
            <div class="card rides-bar">
                <div class="card-block">
                    <div class="row d-flex align-items-center">
                        <div class="col-auto ">
                            <i class="fas fa-shopping-cart f-30 text-white rides-icon"></i>
                        </div>
                        <div class="col">
                            <span class="text-uppercase d-block">Total de productos</span>
                            <h3 class="f-w-300" id="txt_TotalProductos">0</h3>
                            <button id="btn_LimpiarCarrito" type="button" class="btn btn-danger col-12 btn-sm" title="Vaciar Carrito">
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card theme-bg assets-value">
                <div class="bg-img"></div>
                <div class="card-block  text-center">
                    <i class="fas fa-capsules text-white f-30 m-b-10"></i>
                    <h5 class="text-white">Existencias</h5>
                    <span class="text-white">Lista de productos</span>
                    <button type="button" class="btn btn-dark col-12" data-toggle="modal" data-target=".modal_productos">Consultar</button>
                </div>
            </div>
            {{-- <button id='btnVentanilla' type="button" class="btn btn-primary btn-lg col-12" onclick="ventanilla()">Ventanilla de pago</button>
         --}}</div>
    <aside class="sidebar_carrito">
            <header>
                <p>Carrito de Compras <span class="fas fa-cart-plus text-c-blue"></span></p>
            </header><hr>
            <div class="busquedaC">
                    <div class='form-group'>
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <button class="btn btn-primary fas fa-camera" title="Escannear código por cámara" data-toggle="tooltip"  onclick="OpenScanner()"></button>
                            </div>
                            <input id='Codigo' type='text' class='form-control' placeholder='Código de barras | Ingresalo o Escannealo' name='Codigo' onchange="IngresarAlCarrito(this.value)">
                        </div>
                    </div>
            </div> 
            <div class="lista">
                <form id="form">
                <table id="tbl_carrito" class="table table-hover productos">
                    <thead>
                        <tr>
                            <th class="TProducto">Producto</th>
                            <th class="TPrecio">Precio</th>
                            <th class="TCantidad">Cantidad</th>
                            <th class="TSubTotal">SubTotal</th>
                            <th class="TSubTotal">Tipo de venta</th>
                            <th class="TQuitar">Quitar</th>
                            <th class="TProducto">Buscar</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyCarrito">            
                    </tbody>
                </table>
            </form>
            </div>
            
            
            
    </aside>
</main>
<div id="ModalPago" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div id="modal_header_ticket" class="modal-header">
                <h5 class="modal-title text-white"><span class="fas fa-dollar-sign mr-2"></span>Ticket</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div id='logo_ticket' class="col-12"><img src="{{asset('assets_/img/FarmaPlus2.png')}}" alt=""></div>
                </div><hr>
                <div class="card theme-bg2 bitcoin-wallet">
                    <div class="card-block">
                        <h5 class="text-white mb-2">TOTAL DE COMPRA</h5>
                        <h2 class="text-white mb-3 f-w-300" id="txt_confirmacionTotal"></h2>
                        <span class="text-white d-block">De <span id="txt_confimacionNP"></span></span>
                        <i class="fas fa-dollar-sign f-70 text-white"></i>
                    </div>
                </div>
                <form action="">
                    <div class='form-group'>
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text text-c-blue' id='inputGroup-sizing-sm'><i class="fas fa-hand-holding-usd"></i></span>
                            </div>
                            <input id="PagoModal" type='number' class='form-control' placeholder='Ingrese el monto de pago del cliente' name='PagoCliente' min="1">
                        </div>
                    </div>
                </form>
                <div class="card theme-bg bitcoin-wallet">
                    <div class="card-block">
                        <h5 class="text-white mb-2">CAMBIO</h5>
                        <h2 class="text-white mb-3 f-w-300" id="txt_cambio"></h2>
                        <i class="fas fa-money-bill-wave f-70 text-white"></i>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col">
                    <button id="btnCobrar" type="button" class="btn btn-primary col-12" disabled>COBRAR</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="Modal_Productos" class="modal fade modal_productos" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">  
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div id="modal_herader_productos" class="modal-header">
                <h5 class="modal-title text-white"><span class="fas fa-capsules mr-2"></span>Lista de productos</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div id="PntVenta" farmID={{$Farmacia->id}}></div>
                <div class="tab-pane fade show active table-responsive" id="pills-pdv" role="tabpanel" aria-labelledby="pills-pdv-tab">
                    <table id="tbl_Productos" class="display  nowrap" style="width:100%">
                        <thead>
                            <tr> 
                                <th></th>
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Agregar</th>
                                <th>Tipo de venta</th>
                                <th>Existencias</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                        <tfoot>
                            <tr> 
                                <th></th>
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Agregar</th>
                                <th>Tipo de venta</th>
                                <th>Existencias</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="modal_ticket" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <br>
            <div style="text-align: center; font-size: 25px">FARMAPLUS</div><br><br><br>
            <div id='F_direccion' style="text-align: center"></div><br>
            <div id='F_colonia' style="text-align: center"></div><br>
            <div id='fecha_de_compra' style="text-align: center">14 DE SEPTIEMBRE 2023</div><br><hr><br><br>
            <div id='venta_id' style="text-align: center"></div><br><br>
            <div style="text-align: left">PRODUCTOS VENDIDOS</div><hr><br><br>
            <table id='cont_ticket'>
                
            </table><br><hr><br>
            <div id="total_ticket" style="text-align: right; font-size: 25px">
                <div id="precio_total"></div>
            </div><br>
            <div id="efectivo" style="text-align: right; font-size: 25px">
                <div id="efectivo_total"></div>
            </div>
            </div><br>
            <div id="cambio" style="text-align: right; font-size: 25px">
                <div id="cambio_total"></div>
            </div>
            <br><br>
            <div style="text-align: center; font-size: 25px"><span class="fas fa-smile"></span>¡GRACIAS!</div><br><br>
        </div>
    </div>
</div>
@include('PuntoVenta.partials.modal_scanner')
@endsection
@section('foot_extras')
<script> 
    const _Direccion = @Json($Farmacia->direccion) 
    const _Colonia = @Json($Farmacia->colonia) 
</script>
<script src="{{asset('assets_/js/PuntoDeVenta/pdv/dataTables.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets_/plugin/glow/js/bootstrap-growl.min.js')}}"></script>

{{-- <script src="{{asset('Impresoras/plugin_impresora_termica.js')}}"></script> --}}
<script src="{{asset('assets_/plugin/Scanner/quagga.min.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets_/js/PuntoDeVenta/pdv/pdv.js')}}?v={{now()->day}}"></script>
<script>
    const Sound_scan = new Audio('{{asset('assets_/plugin/Scanner/sound/scan.mp3')}}');
</script>
@endsection