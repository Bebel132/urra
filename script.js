let executado = false;

window.addEventListener("scroll", () => {
  const chegouAoFinal =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400;

  if (chegouAoFinal && !executado) {
    executado = true;

    document.querySelector(".a2").style.display = "none";
    document.querySelector(".a2doMal").style.display = "block";
    // Seu evento aqui
  }
});