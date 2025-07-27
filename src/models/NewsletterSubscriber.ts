import mongoose, { Schema, model, models } from 'mongoose'

const NewsletterSubscriberSchema = new Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
})

const NewsletterSubscriber = models.NewsletterSubscriber || model('NewsletterSubscriber', NewsletterSubscriberSchema)
export default NewsletterSubscriber
