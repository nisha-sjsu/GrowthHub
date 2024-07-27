import { UUID } from 'mongodb';
import mongoose, { Document, Schema } from 'mongoose';

interface ITask {
    missionId: UUID;
    taskId: UUID;
    taskTitle: string;
    taskStatus: string;
    expectedCompletionDate: Date;
    completionDate: Date;
}

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT   
export interface ITaskModel extends ITask, Document {}

//DEFINE Task SCHEMA
const TaskSchema: Schema = new Schema(
    {
        missionId: {
            type: UUID,
            default: '',
        },
        taskId: {
            type: UUID,
            default: '',
        },
        taskTitle: {
            type: String,
            default: ''
        },
        taskStatus:{
            type: String,
            default: ''
        },
        expectedCompletionDate: {
            type: Date,
            default: Date.now
        },
        completionDate: {
            type: Date,
            default: ''
        }
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<ITaskModel>('Task', TaskSchema);
