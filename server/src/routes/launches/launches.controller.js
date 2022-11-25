const express = require('express');
const { getAllLaunches } = require('../../models/launches.model');

function hrrpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches);
}

module.exports = {
    httpGetAllLaunches,
}