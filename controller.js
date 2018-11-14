const { check, validationResult } = require('express-validator/check');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Post = require('./models/Post');
const regValidation = [
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Email should be an email address'),
	check('name')
		.not()
		.isEmpty()
		.withMessage('Name is required')
		.isLength({ min: 4 })
		.withMessage('Name should be at least 4 letters')
		.matches(/^([A-z]|\s)+$/)
		.withMessage('Name cannot have numbers'),
	check('password')
		.not()
		.isEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Password should be at least 8 characters'),
	check('password_con', 'Password confirmation  is required or should be the same as password').custom(function(value, { req }) {
		if (value !== req.body.password) {
			throw new Error("Password don't match");
		}
		return value;
	}),
	check('email').custom(value => {
		return User.findOne({ email: value }).then(function(user) {
			if (user) {
				throw new Error('This email is already in use');
			}
		});
	})
];
var loginValidation = [
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email is required!'),
	check('password')
		.not()
		.isEmpty()
		.withMessage('Password can not be empty!')
];
router.post('/register', regValidation, (req, res) => {
	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.mapped() });
	}
	const user = new User(req.body);
	user.password = user.hashPassword(user.password);
	user
		.save()
		.then(user => {
			return res.json({
				ok: true,
				message: 'You are successfully registerated.'
			});
		})
		.catch(error => {
			return res.json({ errors: { auth: { msg: 'Something went wrong!' } } });
		});
});

router.post('/login', loginValidation, (req, res) => {
	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ errors: errors.mapped() });
	}

	User.findOne({
		email: req.body.email
	})
		.then(function(user) {
			if (!user) {
				return res.status(400).send({ errors: { auth: { msg: 'User does not exist!' } } });
			}
			if (!user.comparePassword(req.body.password, user.password)) {
				return res.status(400).send({ errors: { auth: { msg: 'Wrong password!' } } });
			}
			req.session.user = user;
			return res.send({ message: 'You are signed in' });
		})
		.catch(function(error) {
			console.log(error);
		});
});

router.get('/authorization', (req, res) => {
	if (req.session.user) {
		return res.send({ isLoggedIn: true });
	}
	return res.status(404).send({ isLoggedIn: false });
});

const authCheck = (req, res, next) => {
	if (req.session.user) {
		return next();
	}
	return res.status(401).send({ isLoggedIn: false });
};

const articleValidation = [
	check('title')
		.not()
		.isEmpty()
		.withMessage('Title is required.')
		.isLength({ min: 10 })
		.withMessage('Title should be at least 10 characters'),
	check('summary')
		.not()
		.isEmpty()
		.withMessage('Summary is required.')
		.isLength({ min: 10 })
		.withMessage('Summary should be at least 10 characters'),
	check('description')
		.not()
		.isEmpty()
		.withMessage('Article is required.')
		.isLength({ min: 20 })
		.withMessage('Article should be at least 80 characters'),
	check('keywords')
		.not()
		.isEmpty()
		.withMessage('You should add at least one tag.')
		.matches(/^([A-z+,]|\s)+$/)
		.withMessage('Keywords cannot have numbers')
];

router.post('/article', authCheck, articleValidation, (req, res) => {
	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({ errors: errors.mapped() });
	}
	var post = new Post(req.body);
	post.user = req.session.user._id;
	post
		.save()
		.then(user => {
			res.json({ success: true });
		})
		.catch(error => {
			res.json(error);
		});
});

router.get('/articles', (req, res) => {
	Post.find()
		.populate('user', { password: 0 })
		.sort({ createdAt: 'desc' })
		.then(articles => {
			res.json(articles);
		})
		.catch(err => res.json(err));
});

router.get('/random-article', (req, res) => {
	Post.find()
		.populate('user', { password: 0 })
		.then(articles => {
			var x = Math.floor(Math.random() * articles.length + 0);
			res.json(articles[x]);
		})
		.catch(err => res.json(err));
});

router.get('/article/:id', (req, res) => {
	Post.findById(req.params.id)
		.populate('user', { password: 0 })
		.then(article => res.json(article))
		.catch(err => res.json(err));
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.send('Logged out...');
});

module.exports = router;
