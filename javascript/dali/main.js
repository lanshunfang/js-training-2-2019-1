$(() => {
    $('#addBtn').click(() => {
        let $itemToAdd = $('#addItem').val();
        if (!$itemToAdd) {
            alert("You may input something to add!")
        } else {
            $('#toDoList').append('<li class="list-group-item">' + $itemToAdd + '</li>');
            $('input').focus();
        }
    });

    $("#addItem").keyup((event) => {
        if (event.keyCode === 13) {
            $("#addBtn").click();
        }
    });

    $(document).on('dblclick', 'li', function () {
        $(this).toggleClass('strike').fadeOut('slow');
    });

    $('input').focus(function () {
        $(this).val('');
    });

});