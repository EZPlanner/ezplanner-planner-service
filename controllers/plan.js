const prereqMap = require('../data/prereq.json');
const postreqMap = require('../data/postreq.json');

let defaultPlanner;

class Planner {
    static get instance() {
        return defaultPlanner;
    }

    constructor(prereq, postreq) {
        this.prereqMap = prereq;
        this.postreqMap = postreq;
    }

    plan(finishedCourses) {
        // TODO: If we need to improve performance further, reduce function calls and use basic for loops
        const finishedCourseMap = finishedCourses.reduce((acc, course) => ({
            ...acc,
            [course]: true
        }), {});

        const check = items => {
            if (!items) {
                return false;
            }

            let taken = 0;
            let required = 0;

            for (const item of items) {
                if (Array.isArray(item)) {
                    if (!check(item)) {
                        return false;
                    }
                } else if (!isNaN(item)) {
                    required = Number(item);
                } else {
                    if (!finishedCourseMap[item] && required == 0) {
                        return false;
                    } else if (finishedCourseMap[item]) {
                        taken += 1;
                    }
                }
            }

            return required === 0 || taken >= required;
        }

        const unique = array => [...new Set(array)];

        const possibleCourses = unique(
            finishedCourses
                .flatMap(finishedCourse => this.postreqMap[finishedCourse] || [])
                .filter(possibleCourse => !finishedCourseMap[possibleCourse])
        );

        return possibleCourses.filter(possibleCourse => check(this.prereqMap[possibleCourse]));
    }
}

defaultPlanner = new Planner(prereqMap, postreqMap);

class PlanController {
    static getPlanForCourses(courses) {
        return Planner.instance.plan(courses);
    }
}

module.exports = {
    PlanController
};