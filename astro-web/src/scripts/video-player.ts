/**
 * Controlador de Reproducción de Video para Landings de Producto (Vyond/Articulate)
 * Permite pausar y reanudar el video de fondo haciendo clic en el contenedor (hero-video-wrap).
 */

document.addEventListener("DOMContentLoaded", () => {
	const videoWrappers = document.querySelectorAll(".prod-hero-video-wrap");

	videoWrappers.forEach((wrap) => {
		const video = wrap.querySelector("video");
		const playBtnIndicator = wrap.querySelector(".prod-video-play");

		if (video) {
			// Toggle Play/Pause al hacer clic en el contenedor (pero no si se hace clic en el mute button)
			wrap.addEventListener("click", (e) => {
				const target = e.target as HTMLElement;
				// Evitamos disparar pause/play si el usuario hizo clic explícitamente en el botón de mute
				if (target.closest(".prod-video-mute")) return;

				if (video.paused) {
					video.play();
					wrap.classList.remove("paused");
				} else {
					video.pause();
					wrap.classList.add("paused");
				}
			});
		}
	});
});
