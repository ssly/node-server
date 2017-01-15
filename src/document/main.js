import $ from 'jquery';

$.ajax({
    type: 'GET',
    url: '../getMd',
    success(data) {
        data.forEach((md) => {
            let $mdDom = $(`<li>${md.title}</li>`);
            $mdDom.click(() => {
                location.href = md.src;
            });
            $('#md-list').append($mdDom);
        })
    }
});