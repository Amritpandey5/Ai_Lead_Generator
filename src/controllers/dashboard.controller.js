const { getDashboardSummary, getRecentBusinesses, getBusinessTypesDistribution, getCityDistribution, getMonthlyGrowth, checkDigitalPresence } = require('../services/dashboard/dashboard.service');


const getSummary = async(req,res)=>{
    try {
        const allSummary = await getDashboardSummary();

        res.status(200).json({
            'success':true,
            'data':allSummary
        });

    } catch (error) {
        res.status(500).json({
            'success':false,
            'message':error.message || 'Internal Server Error'
        })
    }
}

const getRecent = async(req,res)=>{
    try {
        const recent = await getRecentBusinesses();
        res.status(200).json({
            'success':true,
            'data':recent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            'success':false,
            'message':error.message || 'Internal Server Error'
        })
    }
}

const getBusinessType = async(req,res)=>{
    try {
        const data = await getBusinessTypesDistribution();
        res.status(200).json({
            'success':true,
            'data':data
        })
    } catch (error) {
        res.status(500).json({
            'success':false,
            'message':error.message || 'Internal Server Error'
        })
    }

}

const getCity = async(req,res)=>{
    try {
        const data = await getCityDistribution();
        res.status(200).json({
            'success':true,
            'data':data
        })
    } catch (error) {
        res.status(500).json({
            'success':false,
            'message':error.message || 'Internal Server Error'
        })
    }
}

const getMonthlyData = async(req,res)=>{
    try {
        const data = await getMonthlyGrowth();
        res.status(200).json({
            'success':true,
            'data':data
        })
    } catch (error) {
        res.status(500).json({
            'success':false,
            'message':error.message || 'Internal Server Error'
        })
    }
}

const  getDigitalPresence = async(req,res)=>{
    try {
        const data = await checkDigitalPresence();
        res.status(200).json({
            'success':true,
            'data':data
        })
    } catch (error) {
        res.status(500).json({
            'success':false,
            'message':error.message || 'Internal Server Error'
        })
    }
}


module.exports = {
    getSummary,
    getRecent,
    getBusinessType,
    getCity,
    getMonthlyData,
    getDigitalPresence
}