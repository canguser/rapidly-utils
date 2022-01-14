import { genOrderedId } from '../genOrderedId';

const DOMEventMapper = {};

export function register(
    dom: EventTarget,
    eventName: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions
): string {
    if (dom.addEventListener) {
        dom.addEventListener(eventName, callback, options);
    }
    const id = genOrderedId();
    DOMEventMapper[id] = { dom, eventName, callback, options };
    // console.log(`Event name [${eventName}] registered [eventId: ${id}]`);
    return id;
}

export function unregister(eventId: string): void {
    if (eventId) {
        const { dom, eventName, callback } = DOMEventMapper[eventId] || {};
        if (dom && dom.removeEventListener) {
            dom.removeEventListener(eventName, callback);
            delete DOMEventMapper[eventId];
            // console.log(`Event name [${eventName}] removed [eventId: ${eventId}]`);
        }
    }
}
