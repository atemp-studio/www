/* Load SCSS */
import "../scss/main.scss";

/* #all-links View */
/* Toggle menu on mobile site */
window.toggleAllLinksMenu = () => {
	let menu = document.getElementById("menu");
	if (menu != null) {
		(menu.style.display === "block") ? menu.style.display = "none" : menu.style.display = "block";
	}
}

/* #gallery-promo View */
/* Ticking clock */
function getStudioTime() {
	var dateString = new Date().toLocaleString('en-US', {hour12: false, timeZone: 'America/New_York'}).split(" ")[1]
	const timeSpan: HTMLElement = document.getElementById("time")!;
	timeSpan.innerHTML = (dateString.length === 8) ? dateString : "0" + dateString;
}

getStudioTime();
setInterval(getStudioTime, 1000);

/* Draggable store window buttons */
const sleep = async (ms: number) => {
	await new Promise(resolve => {
		return setTimeout(resolve, ms)
	});
}

window.showOverlay = async (text: string) => {
	/* Display overlay with text when clicking any window menu-bar buttons */
	const overlay: HTMLElement = document.getElementById("overlay")!;
	overlay.innerHTML = text;
	overlay.style.display = "block";
	await sleep(2000);
	location.replace("https://gallery.atemp.studio");
}


/* Dragable store window */
const dragElement = (element: HTMLElement, dragzone: HTMLElement) => {
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	const dragMouseUp = () => {
		document.onmouseup = null;
		document.onmousemove = null;
		element.getElementsByClassName("window")[0].classList.remove("drag");
	};

	const dragMouseMove = (event: MouseEvent) => {
		event.preventDefault();
		pos1 = pos3 - event.clientX;
		pos2 = pos4 - event.clientY;
		pos3 = event.clientX;
		pos4 = event.clientY;
		element.style.top = `${element.offsetTop - pos2}px`;
		element.style.left = `${element.offsetLeft - pos1}px`;
	};

	const dragMouseDown = (event: MouseEvent) => {
		event.preventDefault();
		pos3 = event.clientX;
		pos4 = event.clientY;
		element.getElementsByClassName("window")[0].classList.add("drag");
		document.onmouseup = dragMouseUp;
		document.onmousemove = dragMouseMove;
	};

	dragzone.onmousedown = dragMouseDown;
};

const dragable = document.getElementById("dragable")!;
const dragzone = document.getElementById("dragzone")!;
let windowSize = dragable.getElementsByClassName("window")[0].getBoundingClientRect()
let headerHeight = document.getElementsByTagName("header")[0].getBoundingClientRect().height;
let availableHeight = window.innerHeight - windowSize.height - headerHeight;
let availableWidth = window.innerWidth - windowSize.width;
dragable.style.top = `${Math.floor((0.05 * availableHeight) + (0.3 * Math.random() * availableHeight))}px`;
dragable.style.left = `${Math.floor((0.65 * availableWidth) + (0.3 * Math.random() * availableWidth))}px`;
dragElement(dragable, dragzone);
