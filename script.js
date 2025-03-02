const url = "https://api.farmsense.net/v1/moonphases/?d=";
let date = new Date();
let unixTimestamp = Math.floor(date.getTime() / 1000);
let dateInput = document.getElementById("date");
let moonPhase = "";

function createSlug(text) {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();
}

function removeClassFromAll(classToRemove, targetClass) {
	document.querySelectorAll("." + targetClass).forEach((element) => {
		element.classList.remove(classToRemove);
	});
}

getMoonInfos = function (date) {
	unixTimestamp = Math.floor(date.getTime() / 1000);
	fetch(url + unixTimestamp, {
		method: "GET",
		headers: {
			Accept: "application/json"
		}
	})
		.then((response) => response.json())
		.then((data) => {
			moonPhase = data[0].Phase;
			removeClassFromAll("active", "phase");
			document.querySelector("." + createSlug(moonPhase)).classList.add("active");
			document.getElementById("phase-name").textContent = moonPhase;
		});
};

dateInput.addEventListener("change", function (e) {
	date = new Date(e.target.value);
	getMoonInfos(date);
});

getMoonInfos(date);
