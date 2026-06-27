const generateOutreachMessage = (business)=>{
    let message = `Hello ${business.name} Team,\n\n I recently came across your ${business.businessType} and was impressed by your
    reputation and customer review.
    `
    if(!business.digitalPresence.hasWebsite){
        message += `I noticed that your business currently doesn't have a website.\n I notice that your business is mainly rely on
        WhatsApp and phone call and Instagram DMs for scheduling appointments\n.
        `;
    }
    if(!business.digitalPresence.hasInstagram){
        message += `I also noticed that your business may be missing opportunities on Instagram.\n`;
    }

    message += `I specialize in building websites and digital solutions for ${business.businessType.toLowerCase()} businesses that help attract more customers and improve online visibility.\n\n`;

    message += `Would you be interested in seeing a quick demo?\n\n`
    
    message += `Thank you.`

    return message;
}

module.exports = {
    generateOutreachMessage
}