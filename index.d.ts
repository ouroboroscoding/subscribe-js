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
export default class Subscribe {
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
     * Clone
     *
     * Called by @ouroboros/clone to copy the instance. Just returns instead
     *
     * @name clone
     * @access public
     * @returns the current instance
     */
    clone(): this;
    /**
     * Notify
     *
     * Sends the data to all callbacks
     *
     * @name notify
     * @access public
     * @param data Optional, the new data to set and then send
     */
    notify(data: any): void;
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
    subscribeUnsubscribe(callback: SubscribeCallback): boolean;
}
