import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    category: { type: String, required: true, trim: true },
    categorySlug: { type: String, required: true, trim: true },
    author: { type: String, default: 'EmiratesVisa.ae' },
    date: { type: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Article: Model<IArticle> =
  (mongoose.models.Article as Model<IArticle>) ||
  mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
