import { reducer } from "./reducer";
import { FILTER_COURSES } from "../courses/course.actions";

describe('reducer', () => {
    it('should have the correct initial state', () => {
        const state = reducer(undefined, {});

        expect(state.courses.length).toBe(0);
        expect(state.filteredCourses.length).toBe(0);
    });

    describe('filterCourses', () => {
        const courses = [
            {
                "id": 1,
                "name": "Building Apps with React",
                "topic": "ReactJS"
            },
            {
                "id": 2,
                "name": "Building Apps with Angular",
                "topic": "AngularJS"
            },
            {
                "id": 3,
                "name": "Building Apps with Angular and Redux",
                "topic": "Angular and Redux"
            }
        ];
        it('should filter out all the courses in case of a bad search text', () => {
            const state = {
                courses,
                filteredCourses: courses
            };

            const filteredState = reducer(state, {
                type: FILTER_COURSES,
                searchText: 'bad Search'
            });

            expect(filteredState.courses.length).toBe(3);
            expect(filteredState.filteredCourses.length).toBe(0);

        });

        it('should filter in 1 the courses in case of a valid search text', () => {
            const state = {
                courses,
                filteredCourses: courses
            };

            const filteredState = reducer(state, {
                type: FILTER_COURSES,
                searchText: 'Redux'
            });

            expect(filteredState.courses.length).toBe(3);
            expect(filteredState.filteredCourses.length).toBe(1);

            const matchedCourse = filteredState.filteredCourses[0];
            expect(matchedCourse.id).toBe(3);

        });

    })

});