function findLyrics() {

    const artist = document.getElementById('artist').value;
    const song = document.getElementById('song').value;

    const lyricsTitle = document.querySelector('.lyrics-title');
    const lyricsText = document.querySelector('.lyrics-text');
    const error = document.querySelector('.error');

    const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;
    
    fetch(lyricsUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response.lyrics);
            lyricsTitle.innerText = artist + " - " + song;
            lyricsText.innerText = response.lyrics ? response.lyrics : "Sorry. We can't find that song :(";
        })
        .catch(function(response) {
            error.innerText = "There is mistake somewhere. Hint: Check internet."
        })

    const wikiTitle = document.querySelector('.wiki-title');
    const wikiImg = document.querySelector('.wiki-img');
    const wikiText = document.querySelector('.wiki-text');

    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${artist}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`;

    fetch(wikiUrl) 
        .then(function(wikiApi) {
            return wikiApi.json();
        })
        .then(function(wikiApi) {
            let pages = wikiApi.query.pages;

            let wikiApiTitle = pages[Object.keys(pages)[0]].title;
            let wikiApiArticle = pages[Object.keys(pages)[0]].extract;
            let wikiApiImg = pages[Object.keys(pages)[0]].thumbnail.source;

            console.log(wikiApiImg);
            
            wikiTitle.innerHTML = wikiApiTitle;
            wikiText.innerHTML = wikiApiArticle;
            wikiImg.src = wikiApiImg;
        })


}  // END of findLyrics function

const form = document.querySelector('.search-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    findLyrics();
    document.querySelector('.content-container').classList.add("active");
})