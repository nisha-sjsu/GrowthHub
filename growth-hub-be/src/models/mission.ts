import { UUID } from 'mongodb';
import mongoose, { Document, Schema } from 'mongoose';

interface IMission {
    userId: string;
    missionId: UUID;
    missionName: string;
    missionObjective: string;
    status: string;
    startDate: Date;
    endDate: Date;
    publicMission: boolean;
    parentMissionId: UUID;
    totalReplications: number;
    assignedAPId: string;
    missionCategory: string;
    expectationFromAp: string;
    comments: Array<{}>;
}

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IMissionModel extends IMission, Document {}

//DEFINE Mission SCHEMA
const MissionSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            default: '',
        },
        missionId: {
            type: UUID,
            default: [],
        },
        missionName: {
            type: String,
            default: ''
        },
        missionObjective: {  
            type: String,
            default: ''
        },
        status:{
            type: String,
            default: ''
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: Date.now
        },
        publicMission: {
            type: Boolean,
            default: false
        },
        parentMissionId: {
            type: UUID,
            default: ''
        },
        totalReplications: {
            type: Number,
            default: 0
        },
        assignedAPId:{
            type: String,
            default: ''
        },
        missionCategory: {
            type: String,
            default: ''
        },
        expectationFromAp: {
            type: String,
            default: ''
        },
        comments: {
            type: Array,
            default: {}
        }
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<IMissionModel>('Mission', MissionSchema);
