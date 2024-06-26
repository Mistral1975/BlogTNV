import activityService from "../services/activityService.js";

export default async (req, res) => {
    try {
        const activities = await activityService.getList();
        res.status(200).json(activities);
    } catch (err) {
        console.log(err);
        res.status(err.status).json({ message: err.message });
    }
}