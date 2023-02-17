'use strict';
$(document).ready(function() {
    $(function() {
        // se cambio form-group por input-grupo
        console.log("dentro de la validación");
        $('#from_body').validate({
           
            focusInvalid: false,
            rules: {
                'Codigo': {
                    required: true,
                    minlength: 5,

                },
                'Producto': {
                    required: true,
                    minlength: 5,
                },
                'Precio': {
                    required: true,
                },
               
                'Existencias': {
                    required: true,
                    minlength: 1,
                },
                'Caducidad': {
                    required: true,
                },
                'Finalidad': {
                    required: true,
                },
                'Costo': {
                    required: true,
                },
                'CostoAnterior': {
                    required: true,
                },
                'Proveedor': {
                    required: true
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
