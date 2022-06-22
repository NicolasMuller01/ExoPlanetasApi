const divConteinerOrdenador = document.querySelector('.divConteinerOrdenador')
const selectTamaño = document.querySelector('.tamaño')
const btnTamano = document.querySelector('.tamano-btn')
const btnSiguiente = document.querySelector('.siguiente')
const btnPosterior = document.querySelector('.posterior')

contadorTodos = 0;
contadorMedianos = 0;
contadorGrandes = 0;
contadorColosales = 0;

let planetsJson;
let medianos,gigantes,colosales;
window.addEventListener('DOMContentLoaded',async()=>{
    const planets = await fetch('/planetsFiltered.json')
    planetsJson = await planets.json()
        for(let i=6;i<9;i++){
        funcionTamaño(planetsJson[i])
    }
    btnPosterior.disabled = true;
    btnSiguiente.disabled = true;
    medianos = planetsJson.filter(item =>item.radius>=1 &&  item.radius<=1.5).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.radius > planet2.radius ? -1 : 1)

    gigantes = planetsJson.filter(item => item.radius>=1.6 && item.radius<=3).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.radius > planet2.radius ? -1 : 1)

    colosales = planetsJson.filter(item => item.radius>=3.1).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.radius > planet2.radius ? 1 : -1)

})

btnTamano.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=''
    contadorMedianos = 0;
    contadorGrandes = 0;
    contadorColosales = 0;
    if(selectTamaño.value=='Pequeño'){
        const pequeños = planetsJson.filter(item =>item.radius<1).map(item=>({
            nombre: item.nombre,
            temp: item.temp,
            radius: item.radius,
            orbitalPeriod: item.orbitalPeriod
        })).sort((planet1,planet2)=>planet1.radius > planet2.radius ? 1 : -1)
        btnPosterior.disabled = true;
        btnSiguiente.disabled = true;
        for(let i=0;i<3;i++){
            funcionTamaño(pequeños[i])
        }
    }
    else if(selectTamaño.value=='all'){
        contadorMedianos = 0;
        contadorGrandes = 0;
        contadorColosales = 0;
        contadorTodos=0;
        for(let i=contadorTodos;i<contadorTodos+3;i++){
            funcionTamaño(planetsJson[i])
        }
        btnSiguiente.disabled = false;
    }
    else if(selectTamaño.value=='Mediano'){
        contadorMedianos = 0;
        contadorGrandes = 0;
        contadorColosales = 0;
        contadorTodos=0;
        btnSiguiente.disabled = false;
        for(let i=contadorMedianos;i<contadorMedianos+3;i++){
            funcionTamaño(medianos[i])
        }
    }
    else if(selectTamaño.value=='Gigante'){
        contadorMedianos = 0;
        contadorGrandes = 0;
        contadorColosales = 0;
        contadorTodos=0;
        btnSiguiente.disabled = false;
        for(let i=contadorGrandes;i<contadorGrandes+3;i++){
            funcionTamaño(gigantes[i])
        }
    }
    else if(selectTamaño.value=='Colosal'){
        contadorMedianos = 0;
        contadorGrandes = 0;
        contadorColosales = 0;
        contadorTodos=0;
        btnSiguiente.disabled = false;
        for(let i=0;i<3;i++){
            funcionTamaño(colosales[i])
        }
    }
    else{
        for(let i=6;i<9;i++){
            funcionTamaño(planetsJson[i])
        }
        btnPosterior.disabled = true;
        btnSiguiente.disabled = true;
    }
})

btnSiguiente.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=""
    if(selectTamaño.value=='Mediano'){
        for(let i = contadorMedianos;i<contadorMedianos+3;i++){
            funcionTamaño(medianos[i])
        }
        contadorMedianos<medianos.length-3 ? contadorMedianos+=3 : btnSiguiente.disabled = true;
    }
    else if(selectTamaño.value=='Gigante'){
        for(let i = contadorGrandes;i<contadorGrandes+3;i++){
            funcionTamaño(gigantes[i])
        }
        contadorGrandes<gigantes.length-20 ? contadorGrandes+=3 : btnSiguiente.disabled = true;
    }
    else if(selectTamaño.value=='Colosal'){
        for(let i = contadorColosales;i<contadorColosales+3;i++){
            funcionTamaño(colosales[i])
        }
        contadorColosales<colosales.length-3 ? contadorColosales+=3 : btnSiguiente.disabled = true;
    }
    else if(selectTamaño.value=='all'){
        for(let i = contadorTodos;i<contadorTodos+3;i++){
            funcionTamaño(planetsJson[i])
            console.log(i)
        }
        contadorTodos<105 ? contadorTodos+=3 : btnSiguiente.disabled = true;
    }
})

btnPosterior.addEventListener('click',()=>{

})

const funcionTamaño = (obj)=>{
    if(obj.temp >= 600){
        render(obj.nombre,obj.temp,obj.radius,obj.orbitalPeriod,'hell.glb');
    }
    else if(obj.temp >=30 && obj.temp <=599){
        render(obj.nombre,obj.temp,obj.radius,obj.orbitalPeriod,'Mars.glb');
    }
    else if(obj.temp >=0 && obj.temp <=30){
        render(obj.nombre,obj[i].temp,obj.radius,obj[i].orbitalPeriod,'Jupiter.glb');
    }
    else if(obj.temp >=-100 && obj.temp <=-1){
        render(obj.nombre,obj.temp,obj.radius,obj.orbitalPeriod,'cold.glb');
    }
    else if(obj.temp <=-101){
        render(obj.nombre,obj.temp,obj.radius,obj.orbitalPeriod,'Neptune.glb');
    }
}

const render = (nombre,temp,radius,orbitalPeriod,skin)=>{  
return divConteinerOrdenador.innerHTML+=
`<div class="planetConteiner">
<div class="div1">
    <model-viewer class="icono" src="/3d-models/${skin}" style="height:150px; width:150px; ar ar-modes="webxr scene-viewer quick-look" shadow-intensity="0" camera-controls disable-pan disable-zoom></model-viewer>
    <h1>${nombre}</h1>
</div>
<div class="div2">
    <h2>Temperatura: ${temp} C°</h2>
    <h2>Periodo Orbital: ${orbitalPeriod} Dias</h2>
    <h2>Tamaño: ${radius} veces la tierra</h2>
</div>
<div class="div3">
    <model-viewer class="earth" src="/3d-models/Earth.glb" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="0" loading="eager" disable-pan disable-zoom></model-viewer>
    <model-viewer class="${nombre}" src="/3d-models/${skin}" style="height:${radius<6 ? 60*radius : 30*radius}px; width:${radius<6 ? 60*radius : 30*radius}px;" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="0" loading="eager"disable-pan disable-zoom></model-viewer>
</div>
</div>
`
}
