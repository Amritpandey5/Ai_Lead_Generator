const Business = require('../models/business.model');
const { findBusinesses } = require('../services/businessFinder/businessFinder.service')
const {analyzeBusinesses} = require('../services/presenceChecker/presenceAnalyzer.service')
const {calculateLeadScore} = require('../services/leadScorer/leadScorer.service')

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

            const analysis = await analyzeBusinesses(business)
            const leadData = await calculateLeadScore(analysis.digitalPresence)

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

                digitalPresence:analysis.digitalPresence,

                source: business.source || 'mock_data',

                leadScore: leadData.leadScore,
                leadCategory:leadData.leadCategory,
                status: leadData.leadScore >= 50 ? 'qualified' : 'analyzed',

                outreach: {
                    whatsappSent: false,
                    emailSent: false,
                    instagramSent: false,
                    notes: ''
                },

                lastAnalyzedAt:analysis.analyzedAt
            };



            const createdBusiness = await Business.create(cleanedBusiness);
            savedBusinesses.push(createdBusiness);
            savedCount++;



        }

        console.log(
            `Found: ${foundBusinesses.length},\n Saved: ${savedCount},\nSkipped: ${skippedCount}`
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