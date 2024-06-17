import activityService from "../services/activityService.js";

export default async (req, res) => {
    try {
        const activity = await activityService.addComments({...req.body, userId: req.userId, categoriesId: req.categoriesId, isAdmin: req.isAdmin});
        res.status(201).json(activity);
    } catch (err){
        res.status(500).json({message: `something went wrong ${err}`});
    }
}