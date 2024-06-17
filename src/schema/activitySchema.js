import { Schema, model} from "mongoose";

const activitySchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, default: null},
    categoryId: {type: String},
    likes: {type: [Schema.Types.ObjectId], default: []},
    //likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array di ID utente
    tags: [{type: String, default: null}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] // Array di ID commento (riferimenti al modello Comment)
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        writeConcern: {w: 1, wtimeout: 1000},
    }
})
activitySchema.index({title: 1});

export default model('activity', activitySchema);