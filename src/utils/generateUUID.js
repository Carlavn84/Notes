/**
 * Generates RFC4122 version 4 compliant UUID strings.
 *
 * @see http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
 *
 * @return {string} The generated UUID.
 */
export default function generateUUID() {
	var now = typeof Date.now === 'function' ? Date.now() : new Date().getTime();

	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (now + Math.random() * 16) % 16 | 0;
		now = Math.floor(now / 16);
		return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
	});
}
