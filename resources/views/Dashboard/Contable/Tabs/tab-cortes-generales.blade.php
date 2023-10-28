<div class="card-header">
    <h5>Generar corte general</h5>
    <span class="d-block m-t-5">Puedes generar o actualizar un corte general de una fecha anterior</span>
</div><br>
<div class="row">
    <div class="alert alert-secondary col-12" role="alert">
        <form id="form_NCG">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class='input-group input-group-md bg-white mb-3'>
                        <div class='input-group-prepend'>
                            <span class='input-group-text' id='inputGroup-sizing-sm'><span class='fas fa-calendar-alt icon_r text-warning'></span> Día</span>
                        </div>
                        <input type='date' class='form-control' id='txt_fechaNCG' name='txt_fechaNCG' max="{{$FechaMaxima}}">
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <button id="btn_NCG" type="submit" class="btn btn-primary col-12 mb-3"><span></span> Generar</button>
                </div>
            </div>
        </form>
    </div>
</div>
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
    
</div><br>
<div class="row">
    <div class="col-12">
        <div class="card bg-primary bitcoin-wallet">
            <div class="card-block">
                <h2 class="text-white mb-2 f-w-300">Gráfica</h2>
                <h6 class="text-white mb-2">Muestra el corte total histórico considerando las pérdidas</h6>
                <button id='btn_graficar' class="btn btn-sm btn-light col-sm-12 col-md-4">Graficar...</button>
                <i class="fas fa-chart-pie f-70 text-white"></i>
            </div>
        </div>
    </div>
</div>
<div class="card-block">
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