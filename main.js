const categoryContainer = document.querySelector('.category-container');

const accordionHandler = (e) => {
	let target;
	if (e.target.classList.contains('arrow')) {
		target = e.target.parentElement.parentElement;
	} else if (e.target.classList.contains('list-menu')) target = e.target;
	else return;

	const targetId = target.getAttribute('data-target');
	const targetListContainer = document.getElementById(targetId);

	if (targetId == null) return;

	if (target.hasAttribute('open')) {
		target.removeAttribute('open');
		targetListContainer.classList.add('hide');
		targetListContainer.classList.remove('show');
	} else {
		target.setAttribute('open', '');
		targetListContainer.classList.remove('hide');
		targetListContainer.classList.add('show');
	}
};

categoryContainer.addEventListener('click', accordionHandler);
document.addEventListener(
	'mousedown',
	function (event) {
		if (event.detail > 1) {
			event.preventDefault();
			// of course, you still do not know what you prevent here...
			// You could also check event.ctrlKey/event.shiftKey/event.altKey
			// to not prevent something useful.
		}
	},
	false
);

const data = {
	name: 'Math',
	id: 1,
	subjects: [
		{
			name: 'Algebra',
			id: 1,
			tasks: [
				{
					title: 'Chapter 4',
					id: 1,
					status: false,
				},
				{
					title: 'Chapter 5',
					id: 2,
					status: true,
				},
			],
		},
	],
};

const category = buildCategory(data);

categoryContainer.appendChild(category);
