/**
 * Creates a simple object which can be passed between the object that does the notifying and the object that
 * is interested in receiving notifications.
 *
 * Notifiers are usually created by managers, which usually uses a hook to integrate with changes happening inside
 * the core editor and a execute notifier to inform interested parties of these changes (usually after having
 * them parsed / processed first).
 *
 * A notifier just executes its registered callbacks whenever executeCallbacks is called, it does not pass any
 * contextual information to the callback. The callback can use other editor API methods to receive any context it
 * might need.
 */
function Notifier() {
	this._callbacks = [];

	this._isExecuting = false;
	this._removedCallbacks = new Set();
}

/**
 * Adds the given callback to the notifier, it is executed when .executeCallbacks() is called.
 *
 * Returns a function that may be called to remove the callback.
 *
 * @param  {function()}  callback
 *
 * @return  {function()}
 */
Notifier.prototype.addCallback = function(callback) {
	this._callbacks.push(callback);
	return this.removeCallback.bind(this, callback);
};

/**
 * Removes the given callback from the notifier, it is no longer executed when .executeCallbacks() is called.
 *
 * @param  {function()}  callback
 */
Notifier.prototype.removeCallback = function(callback) {
	var callbackIndex = this._callbacks.indexOf(callback);
	if (callbackIndex >= 0) {
		this._callbacks.splice(callbackIndex, 1);
		if (this._isExecuting) {
			this._removedCallbacks.add(callback);
		}
	}
};

/**
 * Executes all the current callbacks added to the notifier.
 */
Notifier.prototype.executeCallbacks = function() {
	this._isExecuting = true;

	// Clone array to allow modification during iteration
	this._callbacks.concat().forEach(
		function(callback) {
			if (this._removedCallbacks.has(callback)) {
				// Callback was removed during iteration
				return;
			}
			callback();
		}.bind(this)
	);

	this._isExecuting = false;
};

export default Notifier;
