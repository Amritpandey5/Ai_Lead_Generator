const calculateLeadScore  = (digitalPresence)=>{

    let leadScore = 100
    

    if(digitalPresence.hasWebsite){
            leadScore -= 40
        }

    if(digitalPresence.hasInstagram){
            leadScore -= 20
        }
    if(digitalPresence.hasFacebook ){
            leadScore -= 20
        }
    if(digitalPresence.hasLinkedin){
            leadScore -= 20
        }

    leadScore = Math.max(0,leadScore)

    let leadCategory = 'cold'
    if(leadScore >=80){
        leadCategory = 'hot'
    }
    else if(leadScore >= 50){
        leadCategory = 'warm'
    }

    console.log(leadScore);

    return {
        leadScore,
        leadCategory
    }
    
}

module.exports = {
    calculateLeadScore
}