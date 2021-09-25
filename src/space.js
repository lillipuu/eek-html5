/**
 * Solar system API integration.
 *
 * Used API: https://api.le-systeme-solaire.net/swagger/
 */


$(document).ready(async function() {
  const response = await fetch('https://api.le-systeme-solaire.net/rest.php/bodies?filter[0]=isPlanet,cs,1&page=1,5&data=id,englishName,isPlanet,mass,gravity&order=gravity,asc')
    .then(response => response.json());

  for (let i = 0; i < response['bodies'].length; i++) {
    const row = `
      <tr>
        <th>${i + 1}</th>
        <td>${ response['bodies'][i].englishName}</td>
        <td>${ response['bodies'][i].gravity}</td>
      </tr>`
    ;
    $('.js-planet-body').append(row);
  }
});
