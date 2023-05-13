export const generateActivationCode = (min = 100000, max = 999999) => {
	const code = Math.floor(Math.random() * (max - min + 1)) + min;
	return {
		code: '' + code,
		expiresIn: Date.now() + +process.env.ACTIVATION_CODE_LIFETIME
	};
};

export const createActivationCodeEmailHTML = code => {
	return `
          <h1>Ваш код активации: </h1>
          <pre style="font-size: 48px; letter-spacing: 12px;">${code}</pre>
     `;
};
