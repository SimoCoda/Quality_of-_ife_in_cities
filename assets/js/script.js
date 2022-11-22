document.addEventListener('DOMContentLoaded', () => {
    let searchBtn = document.querySelector('#search');
    let cityInp = document.querySelector('#unsernameGet');
    let information = document.querySelector('#information');
    let inputBox = document.querySelector('form');
    let spinnerElement = document.querySelector('.loader');
    let isLoading = false;

    spinnerElement.style.display='none';

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
        }else{
            spinnerElement.style.display='none';
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
            responseCityInfo = await fetchInfo.json();
            console.log(responseCityInfo);

        }catch(e){
            toggleSpinner();
            console.log(e)

            if(cityName.length == 0){
                inputBox.style.display='block';
                information.style.display = 'block';
                alert('Write the nome of city.');
                location.reload(true);
            }else{
                alert('The name of the city is not valid.');
                location.reload(true);
            }

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


