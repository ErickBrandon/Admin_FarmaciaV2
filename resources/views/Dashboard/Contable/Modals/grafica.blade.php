<div id="modal_grafica" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><span class="fas fa-chart-pie mr-2"></span>Corte histórico</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="col">
                    <div id='info_grafica' class="alert alert-info col-12" role="alert">
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Representado en <b>$</b></td>
                                    <td>Representado en <b>%</b></td>
                                </tr>
                            </thead>
                            <tbody id='tbl_grafica'>
                                <tr>
                                    <td>
                                        <span class="fas fa-donate mr-1 f-20 text-info"></span>
                                        <b>Corte total</b>
                                    </td>
                                    <td></td>
                                    <td>100%</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="fas fa-money-bill-alt mr-1 f-20 text-primary" ></span>
                                        <b>Inversión</b>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="fas fa-window-close mr-1 f-20 text-danger"></span>
                                        <b>Pédida</b>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                <td>
                                    <span class="fas fa-chart-line mr-1 f-20 text-success"></span>
                                    <b>Utilidad</b>
                                </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-block">
                    <canvas id="chart-pie-1" style="width: 100%; height: 300px"></canvas>
                </div>
                
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>