/**
 * Solar system API integration.
 *
 * Used API: https://api.le-systeme-solaire.net/swagger/
 */

$(document).ready(async function() {
  let page = 1;
  let planetsCount = 0;

  async function loadPlanets() {
    const response = await fetch(`https://api.le-systeme-solaire.net/rest.php/bodies?filter[0]=isPlanet,cs,1&page=${page},5&data=id,englishName,isPlanet,mass,gravity&order=gravity,asc`)
      .then(response => response.json());
    $('#js-planet-body').empty();

    planetsCount = response['bodies'].length;

    for (let i = 0; i < response['bodies'].length; i++) {
      const row = `
        <tr>
          <th>${ (i + 1) + ((page - 1) * 5) }</th>
          <td>${ response['bodies'][i].englishName}</td>
          <td>${ response['bodies'][i].gravity}</td>
        </tr>`
      ;
      $('#js-planet-body').append(row);
    }
  }

  $('#js-space-next-page').on('click', () => {
    if (planetsCount < 5) {
      return;
    }
    page = page + 1;
    loadPlanets();
  });
  $('#js-space-prev-page').on('click', () => {
    if (page < 2) {
      return;
    }
    page = page - 1;
    loadPlanets();
  });

  loadPlanets();
});
