@extends('Dashboard.layout.master')
@section('extras_header')
@endsection
@section('body-content')
    
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    <span class="f-20">Farmacias</span>
                    <button id='btn_nuevaFarmacia' class="btn btn-icon btn-rounded btn-primary"><i class="fas fa-plus-circle"></i></button>
                </h5>
            </div>
            <div class="card-block">
                <table id="tbl_farmacia" class="display table dt-responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Farmacia</th>
                            <th>Dirección</th>
                            <th>Colonia</th>
                            <th>Vendedor</th>
                            <th>Llave</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div id="modal_farmacias" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tituloModalFarmacia"></h5>
                    <button class="btn btn-light" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div id="modal-body" class="modal-body">
                    <form id="form_farmacias">
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text'><span class="fas fa-hospital-alt text-primary"></span>&nbsp;Farmacia</span>
                            </div>
                            <input id='Farmacia' type='text' class='form-control' placeholder='Nombre de la farmacia' name='Farmacia' requried>
                        </div>
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text'><span class="fas fa-street-view text-primary"></span>&nbsp;Calle y Número</span>
                            </div>
                            <input id='Calle_Numero' type='text' class='form-control' placeholder='Dirección' name='Calle_Numero' requried>
                        </div>
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text'><span class="fas fa-map-marker-alt text-primary"></span>&nbsp;Colonia</span>
                            </div>
                            <input id='Colonia' type='text' class='form-control' placeholder='Colonia' name='Colonia' requried>
                        </div>
                        <div class="alert alert-warning col-12" role="alert">
                           <span class="fas fa-key"></span>&nbsp; La llave o contraseña sirve para que los vendedores puedan acceder <span class="fas fa-unlock-alt"></span> a la farmacia que están asignados.
                            - <br>La llave <b>sólo</b> puede ser una serie <b>numérica</b>. <br><br>
                            <button id="btn_verLlave" type="button" class="btn btn-dark btn-sm col-12"><i class="fas fa-eye-slash"></i><span>Ver llave</span></button>

                        </div>
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text'><span class="fas fa-key text-success"></span>&nbsp;Llave</span>
                            </div>
                            <input id='Llave' type='password' class='form-control' placeholder='Llave de la farmacia' name='Llave' requried>
                        </div>
                        <div class="alert alert-info col-12" role="alert">
                            No es necesario seleccionar un vendedor para registrar una farmacia, SE PUEDE ASIGNAR DESPUES
                         </div>
                        <div class='input-group input-group-md mb-3'>
                            <div class='input-group-prepend'>
                                <label class='input-group-text' for='select_farmacias'><span class='fas fa-users text-warning'></span>&nbsp;Vendedores</label>
                            </div>
                            <select class='custom-select' id='Vendedor' name='Vendedor' >
                                 <option value="">- SELECCIONA UN VENDEDOR -</option>
                                @foreach ($vendedores as $vendedor)
                                    <option value="{{$vendedor->id}}">{{$vendedor->name." | ".$vendedor->email}}</option>
                                @endforeach
                            </select>
                            
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="btn_form_farmacias" type="button" class="btn btn-primary btn-sm col-12" form="form_farmacias">Guardar</button>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('extras_footer')
<script src="{{asset('assets_/plugin/DataTable/js/datatables.min.js')}}"></script>

<script src="{{asset('assets_/js/Dashboard/farmacias/dataTables.js')}}?v={{now()->day}}"></script>

<script src="{{asset('assets_/plugin/jquery-validation/jquery.validate.min.js')}}"></script>
<script src="{{asset('assets_/js/Dashboard/farmacias/forms_validations.js')}}?v={{now()->day}}"></script>


<script src="{{asset('assets_/js/Dashboard/farmacias/farmacias.js')}}?v={{now()->day}}"></script>
@endsection