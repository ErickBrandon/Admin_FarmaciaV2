<div id="modal_CambioTipoVenta_Caja" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal">PIEZAS => CAJA</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div  class="col-12">
                        <div class="alert alert-primary" role="alert">
                            Producto seleccionado: <br>
                            <b id='productoCambi_Caja'></b>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <tbody id='tbl_infoProductoCambio_Caja'>
                                    <tr>
                                        <td>Codigo</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Precio venta X PIEZA</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Existencias</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tipo de venta</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Costo de compra</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div><br>
                <div class="row">
                    <div id="alert_similarCaja" class="col-12">

                    </div>
                    <form id='form_asignacionVentaCajas' class="col-12">
                        <div class="col-12">
                            <div class="input-group input-group-md mb-3 col-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><span class="fas fa-boxes text-primary"></span>&nbsp;Piezas X caja</span>
                                </div>
                                <input id="pzXcaja_TVC" type="number" class="form-control" name="pzXcaja_TVC" requried="" min ="1">
                            </div>
                            <div class="input-group input-group-md mb-3 col-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><span class="fas fa-boxes text-primary"></span>&nbsp;Cajas</span>
                                </div>
                                <input id="cajas_piezas_TVC" type="number" class="form-control" name="cajas_piezas_TVC" requried="" min ="1" >
                            </div>
                            
                            <div class="input-group input-group-md mb-3 col-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><span class="fas fa-dollar-sign text-success"></span>&nbsp;Precio venta</span>
                                </div>
                                <input id="precio_ventaPiezas_TVC" type="number" class="form-control" name="precio_ventaPiezas_TVC" requried=""  min step='0.01'>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <div class="col">
                    <button type="button" class="btn btn-primary col-12" form='from_body' id="asignacion_TVC">Asignar a tipo de venta</button>
                </div>
            </div>
        </div>
    </div>
</div>