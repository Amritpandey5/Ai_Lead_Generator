const Business = require('../models/business.model')

const  {generateOutreachMessage} = require('../services/outreachGenerator/outreachGenerator.service')

const getOutreachMessage = async(req,res) =>{
    const business = await Business.findById(req.params.id);
    if(!business){
        return res.status(404).json({
            'success':false,
            'message':'No Business Found'
        })
    }

    const outreachMessage = business.outreach.generatedMessage

    res.status(200).json({
        'success':true,
        'data':outreachMessage
    })
}

const updateOutreachStatus = async(req,res)=>{

    const {channel} = req.body;

    const validChannels = ['whatsapp','email','instagram']

    if(!validChannels.includes(channel)){
        return res.status(400).json({
            'success':false,
            'message':'Invalid Channel'
        })
    }

    const business = await Business.findById(req.params.id)

    if(!business){
        return res.status(404).json({
            'success':false,
            'message':'No Business Found'
        })
    }

    if(channel === 'whatsapp'){
        business.outreach.whatsappSent = true
    }
    if(channel === 'email'){
        business.outreach.emailSent = true
    }
    if(channel === 'instagram'){
        business.outreach.instagramSent = true
    }

    business.outreach.lastContactedAt = new Date();

    await business.save()

    res.status(200).json({
        'success':true,
        'status':business.outreach
    })

}

const regenerateOutreachMessage = async(req,res)=>{
    const business = await Business.findById(req.params.id);
    if(!business){
        return res.status(404).json({
            'success':false,
            'message':'No Business Found'
        })
    }

    const newMessage = generateOutreachMessage(business);
    business.outreach.generatedMessage = newMessage;

    await business.save();
    res.status(200).json({
        'success':true,
        'message':'Outreach message regenerated successfully',
        'data':newMessage
    })
}

module.exports = {
    getOutreachMessage,
    updateOutreachStatus,
    regenerateOutreachMessage
}