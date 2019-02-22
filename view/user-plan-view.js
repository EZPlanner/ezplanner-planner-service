const courseTitleMap = require('../data/course_title_map.json');

class UserPlanView {
    constructor(plan) {
        this.plan = plan;

        const courses = (this.plan || []).map(course => ({
            name: course,
            title: courseTitleMap[course] || 'N/A'
        }));

        this._apiResponse = {
            plan: {
                size: courses.length,
                courses
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