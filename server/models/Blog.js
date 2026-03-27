const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [300, "Title cannot exceed 300 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    coverImage: {
      type: String,
      default: null,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
      default: "",
    },
    author: {
      type: String,
      trim: true,
      default: "Vijay Overseas Team",
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [200, "SEO title cannot exceed 200 characters"],
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [500, "SEO description cannot exceed 500 characters"],
    },
    readTime: {
      type: Number,
      default: 5,
      min: 1,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate slug from title
blogSchema.pre("save", function () {
  if (this.isModified("title") && !this.slug) {
    this.slug = slugify(this.title);
  }
  // Set publishedAt when first published
  if (this.isModified("isPublished") && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  // Auto-calculate read time from content (~200 words per minute)
  if (this.isModified("content") && this.content) {
    const wordCount = this.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
});

blogSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = slugify(update.title);
  }
  if (update.isPublished && !update.publishedAt) {
    update.publishedAt = new Date();
  }
});

module.exports = mongoose.model("Blog", blogSchema);
