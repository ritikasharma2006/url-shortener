const express = require("express");

const urlmodel = require('../models/url.model')
const urlController = require('../controllers/url.controller')

const router = express.Router();


router.post('/api/shorten',urlController.shortenURL)

router.get('/:shortcode',urlController.getOriginalUrl)

router.get('/api/history', urlController.getHistory)

router.delete('/api/history/:id', urlController.deleteUrl)

module.exports = router;