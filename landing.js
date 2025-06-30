const movies = async () => {

    const response = await fetch("https://jsonfakery.com/movies/paginated")
    if(response.status !== 200){
        console.log("Ohh ohh something wrong!")
    }
    const matter = await response.json()
    return matter ;
}

movies().then((matter) => {
    const currentPage = matter.current_page ;
    console.log(currentPage);
    const movieList = matter.data;
    
    const topRated = [...movieList].sort((a,b) => b.vote_average - a.vote_average).slice(0,6)
    console.log(topRated)

    const topRated2 = [...movieList].sort((a,b) => b.vote_average - a.vote_average).slice(7,13)
    console.log(topRated2)

    const topRated3 = [...movieList].sort((a,b) => b.vote_average - a.vote_average).slice(14,20)
    console.log(topRated3)

    const topRated4 = [...movieList].sort((a,b) => b.vote_average - a.vote_average).slice(21,30)
    console.log(topRated4)
    console.log(movieList.length)
    function createMovieCard(movie){
    const card = document.createElement('div');
    card.className = 'movie-card' ;
    const year = new Date(movie.release_date).getFullYear();

    card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w5${movie.poster_path}" width = "20px" class = "movie-img"/>
            <h3 id="title">${movie.original_title}</h3>
            <p id="rel-data">${year}</p>
    `;
    
    card.addEventListener('click' , () => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie))
        window.location.href = `detail.html`;
        console.log(movie.id)
    })
    return card ;
    }

    function renderCard (movies , containerId){
        const container = document.getElementById(containerId) ;
        container.innerHTMl = '' ;

        movies.forEach(movie => {
            const card = createMovieCard(movie) ;
            container.appendChild(card) ;
        })
    }
    const usedMovieIds = new Set();


    renderCard(topRated, 'test');
    renderCard(topRated2, 'test2');
    renderCard(topRated3, 'test3');
    renderCard(topRated4, 'test4');
    
}).catch((err) =>{
    console.log(err)
})

