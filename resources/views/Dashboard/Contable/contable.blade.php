@extends('Dashboard.layout.master')
@section('extras_header')
<link rel="stylesheet" href="assets/plugins/data-tables/css/datatables.min.css">
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
@section('body-content')
    
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
            </div>
            <div class="card-block">
                <table id="tbl_contable" class="display table dt-responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>Farmacia</th>
                            <th>Cortes de hoy</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

@endsection

@section('extras_footer')
<script src="assets/plugins/data-tables/js/datatables.min.js"></script>
<script src="PDV/Datatable/constructorDatatable_contable.js"></script>
@endsection