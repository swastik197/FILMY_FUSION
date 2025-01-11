var current_pg = 1;
var max_pg = 1500;

const api_key = "api_key=9e9824f5a403e7682f6d8e0ba13d08b8"
const base_url = "https://api.themoviedb.org/3/"
const img_url = "https://image.tmdb.org/t/p/w500"
const api_url = base_url + `movie/popular?language=en-US&page=${current_pg}&` + api_key
const holder = document.querySelector('.holder')
const forms = document.querySelectorAll("form")
// const input = document.querySelector("input")
const forward_pg = document.querySelector(".forward_btn")
const backward_pg = document.querySelector(".backward_btn")
const current_pg_display = document.querySelector(".current_page")
let sidenav = document.querySelector(".vertical_nav");
const menubtn = document.querySelector(".menu");
const crossbtn = document.querySelector(".cross");
// let logo=document.querySelector(".Logo")
// function redirect() {
//     window.location.href = "https://www.example.com";
//   }




movies(api_url)
async function movies(abc) {
    let x = await fetch(abc);
    const xyzs = await x.json()
    max_pg = xyzs.total_pages
    card_creator(xyzs.results)

}
function card_creator(xyzs) {
    holder.innerHTML = ""
    for (let xyz of xyzs) {
        const movie_card = document.createElement("a")
        movie_card.classList.add("card")

        movie_card.innerHTML = ` 
    


                        <div class="hover:scale-110 transition-all duration-300 cursor-pointer " >
                <div class="rating p-1 hidden absolute top-0 bg-yellow-500 text-center text-xs m-2 rounded font-bold ">${xyz.vote_average.toFixed(2)}
                </div>
                <div class="transition-all w-full py-1 absolute bottom-20 duration-300 flex justify-around ">

                    <div class="dt hidden text-white text-xs bg-violet-600 rounded p-1 m-2">230 min</div>
                    <div class="yr  text-white text-xs bg-blue-500 font-bold rounded p-1 m-2">${new Date(xyz.release_date).getFullYear()}</div>
                </div>
                <a class="card2 h-[254px]"href=/movie/${xyz.id} >
  
                    
                    <img src="${img_url + xyz.poster_path}" class="h-full w-fit " alt="">
                </a>
                <div class="card_info flex h-[80px] w-full align-middle items-center">

                    <div class="title flex justify-center align-middle items-center text-white text-lg sm:text-sm font-sans font-semibold mx-2">
                        ${xyz.title}</div>

                </div>

            </div>
                </div>
            `

        movie_card.href = `/movie/${xyz.id}`;
        holder.appendChild(movie_card)
    }
}

//search
forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let searchinput = form.querySelector("input").value
        // let search_url = base_url + "search/movie?" + api_key + "&query=" + searchinput
        // movies(search_url)
        // window.location.href = `http://192.168.224.150:3000/search/${searchinput}`
        // window.location.href = `http://localhost:3000/search/${searchinput}`
        // form.href = `/search/${searchinput}`
        window.location.href = `/search/${searchinput}`
    })
})
//pagination
current_pg_display.innerHTML = current_pg
forward_pg.addEventListener("click", () => {
    if (max_pg > current_pg) {
        current_pg++
        current_pg_display.innerHTML = current_pg
        let forward_url = base_url + `movie/popular?language=en-US&page=${current_pg}&` + api_key
        movies(forward_url)
    }

    // current_pg_display.innerHTML = current_pg
    // let forward_url = base_url+`movie/popular?language=en-US&page=${current_pg}&`+api_key
    // movies(forward_url)

})

backward_pg.addEventListener("click", () => {

    if (current_pg > 1) {
        current_pg--
        current_pg_display.innerHTML = current_pg
        let backward_url = base_url + `movie/popular?language=en-US&page=${current_pg}&` + api_key
        movies(backward_url)

    }



    // let backward_url = base_url+"movie/popular?language=en-US&page="+current_pg+"&"+api_key
    // movies(backward_url)

})

// open_close side navbar
sidenav.style.display = "none"
function openSidenav() {
    sidenav.style.display = "flex";
    menubtn.style.display = "none";
    crossbtn.style.display = "flex";
    console.log("closed")
}

function closeSidenav() {
    sidenav.style.display = "none";
    menubtn.style.display = "flex";
    crossbtn.style.display = "none";
    console.log("closed")
}
function openclose_sidenav() {
    if (sidenav.style.display === "none") {
        openSidenav()

    }

    else {
        closeSidenav()
    }
}