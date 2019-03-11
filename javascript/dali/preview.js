function preview() {
    var name = $('#name').val();
    var nameLabel = $('label[for="name"]').text();
    var nameInfo = '<p><strong>' + nameLabel + '</strong> : ' + name + '</p>';

    var birthday = $('#birthday').val();
    var birthdayLabel = $('label[for="birthday"]').text();
    var birthdayInfo = '<p><strong>' + birthdayLabel + '</strong> : ' + birthday + '</p>';

    var data = nameInfo + birthdayInfo;
    $('#preview_data').html('');
    $('#preview_data').append(data);
    $('#preview_data').dialog({
        resizable: false,
        modal: true,
        buttons: {
            'Submit': submit,
            'Edit': function () {
                $(this).dialog("close");
            }
        }
    });
}

function submit() {
    $('form').submit();
}