import { messagesModel } from "../db/models/messages.model.js"; 

class MessagesManager {

    async createOne(obj) {
        const response = await messagesModel.create(obj);
        return response;
    }
    
}

export const MessageManager = new MessagesManager();