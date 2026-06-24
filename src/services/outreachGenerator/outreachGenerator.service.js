const generateOutreachMessage = (business)=>{
    let message = `Hello ${business.name} Team,\n\n I recently came across your ${business.businessType} and was impressed by your
    reputation and customer review.
    `
    if(!business.digitalPresence.hasWebsite){
        message += `I have notice that your business doesn't currently have a website.\n I notice that your business is mainly rely on
        WhatsApp and phone call and Instagram DMs for scheduling appointments\n.
        `;
    }
    if(!business.digitalPresence.hasInstagram){
        message += `I also noticed that you also be missing opportunities on Instagram.\n`;
    }

    message += `I specialize in developing salon booking and management platforms that help salons. Provide online appointment booking, customer management, and a more professional digital presence.\nI have already developed a working salon platform and believe it could be customized specifically for your business\n.
    `
    message += `Would you be interested in seeing a quick demo?\n\n`
    
    message += `Thank you.`

    return message;
}

module.exports = {
    generateOutreachMessage
}