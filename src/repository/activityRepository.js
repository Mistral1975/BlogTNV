import activitySchema from "../schema/activitySchema.js";
import commentSchema from "../schema/commentSchema.js";

const addPost = async (content) => {
    return await new activitySchema(content).save();
}

const updatePost = async (id, content) => {
    if (content.updatedAt) {
        content.updatedAt = new Date(content.updatedAt * 1000);
    }
    return await activitySchema.findOneAndUpdate({ _id: id, userId: content.userId }, content, { new: true });
}

const removePost = async (id, userId) => {
    return await activitySchema.findOneAndDelete({ _id: id, userId: userId }).catch((error) => {
        error.status = 500;
        throw error;
    });
}

const getList = async () => {
    return await activitySchema.find({}).populate('comments');
}

const getListByTags = async (tags) => {
    return await activitySchema.find({
        tags: { $in: tags } // Cerca post con il tag nell'array 'tags'
    });
}

const getPost = async (id, userId) => {
    return await activitySchema.findOne({ _id: id });
}

const addComment = async (id, content) => {
    const post = await activitySchema.findById({ _id: id }); // Recupera il documento post
    if (!post) {
        throw new Error('Post non trovato');
    }

    const comment = new commentSchema({
        description: content.description,
        userId: content.userId,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    //console.log(comment)

    await comment.save(); // Salva il documento commento

    post.comments.push(comment._id); // Aggiungi l'ID commento all'array comments del post
    await post.save(); // Salva il documento post aggiornato

    return comment; // Restituisci il commento creato (facoltativo)
}

const updateComments = async (commentId, content) => {
    /*if (content.dueDate) {
        content.dueDate = new Date(content.dueDate * 1000);
    }*/
    return await commentSchema.findOneAndUpdate({ _id: commentId, userId: content.userId }, content, { new: true });
}

const removeComments = async (id, commentId, userId) => {

    const comment = await commentSchema.findOne({ _id: commentId }); // Recupera il documento comment

    if (!comment) {
        throw new Error('Commento non trovato');
    }

    const commentUserId = comment.userId;

    // Verifica l'autorizzazione all'eliminazione del commento
    if (userId === commentUserId) {
        throw new Error('Non sei autorizzato a eliminare questo commento');
    }

    // Eliminazione del commento dalla collezione posts
    const post = await activitySchema.findOne({ _id: id });  // Recupera il documento post

    if (!post) {
        throw new Error('Post non trovato');
    }

    const commentIndex = post.comments.indexOf(commentId); // Trova l'indice del commento all'interno dell'array

    if (commentIndex === -1) {
        throw new Error('Commento non trovato per questo post');
    }

    post.comments.splice(commentIndex, 1); // Rimuove il commento dal post

    await post.save(); // Salva il post aggiornato

    // Elimina il documento del commento
    const commentDeleted = await commentSchema.findOneAndDelete({ _id: commentId }); // Elimina il documento commento

    if (!commentDeleted) {
        throw new Error('Commento non trovato');
    }

    return { message: 'Commento eliminato con successo' }; // Restituisce un messaggio di successo*/
}

const getCommentsByPostId = async (id) => {
    //return await activitySchema.findById({id}).populate('comments');

    const post = await activitySchema.findOne({ _id: id }).populate('comments'); // Popola i commenti per il post specificato

    if (!post) {
        throw new Error('Post non trovato');
    }

    return post.comments; // Restituisce la lista di commenti per il post specificato
}

/****************************************************** */

const likeNumbers = async (id, userId) => {
    const activity = await activityRepo.likes(id, userId);
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