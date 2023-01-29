$(function () {
  const addOrRemoveId = () => {
    const ids = [];
    const isChecked = $('input:checked');
    let str = '';
    let i = 0;
    for (const ele of isChecked) {
      ids.push($(ele).attr('data-id'));
      if (i !== 0) {
        str += ', ';
      }
      str += $(ele).attr('data-name');
      i++;
    }
    $('.amenities > h4').text(str);
    return ids;
  };

  $('input[type=checkbox]').on('click', addOrRemoveId);

  $.get('http://localhost:5001/api/v1/status/', function (data, statusTxt) {
    if (statusTxt === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
