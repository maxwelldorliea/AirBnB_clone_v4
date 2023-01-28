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
});
