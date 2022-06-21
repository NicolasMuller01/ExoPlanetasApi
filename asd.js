

window.addEventListener('DOMContentLoaded',async()=>{
    const planets = await fetch('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json')
    const planetsJson = await planets.json()
    const exoPlanets =  planetsJson.filter(item=>item.koi_disposition=="CONFIRMED").map(item=>({
    nombre:item.kepler_name,
    temp:`${Math.round(item.koi_teq-273.15)}`,
    radius:`${item.koi_prad}`,
    orbitalPeriod:`${Math.round(item.koi_period)}`
    }))
})