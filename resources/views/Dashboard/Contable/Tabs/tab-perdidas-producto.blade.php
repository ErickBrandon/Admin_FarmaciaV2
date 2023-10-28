<div class="card-header">
    <h5>Pérdida de productos</h5>
    <span class="d-block m-t-5">Puedes consultar los productos que se marcaron como pérdida en cada uno de los almacenes</span>
</div><br>
<div class="row">
    <button class="btn btn-primary btn-sm col-12" id='btn_consultarPerdida'>Consultar pérdidas</button>
</div><br>
<div class="row">
    <div class="col-md-6 col-sm-12">
        <div class="card table-card">
            <div class="row-table">
                <div class="col-auto bg-danger text-white p-t-5 p-b-5">
                    <i class="fas fa-thumbs-down f-30"></i>
                </div>
                <div class="col text-center">
                    <span class="text-uppercase d-block m-b-10">Total de productos perdidos</span>
                    <h3 class="f-w-300" id="lbl_tpt"></h3>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-sm-12">
        <div class="card table-card">
            <div class="row-table">
                <div class="col-auto bg-danger text-white p-t-5 p-b-5">
                    <i class="fas fa-dollar-sign f-30"></i>
                </div>
                <div class="col text-center">
                    <span class="text-uppercase d-block m-b-10">Total de perdida</span>
                    <h3 class="f-w-300" id='lbl_totalPerdida'></h3>
                </div>
            </div>
        </div>
    </div>
</div>
<div  class="row">
    <div class="col-12">
        <table id="HistorialPerdidas" class="display table dt-responsive table-striped nowrap" style="width:100%; text-align: center; color: #000">
            <thead>
                <tr>
                    <th>Farmacia</th>
                    <th>Producto</th>
                    <th>Costo x Producto</th>
                    <th>No. Productos</th>
                    <th>Tipo de venta</th>
                    <th>Pérdida total</th>
                    <th>Fecha de pérdida</th>
                </tr>
            </thead>
        </table>
    </div>
</div>