$('#form_usuarios_nuevos').validate({
    //ignore: '.ignore, .select2-input',
    focusInvalid: false,
    rules: {
        'Nombre': {
            required: true,
            minlength: 3,

        },
        'Rol': {
            required: true,
        },
        'password': {
            required: true,
        },
        'password_confirm': {
            required: true,
            equalTo: 'input[name="password"]'
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
