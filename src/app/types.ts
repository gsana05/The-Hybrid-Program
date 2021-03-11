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

export interface TestResults {
    resultsId? : string | null;
    preTestDate? : Date | null; 
    postTestDate?: Date | null;
    preTestFiveKmRun? : number | null;
    postTestFiveKmRun? : number | null;
    preTestPlank? : number | null;
    postTestPlank? : number | null;
    preTestPressUps? : number | null;
    postTestPressUps? : number | null;
}

export interface Message {
    messageId?: string;
    text: string;
    sent?: number;             //summary of polling information     
}

export interface Joking {
    messageId?: string | null;
    text?: string;
    senderType?: Date;
    sent?: number;                      //date/time of send (ms)      //if it's a forward, the ID of the original message
}