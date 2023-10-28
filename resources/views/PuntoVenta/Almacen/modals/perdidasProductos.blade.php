<div id="modal_perdidasProductos" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Pérdidas</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-primary" role="alert">
                    <p><b>Producto:</b><br><span id="lbl_productoBaja"></span></p>
                </div>
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <tbody id='tbl_infoProductoPerdida'>
                                <tr>
                                    <td><b>Codigo</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Existencias</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Costo</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Tipo de venta</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Caducidad</b></td>
                                    <td ></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div><br>
                <form id="form_perdidas" name="form_perdidas">
                    <div class="input-group input-group-md mb-3 col-12">
                        <div class="input-group-prepend">
                            <span class="input-group-text "><span class="fas fa-box text-primary mr-2"></span>Pérdidas</span>
                        </div>
                        <input id="txt_existenciasPerdidas" type="number" class="form-control" placeholder="Número existencias perdidas" name="txt_existenciasPerdidas" requried min=1 max="10">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="col-12">
                    <button id='guardarPerdidas' type="submit" class="btn btn-danger col-12" form ='form_perdidas'>Agregar a pérdidas</button>
                </div>
            </div>
        </div>
    </div>
</div>