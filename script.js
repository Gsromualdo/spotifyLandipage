const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm){
    const url = `https://65b85c7046324d531d56210c.mockapi.io/artists?name=${searchTerm}`
    //procurar apenas o que o usuario digito e toda informacao 
    fetch(url) // fazer requisicoes de api
    .catch((error) => { 
        console.log(error);
    })
        .then((response) => response.json())
        .then((result) => displayResults(result))
};

function displayResults(results) {
    resultPlaylist.classList.add('hidden');
    const artistsList = document.getElementById('artists-result-list');

    results.forEach(element => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
        artistCard.id = element.id;
        
        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');
        const artistImg = document.createElement('img');
        artistImg.classList.add('artist-img');
        artistImg.src = element.urlImg;
        cardImg.appendChild(artistImg);
        
        const play = document.createElement('div');
        play.classList.add('play');
        const faPlay = document.createElement('span');
        faPlay.classList.add('fa', 'fa-solid', 'fa-play');
        play.appendChild(faPlay);
        cardImg.appendChild(play);
        artistCard.appendChild(cardImg);

        const cardText = document.createElement('div');
        cardText.classList.add('card-text');
        const a = document.createElement('a');
        a.classList.add('vst');
        a.href = '';
        a.title = element.name;
        const artistName = document.createElement('span');
        artistName.classList.add('artist-name');
        artistName.id = 'artist-name';
        artistName.innerText = element.name;
        
        const artistCategorie = document.createElement('span');
        artistCategorie.classList.add('artist-categorie');
        artistCategorie.innerText = 'Artista';
        cardText.appendChild(a);
        cardText.appendChild(artistName);
        cardText.appendChild(artistCategorie);
        artistCard.appendChild(cardText);
        artistsList.appendChild(artistCard);
    });

    resultArtist.classList.remove('hidden');
}



document.addEventListener('input', function(){
    const searchTerm = searchInput.value.toLowerCase();
    (document.getElementById('artists-result-list')).innerHTML = ''; // limpa a lista de artistas

    if(searchTerm === ''){
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }



    requestApi(searchTerm);
});