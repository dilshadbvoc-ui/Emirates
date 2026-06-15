import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICalculatorConfig extends Document {
  fees: any;
  questions: any;
  createdAt: Date;
  updatedAt: Date;
}

const CalculatorConfigSchema = new Schema<ICalculatorConfig>(
  {
    fees: { type: Schema.Types.Mixed, required: true },
    questions: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const CalculatorConfig: Model<ICalculatorConfig> =
  (mongoose.models.CalculatorConfig as Model<ICalculatorConfig>) ||
  mongoose.model<ICalculatorConfig>('CalculatorConfig', CalculatorConfigSchema);

export default CalculatorConfig;
