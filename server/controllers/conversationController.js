import Conversation from "../model/Conversation.model.js"

export const newConversation = async (request,response)=>{
    let senderId = request.body.senderId;
    let receiverId = request.body.receiverId;

    try{
    const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId]  }})

    if(exist){
        return response.status(200).json({status:'success',msg:'conversation already exists'});
    }
    const newConversation = new Conversation({
        members:[senderId,receiverId]
    })
    const savedConversation = await newConversation.save()
    return response.status(200).json({status:'success',msg:'conversation added successful.'});
    
   }catch(error){
    return response.status(500).json({status:'failed',msg:error.message})
   }
}

export const getConversation = async (request,response)=>{
    let senderId = request.body.senderId;
    let receiverId = request.body.receiverId;
    try{
        const conversation = await Conversation.findOne({ members: { $all: [senderId,receiverId] }});
        return response.status(200).json({status:'success',msg:conversation})
    }catch(error){
        return response.status(500).json({status:'failed',msg:error.message})
    }
}

