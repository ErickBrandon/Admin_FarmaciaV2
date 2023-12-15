<div id="modal_AjusteProducto" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-dark">
                <h5 class="modal-title  text-white"><span class="fas fa-cogs mr-2"></span>Ajustes</h5>
                <button type="button" class="close  text-white" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <tbody id='tbl_ajusteProducto'>
                                <tr>
                                    <td><b>Codigo</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Producto</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Tipo de venta</b></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div><br>
                <form id="form_ajustes" name="form_ajustes">
                    <div class="input-group input-group-md mb-3 col-12">
                        <div class="input-group-prepend">
                            <span class="input-group-text "><span class="fas fa-coins mr-2"></span>Costo compra</span>
                        </div>
                        <input id="Ajuste_Costo" type="number" class="form-control" placeholder="Costo compra" name="Ajuste_Costo" requried min="0.01" step="0.01" >
                    </div>
                    <div class="input-group input-group-md mb-3 col-12">
                        <div class="input-group-prepend">
                            <span class="input-group-text "><span class="fas fa-dollar-sign mr-2"></span>Precio venta</span>
                        </div>
                        <input id="Ajuste_Precio" type="number" class="form-control" placeholder="Precio venta" name="Ajuste_Precio" requried min="" step="0.01">
                    </div>
                    <div class="input-group input-group-md mb-3 col-12">
                        <div class="input-group-prepend">
                            <span class="input-group-text "><span class="fas fa-boxes mr-2"></span>Existencias</span>
                        </div>
                        <input id="Ajuste_Existencias" type="number" class="form-control" placeholder="Existencias" name="Ajuste_Existencias" requried min=1 >
                    </div>
                    <div class="input-group input-group-md mb-3 col-12">
                        <div class="input-group-prepend">
                            <span class="input-group-text "><span class="fas fa-calendar-alt mr-2"></span>Caducidad</span>
                        </div>
                        <input id="Ajuste_caducidad" type="date" class="form-control" placeholder="Caducidad" name="Ajuste_caducidad" requried>
                    </div>
                    <div class="alert alert-warning" role="alert">
                       El campo de Piezas por caja se <b>activará solamente</b> cuando el producto seleccionado sea de <b>tipo de venta "CAJA"</b>
                    </div>
                    <div class="input-group input-group-md mb-3 col-12">
                        <div class="input-group-prepend">
                            <span class="input-group-text "><span class="fas fa-calendar-alt mr-2"></span>Piezas por Caja</span>
                        </div>
                        <input id="Ajuste_PzCaja" type="number" class="form-control" placeholder="Piezas por caja" name="Ajuste_PzCaja" requried min=1 disabled>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="col-12">
                    <button id='guardarAjusteProducto' type="submit" class="btn btn-dark col-12" form ='form_ajustes'>Actualizar producto</button>
                </div>
            </div>
        </div>
    </div>
</div>