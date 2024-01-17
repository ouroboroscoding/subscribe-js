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
import { Clone } from '@ouroboros/clone';
export type SubscribeCallback = (data: any) => void;
export type SubscribeReturn = {
    data: any;
    unsubscribe: () => boolean;
};
/**
 * Subscribe
 *
 * This class contains methods to manage subscription to the instance
 *
 * @name Subscribe
 * @access public
 */
export default class Subscribe extends Clone {
    private subscribeCallbacks;
    private subscribeData;
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
    constructor(data?: any);
    /**
     * Get
     *
     * Returns a copy of the data currently stored
     *
     * @name get
     * @access public
     * @returns whatever the instance is currently storing as data
     */
    get(): any;
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
    set(data: any): boolean;
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
    subscribe(callback: SubscribeCallback): SubscribeReturn;
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
    unsubscribe(callback: SubscribeCallback): boolean;
}
