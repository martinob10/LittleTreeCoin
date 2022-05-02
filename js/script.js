let nuevasCotizaciones = new Array();
const clave_local_storage = "nuevaCotizacion";
cotizadorCripto()
    //Constructor Class
class Criptomoneda {
    constructor(pesos, blue, precioBitcoin, precioEthereum) {
        this.pesos = pesos;
        this.blue = blue;
        this.precioBitcoin = precioBitcoin;
        this.precioEthereum = precioEthereum;
    }
}
//Función convertidor 
function convertidor() {
    //Agrega en variables el valor del formulario
    let pesos = document.getElementById("pesos").value;
    let blue = document.getElementById("blue").value;
    let precioBitcoin = document.getElementById("precioBitcoin").value;
    let precioEthereum = document.getElementById("precioEthereum").value;
    let nuevaCotizacion = new Criptomoneda(pesos, blue, precioBitcoin, precioEthereum);
    nuevasCotizaciones.push(nuevaCotizacion);
    localStorage.setItem(clave_local_storage, JSON.stringify(nuevasCotizaciones));
    generador(pesos, blue, precioBitcoin, precioEthereum);
}

function generador(pesos, blue, precioBitcoin, precioEthereum) {
    // formula para calcular pesos blue y criptos
    let Pesos = pesos / blue;
    let cantidadBtc = Pesos / precioBitcoin;
    let cantidadEth = Pesos / precioEthereum;
    // creacion de equiquetas en el html para poner los resultados
    let new_div = document.createElement("div");
    let new_div_2 = document.createElement("div");
    let new_h3 = document.createElement("h3");
    let new_h4 = document.createElement("h4");
    //se le agrega texto a la etiqueta h3 creada anteriormente
    new_h3.textContent = "Invirtiendo $" + pesos + ". Dolar Blue a u$s" + blue + ". Precio de Bitcoin a: " + precioBitcoin + ". Podes comprar:  " + cantidadBtc + " Satoshis.";
    new_h4.textContent = "O podes comprar " + cantidadEth + " Ethereum."
        //al div creado se le agregan las etiquetas hijas h3
    new_div.appendChild(new_h3);
    new_div_2.appendChild(new_h4);
    let contenedor = document.getElementById("Valor");
    contenedor.appendChild(new_div);
    contenedor.appendChild(new_div_2);
    resetear_form()
}

function resetear_form() {
    document.getElementById("pesos").value = "";
    document.getElementById("blue").value = "";
    document.getElementById("precioBitcoin").value = "";
    document.getElementById("precioEthereum").value = "";
}

function cotizadorCripto() {

    // crea un array toma los valores si los hay del local storage
    let arreglo = localStorage.getItem(clave_local_storage);
    if (arreglo) {
        arreglo = JSON.parse(arreglo);
        nuevasCotizaciones = arreglo;
        for (let i = 0; i < arreglo.length; i++) {
            let cotizado = arreglo[i];
            console.log(cotizado.pesos);
            console.log(cotizado.blue);
            console.log(cotizado.precioBitcoin);
            console.log(cotizado.precioEthereum);
            generador(cotizado.pesos, cotizado.blue, cotizado.precioBitcoin, cotizado.precioEthereum);
        }
    }
}

let btn_cotizar = document.getElementById("btn_cotizar");
// boton cotizador
btn_cotizar.addEventListener("click", () => {
    if (validacion()) {
        convertidor();
    }
})

function validacion() {
    // alojar el valor de lo ingresado en el input en una variable
    let input_pesos = document.getElementById("pesos").value;
    let input_blue = document.getElementById("blue").value;
    let input_precioBitcoin = document.getElementById("precioBitcoin").value;
    let input_precioEthereum = document.getElementById("precioEthereum").value;
    //Resultado es un div en el html
    let mensajeIncompletoP = document.getElementById("Resultado Pesos");
    let mensajeIncompletoB = document.getElementById("Resultado Blue");
    let mensajeIncompleto3 = document.getElementById("Resultado 3");
    //  IMPLEMENTACION  OPERADORES AVANZADOS - OPERADOR LOGICO AND SE REEMPLZADA LOS 4 CONDICIONALES IF
    /* EJ ANTERIOR
    if (!input_pesos) {
        mensajeIncompleto.innerHTML = "Falta la cantidad de Pesos";
        return false;
    }   
    */
    !input_pesos && (mensajeIncompletoP.innerHTML = "Falta la cantidad de Pesos");
    !input_blue && (mensajeIncompletoB.innerHTML = "Falta cotización Blue");
    !input_precioBitcoin && (mensajeIncompleto3.innerText = "Falta cotización del Bitcoin");
    (input_precioEthereum && (mensajeIncompleto3.innerText = " Cotización:")) && convertidor();
}


console.log("Cotización valida solo para el " + new Date())

//Obtenemos el nodo donde vamos a agregar los nuevos elementos
let divPadre = document.getElementById("saludo");
//Array con la información de saludos
let saludoArray = ["Hola Criptomanos!", "Buenas! A cotizar!", "Hola Coders!!", "Buenas Noches!"];
// variables de elegir saludo aleatorio
const rand = Math.floor(Math.random() * saludoArray.length);
let aleatorio = saludoArray[rand];

//Creamos un nodo <h2> y agregamos al padre uno del array de form aleatoria
let h2 = document.createElement("h2");
h2.innerHTML = aleatorio;
divPadre.append(h2);

//Eventos capturas boton
let meGusta = document.getElementById("btnMain")
meGusta.onclick = () => {
    Swal.fire({
        title: 'Gracias!!!',
        color: '#fff',
        text: 'Vamos a seguir mejorando!🤙',
        icon: 'success',
        confirmButtonText: 'Little Tree Coin',
        confirmButtonColor: '#9EE852',

    })
}

// ApiCrypto Compare. con un limite de 3 monedas JSON de btc, eth y usdt
//creacion metodo asincrono
const opcionesCriptoApi = async() => {
    //url de la API
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=3&tsym=USD"

    const respuestaApi = await fetch(url);
    const resultadoApi = await respuestaApi.json();

    console.log(resultadoApi);
    let selectCripto = document.querySelector("#criptoMonedaApi");
    let opcionesApiHtml = `<option value=""> - Selecciona - </option>`;

    resultadoApi.Data.map(opcion => {
        opcionesApiHtml += `<option value="${opcion.CoinInfo.Name}">${opcion.CoinInfo.FullName}</option>`;
    });
    //agregar al html
    selectCripto.innerHTML = opcionesApiHtml;
}

//funcion para cotizar
const cotizarMonedaApi = () => {
    const monedaApi = document.querySelector("#tipoDeMoneda").value;
    const criptoApi = document.querySelector("#criptoMonedaApi").value;


    if (monedaApi === "" || criptoApi === "") {
        mostrarError("#msj-error", "Falta Seleccionar Datos para Cotizar");
        return;
    }
    cotizarConApi(monedaApi, criptoApi);
}

const cotizarConApi = async(monedaApi = "USD", criptoApi = "BTC") => {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoApi}&tsyms=${monedaApi}`;
    const respuestaApi = await fetch(url);
    let resultadoApi = await respuestaApi.json();
    resultadoApi = resultadoApi.DISPLAY[criptoApi][monedaApi];
    let divResultado = document.querySelector("#divResultado");
    divResultado.innerHTML = `<div style="text-align:center"><img src="../cargando.gif" width=80 height=80></div>`;
    setTimeout(() => {
        divResultado.innerHTML = `<div class="precio"> El precio es : <span>${resultadoApi.PRICE}</span></div>`;

    }, 2000);
}


const mostrarError = (elemento, mensaje) => {
    divError = document.querySelector(elemento);
    divError.innerHTML = `<p class="red darken-4 error">${mensaje}</p>`;
    setTimeout(() => { divError.innerHTML = ``; }, 2000);
}