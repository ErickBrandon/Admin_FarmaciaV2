'use strict';
$(document).ready(function() {
    $(function() {
        // [ Add phone validator ] start
        $.validator.addMethod(
            'phone_format',
            function(value, element) {
                return this.optional(element) || /^\(\d{3}\)[ ]\d{3}\-\d{4}$/.test(value);
            },
            'Invalid phone number.'
        );

        // [ Initialize validation ] start
        $('#form_proveedores').validate({
            ignore: '.ignore, .select2-input',
            focusInvalid: false,
            rules: {
                'Nombre': {
                    required: true,
                    minlength: 3,

                },
                'Direccion': {
                    required: true,
                    minlength: 3,
                },
                'Telefono': {
                    required: true,
                    minlength: 3,
                },
                'Productos': {
                    required: true,
                    minlength: 3,
                },
            },

            // Errors //

            errorPlacement: function errorPlacement(error, element) {
                var $parent = $(element).parents('.input-group');

                // Do not duplicate errors
                if ($parent.find('.jquery-validation-error').length) {
                    return;
                }

                $parent.append(
                    error.addClass('jquery-validation-error small form-text invalid-feedback')
                );
            },
            highlight: function(element) {
                var $el = $(element);
                var $parent = $el.parents('.input-group');

                $el.addClass('is-invalid');

                // Select2 and Tagsinput
                if ($el.hasClass('select2-hidden-accessible') || $el.attr('data-role') === 'tagsinput') {
                    $el.parent().addClass('is-invalid');
                }
            },
            unhighlight: function(element) {
                $(element).parents('.input-group').find('.is-invalid').removeClass('is-invalid');
            }
        });

    });
});
