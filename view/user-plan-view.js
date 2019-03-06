const courseTitleMap = require('../data/course_title_map.json');
const prereqMap = require('../data/prereq.json');

const isFreeCourse = x => Array.isArray(x) ? x.length === 0 : !x;
const freeCourses = Object.keys(prereqMap)
    .filter(key => isFreeCourse(prereqMap[key]))
    .map(course => ({
        name: course,
        title: courseTitleMap[course]
    }));

class UserPlanView {
    constructor(plan) {
        this.plan = plan;

        const courses = (this.plan || []).map(course => ({
            name: course,
            title: courseTitleMap[course] || 'N/A'
        }));

        this._apiResponse = {
            plan: {
                totalAvailableCourses: courses.length,
                courses: {
                    eligible: courses,
                    free: freeCourses
                }
            }
        };
    }

    get apiResponse() {
        return this._apiResponse;
    }
}

module.exports = {
    UserPlanView
};