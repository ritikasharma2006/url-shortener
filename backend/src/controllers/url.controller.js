const urlmodel = require('../models/url.model')
const crypto = require("crypto")

const shortenURL = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                error: "originalUrl is required"
            });
        }

        const shortcode = crypto.randomBytes(4).toString("hex");

        const url = await urlmodel.create({
            originalUrl,
            shortCode: shortcode
        });

        res.status(200).json({
            message: "URL shortened successfully",
            shortCode: shortcode
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Server error"
        });
    }
};


const getOriginalUrl = async (req, res) => {
    try {
        const { shortcode } = req.params;

        const url = await urlmodel.findOneAndUpdate(
            { shortCode: shortcode },
            { $inc: { clicks: 1 } },
            { returnDocument: "after" }
        );

        if (!url) {
            return res.status(404).json({
                error: "URL not found"
            });
        }

        res.redirect(url.originalUrl);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Server error"
        });
    }
};

const getHistory = async (req, res) => {
    try {
        const urls = await urlmodel
            .find()
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch URL history"
        });
    }
};


const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUrl = await urlmodel.findByIdAndDelete(id);

        if (!deletedUrl) {
            return res.status(404).json({
                error: "URL not found"
            });
        }

        res.status(200).json({
            message: "URL deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete URL"
        });
    }
};


module.exports = {
    shortenURL,
    getOriginalUrl,
    getHistory,
    deleteUrl
}