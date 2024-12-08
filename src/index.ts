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

import clone, { Clone } from '@ouroboros/clone';
import { compare } from '@ouroboros/tools';

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
export default class Subscribe extends Clone {

	// The list of callbacks to notify on changes
	protected subscribeCallbacks: SubscribeCallback[];

	// The current set of data
	protected subscribeData: any;

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

		// Call the Clone constructor
		super();

		// Init the list of callbacks
		this.subscribeCallbacks = [];

		// Store the initial data
		this.subscribeData = data;
	}

	/**
	 * Get
	 *
	 * Returns a copy of the data currently stored
	 *
	 * @name get
	 * @access public
	 * @returns whatever the instance is currently storing as data
	 */
	get(): any {
		return clone(this.subscribeData);
	}

	/**
	 * Set
	 *
	 * If the data has changed, stores the new data and sends a copy of it to
	 * all callbacks, then returns true. Else, returns false and does nothing
	 *
	 * @name set
	 * @access public
	 * @param data The new data to set and then send
	 * @returns bool
	 */
	set(data: any): boolean {

		// If the data hasn't changed, do nothing
		if(compare(data, this.subscribeData)) {
			return false;
		}

		// Store the new data
		this.subscribeData = data;

		// Go through each callback and notify of the data change
		for (const f of this.subscribeCallbacks) {
			f(clone(this.subscribeData));
		}

		// Return OK
		return true;
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

		// Clone the current data
		const mData = clone(this.subscribeData);

		// Call the callback with the current data
		callback(mData);

		// Return the current data as well as a function to unsubscribe
		return {
			data: mData,
			unsubscribe: () => {
				return this.unsubscribe(callback);
			}
		};
	}

	/**
	 * Unsubscribe
	 *
	 * Not meant to be called publicaly, but kept as such in order to support
	 * code using old style subscrube/unsubscribe methods. Searches for the
	 * callback and then removes it from the list if found.
	 *
	 * @name unsubscribe
	 * @access public
	 * @param callback The function to look for to remove
	 * @returns if the callback was removed or not
	 */
	unsubscribe(callback: SubscribeCallback): boolean {

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