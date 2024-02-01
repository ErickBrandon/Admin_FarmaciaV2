@extends('Dashboard.layout.master')
@section('extras_header')
@endsection
@section('page')Configuración de administradores @endsection
@section('body-content')
<div class="col-xl-12">
    <div class="card">
        <div class="card-header">
            <h5 class="d-flex justify-content-between align-items-center">
                <span class="f-20">Usuarios</span>
                <button id="btn_usuarioNuevo" class="btn btn-icon btn-rounded btn-primary feather icon-plus "></button>
            </h5>
        </div>
        <div class="card-block table-border-style">
            <div class="table-responsive">
                <table id='tbl_Usuarios' class="display table dt-responsive table-striped nowrap" style="width:100%; text-align: center; color: #000">
                    <thead>
                        <tr>
                            <th >Nombre</th>
                            <th >Nombre de usuario</th>
                            <th>Rol</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<div id="Modal_Usuarios" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="titulo_ModalUsuarios"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <form id="form_usuarios_nuevos">
                    <div class='input-group input-group-md mb-3'>
                        <div class='input-group-prepend'>
                            <span class='input-group-text'><span class="fas fa-user text-primary"></span>&nbsp;Usuario</span>
                        </div>
                        <input id='Nombre' type='text' class='form-control' placeholder='Nombre de usuario' name='Nombre' requried>
                    </div>
                    <div class='input-group input-group-md mb-3'>
                        <div class='input-group-prepend'>
                            <label class='input-group-text' for='select_farmacias'><span class='fas fa-child text-warning'></span>&nbsp;Rol</label>
                        </div>
                        <select class='custom-select' id='Rol' name='Rol'>
                             <option value="">- SELECCIONA UN ROL -</option>
                             <option value="Vendedor">Vendedor</option>
                             <option value="Administrador">Administrador</option>
                        </select>
                    </div>
                    <span id='password_admin'>
                        
                    </span>
                </form>
            </div>
            <div class="modal-footer">
                <div class="col-12">
                    <button id="btn_guardarUsuario" type="button" class="btn btn-primary btn-sm col-12">Guardar usuario</button>
                </div>
            </div>
        </div>
    </div>
</div>
@php
    $hash_value = hash_file('sha256', 'assets_/js/Dashboard/usuarios/usuarios.js');
@endphp 
<p>{{$hash_value}}</p>
@endsection

@section('extras_footer')
<script src="{{asset('assets_/plugin/DataTable/js/datatables.min.js')}}"></script>

<script src="{{asset('assets_/js/Dashboard/usuarios/dataTables.js')}}?v={{now()->day}}"></script>

<script src="{{asset('assets_/plugin/jquery-validation/jquery.validate.min.js')}}"></script>
<script src="{{asset('assets_/js/Dashboard/usuarios/forms_validations.js')}}?v={{now()->day}}"></script>


<script 
    src="{{asset('assets_/js/Dashboard/usuarios/usuarios.js')}}?v={{hash_file('sha256', 'assets_/js/Dashboard/usuarios/usuarios.js')}}">
</script>
@endsection