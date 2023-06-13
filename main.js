import { buildCategory } from './components/components.js';
import { RoutineRipository } from './Ripository/RoutineRipository.js';
import { subjectHandler } from './Controllers/SubjectController.js';
import { taskHandler } from './Controllers/TaskController.js';
import { modal } from './components/Popup.js';

const routine = new RoutineRipository();

const categoryContainer = document.querySelector('.category-container');

modal.init({
	modalTitle: 'Create Category',
	inputs: [
		{
			type: 'text',
			name: 'category-name',
			title: 'Category Name',
		},
		{
			type: 'text',
			name: 'category-data',
			title: 'Category Data',
		},
		{
			type: 'checkbox',
			name: 'is-permanent',
			title: 'Make it permanent',
			state: true,
		},
		{
			type: 'select',
			name: 'category-options',
			title: 'Category options',
			options: ['hello', 'how', 'are', 'your'],
		},
	],
});

const accordionHandler = (e) => {
	let target;
	if (e.target.hasAttribute('accordion-trigger')) {
		target = e.target.closest('div[accordion-header]');
	}

	if (!target) return;

	const targetValue = target.getAttribute('data-target');
	const targetListContainer = target.querySelector(
		`div[data-value="${targetValue}"]`
	);

	const accordionContent = target.querySelector('.accordion-content');
	if (!accordionContent) return;

	if (target.hasAttribute('close')) {
		target.removeAttribute('close');
		target.setAttribute('open', '');

		// testing
		accordionContent.classList.add('slide-down');
	} else {
		target.setAttribute('close', '');
		target.removeAttribute('open');
	}
};

function checkboxHandler(e) {
	if (e.target.classList.contains('task-checkbox')) {
		const task = e.target.closest('.task');
		if (!task) return;
		taskHandler.init(task);
		taskHandler.taskCheckBoxHandler();
	} else if (e.target.classList.contains('subject-checkbox')) {
		const subjectElem = e.target.closest('.subject');
		subjectHandler.init(subjectElem);
		subjectHandler.subjectCheckBoxHandler();
	}
}

function popupHandler(e) {
	if (
		e.target.classList.contains('create-btn') ||
		(e.target.parentElement &&
			e.target.parentElement.classList.contains('create-btn'))
	) {
		const button = e.target.closest('.create-btn');
		if (button.dataset.type == 'add-subject') {
			const categoryElem = button.closest('.category');
			const category_id = categoryElem.getAttribute('category-id');
			const modalData = subjectHandler.prepareSubjectModal(
				category_id,
				'insert'
			);
			modal.init(modalData);
			modal.showModal();
		}
	}
}

categoryContainer.addEventListener('click', accordionHandler);
categoryContainer.addEventListener('change', checkboxHandler);
categoryContainer.addEventListener('click', popupHandler, true);

function init() {
	const data = routine.getAll();

	data.forEach((category) => {
		categoryContainer.appendChild(buildCategory(category));
	});
}

init();

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
