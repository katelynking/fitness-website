const router = require('express').Router();
const { default: axios } = require('axios');

router.get("/", async (req, res) => {
    const workoutData = await axios.get(`https://wger.de/api/v2/exercisecategory/`).catch((err) =>{
        res.json(err);
    });
})