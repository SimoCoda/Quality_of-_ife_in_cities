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
            const createCustomList = (type,color,html,id) => {
                let e = document.createElement(type);
                e.style.color = color;
                e.innerHTML = html;
                e.setAttribute('id', id);
                information.appendChild(e);
            }
            createCustomList('h2',null,cityName.toUpperCase()+":",null);
            for(let i = 0; i<=data.categories.length-1; i++){
                createCustomList('h3',data.categories[i].color, data.categories[i].name,null);
                createCustomList('h4',data.categories[i].color, "Score out of 10" + data.categories[i].score_out_of_10.toFixed(3),null);
            }
            createCustomList('p',null,`<b>Summary: </b>` + data.summary,null);
            createCustomList('p',null,`<b>Teleport city score: </b>` + data.teleport_city_score.toFixed(3),null);
            createCustomList('button', null, 'Search another city', 'reload');

            document.querySelector('#reload').addEventListener('click',  function(){
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


