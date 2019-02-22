const status = require('http-status');

const { PlanController } = require('../controllers/plan');
const { UserPlanView } = require('../view/user-plan-view');

module.exports = app => {
    app.get('/plan', (req, res, next) => {
        // TODO: Add joi validation here?

        try {
            const { course: courseParam } = req.query;

            const courses = courseParam ? Array.isArray(courseParam) ? courseParam : [courseParam] : [];

            const plan = PlanController.getPlanForCourses(courses);
            const userPlanView = new UserPlanView(plan);

            res.status(status.OK).json({
                status: 'success',
                data: userPlanView.apiResponse
            });
        } catch (err) {
            next(err);
        }
    });
};