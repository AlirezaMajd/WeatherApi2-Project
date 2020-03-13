import React from 'react'


const Weather = props=>{
    return(
        <div className="container">
            <div className="cards">
               <h1>{props.city}</h1>
                <h5 className="py-4"></h5>
                    <i className={`wi ${props.weatherIcon} display-1`}/>
                    {props.Temp_celsius ? <h1 className="py-2">{props.Temp_celsius}&deg;</h1> :null }   
                    {minmaxTemp(props.Temp_min,props.Temp_max)}
                    <h4 className="py-3">{props.description}</h4>
            </div>
           
        </div>
    )
}

function minmaxTemp(min,max){
    if(min && max){
        return(
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        )

    }
    
}
export default Weather