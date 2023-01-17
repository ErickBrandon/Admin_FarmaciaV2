@extends('PuntoVenta.layout.master')
@section('head_extra')
<link rel="stylesheet" href="{{asset('PDV/css/principal.css')}}">
<link rel="stylesheet" href="{{asset('assets/plugins/notification/css/notification.min.css')}}">
<link rel="stylesheet" href="{{asset('assets/plugins/animation/css/animate.min.css')}}">
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('cont_PDV')
<main>
    <div class="contenido_productos">
        <ul class="nav nav-pills mb-3 menu_taps" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="pills-pdv-tab" data-toggle="pill" href="#pills-pdv" role="tab" aria-controls="pills-pdv" aria-selected="true">Productos con código</a>
            </li>    
        </ul>
        <div class="tab-content" id="pills-tabContent" >
            <div id="PntVenta" farmID={{$Farmacia->id}}></div>
            <div class="tab-pane fade show active" id="pills-pdv" role="tabpanel" aria-labelledby="pills-pdv-tab">
                <table id="tbl_Productos" class="display responsive nowrap" style="width:100%">
                    <thead>
                        <tr> 
                            <th></th>
                            <th>Comprar</th>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>$</th>
                            <th>Finalidad</th>
                            <th>Exist</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            {{-- <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <p class="mb-0">Ad pariatur nostrud pariatur exercitation ipsum ipsum culpa mollit commodo mollit ex. Aute sunt incididunt amet commodo est sint nisi deserunt pariatur do. Aliquip ex eiusmod voluptate exercitation
                    cillum
                    id incididunt
                    elit sunt. Qui minim sit magna Lorem id et dolore velit Lorem amet exercitation duis deserunt. Anim id labore elit adipisicing ut in id occaecat pariatur ut ullamco ea tempor duis.
                </p>
            </div> --}}
        </div>
    </div>
    <aside class="sidebar_carrito">
            <header>
                <button type="button" class="btn btn-danger col-12" title="Vaciar Carrito" onclick=vaciarCarrito()>
                    Vaciar Carrito
                </button>
                <p>Carrito de Compra <span class="fas fa-cart-plus text-c-blue"></span></p>
            </header>
            <div class="busquedaC">
                    <div class='form-group'>
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <button class="btn btn-dark fas fa-camera" title="Escannear código por cámara" data-toggle="tooltip"  onclick="OpenScanner()"></button>
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
                            <th class="TQuitar">Quitar</th>
                            <th class="TProducto">Buscar</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyCarrito">            
                    </tbody>
                </table>
            </form>
            </div>
            <div class="contTotal">
               <div>Total $:</div><div id="TotalCarrito">00</div>
            </div>
            <button id='btnVentanilla' type="button" class="btn btn-primary btn-lg col-12" onclick="ventanilla()">Ventanilla de pago</button>
    </aside>
</main>
<div id="ModalPago" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Ventanilla de pago</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="ventanaImg"><img src="{{asset('logo/FarmaPlus.png')}}" alt=""></div>
                <div class="contTotal">
                    <div>Total $:</div><div id="TotalCarritoModal">10000</div>
                </div>
                <form action="">
                    <div class='form-group'>
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text' id='inputGroup-sizing-sm'>Pago</span>
                            </div>
                            <input id="PagoModal" type='number' class='form-control' placeholder='Ingrese el monto de pago del cliente' name='PagoCliente' oninput=PagoVentanilla() >
                        </div>
                    </div>
                </form>
                <div class="contTotal">
                    <div>Cambio $:</div><div id="Cambio">-----</div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btnCobrar" type="button" class="btn btn-dark" onclick="RegistrarVenta()">COBRAR</button>
            </div>
        </div>
    </div>
</div>
@include('PuntoVenta.partials.modal_scanner')
@endsection
@section('foot_extras')
<script src="{{asset('PDV/Datatable/constructorDatatable.js')}}"></script>
<script src="{{asset('assets/plugins/notification/js/bootstrap-growl.min.js')}}"></script>
<script src="{{asset('Scanner/quagga.min.js')}}"></script>
<script src="{{asset('PDV/js/pdv.js')}}"></script>
<script src="{{asset('assets/plugins/sweetalert/js/sweetalert.min.js')}}"></script>
<script>
    const G_scan = new Audio('{{asset('Scanner/sound/scan.mp3')}}');
</script>
@endsection