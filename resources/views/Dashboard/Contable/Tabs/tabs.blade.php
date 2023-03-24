<div class="col-sm-12">
    <div class="card">
        <div class="card-header">
            <h5><span class="fas fa-history"></span> Históricos</h5>
        </div><br>
        <div class="alert alert-warning" role="alert">
            Por seguridad en los históricos se excluirá los resultados existentes del día de hoy por lo que no se podrá interactuar con dicha información.
        </div>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="tab-cortes-generales" data-toggle="pill" href="#pills-cortes-generales" role="tab" aria-controls="pills-cortes-generales" aria-selected="true">
                    <span class="fas fa-donate f-20"></span> 
                    <span> Cortes Generales</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="tab-cortes-farmacias" data-toggle="pill" href="#pills-cortes-farmacias" role="tab" aria-controls="pills-cortes-farmacias" aria-selected="false">
                    <span class="fas fa-piggy-bank f-20"></span>
                    <span>Cortes por farmacia</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="tab-ventas" data-toggle="pill" href="#pills-ventas" role="tab" aria-controls="pills-ventas" aria-selected="false">
                    <span class="fas fa-shopping-cart f-20"></span>
                    <span>Ventas</span>
                </a>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-cortes-generales" role="tabpanel" aria-labelledby="tab-cortes-generales">
                @include('Dashboard.Contable.Tabs.tab-cortes-generales')
            </div>
            <div class="tab-pane fade" id="pills-cortes-farmacias" role="tabpanel" aria-labelledby="tab-cortes-farmacias">
                @include('Dashboard.Contable.Tabs.tab-cortes-farmacia')
            </div>
            <div class="tab-pane fade" id="pills-ventas" role="tabpanel" aria-labelledby="tab-ventas">
                @include('Dashboard.Contable.Tabs.tab-ventas')
            </div>
        </div>  
    </div>
    
</div>