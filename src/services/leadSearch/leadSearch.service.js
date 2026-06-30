const Business = require('../../models/business.model')

const searchLead = async(filters)=>{

    const {businessType,city,leadCategory} = filters
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

    const businesses = await Business.find(mongoQuery )

    return businesses

}

module.exports = {
    searchLead
}