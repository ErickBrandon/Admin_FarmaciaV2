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
                    <div class="alert alert-warning col-12">
                        Para que las nuevas existencias del producto seleccionado se vean contabilizadas en el almacen de la farmacia, se tiene que asignar los <b>precios</b> y las cajas con su <b>tipo de venta</b>.
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
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
                                    <tr>
                                        <td>
                                            <i class="fas fa-calendar-times"></i>
                                            <b>Caducidad</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr class="table-success">
                                        <td>
                                            <i class="fas fa-boxes"></i>
                                            <b>Cajas</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i class="fas fa-th"></i>
                                            <b>Piezas x Caja</b>
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
                                            <b>Costo X caja.</b>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr class="table-primary">
                                        <td>
                                            <i class="fas fa-dollar-sign"></i>
                                            <b>Precio caja</b>
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
                    <div class="col-md-6">
                        <div class="title_decoracion">
                            Asignación de precios y tipo de venta
                        </div>
                        <form id="form_Asignaciones">
                            <div class="input-group input-group-md">
                                <label for="" class="col-12">¿Cuantos cajas se venderán por tipo de venta <span class="text-danger">"CAJA"?</span></label>
                                <div class="input-group-prepend">
                                    <span class="input-group-text text-primary"> <span class="fas fa-box"></span></span>
                                </div>
                                <input id="Cajas" type="number" class="form-control" placeholder="Cajas para venta por caja" name="Cajas" requried min='0' disabled>
                            </div><br>
                            <div class="input-group input-group-md">
                                <div class="input-group-prepend">
                                    <span class="input-group-text text-success"> <span class="fas fa-dollar-sign"></span></span>
                                </div>
                                <input id="Venta_caja" type="number" class="form-control" placeholder="Precio venta" name="Venta_caja" requried min='1' disabled>
                            </div>
                            <br><hr>
                            <div class="input-group input-group-md">
                                <label for="" class="col-12">¿Cuantos cajas se venderán por tipo de venta <span class="text-danger">"PIEZAS"</span>?</label>
                                <div class="input-group-prepend">
                                    <span class="input-group-text text-info"><span class="fas fa-boxes"></span></span>
                                </div>
                                <input id="Piezas" type="number" class="form-control" placeholder="Cajas para venta por piezas" name="Piezas" requried min='0' disabled>
                            </div>
                            <br>
                            <div class="input-group input-group-md">
                                <div class="input-group-prepend">
                                    <span class="input-group-text text-success"><span class="fas fa-dollar-sign"></span></span>
                                </div>
                                <input id="Venta_pz" type="number" class="form-control" placeholder="Precio venta" name="Venta_pz" requried min='1' disabled>
                            </div><br>
                            <div class="col-12">
                                <button id="btn_formAsignaciones" class="btn btn-primary btn-sm col-12" disabled>Asignar</button>
                            </div>
                        </form>
                    </div>
               </div><hr><br>
            </div>
        </div>
    </div>
</div>