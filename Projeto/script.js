let chegouAoFinal = false;
let comicDestravada = false;
let iniciaAnimacaoPagina3 = false;
let coletável = 0;

window.addEventListener("scroll", () => {
    if(comicDestravada){
        if(
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight * 0.83
            && !iniciaAnimacaoPagina3
        ){
            iniciaAnimacaoPagina3 = true;
            const chocalhos = document.querySelectorAll(".chocalho")

            chocalhos[0].style.display = "none";
            setTimeout(() => {
                chocalhos[0].style.display = "block";
                chocalhos[1].style.display = "none";
            }, 2300);
        }
    
        if(!chegouAoFinal){
            chegouAoFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight * 0.95;
        }
    
        if(chegouAoFinal && comicDestravada){
    
            document.querySelectorAll(".patrão").forEach(x => {
                x.style.display = "none";
            }) 
    
            document.querySelectorAll(".ocultDay").forEach(x => {
                x.style.display = "block";
            })
        }
    }
})

document.querySelectorAll(".coletável").forEach(x => {
    x.addEventListener("click", (e) => {
        x.style.display = "none";
        coletável += 1;

        if(coletável>=3){
            comicDestravada = true;
        }

        if(comicDestravada){
            
            document.querySelectorAll(".locked").forEach(x => {
                x.style.display = "none";
            })
            
            
            document.querySelectorAll(".unlocked").forEach(x => {
                x.style.display = "block";
            })

            document.querySelectorAll(".patrão").forEach(x => {
                x.style.display = "block";
            })
        }
    });
})
