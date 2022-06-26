const divConteinerOrdenador = document.querySelector('.divConteinerOrdenador')
const selectTamaño = document.querySelector('.tamaño')
const btnTamano = document.querySelector('.tamano-btn')
const btnSiguiente = document.querySelector('.siguiente')
const btnPosterior = document.querySelector('.posterior')
const extremadamenteFria = document.querySelector('.temperatura-extremadamente-fria')
const fria = document.querySelector('.temperatura-fria')
const tempTierra = document.querySelector('.temperatura-similar-tierra')
const alta = document.querySelector('.temperatura-muy-alta')
const extremadamenteAlta= document.querySelector('.temperatura-extremadamente-alta')
const playBtn = document.querySelector('.playBtn')
const stopBtn = document.querySelector('.stopBtn')
let sound = new Audio('./music/y2mate.com - Cygnus.mp3')

contadorTodos = 0;
contadorMedianos = 0;
contadorGrandes = 0;
contadorColosales = 0;

let planetsJson;
let medianos,gigantes,colosales,frioExtremo,frioAlto,similarTierra,calorExtremo,infierno;

playBtn.addEventListener('click',()=>{
    sound.play();
    sound.volume = 0.3;
    sound.loop=true;
})

stopBtn.addEventListener('click',()=>{
    sound.pause();
})

window.addEventListener('DOMContentLoaded',async()=>{
    
    const planets = await fetch('/planetsFiltered.json')
    planetsJson = await planets.json()
        for(let i=6;i<9;i++){
        funcionTamaño(planetsJson[i])
    }
    btnPosterior.disabled = true;
    btnSiguiente.disabled = true;
    medianos = planetsJson.filter(item =>item.radius>=1 &&  item.radius<=2).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.radius > planet2.radius ? -1 : 1)
    

    gigantes = planetsJson.filter(item => item.radius>=2.1 && item.radius<=6).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.radius > planet2.radius ? -1 : 1)

    colosales = planetsJson.filter(item => item.radius>=6.1).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.radius > planet2.radius ? 1 : -1)

    //temperaturas
    frioExtremo = planetsJson.filter(item => item.temp<=-50).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.temp > planet2.temp? 1 : -1)

    frioAlto = planetsJson.filter(item => item.temp>=-100 && item.temp<=-50).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.temp > planet2.temp? -1 : 1)

    similarTierra = planetsJson.filter(item => item.temp>=-4 && item.temp<=20).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.temp > planet2.temp? 1 : -1)

    calorExtremo = planetsJson.filter(item => item.temp>=300 && item.temp<=1000).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.temp > planet2.temp? 1 : -1)

    infierno = planetsJson.filter(item => item.temp>=1300).map(item=>({
        nombre: item.nombre,
        temp: item.temp,
        radius: item.radius,
        orbitalPeriod: item.orbitalPeriod
    })).sort((planet1,planet2)=>planet1.temp > planet2.temp? -1 : 1)
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
        btnSiguiente.disabled = false;
        btnPosterior.disabled = true;
        for(let i=0;i<3;i++){
            funcionTamaño(planetsJson[i])
        }
    }
    else if(selectTamaño.value=='Mediano'){
        contadorMedianos = 0;
        contadorGrandes = 0;
        contadorColosales = 0;
        contadorTodos=0;
        btnSiguiente.disabled = false;
        btnPosterior.disabled = true;
        for(let i=0;i<3;i++){
            funcionTamaño(medianos[i])
        }
    }
    else if(selectTamaño.value=='Gigante'){
        contadorMedianos = 0;
        contadorGrandes = 0;
        contadorColosales = 0;
        contadorTodos=0;
        btnSiguiente.disabled = false;
        btnPosterior.disabled = true;
        for(let i=0;i<3;i++){
            funcionTamaño(gigantes[i])
        }
    }
    else if(selectTamaño.value=='Colosal'){
        contadorMedianos = 0;
        contadorGrandes = 0;
        contadorColosales = 0;
        contadorTodos=0;
        btnSiguiente.disabled = false;
        btnPosterior.disabled = true;
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

//filtrar temperatura
extremadamenteFria.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=''
    btnPosterior.disabled = true;
        btnSiguiente.disabled = true;
    for(let i=0;i<3;i++){
        funcionTamaño(frioExtremo[i])
    }
})
fria.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=''
    btnPosterior.disabled = true;
    btnSiguiente.disabled = true;
    let rnd = Math.round(Math.random() * (frioAlto.length-3 - 0) + 0);
    for(let i=rnd;i<rnd+3;i++){
        funcionTamaño(frioAlto[i])
    }
})
tempTierra.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=''
    btnPosterior.disabled = true;
    btnSiguiente.disabled = true;
    for(let i=0;i<3;i++){
        funcionTamaño(similarTierra[i])
    }
})
alta.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=''
    let rnd = Math.round(Math.random() * (calorExtremo.length-3 - 0) + 0);
    btnPosterior.disabled = true;
    btnSiguiente.disabled = true;
    for(let i=rnd;i<rnd+3;i++){
        funcionTamaño(calorExtremo[i])
    }
})
extremadamenteAlta.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=''
    btnPosterior.disabled = true;
    btnSiguiente.disabled = true;
    for(let i=0;i<3;i++){
        funcionTamaño(infierno[i])
    }
})

btnSiguiente.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=""
    if(selectTamaño.value=='Mediano'){
        contadorMedianos >= 0 ? btnPosterior.disabled = false : btnPosterior.disabled = true
        contadorMedianos<medianos.length-5 ? contadorMedianos+=3 : btnSiguiente.disabled = true;
        for(let i = contadorMedianos;i<contadorMedianos+3;i++){
            funcionTamaño(medianos[i])
        }
    }
    else if(selectTamaño.value=='Gigante'){
        contadorGrandes >= 0 ? btnPosterior.disabled = false : btnPosterior.disabled = true
        contadorGrandes<gigantes.length-3 ? contadorGrandes+=3 : btnSiguiente.disabled = true;
        for(let i = contadorGrandes;i<contadorGrandes+3;i++){
            funcionTamaño(gigantes[i])
        }
    }
    else if(selectTamaño.value=='Colosal'){
        contadorColosales >= 0 ? btnPosterior.disabled = false : btnPosterior.disabled = true
        contadorColosales<colosales.length-3 ? contadorColosales+=3 : btnSiguiente.disabled = true;
        for(let i = contadorColosales;i<contadorColosales+3;i++){
            funcionTamaño(colosales[i])
        }
    }
    else if(selectTamaño.value=='all'){
        contadorTodos >= 0 ? btnPosterior.disabled = false : btnPosterior.disabled = true
        contadorTodos<planetsJson.length-3 ? contadorTodos+=3 : btnSiguiente.disabled = true;
        let rnd = Math.round(Math.random() * (planetsJson.length-3 - 0) + 0);
        for(let i = rnd;i<rnd+3;i++){
            funcionTamaño(planetsJson[i])
        }
    }
})

btnPosterior.addEventListener('click',()=>{
    divConteinerOrdenador.innerHTML=""
    if(selectTamaño.value=='Mediano'){
        contadorMedianos>=0 ? btnSiguiente.disabled = false : btnSiguiente.disabled = true
        contadorMedianos>=3 ? contadorMedianos-=3 : btnPosterior.disabled = true;
        for(let i=contadorMedianos;i<contadorMedianos+3;i++){
            funcionTamaño(medianos[i])
        }
    }
    else if(selectTamaño.value=='Gigante'){
        contadorGrandes >=0  ? btnSiguiente.disabled = false : btnSiguiente.disabled = true
        contadorGrandes>=3 ? contadorGrandes-=3 : btnPosterior.disabled = true;
        for(let i=contadorGrandes;i<contadorGrandes+3;i++){
            funcionTamaño(gigantes[i])
        }
    }
    else if(selectTamaño.value=='Colosal'){
        contadorColosales >= 0 ? btnSiguiente.disabled = false : btnSiguiente.disabled = true
        contadorColosales>=3 ? contadorColosales-=3 : btnPosterior.disabled = true;
        for(let i=contadorColosales;i<contadorColosales+3;i++){
            funcionTamaño(colosales[i])
        }
    }
    else if(selectTamaño.value=='all'){
        contadorTodos >= 0 ? btnSiguiente.disabled = false : btnSiguiente.disabled = true
        contadorTodos>=3 ? contadorTodos-=3 : btnPosterior.disabled = true;
        for(let i=contadorTodos;i<contadorTodos+3;i++){
            funcionTamaño(planetsJson[i])
        }
    }
})

const funcionTamaño = (obj)=>{
    if(obj.temp >= 600){
        render(obj.nombre,obj.temp,obj.radius,obj.orbitalPeriod,'hell.glb');
    }
    else if(obj.temp >=30 && obj.temp <=599){
        render(obj.nombre,obj.temp,obj.radius,obj.orbitalPeriod,'Mars.glb');
    }
    else if(obj.temp >=-5 && obj.temp <=29){
        render(obj.nombre,obj.temp,obj.radius,obj.orbitalPeriod,'exotierra.glb');
    }
    else if(obj.temp >=-100 && obj.temp <=-6){
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
    <abbr title="Aproximación a la temperatura del planeta. El cálculo de la temperatura de equilibrio supone a) un equilibrio termodinámico entre el flujo estelar incidente y el calor irradiado por el planeta, b) un albedo de Bond (la fracción de la potencia total que incide sobre el planeta y se dispersa hacia el espacio) de 0,3, c) que el planeta y la estrella son cuerpos negros, y d) que el calor se distribuye uniformemente entre los lados diurnos y nocturnos del planeta.">Temperatura: ${temp} C°</abbr>
    <abbr title="El intervalo entre tránsitos planetarios consecutivos.">Periodo Orbital: ${orbitalPeriod} Dias</abbr>
    <abbr title="El radio del planeta. El radio planetario es el producto de la relación entre el radio del planeta y el radio estelar.">Tamaño: ${radius} veces la tierra</abbr>
</div>
<div class="div3">
    <model-viewer class="earth" src="/3d-models/Earth.glb" style="height:${radius<5 ? 60 : 30}px; width:${radius<5 ? 60 : 30}px;"ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="0" loading="eager" disable-pan disable-zoom></model-viewer>
    <model-viewer class="${nombre}" src="/3d-models/${skin}" style="height:${radius<5 ? 60*radius : 30*radius}px; width:${radius<5 ? 60*radius : 30*radius}px;" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="0" loading="eager"disable-pan disable-zoom></model-viewer>
</div>
</div>
`
}
