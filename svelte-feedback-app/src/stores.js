import {writable} from 'svelte/store';

export const FeedbackStore = writable([
    {
        id: 1,
        rating: 8.5,
        text: 'Lorem ipsum',
    },{
        id: 2,
        rating: 6,
        text: 'Lorem ipsum 2',
    },{
        id: 3,
        rating: 8,
        text: 'Lorem ipsum 3',
    }
])