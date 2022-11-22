import './style.css';
import Lente from './search.svg'

let searchBtn = document.querySelector('#search');
let cityInp = document.querySelector('#unsernameGet');
let information = document.querySelector('#information');
let headline = document.querySelector('#headline');
let inputBox = document.querySelector('form');
let spinnerElement = document.querySelector('.loader');
let isLoading = false;

searchBtn.src = Lente;
spinnerElement.style.display='none';


document.addEventListener('DOMContentLoaded', () => {

    const createCustomList = (type,text,color,id) => {
        let e = document.createElement(type);
        e.innerHTML = text;
        e.style.color = color;
        e.setAttribute('id',id);
        information.appendChild(e);
    }

    const toggleSpinner = () => {
        isLoading = !isLoading

        if(isLoading){
            spinnerElement.style.display='block';
            information.style.display='none'
            headline.style.display='none';
        }else{
            spinnerElement.style.display='none';
            information.style.display='block';
            headline.style.display='block';
        }
    }

    inputBox.addEventListener("keypress", e => {
        if(e.key === "Enter"){
            e.preventDefault();
            startSearch()
        }
    })

    searchBtn.addEventListener('click', async () => startSearch());

    const startSearch = async () => {

        let responseCityInfo;

        let cityName = cityInp.value.toLowerCase();
        let finalURL = `https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`;
        inputBox.style.display='none';
        information.style.display = 'block';

        
        
        try{
            toggleSpinner();
 
            const fetchInfo = await fetch(finalURL);

            if(fetchInfo.ok){
                responseCityInfo = await fetchInfo.json();
            } else {
                alert('Location is not valid, try again!');
                location.reload();
            }

        }catch(e){
        
            return alert('Something went wrong... Reaload the page!');
            
        }finally{
            toggleSpinner();
        }

        createCustomList('h2', cityName.toUpperCase()+":",null,null);
        for(let i = 0; i <= responseCityInfo.categories.length-1; i++){
            createCustomList('h3',responseCityInfo.categories[i].name + ": ",responseCityInfo.categories[i].color,null);
            createCustomList('h4',"Score out of 10" + responseCityInfo.categories[i].score_out_of_10.toFixed(2),responseCityInfo.categories[i].color,null);
        }
        createCustomList('p', `<b>Summary: </b>` + responseCityInfo.summary,null,null);
        createCustomList('p', `<b>Teleport city score: </b>` + responseCityInfo.teleport_city_score.toFixed(2),null,null);
        createCustomList('button','Search another city',null,'reload');

        document.querySelector('#reload').addEventListener('click', () => {
            location.reload(true);
        })

    }
});