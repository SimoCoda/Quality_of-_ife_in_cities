document.addEventListener('DOMContentLoaded', function(){
    let searchBtn = document.querySelector('#btnGet');
    let cityInp = document.querySelector('#unsernameGet');
    let information = document.querySelector('#information');
    let inputBox = document.querySelector('form');

    searchBtn.addEventListener('click', () => {
        let cityName = cityInp.value;
        let cityNameToLowerCase = cityName.toLowerCase();
        let finalURL = `https://api.teleport.org/api/urban_areas/slug:${cityNameToLowerCase}/scores/`;
        inputBox.style.display='none';
        information.style.display = 'block';

        fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            const createCustomList = (type,text,color) => {
                let e = document.createElement(type);
                e.textContent = text;
                e.style.color = color;
                information.appendChild(e);
            }
            const createCustomSummary = (type,text) =>{
                let s = document.createElement(type);
                s.innerHTML = text;
                information.appendChild(s);
            }
            createCustomSummary('h2', cityName.toUpperCase()+":");
            for(let i = 0; i<=data.categories.length-1; i++){
                createCustomList('h3',data.categories[i].name,data.categories[i].color);
                createCustomList('h4',"Score out of 10" + data.categories[i].score_out_of_10.toFixed(3),data.categories[i].color);
            }
            createCustomSummary('p', `<b>Summary: </b>` + data.summary);
            createCustomSummary('p', `<b>Teleport city score: </b>` + data.teleport_city_score.toFixed(3));

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


