const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Name cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    richDescription: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      trim: true,
      default: "kg",
      maxlength: [50, "Unit cannot exceed 50 characters"],
    },
    origin: {
      type: String,
      trim: true,
      maxlength: [100, "Origin cannot exceed 100 characters"],
    },
    region: {
      type: String,
      trim: true,
      maxlength: [100, "Region cannot exceed 100 characters"],
    },
    state: {
      type: String,
      trim: true,
      maxlength: [100, "State cannot exceed 100 characters"],
      default: "",
    },
    giYear: {
      type: String,
      trim: true,
      maxlength: [20, "GI Year cannot exceed 20 characters"],
    },
    sku: {
      type: String,
      trim: true,
      maxlength: [100, "SKU cannot exceed 100 characters"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    status: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Coming Soon"],
      default: "In Stock",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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
    productType: {
      type: String,
      enum: ["Agricultural Product", "Food Product", "Other"],
      default: "Agricultural Product",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate slug
productSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
});

productSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name);
  }
});

// Populate category when querying
productSchema.virtual("categoryDetails", {
  ref: "Category",
  localField: "category",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Product", productSchema);
