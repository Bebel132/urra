let chegouAoFinal = false;

window.addEventListener("scroll", () => {
    // if (window.innerWidth > 768) {
    //     chegouAoFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
    // } else {
    //     chegouAoFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;
    // }

    if(!chegouAoFinal){
    chegouAoFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight * 0.85;
    }

    if(chegouAoFinal){

        document.querySelectorAll(".patrão").forEach(x => {
            x.style.display = "none";
        }) 

        document.querySelectorAll(".ocultDay").forEach(x => {
            x.style.display = "block";
        })

    }
})