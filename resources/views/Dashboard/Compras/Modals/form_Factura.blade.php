<div id="From_Factura" class="modal fade modal-form-factura" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5>
                    <i class="fas fa-boxes"></i>
                    <span id="Title_From_Factura"></span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <form id="form_factura_1">
                        <div class="row">
                            <div class="col-xl-5 col-md-6 col-sm-12">
                                <div id="cont_select_proveedores" class='input-group input-group-md mb-3 col-12'>
                                    <div class='input-group-prepend'>
                                        <label class='input-group-text' for='Proveedor'><i class='fas fa-user-lock text-primary'></i>&nbsp;Proveedor</label>
                                    </div>
                                    <select class='custom-select' id='Proveedor' name='Proveedor'>
                                        <option value="">- Selecciona un proveedor -</option>
                                       @foreach ($Proveedores as $Proveedor)
                                           <option value="{{$Proveedor->id}}">{{$Proveedor->Nombre}}</option>
                                       @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-5 col-md-6 col-sm-12">
                                <div id="cont_select_proveedores" class='input-group input-group-md mb-3 col-12'>
                                    <div class='input-group-prepend'>
                                        <label class='input-group-text' for='Proveedor'><i class='fas fa-hospital text-info'></i>&nbsp;Farmacias</label>
                                    </div>
                                    <select class='custom-select' id='Factura_farmacia' name='Factura_farmacia'>
                                        <option value="">- Selecciona una farmacia -</option>
                                       @foreach ($Farmacias as $farmacia)
                                           <option value="{{$farmacia->id}}">{{$farmacia->Farmacia}}</option>
                                       @endforeach
                                    </select>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                  
                </div>
                <br><br>
                
                <div class="col-12">
                    <div class="row">
                        <div class="col-xl-5 col-md-6 col-sm-12 mb-3">
                            <form id="form_ProductoNuevo" >
                                <div class="input-group input-group-md">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text feather icon-slack" id="inputGroup-sizing-sm"></span>
                                    </div>
                                    <input id="Codigo_nuevo" type="text" class="form-control" placeholder="Código de barras" name="Codigo_nuevo" requried="">
                                </div>
                            </form>
                        </div>
                        <div class="col-xl-4 col-md-4 col-sm-12">
                            <button id="btn_agregarProducto" class="btn btn-primary col-12"><span class="fas fa-plus-circle"></span> Agregar produto</button>
                        </div>
                    </div>
                </div><br>
                <form id="form_factura_2">
                    <div class="container col-12">
                        <div class="table-responsive">
                            <table id="tbl_compras" class="table table-hover productos">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Cajas</th>
                                        <th>Costo compra</th>
                                        <th>Precio venta</th>
                                        <th>Subtotal de compra</th>
                                        <th>Piezas X Caja</th>
                                        <th>Caducidad</th>
                                        <th>Quitar</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyCompras">            
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
                <hr>
                <div class=" card-customer">
                    <div class="card-block">
                        <div class="row align-items-center justify-content-center">
                            
                            <div class="col">
                                <i class="fas fa-dolly f-30 text-white bg-info"></i>
                            </div>
                            <div class="col-auto">
                                <h5 class="text-muted mb-0">Total de factura</h5>
                                <h2 class="mb-2 f-w-300">$&nbsp;<span id="total_factura">0.00</span></h2>
                            </div>
                        </div>
                    </div>
                </div><hr>
                <div class="col-12">
                    <button id="btn_RFactura" class="btn btn-primary col-12">Registrar factura</button>
                </div>
            </div>
        </div>
    </div>
</div>