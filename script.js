const ROOT_URL = "https://api.lyrics.ovh/suggest";

const lyricInput = document.getElementById("lyricInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const modalBody = document.getElementById("modalBody");
const musicPlay = document.getElementById("musicPlay");

// get lyrics data
searchBtn.addEventListener("click", () => {
  let lyricInputValue = lyricInput.value;
    
  fetch(`${ROOT_URL}/${lyricInputValue}`)
    .then((res) => res.json())
    .then((lyrics) =>lyrics.data.slice(0, 7).map((lyric) => showLyricsDOM(lyric))     
    );
  //clear input field
  lyricInput.value = "";
   
  //clear result of song
  modalBody.innerHTML = "";
});

// show lyrics in DOM
function showLyricsDOM(lyric) {
  const createDiv = document.createElement("div");
  createDiv.classList = "single-result row align-items-center my-3 p-3 "
  createDiv.innerHTML = `
    <div class="col-md-8 ">
      <h3 class="lyrics-name">${lyric.title}</h3>
      <p class="author lead">Album by <span>${lyric.album.title}</span></p>
    </div>
    <div class="col-md-4 text-md-right text-center d-flex">      
      <button onclick="showSingLyrics('${lyric.artist.name}', '${lyric.title}')" class="btn btn-sm btn-success" data-toggle="modal" data-target="#exampleModal">Get Lyrics</button>
    </div>`;

  results.appendChild(createDiv);
}

// show lyrics text with modal
function showSingLyrics(artistName, artistTitle) {
  fetch(`https://api.lyrics.ovh/v1/${artistName}/${artistTitle}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.lyrics == undefined) {
        modalBody.innerText = "No Lyrics Found !!!";
      } else {
        modalBody.innerText = data.lyrics;
      }
    });
  document.getElementById("modalTitle").innerText = artistTitle;
}
