const shortid = require("shortid");

const generateVideoID = () => {
	return `VID_${shortid.generate()}`;
};

const generateProductID = () => {
	return `PROD_${shortid.generate()}`;
};

module.exports = { generateVideoID, generateProductID };
