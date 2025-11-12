import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repodata, setRepodata] = useState<Repository[]>([]);
  const [weather , setWeather] = useState({
    temp: '',
    desc: '',
    icon: ''
  });

  useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&units=Metric&APIkey=bbfdcce6346a3fc4488a79aafd43feb1')
    .then(respnse => respnse.json())
    .then(result => {
      setWeather({
        temp: result.main.temp,
        desc: result.weather[0].main,
        icon: result.weather[0].icon
      });
    })
    .catch(err => console.error(err))
  }, [])

  type Repository = {
    id: number;
    full_name: string;
    html_url: string;
  }

  const handleClick = () => {
    //Rest API Call
    axios.get<{items: Repository[]}>(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response => setRepodata(response.data.items))
    .catch(err => console.error(err))
  }


  return (
    <>
    <h1>Weather App</h1>
    <p>Temprature: {weather.temp} C</p>
    <p>Description: {weather.desc}</p>
    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='Weather icon' />
    <h4>*********************************************************</h4>
    <br />
    <input value={keyword} onChange={e => setKeyword(e.target.value)} />
    <button onClick={handleClick}>Fetch</button>
    {repodata.length === 0 ? (
      <p>No data available</p>
    ):(
      <table>
        <tbody>
          {repodata.map(repo => (
            <tr key={repo.id}>
              <td>
                <a href={repo.html_url}>{repo.html_url}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </>
  )
}