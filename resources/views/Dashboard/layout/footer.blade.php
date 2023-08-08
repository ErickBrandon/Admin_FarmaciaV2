<script src="{{asset('assets/js/vendor-all.min.js')}}"></script>
<meta name="csrf-token" content="{{ csrf_token() }}">
    <script>const GlobalToken = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};</script>
<script src="{{asset('assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>
<script src="{{asset('assets/js/pcoded.min.js')}}"></script>
<script src="{{asset('assets/plugins/sweetalert/js/sweetalert.min.js')}}"></script>
<script src="{{asset('js-farmacia/logout.js')}}"></script>
@yield('extras_footer')
</body>
</html>
