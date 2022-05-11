

import * as Constant from '../../constants';

export const resetMessageStatus = () => {
	
	return {
		type: Constant.REMOVE_ERROR_MESSAGE
	};
};


export const setMessageStatus = ( msgData ) => {
	
	return {
		type: Constant.SET_MESSAGE_STATUS,
        payload: msgData
	};
};
