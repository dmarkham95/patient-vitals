import { Action } from 'easy-peasy';
import { MessageOption } from './MessageOption';

export default interface MessageModel {
	isOpen: boolean;
	options: MessageOption;
	showMessage: Action<MessageModel, MessageOption>;
	hideMessage: Action<MessageModel>;
}
