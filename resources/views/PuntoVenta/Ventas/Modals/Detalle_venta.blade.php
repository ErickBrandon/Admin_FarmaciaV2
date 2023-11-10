<div id="modal_detalles_venta" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal">ID DE VENTA</h5>
                <button class="btn btn-light" type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="CerrarDetalle()">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div id="modal-body" class="modal-body">
                <div class="col-12">
                    <div class="col-12">
                        <div class="card card-social">
                            <div class="card-block border-bottom">
                                <div class="row align-items-center justify-content-center">
                                    <div class="col-auto">
                                        <i class="fas fa-shopping-cart text-c-blue f-36"></i>
                                    </div>
                                    <div class="col text-right">
                                        <h3>Código de venta</h3>
                                        <h5 class="text-c-blue mb-0" id='CodigoVenta'>87878787</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="cont_tbl_detalles" class="table-responsive">
                    <table  class="table table-striped text-center text-dark">
                        <thead>
                            <tr class="">
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Pz</th>
                                <th>SubTotal</th>
                                <th>Tipo de venta</th>
                                <th>Cancelar venta</th>
                                <th>Piezas canceladas</th>
                            </tr>
                        </thead>
                        <tbody id='tbl_detalle'>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <div id='cont_btn_cancelar' class="col">
                </div>
            </div>
        </div>
    </div>
</div>