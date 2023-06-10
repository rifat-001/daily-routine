function buildElement(tag, classList) {
	const element = document.createElement(tag);
	element.classList.add(...classList);
	return element;
}

function buildImage(src, classList) {
	const image = buildElement('img', classList);
	image.setAttribute('src', src);
	return image;
}

function buildAddNewButton(title) {
	const button = buildElement('div', ['create-btn']);
	button.innerHTML = `
    <img src="assets/icons/plus.png" alt="" class="small-icon">
    <p>${title}</p>
    `;
	return button;
}

function buildTask(_task) {
	const _taskTitle = _task.title;
	const _status = _task.status;

	// create all building block
	const task = buildElement('div', ['task']);
	const listMenu = buildElement('div', ['list-menu']);
	const listMenuLeft = buildElement('div', ['list-menu-left']);
	const listMenuRight = buildElement('div', ['list-menu-right']);

	const checkbox = buildElement('input', ['task-checkbox']);

	const taskTitle = buildElement('span', ['task-title']);
	const editIcon = buildImage('assets/icons/pencil.png', 'small-icon');

	const option = buildImage('assets/icons/option.png', [
		'small-icon',
		'option',
	]);

	// changes according to the task status
	// if the task is completed then add some classes and attribute to change the ui
	if (_status) {
		checkbox.setAttribute('checked', true);
		taskTitle.classList.add('completed-task');
	}

	// assemble list-menu-left
	checkbox.setAttribute('type', 'checkbox');
	taskTitle.innerText = _taskTitle;
	listMenuLeft.append(checkbox, taskTitle, editIcon);

	// assemble list-menu-right
	listMenuRight.append(option);

	// assemble list-menu
	listMenu.append(listMenuLeft, listMenuRight);

	task.append(listMenu);

	return task;
}

// ========================================================================

function buildSubjectListMenu(_subjectName, _status) {
	// create all building block
	const listMenu = buildElement('div', ['list-menu']);
	const listMenuLeft = buildElement('div', ['list-menu-left']);
	const listMenuRight = buildElement('div', ['list-menu-right']);

	const checkbox = buildElement('input', ['subject-checkbox']);
	const subjectName = buildElement('span', ['category-name']);
	const editIcon = buildImage('assets/icons/pencil.png', 'small-icon');

	const addTask = buildImage('assets/icons/add.png', [
		'small-icon',
		'add-task',
	]);
	const doc = buildImage('assets/icons/doc.png', ['small-icon', 'doc']);
	const arrow = buildImage('assets/icons/arrow.png', ['arrow', 'small-icon']);
	const option = buildImage('assets/icons/option.png', [
		'small-icon',
		'option',
	]);

	// changes according to the status
	// if the subject task is completed then add some classes and attribute to change the ui
	if (_status) {
		checkbox.setAttribute('checked', true);
		subjectName.classList.add('completed-subject');
	}

	// assemble list-menu-left
	checkbox.setAttribute('type', 'checkbox');
	subjectName.innerText = _subjectName;
	listMenuLeft.append(checkbox, subjectName, editIcon);

	// assemble list-menu-right
	listMenuRight.append(addTask, doc, arrow, option);

	// assemble list-menu
	listMenu.append(listMenuLeft, listMenuRight);

	return listMenu;
}

// ========================================================================

function buildCategoryListMenu(_categoryName) {
	// creating all building block
	const listMenu = buildElement('div', ['list-menu']);
	const listMenuLeft = buildElement('div', ['list-menu-left']);
	const listMenuRight = buildElement('div', ['list-menu-right']);

	const ListIcon = buildImage('assets/icons/category.png', ['medium-icon']);
	const categoryName = buildElement('span', ['category-name']);
	const editIcon = buildImage('assets/icons/pencil.png', 'small-icon');

	const addTask = buildImage('assets/icons/add.png', [
		'medium-icon',
		'add-task',
	]);
	const arrow = buildImage('assets/icons/arrow.png', ['arrow', 'medium-icon']);
	const option = buildImage('assets/icons/option.png', [
		'medium-icon',
		'option',
	]);

	// assemble list-menu-left
	categoryName.innerText = _categoryName;
	listMenuLeft.append(ListIcon, categoryName, editIcon);

	// assemble list-menu-right
	listMenuRight.append(addTask, arrow, option);

	// assemble list-menu
	listMenu.append(listMenuLeft, listMenuRight);

	return listMenu;
}

// ====================================================

function buildSubject(_subject) {
	const subject = buildElement('div', ['subject']);

	const listMenu = buildSubjectListMenu(_subject.name);
	const subjectContent = buildElement('div', [
		'list-content',
		'subject-content',
	]);

	_subject.tasks.forEach((task) => {
		subjectContent.appendChild(buildTask(task));
	});

	subject.append(listMenu, subjectContent);
	return subject;
}

function buildCategory(_category) {
	const category = buildElement('div', ['category']);

	const listMenu = buildCategoryListMenu(_category.name);
	const categoryContent = buildElement('div', [
		'list-content',
		'category-content',
	]);
	categoryContent.appendChild(buildAddNewButton('Create New Subject'));
	_category.subjects.forEach((subject) => {
		categoryContent.appendChild(buildSubject(subject));
	});

	category.append(listMenu, categoryContent);

	return category;
}
