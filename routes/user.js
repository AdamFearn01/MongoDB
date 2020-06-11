const Router = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('signIn');
});

const userController = require('../controllers/userController')

router.get('/', userController.getSignIn);

router.post('/signIn', userController.createUser);

router.get('/login', userController.getLogin);

router.post('/login', userController.createLogin);

router.get('/profile', userController.getProfile);

module.exports = router;