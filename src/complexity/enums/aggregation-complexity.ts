export enum AggregationComplexity {
    ARRAY = 1,
    DENSITY = 1,
    DOT = 0.1,
    LOGIC_DOOR_CHANGE = 2,                      // a "or" after a "and" (or a "or" after a "and") without brackets
    LOGIC_DOOR_CHANGE_WITH_BRACKETS = 1,        // a "or" after a "and" (or a "or" after a "and") without brackets
}

