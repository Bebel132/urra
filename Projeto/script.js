let chegouAoFinal = false;
let iniciaAnimacaoPagina3 = false;

window.addEventListener("scroll", () => {
    if(
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight * 0.83
        && !iniciaAnimacaoPagina3
    ){
        iniciaAnimacaoPagina3 = true;
        const chocalhos = document.querySelectorAll(".chocalho");
        
        chocalhos[0].style.display = "none";
        
        setTimeout(() => {
            chocalhos[0].style.display = "block";
            chocalhos[1].style.display = "none";
        }, 1800)
        chocalhos[1].style.display = "block";
    }

    if(!chegouAoFinal){
        chegouAoFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight * 0.95;
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

