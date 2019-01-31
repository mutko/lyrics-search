
        function findLyrics() {

            const artist = document.getElementById('artist').value;
            const song = document.getElementById('song').value;

            const title = document.querySelector('.title');
            const lyrics = document.querySelector('.lyrics');
            const error = document.querySelector('.error');

            const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
            
            fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    console.log(response.lyrics);
                    title.innerText = artist + " - " + song;
                    lyrics.innerText = response.lyrics ? response.lyrics : "Sorry. We can't find that song :(";
                })
                .catch(function(response) {
                    error.innerText = "There is mistake somewhere. Hint: Check internet."
                })
        }  // END of findLyrics function

        const form = document.querySelector('.search-form');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            findLyrics();
            document.querySelector('.lyrics-container').classList.add("active");
        })