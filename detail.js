const movieData = JSON.parse(localStorage.getItem('selectedMovie'));
// console.log(movieData)
const box = document.getElementById('movie-detail') ;

if (movieData) {
  const year = new Date(movieData.release_date).getFullYear();
  const adult = movieData.adult ? '🔞18+' : '👪All ages' ;
  const casts = [...movieData.casts]
  .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity))
  .slice(0, 8);

  box.innerHTML = `
    <div id = "matterall" > 
    <img src="https://image.tmdb.org/t/p/w5${movieData.poster_path}" width = "20px" id="poster"/>
    <div id="matter">
        <h2 id = "title">${movieData.original_title} (${year})</h2>
        <p id = "rating"><strong>Rating:</strong> ${movieData.vote_average}</p>
        <p id ="aud"><strong>Audience:</strong> ${adult}</p>
        <p id ="overview"><strong>Overview:</strong> </br> ${movieData.overview || 'No summary available.'}</p>
        <button id="add"> + Add to watchlist</button>
    </div>
    </div>
    <h3 id = "top-cast">Top Cast</h3>
    <ul id = "cast">
    ${casts.map(cast => `
        <li>
              <img src="${cast.profile_path}" alt="${cast.name}" width="60" class = "pics" />
              <strong class = "name">${cast.name}</strong>
              <em>${cast.character}</em>
              </span>
         </li>
       `).join('')}
    </ul>
   `;
} else {
  box.innerHTML = '<p>No movie selected.</p>';
}
