const prevButton = document.getElementById("prev-button");
prevButton.addEventListener("click", (req, res) => {
	const dataPage = parseInt(prevButton.getAttribute("data-page"));
	if (dataPage) {
		window.location.href = `/products/${dataPage}`;
	}
});

const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
	const dataPage = parseInt(nextButton.getAttribute("data-page"));
	if (dataPage) {
		window.location.href = `/products/${dataPage}`;
	}
});
