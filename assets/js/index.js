document.addEventListener('DOMContentLoaded', function(){
    let searchBtn = document.querySelector('#btnGet');
    let cityInp = document.querySelector('#unsernameGet');
    let information = document.querySelector('#information');
    let inputBox = document.querySelector('fieldset');

    searchBtn.addEventListener('click', () => {
        let cityName = cityInp.value;
        let cityNameToLowerCase = cityName.toLowerCase();
        let finalURL = `https://api.teleport.org/api/urban_areas/slug:${cityNameToLowerCase}/scores/`;
        inputBox.style.display='none';
        information.style.display = 'block';

        fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            let city = document.createElement('h1');
            city.textContent = cityName.toUpperCase() + ':';
            information.appendChild(city);
            for(let i = 0; i<=data.categories.length-1; i++){
                let name = document.createElement('h3');
                name.textContent = data.categories[i].name;
                name.style.color = data.categories[i].color;
                information.appendChild(name);
                let scoreOutOf10 = document.createElement('h4');
                scoreOutOf10.textContent = `Score out of 10: ` + data.categories[i].score_out_of_10.toFixed(3);
                scoreOutOf10.style.color = data.categories[i].color;
                information.appendChild(scoreOutOf10);
            }

            let summary = document.createElement('p');
            summary.innerHTML = `<b>Summary: </b>` + data.summary;
            information.appendChild(summary);

            let teleportCityScore = document.createElement('p');
            teleportCityScore.innerHTML = `<b>Teleport city score: </b>` + data.teleport_city_score.toFixed(3);
            information.appendChild(teleportCityScore);

                
            let reset = document.createElement('button');
            reset.textContent = 'Search another city';
            reset.setAttribute('id', 'reload')
            information.appendChild(reset);

            reset.addEventListener('click',  function(){
                location.reload(true);
            })
        }).catch(() => {
            if(cityName.length == 0){
                inputBox.style.display='block';
                information.style.display = 'block';
                alert('Write the nome of city.');
                location.reload(true);
            }else{
                alert('The name of the city is not valid.');
                location.reload(true);
            }
        });
    });
});


