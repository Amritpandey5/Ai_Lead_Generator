const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name must contain aleast 3 letters'],
        trim: true,
        maxLength: [60, 'Name has atmost 60 charaters'],
    },
    businessType: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        trim:true,
        default:''
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        default:''
    },
    website: {
        type: String,
        trim: true,
    },
    socialLinks: {
        instagram: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        }
    },
    digitalPresence: {
        hasWebsite: {
            type: Boolean,
            default: false
        },
        hasInstagram: {
            type: Boolean,
            default: false
        },
        hasFacebook: {
            type: Boolean,
            default: false
        },
        hasLinkedin: {
            type: Boolean,
            default: false
        }
    },
    leadScore: {
        type: Number,
        default: 0
    },
    leadCategory:{
        type:String,
        enum:['cold','warm','hot'],
        default:'cold'
    },
    status: {
        type: String,
        trim: true,
        enum: [
            'new',
            'analyzing',
            'analyzed',
            'qualified',
            'contacted',
            'closed'
        ],
        default: 'new'
    },
    source:{
        type:String,
            default:'google_places'
    },
    outreach:{
        whatsappSent:{
            type:Boolean,
            default:false,
        },
        emailSent:{
            type:Boolean,
            default:false,
        },
        instagramSent:{
            type:Boolean,
            default:false,
        },
        lastContactedAt:{
            type:Date
        },
        
        notes:{
            type:String,
            default:''
        }
    },
    lastAnalyzedAt:{
            type:Date
    },

}, { timestamps: true })

businessSchema.index({
    name: 1,
    address: 1
}, {
    unique: true
})

const Business = mongoose.model('Business',businessSchema);

module.exports = Business;