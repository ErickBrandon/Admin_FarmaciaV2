@extends('Dashboard.layout.master')
@section('extras_header')
@endsection

@section('body-content')
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    <span>Proveedores  </span>
                    <button class="btn btn-icon btn-rounded btn-primary feather icon-plus " data-toggle="modal" data-target="#modal_proveedores" onclick="form_agregar()"></button>
                </h5>
            </div>
            <div class="card-block">
                    <table id="tbl_proveedor" class="display table dt-responsive nowrap" style="width:100%">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        
                    </table>
            </div>
        </div>
    </div>
    <div id="modal_proveedores" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tituloModal">Modal Title</h5>
                    <button class="btn btn-light" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div id="modal-body" class="modal-body">
                    <form id='form_proveedores'>
                        @csrf
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="btn_form_proveedores" type="submit" class="btn btn-primary" form="form_proveedores" >Guardar</button>
                </div>
            </div>
        </div>
    </div>
    
@endsection
@section('extras_footer')
<script src="{{asset('assets_/plugin/DataTable/js/datatables.min.js')}}"></script>
<script src="{{asset('assets_/js/Dashboard/proveedores/dataTables.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets_/plugin/jquery-validation/jquery.validate.min.js')}}"></script>
<script src="{{asset('assets_/js/Dashboard/proveedores/forms_validations.js')}}?v={{now()->day}}"></script>
<script src="{{asset('assets_/js/Dashboard/proveedores/proveedores.js')}}?v={{now()->day}}"></script>



<script src="{{asset('assets/plugins/notification/js/bootstrap-growl.min.js')}}"></script>
@endsection