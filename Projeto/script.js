let chegouAoFinal = false;
let comicDestravada = false;
let coletável = 0;

window.addEventListener("scroll", () => {

    console.log(window.scrollY);

    if(!chegouAoFinal){
    chegouAoFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight * 0.85;
    }

    if(chegouAoFinal && comicDestravada){

        document.querySelectorAll(".patrão").forEach(x => {
            x.style.display = "none";
        }) 

        document.querySelectorAll(".ocultDay").forEach(x => {
            x.style.display = "block";
        })

    }
})

document.querySelectorAll(".coletável").forEach(x => {
            x.addEventListener("click", (e) => {
                x.style.display = "none";
                coletável += 1;

                if(coletável>=3){
                    comicDestravada = true;
                    chegouAoFinal = false
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