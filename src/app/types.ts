export interface User {
    userId: string;
    name: string;
    email: string;
}

export interface FreeProgram {
    userId? : string,
    enrolled : boolean;
    date : Date
}

export interface Message {
    messageId?: string;
    text: string;
    sent?: number;             //summary of polling information     
}