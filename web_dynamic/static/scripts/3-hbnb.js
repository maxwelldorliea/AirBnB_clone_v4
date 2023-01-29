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

  const getPlace = () => {
    const obj = {};
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: function (data) {
        for (const place of data) {
          $('section.places').append(`<article><div class='title_box'><h2>${place.name}</h2></div></article>`);
          $('div.title_box').append(`<div class='price_by_night'>${place.price_by_night}</div>`);
          $('section.places > article').append(`<div class='information'><div class='max_guest'>${place.max_guest} ${(place.max_guest > 1 ? 'Guests' : 'Guest')}</div>`);
          $('section.places > article > div.information').append(`<div class='number_rooms'>${place.number_rooms} ${(place.number_rooms > 1 ? 'Bedrooms' : 'Bedroom')}</div>`);
          $('section.places > article > div.information').append(`<div class='number_bathrooms'>${place.number_bathrooms} ${(place.number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom')}</div>`);
          $('section.places > article').append(`<div class='user'><div class='description'>${(place.description ? place.description : '')}</div></div>`);
        }
      }
    });
  };

  getPlace();
  $('input[type=checkbox]').on('click', addOrRemoveId);

  $.get('http://localhost:5001/api/v1/status/', function (data, statusTxt) {
    if (statusTxt === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
