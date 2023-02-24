/**
 * Subscribe
 *
 * Contains a class meant to be extended in order to easily add the ability for
 * users to subscribe / unsubscribe to changes on the instance
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2023-02-24
 */

// Types
export type SubscribeCallback = (data: any) => void;
export type SubscribeReturn = {
	data: any,
	unsubscribe: () => boolean
}

/**
 * Subscribe
 *
 * This class contains methods to manage subscription to the instance
 *
 * @name Subscribe
 * @access public
 */
export default class Subscribe {

	// The list of callbacks to notify on changes
	private subscribeCallbacks: SubscribeCallback[];

	// The current set of data
	private subscribeData: any;

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name Subscribe
	 * @access public
	 * @param data The initial data to
	 * @returns a new instance
	 */
	constructor(data: any = null) {

		// Init the list of callbacks
		this.subscribeCallbacks = [];

		// Store the initial data
		this.subscribeData = data;
	}

	/**
	 * Notify
	 *
	 * Sends the data to all callbacks
	 *
	 * @name notify
	 * @access public
	 * @param data Optional, the new data to set and then send
	 */
	notify(data: any) {

		// Store the new data
		this.subscribeData = data;

		// Go through each callback and notify of the data change
		for (const f of this.subscribeCallbacks) {
			f(this.subscribeData);
		}
	}

	/**
	 * Subscribe
	 *
	 * Stores a callback function to be called whenever the option data needs
	 * to change
	 *
	 * @name subscribe
	 * @access public
	 * @param callback The function to call when data changes
	 * @returns current data
	 */
	subscribe(callback: SubscribeCallback): SubscribeReturn {

		// Add it to the list
		this.subscribeCallbacks.push(callback);

		// Return the current data as well as a function to unsubscribe
		return {
			data: this.subscribeData,
			unsubscribe: () => {
				return this.subscribeUnsubscribe(callback);
			}
		};
	}

	/**
	 * Subscribe Unsubscribe
	 *
	 * Not meant to be called publically, but kept as such in order to support
	 * code using old style subscrube/unsubscribe methods. Searches for the
	 * callback and then removes it from the list if found.
	 *
	 * @name subscribeUnsubscribe
	 * @access public
	 * @param callback The function to look for to remove
	 * @returns if the callback was removed or not
	 */
	public subscribeUnsubscribe(callback: SubscribeCallback): boolean {

		// Search for the index of the callback
		const i = this.subscribeCallbacks.indexOf(callback);

		// If it's found
		if(i > -1) {

			// Splice it out of the callbacks and return success
			this.subscribeCallbacks.splice(i, 1);
			return true;
		}

		// Return that it was not removed
		return false;
	}
}

// If @ouroboros/tools is installed
// tslint:disable-next-line
const tools = require('@ouroboros/tools');
if(tools) {
	tools.cloneAddClass(Subscribe);
};