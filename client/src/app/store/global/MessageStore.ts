import MessageModel from 'app/interfaces/global/MessageModel';
import { MessageOption } from 'app/interfaces/global/MessageOption';
import { action } from 'easy-peasy';

const initalOptions: MessageOption = {
	anchorOrigin: {
		vertical: 'top',
		horizontal: 'center',
	},
	autoHideDuration: 6000,
	message: '',
	variant: 'default',
};

const MessageStore: MessageModel = {
	isOpen: false,
	options: initalOptions,
	showMessage: action((state, payload) => {
		state.isOpen = true;
		state.options = {
			...state.options,
			...payload,
		};
	}),
	hideMessage: action(state => {
		state.isOpen = false;
	}),
};

export default MessageStore;
