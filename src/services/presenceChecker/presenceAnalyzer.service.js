const Business = require('../../models/business.model')

const analyzeBusinesses = (business)=>{


    const hasValidValue = (value)=>{
        if(!value){
            return false;
        }

        if(
            typeof value === 'string' && 
            value.toLowerCase().includes('error')
        ){
            return false;
        }

        return true;

    }

    const digitalPresence = {
        hasWebsite:hasValidValue(business.hasWebsite),
        hasInstagram:hasValidValue(business.socialLinks?.instagram),
        hasFacebook:hasValidValue(business.socialLinks?.facebook),
        hasLinkedin:hasValidValue(business.socialLinks?.linkedin)
    }

    return {
        digitalPresence,
        analyzedAt:new Date()
    }

}

module.exports = {
    analyzeBusinesses
}