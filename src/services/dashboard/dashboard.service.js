const Business = require('../../models/business.model')

const getDashboardSummary = async()=>{
    const totalBusinesses = await Business.countDocuments();

    const newLeads = await Business.countDocuments({status:'new'});

    const analyzedLeads = await Business.countDocuments({status:'analyzed'});

    const qualifiedLeads = await  Business.countDocuments({status:'qualified'});

    const contactedLeads = await Business.countDocuments({status:'contacted'});

    const closedLeads = await  Business.countDocuments({status:'closed'});

    const hotLeads = await Business.countDocuments({leadCategory:'hot'});

    const warmLeads = await Business.countDocuments({leadCategory:'warm'});

    const coldLeads = await Business.countDocuments({leadCategory:'cold'});

    const averageLeadScore = await Business.aggregate([
        {
            $group:{
                _id:null,
                averageScore:{
                    $avg:'leadScore'
                }
            }
        }
    ])

    return {
        totalBusinesses,
        newLeads,
        analyzedLeads,
        qualifiedLeads,
        contactedLeads,
        closedLeads,
        hotLeads,
        warmLeads,
        coldLeads,
        averageLeadScore

    }
}

const getRecentBusinesses = async()=>{
    
    const recentBusinesses = await Business.find().sort({createdAt:-1}).limit(10);

    return recentBusinesses
}

module.exports = {
    getDashboardSummary,
    getRecentBusinesses
}