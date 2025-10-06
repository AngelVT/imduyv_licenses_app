document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("hideWelcomePopup") === "true") return;


    const popup = document.getElementById("welcome-popup");
    /*popup.id = "welcome-popup";
    popup.innerHTML = `
    <div class="popup-content">
      <p>Bienvenidos a <b>SILU - Sistema Integral de Licencias Urbanas</b></p>
      <label class="popup-checkbox">
        <input type="checkbox" id="dont-show-again"> No mostrar de nuevo
      </label>
      <button id="popup-close">Cerrar</button>
    </div>
  `;*/

    popup.classList.remove('dis-none');

    document.getElementById("popup-close").addEventListener("click", () => {
        if (document.getElementById("dont-show-again").checked) {
            localStorage.setItem("hideWelcomePopup", "true");
        }
        popup.classList.add('dis-none');
    });
});