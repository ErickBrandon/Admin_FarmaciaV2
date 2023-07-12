'use strict';
$(document).ready(function() {
    $(function() {
        // [ Add phone validator ] start
        $.validator.addMethod(
            'llave_format',
            function(value, element) {
                return this.optional(element) || /^[0-9]+$/.test(value);
            },
            'La llave no es una serie numérica.'
        );

        // [ Initialize validation ] start
        $('#form_farmacias').validate({
            ignore: '.ignore, .select2-input',
            focusInvalid: false,
            rules: {
                'Farmacia': {
                    required: true,
                    minlength: 3,

                },
                /* 'Vendedor': {
                    required: true,
                }, */
                'Llave':{
                    required:true,
                    llave_format:true,
                }
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
