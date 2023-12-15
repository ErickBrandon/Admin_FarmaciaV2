<div id="modal_traslado" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalPopoversLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div id='modal_header_traspaso' class="modal-header">
                <h5 class="modal-title text-white" id="tituloModal"><span class="fas fa-ambulance mr-3"></span>Traslado de productos</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close" ><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <p><b>Código:</b> <span id="txt_codigo"></span></p>
                    </div>
                    <div class="col-12">
                        <p><b>Producto:</b> <span id="txt_producto"></span>
                        </div></p>
                    <div class="col-12">
                        <p><b>Existencias:</b> <span id="txt_existencias"></span></p>
                    </div>
                </div>
                <form id='form_traslados'>
                    <div class="row">
                        <div class="input-group input-group-md mb-3 col-12">
                            <label class="col-12">Farmacia de destino del traslado</label>
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="Proveedor"><i class="fas fa-hospital text-info"></i>&nbsp;Farmacias</label>
                            </div>
                            <select class="custom-select" id="Traslado_Farmacias" name="Traslado_Farmacias" requried>
                                <option value="">- Selecciona una farmacia -</option>
                                @foreach ($Farmacias as $f)
                                    <option value="{{$f->id}}">{{$f->Farmacia}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="input-group input-group-md mb-3 col-12">
                            <div class="input-group-prepend">
                                <span class="input-group-text "><span class="fas fa-box text-primary"></span>&nbsp;Cajas</span>
                            </div>
                            <input id="N_cajas" type="number" class="form-control" placeholder="Número de cajas" name="N_cajas" requried min=1 max="">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="col">
                    <button type="submit" class="btn btn-primary col-12" form='from_body' id="btn_formTraslado">Traspasar producto</button>
                </div>
            </div>
        </div>
    </div>
</div>