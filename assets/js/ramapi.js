//URL API
const API = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200"; //  CONST POR QUE NUNCA CAMBIA

//OBTENER LOS RESULTADOS DE LA API pasamos por parametros la url de la api que vamos el obtener los resultados
const getData = (api) => {
  return fetch(api) //es una promesa que tiene la respuesta consultar en google
    .then((response) => response.json()) //lo que me trajo lo va a manajar el formato json
    .then((json) => {
      llenarDatos(json.results), paginacion(json); //para sacar los personajes del json y la paginacion
    })
    .catch((error) => {
      console.log("error : ", error);
    });
};

//dibujar cards de los personajes
const llenarDatos = (data) => {
  let html = "";
  data.forEach((personajes) => {
    html += '<div class="col mt-5">'; //aqui dibujamos las cards para los persoanejes
    html += '<div class="card" style="width: 10rem;">';
    html += '<div class="card-body">';
    html += `<h5 class="card-title">${personajes.name}</h5>`;
    html += "</div>";
    html += "</div>";
    html += "</div>";
  });
  document.getElementById("datosPersonajes").innerHTML = html;
};

//paginacion
const paginacion = (data) => {
  let preDisabled = "";
  let nextDisabled = "";

//if de manera antigua sin optimizar
//   if (data.prev == null) {
//     preDisabled = "disabled";
//   } else {
//     preDisabled = "";
//   }

//   if (data.next == null) {
//     nextDisabled = "disabled";
//   } else {
//     nextDisabled = "";
//   }

//otra forma de simplificar el if cuando solo es una condicion a comparar forma simplificada conocido como operardor ternario
 data.previous ==null ? preDisabled ="disabled" : preDisabled ="";
 data.next ==null ? nextDisabled ="disabled" : nextDisabled ="";


//forma 'sin optimizar
 let html="";
 html += `<li class="page-item ${preDisabled}"><a class="page-link" onclick="getData('${data.previous}')">Previous</a></li>`;
 html += `<li class="page-item ${nextDisabled}"><a class="page-link" onclick="getData('${data.next}')">NEXT</a></li>`;


//forma optimizada de lo anterior
//  let html = `<li class="page-item ${preDisabled}"><a class="page-link" onclick="getData('${data.prev}')">Previous</a></li><li class="page-item ${nextDisabled}"><a class="page-link" onclick="getData('${data.next}')">NEXT</a></li>`;
  

  //forma optimizada en conjunto con el operador ternario y lo anterior 
  // let html = `<li class="page-item ${data.prev ==null ? preDisabled ="disabled" : preDisabled =""}"><a class="page-link" onclick="getData('${data.prev}')">Previous</a></li><li class="page-item ${data.next ==null ? nextDisabled ="disabled" : nextDisabled =""}"><a class="page-link" onclick="getData('${data.next}')">NEXT</a></li>`;

  document.getElementById("paginacion").innerHTML = html;
};

//se ejecuta la api
getData(API);
