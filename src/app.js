import React from 'react';

import Weather from './app_components/weather.component'
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './weather-icons-master/css/weather-icons.css';
import Form from './app_components/Form.component';


//api.openweathermap.org/data/2.5/weather?q=London,uk
const Api_Key = '9496c1a1152a1bf8e6774b85d67f9fed';
class App extends React.Component{
    constructor(){
        super();
        this.state={
            city:undefined,
            country:undefined,
            icon:undefined,
            main:undefined,
            celsius:undefined,
            temp_max:undefined,
            temp_min:undefined,
            description:"",
            icon:undefined,
            error:false
            

        };
        

        this.weatherIcon = {
            Thunderstorm:"wi-thunderstorm",
            Drizzle:"wi-sleet",
            Rain:"wi-storm-showers",
            Snow:"wi-snow",
            Atmosphere:"wi-fog",
            Clear:"wi-day-sunny",
            Clouds:"wi-day-fog"
        }
    }

    calClsius(temp){
        let cell = Math.floor(temp - 273.15);
        return cell

    }
    get_weatherIcon(icons,rangeId){
        switch(true){
            case rangeId >= 200 && rangeId <=232:
                this.setState({icon:this.weatherIcon.Thunderstorm})
                break;
            case rangeId >= 300 && rangeId <=331:
                this.setState({icon:this.weatherIcon.Drizzle})
                break;
            case rangeId >= 500 && rangeId <=531:
                this.setState({icon:this.weatherIcon.Rain})
                break;

            case rangeId >= 600 && rangeId <=622:
                this.setState({icon:this.weatherIcon.Snow})
                break;

            case rangeId >= 800:
                this.setState({icon:this.weatherIcon.Clear})
                break;
            case rangeId >= 801 && rangeId <=804:
                this.setState({icon:this.weatherIcon.Clouds})
                break;
            default:
                this.setState({icon:this.weatherIcon.Clouds})

        }
    }

    getWeather =async(e)=>{
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
       if(city && country){
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`)

        const response = await api_call.json()
        console.log(response)

        this.setState({
            city:`${response.name},${response.sys.country}`,
            
            celsius:this.calClsius(response.main.temp),
            temp_min:this.calClsius(response.main.temp_min),
            temp_max:this.calClsius(response.main.temp_max),
            description:response.weather[0].description,
            error:false
        })
        this.get_weatherIcon(this.weatherIcon,response.weather[0].id)
       }else{
           this.setState({error:true});
          
       }
    }
  
    render(){
        return(
            <div className="app"> 
              <Form loadWeather={this.getWeather}  error={this.state.error}/>
              <Weather 
              city={this.state.city} 
              country={this.state.country}
              Temp_celsius={this.state.celsius}
              Temp_min={this.state.temp_min}
              Temp_max={this.state.temp_max}
              description={this.state.description}
              weatherIcon={this.state.icon}
              
              
              />
            </div>
        )
    }
}
export default App