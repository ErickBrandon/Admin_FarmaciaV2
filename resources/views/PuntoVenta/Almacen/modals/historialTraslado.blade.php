<div id="modal_historialTraslado" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal">Historial de traspaso</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div  class="col-12">
                        <div class="alert alert-info" role="alert">
                           <b id="tipoTespaso"></b>
                        </div>
                    </div>
                    <div class="col-12">
                      
                            <table id="Tbl_historialTraspaso" class="display nowrap table-responsive" style="width:100%">
                                <thead>
                                    <tr>
                                        <th id="th_farmaciaTraspaso"></th>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Cajas</th>
                                        <th>Fecha traspaso</th>
                                    </tr>
                                </thead>

                                <tfoot>
                                    <tr>
                                        <th id="th_farmaciaTraspaso"></th>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Cajas</th>
                                        <th>Fecha traspaso</th>
                                    </tr>
                                </tfoot>
                            </table>
                    
                        
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary col-12" form='from_body' id="asignacion_ventaPiezas">Asignar a tipo de venta</button>
            </div>
        </div>
    </div>
</div>