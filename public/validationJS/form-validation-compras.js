$('#form_ProductoNuevo').validate({
           
    focusInvalid: false,
    rules: {

        'Codigo_nuevo': {
            required: true,
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
$(document).ready(function() {
    $('#form_factura').validate()
})
var Rules={}
$('#form_factura').validate({
           
    focusInvalid: false,
    rules:Rules,
        // Errors //
    
    errorPlacement: function errorPlacement(error, element) {
     
         var $parent = $(element).parents('.form-group');
        
    
            // Do not duplicate errors
            if ($parent.find('.jquery-validation-error').length) {
                return;
            }
    
            $parent.append(
                error.addClass('jquery-validation-error small form-text invalid-feedback')
            );
        },
        highlight: function(element) {
            console.log(454545);
            var $el = $(element);
            var $parent = $el.parents('.form-group');
    
            $el.addClass('is-invalid');
            // Select2 and Tagsinput
            if ($el.hasClass('select2-hidden-accessible') || $el.attr('data-role') === 'tagsinput') {
                $el.parent().addClass('is-invalid');
            }
        },
        unhighlight: function(element) {
            $(element).parents('.form-group').find('.is-invalid').removeClass('is-invalid');
        }
    });

