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
                    $avg:'$leadScore'
                }
            }
        }
    ])

    const avg = averageLeadScore[0]?.averageScore || 0;

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
        averageLeadScore: Number(avg.toFixed(2))

    }
}

const getRecentBusinesses = async()=>{
    
    const recentBusinesses = await Business.find().sort({createdAt:-1}).limit(10);

    return recentBusinesses
}

const getBusinessTypesDistribution= async()=>{
    const businesses = await Business.aggregate([
        {
            $group:{
                _id:"$businessType",
                count:{
                    $sum:1
                }
            }
        }
    ])
    return businesses
}

const getCityDistribution = async(city)=>{
    const businesses = await Business.aggregate([
        {
            $group:{
                _id:"$city",
                count:{
                    $sum:1
                }
            }
        }
    ])

    return businesses

}

const getMonthlyGrowth = async()=>{
    const businesses = await Business.aggregate([
        {
            $group:{
                _id:{
                    year:{$year:"$createdAt"},
                    month:{$month:"$createdAt"}
                },
                count:{
                    $sum:1
                }
            }
        },
        {
            $sort:{
                "_id.year":1,
                "_id.month":1
            }
        }
    ])
    return businesses
}

const checkDigitalPresence = async()=>{
    const totalBusiness = await Business.countDocuments();

    const website = await Business.countDocuments({
        "digitalPresence.hasWebsite":true
    })

    const instagram = await Business.countDocuments({
        "digitalPresence.hasInstagram":true,
    })

    const facebook = await Business.countDocuments({
        "digitalPresence.hasFacebook":true
    })

    const linkedin = await Business.countDocuments({
        "digitalPresence.hasLinkedin":true
    })

    return {
        totalBusiness,

        website:{
            present:website,
            missing:totalBusiness - website
        },

        instagram:{
            present:instagram,
            missing:totalBusiness - instagram
        },
        
        facebook:{
            present:facebook,
            missing:totalBusiness - facebook
        },

        linkedin:{
            present:linkedin,
            missing:totalBusiness - linkedin
        }

    }
}

module.exports = {
    getDashboardSummary,
    getRecentBusinesses,
    getBusinessTypesDistribution,
    getCityDistribution,
    getMonthlyGrowth,
    checkDigitalPresence
}