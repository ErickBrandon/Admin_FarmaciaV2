<div class="card-header">
    <h5>Tipo de consulta</h5>
    <span class="d-block m-t-5">Seleccione una opción para consultar su información</span>
</div><br>
<div class="row">
    <div class="col-xl-3 col-md-5 mb-4">
        <div class='input-group input-group-md mb-3'>
            <div class='input-group-prepend'>
                <label class='input-group-text' for='Farmacias_ventas'><span class='fas fa-store-alt text-primary'></span></label>
            </div>
            <select class='custom-select' id='Farmacias_ventas' name='Farmacias_ventas' requried>
                @foreach ($Farmacias as $farmacia)
                    <option value={{$farmacia->id}}>{{$farmacia->Farmacia}}</option>
                @endforeach
            </select>
        </div>
    </div> 
    <div class="col-xl-3 col-md-4 mb-4">
        <div class="form-group">
            <label>Todo</label>
            <div class="switch d-inline m-r-10">
                <input type="checkbox" id="switch-2" name="Op_HV">
                <label for="switch-2" class="cr"></label>
            </div>
            <label>Por día</label>
        </div>
    </div>
    <form id="form_HV" class="col-xl-5 col-md-5 mb-4">
        <div id="cont_personalizada_CV" class="col-12">
        </div>
    </form>
   
    <button class="btn btn-primary btn-sm col-12" onclick="Consultar_HV()">Consultar</button>

    <div id="borrar_HCG" class="col-12">
        <br><br>
    </div>
    
</div>
<div class="row">
    <span id='Descripcion_tblCG' class="d-block m-t-5"></span>
    <div class="col-12">
        <table id="Tbl_HV" class="display table dt-responsive table-striped nowrap" style="width:100%; text-align: center; color: #000">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Utilidad</th>
                    <th>Inversión</th>
                    <th>Detalles</th>
                </tr>
            </thead>
        </table>
    </div>
</div>

<div id="modal_detalles_venta" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal">Detalle de venta</h5>
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
                <div class="table-responsive">
                    <table  class="table table-striped">
                        <thead>
                            <tr class="">
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Pz</th>
                                <th>SubTotal</th>
                            </tr>
                        </thead>
                        <tbody id='tbl_detalle'>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>