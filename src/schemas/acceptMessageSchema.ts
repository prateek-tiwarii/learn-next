import {z} from 'zod';

export const acceptMessageSchema = z.object({
    isacceptingmessages : z.boolean()
})