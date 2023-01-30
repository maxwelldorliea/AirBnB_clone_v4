$(function () {
  const amneityIds = () => {
    const ids = [];
    const isChecked = $('.amenities input:checked');
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

  const stateIds = () => {
    const ids = [];
    const isChecked = $('.locations .popover li > h2 > input:checked');
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
    $('.locations > h4').text(str);
    return ids;
  };

  const cityIds = () => {
    const ids = [];
    const isChecked = $('.locations .popover li > ul > li > input:checked');
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
    $('.locations > h4').text(str);
    return ids;
  };

  const getPlace = (obj) => {
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: function (data) {
        for (const place of data) {
          const template = `
          <article>
            <div class='title_box'>
              <h2>${place.name}</h2>
              <div class='price_by_night'>${place.price_by_night}</div>
            </div>
            <div class='information'>
              <div class='max_guest'>
                ${place.max_guest} ${(place.max_guest > 1 ? 'Guests' : 'Guest')}
              </div>
              <div class='number_rooms'>
                ${place.number_rooms} ${(place.number_rooms > 1 ? 'Bedrooms' : 'Bedroom')}
              </div>
              <div class='number_bathrooms'>
                ${place.number_bathrooms} ${(place.number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom')}
              </div>
            </div>
            <div class='user'>
              <div class='description'>
                ${(place.description ? place.description : '')}
              </div>
            </div>
          </article>
            `;
          $('section.places').append(template);
        }
      }
    });
  };

  getPlace({});
  $('.amenities input[type=checkbox]').on('click', amneityIds);
  $('.locations .popover li > h2 > input[type=checkbox]').on('click', stateIds);
  $('.locations .popover li > ul > li > input[type=checkbox]').on('click', cityIds);
  $('button').click(function () {
    const amneityId = amneityIds();
    const stateId = stateIds();
    const cityId = cityIds();
    const obj = {};
    if (amneityId.length > 0) {
      obj.amenities = amneityId;
    }
    if (stateId.length > 0) {
      obj.states = stateId;
    }
    if (cityId.length > 0) {
      obj.cities = cityId;
    }
    $('.places').empty();
    getPlace(obj);
  });
  $.get('http://localhost:5001/api/v1/status/', function (data, statusTxt) {
    if (statusTxt === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
