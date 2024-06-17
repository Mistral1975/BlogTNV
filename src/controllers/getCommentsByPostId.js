import activityService from "../services/activityService.js";

export default async (req, res) => {
    try {
        const activities = await activityService.getCommentsByPostId(req.params.id);
        res.status(200).json(activities);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}