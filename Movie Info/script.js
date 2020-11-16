$(document).ready(()=>{
    $('#searchForm').on('submit',(e)=>{//listens for a submit event (e)
        let searchText = $('#searchText').val();//store the search value into a variable
        getMovies(searchText);//pass the variable serchText (which contains the search value) into the function getMovies
        e.preventDefault();
    })
})

function getMovies(searchText){
    axios.get(`https://www.omdbapi.com/?s=${searchText}&apikey=94d282a9`).then((response)=>{//maikng the api request using axios
        console.log(response)
        let movies = response.data.Search;//store the data array of the search in a var
        let output = '';//the output variable starts out empty, then we loop through the data array and append each search result to the output variable, then output to the screen
        $.each(movies, (index, movie)=>{
            //we're building an html element that wil get added to the page when ever we type something int the searh bar
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div> 
            `;
        })

        $('#movies').html(output);//this line places the contents of the output variable on the webpage
    })
    //this function runs if there's an error
    .catch((err)=>{
        console.log(err);
    })
   //console.log(searchText);
}

//this function is called when a single movie is clicked
function movieSelected(id){
    //we use session storage to pass data from one page using session storage, which will disppear after the browser is closed
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';//go to the movie.html page
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');//this gets the movie id that was stored in local storage

    axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=94d282a9`).then((response)=>{//this request is based on the movie id as opposed the previus on e which was by movie name
        //console.log(response)
        let movie = response.data;
        let output = `
            <div class='row'>
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-info">Go back to search</a>
            </div>  
        `;

        $('#movie').html(output);//this places the html on the webpage
    })
    .catch((err)=>{
        console.log(err);
    })
}