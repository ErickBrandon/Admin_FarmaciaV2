<div class="card-header">
    <h5>Tipo de consulta</h5>
    <span class="d-block m-t-5">Seleccione una opción para consultar su información</span>
</div><br>
    <div class="row">
        <div class="col-xl-3 col-md-5 mb-4">
            <div class='input-group input-group-md mb-3'>
                <div class='input-group-prepend'>
                    <label class='input-group-text' for='Farmacias_CF'><span class='fas fa-store-alt text-primary'></span></label>
                </div>
                <select class='custom-select' id='Farmacias_CF' name='Farmacias_CF' requried>
                    <option value='0'>Todas las farmacias</option>
                    @foreach ($Farmacias as $farmacia)
                        <option value={{$farmacia->id}}>{{$farmacia->Farmacia}}</option>
                    @endforeach
                </select>
            </div>
        </div>    
        <div class="col-xl-3 col-md-5 mb-4">
            <div class='input-group input-group-md mb-3'>
                <div class='input-group-prepend'>
                    <label class='input-group-text' for='tipo_registro_CF'><span class='fas fa-clipboard-list text-primary'></span></label>
                </div>
                <select class='custom-select' id='tipo_registro_CF' name='tipo_registro_CF' onchange="consulta_fechasCF(this.value)">
                    <option value='0'>Todos los registros</option>
                    <option value='1'>Por día</option>
                    <option value='2'>Entre dos fechas</option>
                </select>
            </div>
        </div> 
        <form id="form_HCF" class="col-xl-6 col-md-12 mb-4">
            <div id="cont_fechasCF" class="col-12">
            
            </div>
        </form>
        
        <button class="btn btn-primary btn-sm col-12" onclick="HistorialCF()">Consultar</button>
    </div>

<div class="row">
    <span id='Descripcion_tblCG' class="d-block m-t-5"></span>
    <div class="col-12"><br>
        <table id="tbl_HCF" class="display table dt-responsive table-striped nowrap" style="width:100%; text-align: center; color: #000">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Farmacia</th>
                    <th>Corte</th>
                    <th>Utilidad</th>
                    <th>Inversión</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
