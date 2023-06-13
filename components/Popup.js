import { buildElement } from './components.js';

function buildPopup(_popupContent) {
	const popup = buildElement('div', ['popup']);
	const popupContent = buildElement('div', ['container', 'popup-content']);
	popupContent.appendChild(_popupContent);
	popup.appendChild(popupContent);
	return popup;
}

const body = document.querySelector('body');

class Modal {
	constructor() {}
	init(_data) {
		this.data = _data;
		this.modal = buildElement('div', ['modal']);
		// generating modal header
		const modalHeader = buildElement('div', ['modal-header']);
		modalHeader.innerHTML = `<p class="modal-title">${_data.modalTitle}</p> `;

		const modalBody = buildElement('div', ['modal-body']);
		let modalBodyContent = '';

		// generating modal body dynamic data
		_data.inputs.forEach((_input) => {
			if (_input.type == 'text') {
				modalBodyContent += ` <div class="input-group">
                <span class="input-title">${_input.title}</span>
                <input type="text" name = "${_input.name}">
            </div>`;
			} else if (_input.type == 'checkbox') {
				modalBodyContent += `<div class="input-group-x">
                <input type="checkbox" name = "${_input.name}" ${
					_input.state ? 'checked' : ''
				}>
                <span class="input-title">${_input.title}</span>
                
            </div>`;
			} else if (_input.type == 'select') {
				let options = '';
				_input.options.forEach((_option) => {
					options += `<option value="${_option}">${_option}</option>`;
				});
				modalBodyContent += `<div class="input-group">
                <span class="input-title">${_input.title}</span>
                <select name="" id="" name = "${_input.name}">
                    ${options}
                </select>
            </div>`;
			}
		});
		modalBody.innerHTML = modalBodyContent;

		//generating modal footer
		const modalFooter = buildElement('div', ['modal-footer']);
		const closeButton = buildElement('button', ['close-button', 'btn']);
		closeButton.innerText = 'Close';
		const saveButton = buildElement('button', ['btn', 'save-button']);
		saveButton.innerText = 'Save';

		closeButton.addEventListener('click', this.closeButtonHandler.bind(this));
		saveButton.addEventListener('click', this.saveButtonHandler.bind(this));
		modalFooter.append(closeButton, saveButton);

		// assemble modal
		this.modal.append(modalHeader, modalBody, modalFooter);

		// other initialization

		this.popup = undefined;
		this.inputFieldValue = {};
	}

	updateInputFieldValue(input) {
		switch (input.type) {
			case 'text':
				var name = input.name;
				this.inputFieldValue[name] = input.value;
				break;
			case 'checkbox':
				var name = input.name;
				this.inputFieldValue[name] = input.checked;
		}
	}

	showModal() {
		this.modal.addEventListener(
			'input',
			(e) => {
				this.updateInputFieldValue(e.target);
			},
			true
		);
		this.popup = buildPopup(this.modal);
		body.appendChild(this.popup);
		body.classList.add('popup-open');
	}

	closeButtonHandler() {
		this.popup.classList.add('vanish');
		setTimeout(
			() => document.querySelector('body').removeChild(this.popup),
			500
		);
		body.classList.remove('popup-open');
	}

	saveButtonHandler() {
		this.data.inputs.forEach((input) => {
			if (input.type == 'checkbox')
				input.status = this.inputFieldValue[input.name];
			else input.value = this.inputFieldValue[input.name];
		});

		this.data.saveButtonHandler(this.data);
		this.closeButtonHandler();
	}
}

export const modal = new Modal();
