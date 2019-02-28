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
                totalAvailableCourses: courses.length,
                courses: {
                    eligible: courses,
                    free: []
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