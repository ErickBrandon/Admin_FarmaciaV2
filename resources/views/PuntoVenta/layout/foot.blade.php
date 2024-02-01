<meta name="csrf-token" content="{{ csrf_token() }}">
<script>const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};</script>
<script src="{{asset('assets_/main/bootstrap.min.js')}}"></script>

<script src="{{asset('assets_/plugin/sweetalert/js/sweetalert.min.js')}}"></script>

<script src="{{asset('assets_/js/general/logout.js')}}?v={{now()->day}}"></script>

<script src="{{asset('js-farmacia/generalPDV.js')}}?v={{now()->day}}"></script>

@yield('foot_extras')
</body>
</html>