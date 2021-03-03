export interface User {
    userId: string;
    name: string;
    email: string;
}

export interface FreeProgram {
    programId? : string;
    userId? : string;
    enrolled : boolean;
    date : Date; 
    cycles :  Array<Cycles>;
    currentCycleCount : number;
    totalCompletedCycles : number;
    totalCompletedSessions : number;
    totalMissedSessions : number
}

export interface Cycles {
    cycleId : number;
    sessionTrackerMissed : Array<Workout>;
    sessionTrackerCompleted :  Array<Workout>;
}

export interface Workout {
    date : Date; 
    sessionNumber : Number; 
    sessionType : Number;
}

export interface Message {
    messageId?: string;
    text: string;
    sent?: number;             //summary of polling information     
}