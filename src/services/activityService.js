import activityRepo from '../repository/activityRepository.js'; //importiamo tutto il modulo

const addPost = async(content) => {
    content['tags'] = [...new Set(content.tags.split(',').map(tag => tag.trim()))], // Converte la stringa di tag in un array (Divide i tag, rimuovi gli spazi extra e elimina i duplicati)
    content['createdAt'] = new Date().getTime();
    content['updatedAt'] = content.createdAt;
    //console.log(content)
    return await activityRepo.addPost(content);
}

const updatePost = async(id, content) => {
    //console.log(content)
    content['tags'] = [...new Set(content.tags.split(',').map(tag => tag.trim()))]; // Converte la stringa di tag in un array (Divide i tag, rimuovi gli spazi extra e elimina i duplicati)
    //content['updatedAt'] = new Date().getTime();
    //console.log(content)
    const activity = await activityRepo.updatePost(id, content);
    return checkActivity(activity);
}

const removePost = async(id, userId) => {
    await activityRepo.removePost(id, userId);
    return true;
}

const getList = async() => {
    return await activityRepo.getList();
}

const getListByTags = async(tags) => {
    return await activityRepo.getListByTags(tags);
}

const getPost = async(id) => { 
    const activity = await activityRepo.getPost(id); 
    return checkActivity(activity); 
}

const addComment = async(id, content) => {
    content['createdAt'] = new Date().getTime();
    content['updatedAt'] = content.createdAt;
    return await activityRepo.addComment(id, content);
}

const updateComments = async(commentId, content) => {
    //content['updatedAt'] = new Date().getTime();
    const activity = await activityRepo.updateComments(commentId, content);
    return checkActivity(activity);
}

const removeComments = async(id, commentId, userId) => {
    await activityRepo.removeComments(id, commentId, userId);
    return true;
}

const getCommentsByPostId = async(id) => {
    return await activityRepo.getCommentsByPostId(id);
}

const checkActivity = (activity) => {
    if (activity === null) {
        const error = new Error('Activity not found');
        error.status = 404;
        throw error;
    }
    return activity.toJSON({ versionKey: false });
}

/************************************************ */



const likeNumbers= async (id, userId) => {
    const activity = await activityRepo.like(id, userId);
    return checkActivity(activity);
}





export default {
    addPost,
    updatePost,
    removePost,
    getList,
    getListByTags,
    getPost,
    addComment,
    updateComments,
    removeComments,
    getCommentsByPostId, 




    likeNumbers,    
}