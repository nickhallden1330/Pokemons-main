let elList = document.querySelector('.js-list');
let elSelect = document.querySelector('.js-select');
let elSelec = document.querySelector('.js-selec');
const elBtn = document.querySelector('.js-btn');
const itemFragment = document.createDocumentFragment();
var theme = false;

function domwiew(array, node) {
	array.forEach((item) => {
		let newItem = document.createElement('li');
		let newSpan = document.createElement('span');
		let newTitle = document.createElement('h2');
		let newImg = document.createElement('img');
		let newTime = document.createElement('time');
		let newText = document.createElement('p');

		newSpan.textContent = item.num;
		newTitle.textContent = item.name;
		newImg.src = item.img;
		newImg.setAttribute('alt', 'Pocemon image');
		newImg.setAttribute('with', '200');
		newImg.setAttribute('height', '200');
		newTime.textContent = item.spawn_time;
		newTime.dateTime = item.spawn_time;
		newText.textContent = item.type;

		newItem.appendChild(newSpan);
		newItem.appendChild(newTitle);
		newItem.appendChild(newImg);
		newItem.appendChild(newTime);
		newItem.appendChild(newText);
		itemFragment.appendChild(newItem);
	});
	node.appendChild(itemFragment)
}

domwiew(pokemons, elList);

let optionList = new Set();

pokemons.forEach((item) => {
	item.type.forEach((gener) => {
		optionList.add(gener);
	});
});

optionList.forEach((item) => {
	let newOption = document.createElement('option');
	newOption.value = item;
	newOption.textContent = item;
	elSelect.appendChild(newOption);
});

elSelect.addEventListener('change', function (evt) {
	const filtredArr = [];
	elList.innerHTML = '';
	const elVal = elSelect.value;
	pokemons.forEach((ev) => {
		if (ev.type.includes(elVal)) {
			filtredArr.push(ev);
		}
	});
	domwiew(filtredArr, elList);
});

elSelec.addEventListener('change', function () {
	let newArr = [];
	let selVal = elSelec.value;
	elList.innerHTML = '';

	if (selVal == 'Aa-Zz') {
		newArr = pokemons.sort((a, b) => {
			a.name.charCodeAt(0) - b.name.charCodeAt(0);
		});
	}

	if (selVal == 'Zz-Aa') {
		newArr = pokemons.sort(
			(a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0),
		);
	}

	domwiew(newArr, elList);
});

elBtn.addEventListener('click', function () {
	theme = !theme;
	window.localStorage.setItem('theme', theme ? 'dark' : 'light');
	changeThem();
});

function changeThem() {
	if (window.localStorage.getItem('theme') == 'dark') {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
}
changeThem();
