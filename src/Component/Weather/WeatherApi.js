import { useState, useEffect } from "react";

const WeatherApi = () => {
    const [city, setCity] = useState();
    const [pawan, setPawan] = useState();
    const [country, setCountry] = useState();
    const [search, setSearchQuery] = useState("delhi");
    // Toggle button in Dark theme
    const [theme, setTheme] = useState("light-theme");
    const [toggleName, setToggleName] = useState("Dark Mode");
    const ToggleBtn = ()=>{
        if(theme === "light-theme"){
            setTheme("dark-theme");
            setToggleName("Light Mode");
        }else{
            setTheme("light-theme");
            setToggleName("Dark Mode");
        }
    };
    useEffect(()=>{
        document.body.className = theme;
    }, [theme]);
    useEffect(() => {
        const fetchApi = async () => {
            try{
                const WeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b99c699cb798c2b2ca8519c21f0ec9fc`;
                let response = await fetch(WeatherLink);
                let data = await response.json();
                // console.log(data);
                setCity(data.main);
                setPawan(data.wind);
                setCountry(data.sys);
            }catch(error){
                console.log("something wrong",error);
            }            
        }
        fetchApi();
    }, [search])
    return (<>
    {/* Ui Design Box */}
        <section className="weather-box light-theme w-100">
            <div className="container position-relative">
                <div className="toggle-btn text-end pt-3">
                    <button className="btn btn-sm" onClick={ToggleBtn}>{toggleName}</button>
                </div>
                <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="col-md-5">
                        <h5 className="weather-title">Weather Location & Temperature</h5>
                        <div className="card text-center">
                            <div className="card-body">
                            <div className="my-3 ">
                                <div className="form-group px-2">
                                    <input type="search" className="form-control rounded-pill" onChange={(event) => { setSearchQuery(event.target.value) }} value={search} placeholder="Search here" />
                                </div>
                            </div>
                                {!city ? (<p>No Data Found</p>) : (
                                    <>      
                                        <h3 className="mb-0">{city.temp}°C</h3>                                   
                                        <h5 className="text-capitalize mb-3 fs-6">{search}, {country.country}</h5>                                                                               
                                        <div className="weather-desc d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="d-block">{city.temp_min}°C</span>
                                                <span className="d-block">Min Temp</span>
                                            </div>
                                            <div>
                                                <span className="d-block">{city.temp_max}°C</span>
                                                <span className="d-block">Max Temp</span>
                                            </div>
                                            <div>
                                                <span className="d-block">{city.humidity}%</span>
                                                <span className="d-block">Humidity</span>
                                            </div>                                            
                                        </div>
                                        <div>
                                            <span>Wind: </span>
                                            <span>{pawan.speed}m/s</span>
                                        </div>                                        
                                    </>
                                )}                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}
export default WeatherApi;