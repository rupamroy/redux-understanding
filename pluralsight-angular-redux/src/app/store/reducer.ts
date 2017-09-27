import { Course } from "../courses/course";
import { IAppState } from "./IAppState";
import { FILTER_COURSES } from "./actions";

const courses = [
    {
        id: 1,
        name: "Building apps with React (local)",
        topic: "ReactJs"
    },
    {
        id: 2,
        name: 'Building apps with angular (local)',
        topic: 'AngularJs'
    },
    {
        id: 3,
        name: "Building apps with Angular and Redux (local)",
        topic: "Angular and Redux"
    }
]

const initialState: IAppState = {
    courses,
    filteredCourses: courses
}

function filterCourses(state, action): IAppState {
    return Object.assign({}, state, {
        filteredCourses: state.courses.filter(c => c.name.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1)
    })
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_COURSES:
            return filterCourses(state, action);
        default:
            return state;
    }
}

