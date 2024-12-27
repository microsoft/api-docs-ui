export interface Api {
    /** Unique API identifier. */
    name: string;
    /** Display name of API, e.g. "HTTP Bin". */
    displayName: string;
    /** Description of API. */
    description: string;
    /** Determines type of API, e.g. "soap". */
    type: string;
}

export interface ApiGroup {
    tag: string;
    items: Api[];
}
