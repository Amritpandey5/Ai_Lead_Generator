const Business = require('../models/business.model')

// Get All Leads

const getAllLeads = async (req, res) => {
    const businesses = await Business.find();
    if (businesses.length === 0) {
        return res.status(404).json({
            'success': false,
            'count': businesses.length,
            'message': 'No Business Found'
        });
    }
    res.status(200).json({
        'success': true,
        'count': businesses.length,
        'data': businesses
    })
}

// Get All Hot Leads

const getHotLeads = async (req, res) => {
    const hotBusinesses = await Business.find({
        leadCategory: 'hot'
    });
    if (hotBusinesses.length === 0) {
        return res.status(404).json({
            'success': false,
            'count': hotBusinesses.length,
            'message': 'No Business Found'
        });
    }
    res.status(200).json({
        'success': true,
        'count': hotBusinesses.length,
        'data': hotBusinesses
    })
}

// Get All Warm Leads

const getWarmLeads = async (req, res) => {
    const warmBusinesses = await Business.find({
        leadCategory: 'warm'
    });
    if (warmBusinesses.length === 0) {
        return res.status(404).json({
            'success': false,
            'count': warmBusinesses.length,
            'message': 'No Business Found'
        });
    }
    res.status(200).json({
        'success': true,
        'count': warmBusinesses.length,
        'data': warmBusinesses
    })
}

// Get All Cold Leads

const getColdLeads = async (req, res) => {
    const coldBusinesses = await Business.find({
        leadCategory: 'cold'
    });
    if (coldBusinesses.length === 0) {
        return res.status(404).json({
            'success': false,
            'count': coldBusinesses.length,
            'message': 'No Business Found'
        });
    }
    res.status(200).json({
        'success': true,
        'count': coldBusinesses.length,
        'data': coldBusinesses
    })
}

// Get Single Lead By Id

const getLeadById = async (req, res) => {
    const lead = await Business.findById(req.params.id)
    if (!lead) {
        return res.status(404).json({
            'success': false,
            'message': 'No lead found'
        })
    }
    res.status(200).json({
        'success': true,
        'data': lead
    })
};

// Update Status of lead

const updateStatusOfLead = async(req, res) => {

    const { status } = req.body;
    const lead = await Business.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );
    if(!lead){
        return res.status(404).json({
            'success':false,
            'message':'Lead not found'
        })
    }


    res.status(200).json({
        'success': true,
        'status': lead.status,
    })
}

// Get Lead Overall stats

const getLeadStat = async (req, res) => {
    const totalLeads  = await Business.countDocuments();

    const hotLeads = await Business.countDocuments({
        leadCategory:'hot'
    });
    
    const warmLeads = await Business.countDocuments({
        leadCategory:'warm'
    });

    const coldLeads = await Business.countDocuments({
        leadCategory:'cold'
    });

    const qualifiedLeads = await Business.countDocuments({
        status:'qualified'
    });

    res.status(200).json({
        'success':true,
        'data':{
            totalLeads:totalLeads,
            hotLeads:hotLeads,
            warmLeads:warmLeads,
            coldLeads:coldLeads,
            qualifiedLeads:qualifiedLeads
        }
    });

}

module.exports = {
    getAllLeads,
    getHotLeads,
    getWarmLeads,
    getColdLeads,
    getLeadById,
    updateStatusOfLead,
    getLeadStat
}




