<div id="Modal_Asignaciones" class="modal fade modal-form-asignaciones" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5>
                    <i class="fas fa-dolly"></i>
                    <span id="Title_ModalAsigaciones"></span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="title_decoracion">
                    Asignaciones de productos
                </div><hr>
                <div id="cont_select_asignaciones" class='input-group input-group-md mb-3'>
                    <div class='input-group-prepend'>
                        <label class='input-group-text' for='select_asignaciones'><i class='fas fa-box text-primary'></i></label>
                    </div>
                    <select class='custom-select' id='select_asignaciones' name='select_asignaciones'></select>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="title_decoracion">
                            Detalle seleccionado
                        </div>
                        <div class="table-responsive">
                            <table class="table">
                                <tbody id="tbl_showAsignaciones">
                                    <tr >
                                        <td>
                                            <i class="fas fa-barcode"></i>
                                            <b>Código</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr class="table-success">
                                        <td>
                                            <i class="fas fa-boxes"></i>
                                            <b>Unidades</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i class="fas fa-th"></i>
                                            <b>Piezas x Unidad</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i class="fas fa-dolly"></i>
                                            <b>Por asignar</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr class="table-warning">
                                        <td>
                                            <i class="fas fa-donate"></i>
                                            <b>Costo X U.</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr class="table-primary">
                                        <td>
                                            <i class="fas fa-dollar-sign"></i>
                                            <b>Precio unidad</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr class="table-primary">
                                        <td>
                                            <i class="fas fa-dollar-sign"></i>
                                            <b>Precio piezas</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="title_decoracion">
                            Precios de venta | Unidad o piezas
                        </div>
                        <div class="col-md-12">
                            <form id="from_PrecioUnidad">
                                <div class='input-group input-group-md mb-3'>
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'><span class="fas fa-dollar-sign text-success"></span></span>
                                    </div>
                                    <input id='PrecioUnidad' type='number' class='form-control' placeholder='Precio venta por unidad' name='PrecioUnidad' requried min="">
                                </div>
                                <button id="btn_PrecioUnidad" type="button" class="btn btn-dark btn-sm col-12" disabled>Guardar precio</button>
                            </form>
                            
                        </div><hr>
                
                        <div class="col-md-12">
                            <form id="form_PrecioPieza">
                                <div class='input-group input-group-md mb-3'>
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'><span class="fas fa-th text-success"></span></span>
                                    </div>
                                    <input id='PiezasUnidad' type='number' class='form-control' placeholder='Piezas por unidad' name='PiezasUnidad' requried min="1">
                                </div>
                                <div class='input-group input-group-md mb-3'>
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'><span class="fas fa-dollar-sign text-success"></span></span>
                                    </div>
                                    <input id='PrecioPz' type='number' class='form-control' placeholder='Precio venta por piezas' name='PrecioPz' requried min="">
                                </div>
                                <button id="btn_PrecioPz" type="button" class="btn btn-dark btn-sm col-12" disabled>Guardar</button>
                            </form>
                        </div>
                    </div>
               </div><hr>
               {{-- <div class="title_decoracion">
                Otras asignaciones
               </div>
               <div class="row">
                <div class="col-6">
                    <div class='input-group input-group-md mb-3'>
                        <div class='input-group-prepend'>
                            <label class='input-group-text' for='select_farmacias'><span class='fas fa-paste '></span>&nbsp;Asignación</label>
                        </div>
                        <select class='custom-select' id='cbx_otrasAsignaciones' name='cbx_otrasAsignaciones' >
                                <option value="1">Producto de esta factura</option>
                            <optgroup label="En almacenes">
                                <option value="2">Similar por código</option>
                                <option value="3">Similar por nombre</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
                <div id="Cont_OA" class="col-12">
                   
                </div>
                <div class="col-12">
                    <button type="button" id="btn_OtrasAsignaciones" class="btn btn-outline-info btn-sm col-12" >Consultar</button>
                </div>
               </div> --}}
               <br><hr>
               <div class="title_decoracion">
                Formulario de asignación
                </div>
               <form id="From_Asignaciones">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                                <div class="title_decoracion">
                                    Información de asignación
                                </div>
                                <div class='input-group input-group-md mb-3'>
                                    <div class='input-group-prepend'>
                                        <label class='input-group-text' for='select_farmacias'><span class='fas fa-hospital icon_r'></span>&nbsp;Farmacia</label>
                                    </div>
                                    <select class='custom-select' id='select_farmacias' name='select_farmacias' disabled>
                                        <option value>- Seleccione una farmacia -</option>
                                        @foreach ($Farmacias as $Farmacia)
                                            <option value="{{$Farmacia->id}}">{{$Farmacia->Farmacia}}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class='input-group input-group-md mb-3'>
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-boxes icon_r text-info'></span>&nbsp;Unidades</span>
                                    </div>
                                    <input id='piezas_asignacion' type='number' class='form-control' placeholder='Unidades a asignar' name='piezas_asignacion' min="1" max="" disabled>
                                </div>
                        </div>
                        <div class="col-6">
                            <div class="title_decoracion">
                                Información de venta
                            </div>
                            <div class='input-group input-group-md mb-3'>
                                <div class='input-group-prepend'>
                                    <label class='input-group-text' for='select_TV'><span class='fas fa-tags icon_r'></span>&nbsp;Tipo de venta</label>
                                </div>
                                <select class='custom-select' id='select_TV' name='select_TV' disabled>
                                </select>
                            </div>
                            <div class='input-group input-group-md mb-3'>
                                <div class='input-group-prepend'>
                                    <span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-times icon_r text-danger'></span>&nbsp;Caducidad</span>
                                </div>
                                <input id="Caducidad" type='date' class='form-control' name='Caducidad' disabled>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <button type="button" id="btn_GuardarAsignacion" class="btn btn-primary col-12" disabled>Asignar al almacen</button>
                </div>
               </form>
            </div>
        </div>
    </div>
</div>