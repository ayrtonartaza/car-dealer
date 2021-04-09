let resultados =document.getElementById('resultados');
const year = document.getElementById('year')
const estado = document.getElementById('estado')
const puertas = document.getElementById('puertas')

const limpiarfiltros = document.getElementById('limpiarfiltros')

window.addEventListener('load',evenlisteners);
function evenlisteners (){
    escribirDatos(autos)
    llenarSelect(autos)
    llenarSelectPuertas()
}

const datosBusqueda ={
    marca:'',
    epoca:null,
    estado:'',
    puertas:''
}

/* escuchar selects */
year.addEventListener('change',determinarEpoca)
function determinarEpoca (e){
    datosBusqueda.epoca =e.target.value;
    filtrarAuto()
}
estado.addEventListener('change',determinarEstado)
function determinarEstado(e){
    datosBusqueda.estado =e.target.value;
    console.log(datosBusqueda.estado)
    filtrarAuto()
}
puertas.addEventListener('change',determinarPuertas)
function determinarPuertas(e){
    datosBusqueda.puertas =e.target.value;
    filtrarAuto()
}


function escribirDatos (autos){
    limpiarDatosHtml()
    autos.forEach(i =>{
        const {marca,epoca,estado,puertas} = i;
        const autohtml = document.createElement('p');
        autohtml.textContent=`
            ${marca} ${epoca} ${estado} ${puertas} 
        `
        resultados.appendChild(autohtml)
        return autohtml;
    })
}

function limpiarDatosHtml(){
    while(resultados.firstChild){
        resultados.removeChild(resultados.firstChild)
    }
}


/* poner los valores en los selects */
function llenarSelect (){
    for (let i = 2020; i >= 2010; i--) {
        let option = document.createElement('option');
        option.textContent= i;
        year.appendChild(option) 
    }
}
function llenarSelectPuertas(){
    let option1 = document.createElement('option');
    let option2= document.createElement('option');
    option1.textContent=`4 puertas`;
    option2.textContent=`2 puertas`;
    option1.value=4;
    option2.value=2;
    let options =[option1,option2]
    for (let i = 0; i < autos.length; i++) {
        puertas.appendChild(options[i])
    }
}

/* filtrar global*/
function filtrarAuto(){
    const resultado = autos.filter(filtrarEpoca).filter(filtrarEstado).filter(filtrarPuertas)
    if(resultado.length){
        escribirDatos(resultado)
    }else{
        noResultado()
    }
}
function noResultado(){
    limpiarDatosHtml()


    const noResultado = document.createElement('p');
    noResultado.textContent = 'No tenemos disponibles autos con esas caracteristicas';
    resultados.appendChild(noResultado)
}

/* filtrar por caracteristicas */
function filtrarEpoca(auto){
    if(datosBusqueda.epoca){
        return auto.epoca == datosBusqueda.epoca;
    }
    return auto;
}
function filtrarEstado(auto){
    if(datosBusqueda.estado){
        return auto.estado == datosBusqueda.estado;
    }
    return auto;
}
function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas == datosBusqueda.puertas;
    }
    return auto;
}
limpiarfiltros.addEventListener('click',limpiarFiltros)
function limpiarFiltros(auto){
    escribirDatos(autos)
}
/* poner todos los modelos sin inmportar una caracteristica particular */

/* function escribit */
/* nota para mi: en la funcion filtrar auto en vez de pasar el parametro ahi mismo
se pasa en lafuncion que filtra autos.filter(item => item.epoca )*/