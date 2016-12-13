$(document).ready(function() {
    $('#restaurant-form').formValidation({
        framework: 'bootstrap',
        excluded: ':disabled',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'The name is required'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The name must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: 'The username can only consist of alphabetical, number and underscore'
                    }
                }
            },
            description: {
                validators: {
                    notEmpty: {
                        message: 'The description is required'
                    },
                    stringLength: {
                        min: 50,
                        max: 1000,
                        message: 'The description must be more than 50 and less than 1000 characters'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: 'The price is required'
                    },
                    numeric: {
                        message: 'The price must be a number'
                    }
                }
            },
            'size[]': {
                row: '.col-xs-4',
                validators: {
                    notEmpty: {
                        message: 'The size is required'
                    }
                }
            },
            'color[]': {
                row: '.col-xs-4',
                validators: {
                    notEmpty: {
                        message: 'The color is required'
                    }
                }
            },
            availability: {
                row: '.col-xs-4',
                validators: {
                    notEmpty: {
                        message: 'The availability option is required'
                    }
                }
            }
        }
    });

    // By calling Bootstrap Material Design after calling .formValidation()
    // you don't need to adjust the position of feedback icons
    $.material.init();
});