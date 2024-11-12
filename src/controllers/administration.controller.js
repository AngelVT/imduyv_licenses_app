import { AdministrationDetails } from "../models/Administration.models.js";

export const getPeriods = async (req, res) => {
    res.send().json({
        msg: "getting all periods"
    });
}

export const getPeriod = async (req, res) => {
    res.send().json({
        msg: "getting period"
    });
}

export const createPeriod = async (req, res) => {
    res.send().json({
        msg: "creating period"
    });
}

export const updatePeriod = async (req, res) => {
    res.send().json({
        msg: "updating period"
    });
}

export const deletePeriod = async (req, res) => {
    res.send().json({
        msg: "deleting period"
    });
}