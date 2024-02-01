$('#form_traslados').validate({
           
    focusInvalid: false,
    rules: {
        'Traslado_Farmacias': {
            required: true,
        },
        'N_cajas': {
            required: true,
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
$('#form_asignacionVentaPiezas').validate({
           
    focusInvalid: false,
    rules: {
        'precio_ventaPiezas': {
            required: true,
        },
        'cajas_piezas': {
            required: true,
        },
        'pzXcaja': {
            required: true,
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
$('#form_perdidas').validate({
           
    focusInvalid: false,
    rules: {
        'txt_existenciasPerdidas': {
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
$('#form_ajustes').validate({
           
    focusInvalid: false,
    rules: {
        'Ajuste_Costo': {
            required: true,
        },
        'Ajuste_Precio': {
            required: true,
        },
        'Ajuste_Existencias': {
            required: true,
        },
        'Ajuste_caducidad': {
            required: true,
        },
        'Ajuste_PzCaja': {
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
$('#form_asignacionVentaCajas').validate({
           
    focusInvalid: false,
    rules: {
        'pzXcaja_TVC': {
            required: true,
        },
        'cajas_piezas_TVC': {
            required: true,
        },
        'precio_ventaPiezas_TVC': {
            required: true,
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