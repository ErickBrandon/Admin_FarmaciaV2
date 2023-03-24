<div class="card-header">
    <h5>Tipo de consulta</h5>
    <span class="d-block m-t-5">Seleccione una opción para consultar su información</span>
</div><br>
<div class="row">
    <div class="col-xl-3 col-md-5 mb-4">
        <h5>Opciones</h5>
        <hr>
        <div class="form-group">
            <label>Todo</label>
            <div class="switch d-inline m-r-10">
                <input type="checkbox" id="switch-1" name="Op_CG" onclick="search_CG()">
                <label for="switch-1" class="cr"></label>
            </div>
            <label>Personalizado</label>
        </div>
    </div>
    <form id="form_HCG" class="col-xl-7 col-md-6 mb-4">
        <div id="cont_personalizada_CG" class="col-12">
        </div>
    </form>
    
    <button class="btn btn-primary btn-sm col-12" onclick="ConsutlarHistorialCG()">Consultar</button>

    <div id="borrar_HCG" class="col-12">
        <br><br>
    </div>
    
</div>
<div class="row">
    <span id='Descripcion_tblCG' class="d-block m-t-5"></span>
    <div class="col-12">
        <table id="tbl_HCG" class="display table dt-responsive table-striped nowrap" style="width:100%; text-align: center; color: #000">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Corte</th>
                    <th>Utilidad</th>
                    <th>Inversión</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
        </table>
    </div>
</div>