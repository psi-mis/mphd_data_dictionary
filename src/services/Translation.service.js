

export let TRANSLATION_KEYWORDS = {};


export const translate = ( code, defaultVal ) => {
	const msg = TRANSLATION_KEYWORDS[code];
	return ( msg != undefined ) ? msg : defaultVal;
}



export const setKeywords = ( keywords ) => {
	TRANSLATION_KEYWORDS = keywords
}

