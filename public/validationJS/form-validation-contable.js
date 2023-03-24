'use strict';
$('#form_HCG').validate({
           
    focusInvalid: false,
    rules: {

        'Fecha_inicio_CG': {
            required: true,
        },
        'Fecha_fin_CG': {
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
$('#form_HCF').validate({
           
    focusInvalid: false,
    rules: {

        'día_CF': {
            required: true,
        },
        'Fecha_inicio_CF': {
            required: true,
        },
        'Fecha_fin_CF': {
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
$('#form_HV').validate({
           
    focusInvalid: false,
    rules: {

        'día_CV': {
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