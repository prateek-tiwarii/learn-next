import {Messages} from "../models/user";


export interface ApiResponse {
    sucess : boolean;
    message : string;
    isAcceptingMessages ? : boolean;
    messages ? :  Array<Messages>;
}