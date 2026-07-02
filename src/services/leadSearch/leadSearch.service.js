const Business = require('../../models/business.model')

const searchLead = async(filters)=>{

    const {businessType,city,leadCategory,status,source,search,minScore,maxScore,sort='-createdAt',page=1,limit=10} = filters
    const mongoQuery  = {}

    if(businessType){
        mongoQuery .businessType = businessType
    }

    if(city){
        mongoQuery .city = city
    }

    if(leadCategory){
        mongoQuery .leadCategory = leadCategory
    }

    if(status){
        mongoQuery .status = status
    }

    if(source){
        mongoQuery .source = source
    }

    if(search){
        mongoQuery.$or = [
            {name: {$regex: search, $options: 'i'}},
            {city: {$regex: search, $options: 'i'}},
            {email: {$regex: search, $options: 'i'}},
            {phone: {$regex: search, $options: 'i'}},
            {address: {$regex: search, $options: 'i'}},
        ]
    }

    if(minScore || maxScore){
        mongoQuery.leadScore = {};

        if(minScore){
            mongoQuery.leadScore.$gte =Number(minScore)
        }
        if(maxScore){
            mongoQuery.leadScore.$lte = Number(maxScore)
        }
    }

    const currentPage = parseInt(page) || 1
    const pagelimit = parseInt(limit) || 10

    const skip = (currentPage - 1) * pagelimit

    const total = await Business.countDocuments(mongoQuery)


    const businesses = await Business.find(mongoQuery)
    .sort(sort)
    .skip(skip)
    .limit(pagelimit)


    return {
        businesses,
        pagination:{
            page: currentPage,
            limit: pagelimit,
            total,
            totalPages: Math.ceil(total / pagelimit)    
        }
    }

}

module.exports = {
    searchLead
}