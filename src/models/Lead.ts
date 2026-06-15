import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source: 'contact' | 'calculator' | 'whatsapp';
  calculatorSummary?: string;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    service: { type: String, trim: true },
    message: { type: String, trim: true },
    source: {
      type: String,
      enum: ['contact', 'calculator', 'whatsapp'],
      default: 'contact',
    },
    calculatorSummary: { type: String },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError in hot reload
const Lead: Model<ILead> =
  (mongoose.models.Lead as Model<ILead>) || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
