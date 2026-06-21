const Business = require('../models/business.model');
const { findBusinesses } = require('../services/businessFinder/businessFinder.service')

const businessSearch = async (req, res) => {
    try {
        const { businessType, city } = req.body;
        if (!businessType || !city) {
            return res.status(400).json({
                success: false,
                message: 'Business type and city are required',
            });
        }
        console.log('finding the business');
        const foundBusinesses = await findBusinesses(businessType, city);
        console.log(foundBusinesses);
        let savedCount = 0;
        let skippedCount = 0;
        const savedBusinesses = []
        for (let i = 0; i < foundBusinesses.length; i++) {

            const business = foundBusinesses[i];

            const exists = await Business.exists({
                name: business.name,
                address: business.address
            })
            if (exists) {
                skippedCount++;
                continue
            }

            const parseDate = (dateString) => {
                if (!dateString) return null;

                const [day, month, year] = dateString.split('/');

                return new Date(year, month - 1, day);
            };

            const lastAnalyzedAt = parseDate(business.lastAnalyzedAt);


            const cleanedBusiness = {
                name: business.name,
                businessType: business.businessType,
                email: business.email || '',
                city: business.city,
                address: business.address,
                phone: business.phone || '',
                website: business.website || '',

                socialLinks: {
                    instagram: business.socialLinks?.instagram || '',
                    facebook: business.socialLinks?.facebook || '',
                    linkedin: business.socialLinks?.linkedin || '',
                },

                digitalPresence: {
                    hasWebsite: !!business.website,
                    hasInstagram: !!business.socialLinks?.instagram,
                    hasFacebook: !!business.socialLinks?.facebook,
                    hasLinkedin: !!business.socialLinks?.linkedin,
                },

                source: business.source || 'mock_data',

                leadScore: 0,
                status: 'new',

                outreach: {
                    whatsappSent: false,
                    emailSent: false,
                    instagramSent: false,
                    notes: ''
                },

                lastAnalyzedAt
            };

            const createdBusiness = await Business.create(cleanedBusiness);
            savedBusinesses.push(createdBusiness);
            savedCount++;



        }

        console.log(
            `Found: ${foundBusinesses.length},
            Saved: ${savedCount},
            Skipped: ${skippedCount}`
        );

        res.status(200).json({
            success: true,
            count: foundBusinesses.length,
            saved: savedCount,
            skipped: skippedCount,
            data: savedBusinesses,
            message: 'businesses saved successfully'
        })

    } catch (error) {
        console.error('Internal Server error', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }

}

module.exports = {
    businessSearch,
}