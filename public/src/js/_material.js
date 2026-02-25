/**
 * Created by David on 20.02.2015.
 */
(function ($) {
    'use strict';

    $('#equipment .btn').click(function () {
        var col = $(this).closest('.col');
        var str = '1x ' + jQuery.trim(col.find('.material-title').text()) + ' (' + jQuery.trim(col.find('.material-preis').text()) + ' CHF)' + '\n';
        if (col.hasClass('active')) {
            col.removeClass('active');
            $('#listartikel').val($('#listartikel').val().replace(str, ''));
            if ($('#listartikel').val() == '' || $('#listartikel').val() == null) {
                $('#materialformular').addClass('hidden');
            }
        } else {
            col.addClass('active');
            $('#listartikel').val($('#listartikel').val() + str);
            $('#materialformular').removeClass('hidden');
            $('#materialform').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    telefon: {
                        required: true,
                        digits: true
                    },
          /**          datevon: {
                        required: true,
                        date: true
                    },
                    datebis: {
                        required: true,
                        date: true
                    },         */
                    message: {
                        required: true,
                        minlength: 100
                    }
                },
                messages: {
                    name: {
                        required: "Bitte gib deinen Namen an.",
                        minlength: "Der Name muss mindestens 2 Buchstaben enthalten."

                    },
                    email: {
                        required: "Bitte gib deine E-Mail Adresse an.",
                        email: "Diese E-Mail Adresse ist nicht korrekt."
                    },
                    telefon: {
                        required: "Bitte gib eine Telefonnummer an.",
                        digits: "Es sind nur Zahlen als Telefonnummer erlaubt"
                    },
            /**        datevon: {
                        required: "Bitte gib ein Startdatum an.",
                        date: "Das Datum ist nicht korrekt."
                    },
                    datebis: {
                        required: "Bitte gib ein Enddatum an.",
                        date: "Das Datum ist nicht korrekt."
                    },               */
                    message: {
                        required: "Bitte gib eine genaue Beschreibung an, wofür du das Material brauchst.",
                        minlength: "Bitte gib eine genaue Beschreibung an, wofür du das Material brauchst (mind. 100 Zeichen)."
                    }


                }


            });
        }
    })
    ;


    $('#materialformular .btn').click(function () {
        if ($('#materialform').validate().form()) {
            if (!$('#materialformular-success .row-headline').hasClass('hidden')) {
                $('#materialformular-success .row-headline').addClass('hidden');
            }
            if (!$('#materialformular-error .row-headline').hasClass('hidden')) {
                $('#materialformular-error .row-headline').addClass('hidden');
            }


            $.ajax({
                url: 'app/materialmail.php',
                type: 'post',
                data: {
                    "name": $('#name').val(),
                    "email": $('#email').val(),
                    "telefon": $('#telefon').val(),
    //                "datevon": $('#datevon').val(),
    //                "datebis": $('#datebis').val(),
                    "listartikel": $('#listartikel').val(),
                    "message": $('#message').val()
                },
                success: function (response) {
                    if (response == 1) {
                        $('#materialformular-success .row-headline').removeClass('hidden');

                    } else {
                        $('#materialformular-error .row-headline').removeClass('hidden');

                    }
                },
                error: function () {
                    $('#materialformular-error .row-headline').removeClass('hidden');
                }
            });
        }
    });


})
(jQuery);