/**
 * Interface for objects which should be added to others, like RepartitionByStatus or ComplexitiesByStatus
 */
export interface Addition<T> {

    add: (element: T) => T;

}
