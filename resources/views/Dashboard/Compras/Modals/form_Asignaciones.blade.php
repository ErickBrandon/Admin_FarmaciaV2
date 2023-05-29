<div id="From_Asignaciones" class="modal fade modal-form-asignaciones" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
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
                <div class="row justify-content-md-center">
                    <div class="col-12">
                        <div class="title_decoracion">
                            Producto seleccionado
                        </div>
                        <div class="table-responsive">
                            <table class="table">
                                <tbody id="tbl_showAsignaciones">
                                    <tr>
                                        <td>
                                            <i class="fas fa-barcode"></i>
                                            <b>Código</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i class="fas fa-boxes"></i>
                                            <b>Piezas</b>
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
                                    <tr>
                                        <td>
                                            <i class="fas fa-donate"></i>
                                            <b>Costo X Pz</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
               </div>
               <div class="title_decoracion">
                Información de asignación
               </div>
               <hr>
               <div class="row">
                    <div class="col-md-12">
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <label class='input-group-text' for='select_farmacias'><span class='fas fa-hospital icon_r'></span>&nbsp;Farmacia</label>
                            </div>
                            <select class='custom-select' id='select_farmacias' name='select_farmacias' requried>
                                <option value="0">- Seleccione una farmacia -</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-boxes icon_r text-info'></span>&nbsp;Piezas</span>
                            </div>
                            <input id='piezas_asignacion' type='number' class='form-control' placeholder='Piezas a asignar' name='piezas_asignacion' min="1" max="">
                        </div>
                    </div>
               </div>
               <div class="title_decoracion">
                Información de venta
               </div>
               <hr>
               <div class="row">
                    <div class="col-md-12">
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text text-success'><span class="fas fa-dollar-sign"></span></span>
                            </div>
                            <input id='PrecioVenta' type='number' class='form-control' placeholder='Precio venta | 00.00' name='Precio' requried min="1">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <label class='input-group-text' for='inputGroupSelect01'><span class='fas fa-tags icon_r'></span>&nbsp;Tipo de venta</label>
                            </div>
                            <select class='custom-select' id='inputGroupSelect01' name='TipoVenta' requried>
                                <option value='0'>- Seleccione tipo de venta -</option>
                                <option value='Caja'>Caja</option>
                                <option value='Pieza'>Pieza</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-times icon_r text-danger'></span>&nbsp;Caducidad</span>
                            </div>
                            <input type='date' class='form-control' name='Caducidad' requried>
                        </div>
                    </div>
                    
                    
               </div>
            </div>
        </div>
    </div>
</div>