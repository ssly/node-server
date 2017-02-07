function saveLogDate() {

    if (!$('#log-name').val()) {
        $('#log-name').val('佚名');
        return;
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'saveLog',
        data: {
            name: $('#log-name').val(),
            text: $('#log-text').val()
        },
        success(msg) {
            console.log('success!');
        }
    });

    getLogDate(); // 刷新日志
}

function getLogDate() {
    $('#log-list').empty();
    let $logName = $('#log-name');
    if (!$logName.val()) {
        $logName.val('佚名');
    }

    $('#log-text').val('');

    $.ajax({
        type: 'GET',
        url: 'getLog',
        success(result) { // result: Array
            result.forEach((log) => {
                let $logDom = $(`<div>${log.name}: <span class="log-content">${log.text}</span></div>`);
                $logDom.click(() => {
                    delLogDate(log._id);
                });

                $('#log-list').append($logDom);

            })
        }
    });
}
getLogDate(); // 获取所有日志

function delLogDate(id) {
    $.ajax({
        type: 'POST',
        url: 'delLog',
        data: {
            id: id
        },
        success(data) {
            console.log(data);
            getLogDate();
        }
    });
}