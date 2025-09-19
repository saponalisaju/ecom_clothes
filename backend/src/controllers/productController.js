const {
  uploadProductImage,
  uploadSeedImage,
} = require("../middlewares/uploadFile");
const Product = require("../models/productModel");
const productData = require("../../productData");
const {
  deleteFileFromCloudinary,
  publicIdFromUrl,
} = require("../helpers/deleteFileCloudinary");

exports.seedProduct = async (req, res, next) => {
  try {
    const oldProducts = await Product.find({});

    const deletePromises = oldProducts.map(async (product) => {
      if (product.imagePublicId) {
        try {
          await deleteFileFromCloudinary(product.imagePublicId);
          console.log(
            `Image with public_id ${product.imagePublicId} deleted successfully`
          );
        } catch (error) {
          console.error(
            `Failed to delete image with public_id ${product.imagePublicId}: ${error.message}`
          );
        }
      }
    });

    await Promise.all(deletePromises);
    await Product.deleteMany({});

    const products = [
      ...productData.women,
      ...productData.men,
      ...productData.kid,
      ...productData.newCollection,
    ];

    const insertPromises = products.map(async (product) => {
      let secure_url = "default.png";
      let public_id = "";

      try {
        const uploadResult = await uploadSeedImage(
          product.image,
          "eComHangerDB/images"
        );
        secure_url = uploadResult.secure_url || secure_url;
        public_id = uploadResult.public_id || public_id;
        console.log(`Image uploaded successfully: ${secure_url}`);
      } catch (error) {
        console.error(`Image upload failed: ${error.message}`);
      }

      const newProduct = new Product({
        ...product,
        image: secure_url,
        imagePublicId: public_id,
      });
      await newProduct.save();
      console.log(`Product ${newProduct.name} saved successfully`);
    });

    await Promise.all(insertPromises);

    res.status(201).json({
      success: true,
      message: "Seed product successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.upload = async (req, res) => {
  try {
    const image = req.file.path;
    res.json({
      success: 1,
      image: image,
    });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.add_product = async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    const image = req.file?.path;
    let secure_url = "default.png";
    let public_id = "";
    if (image) {
      ({ secure_url, public_id } = await uploadProductImage(
        image,
        "eComHangerDB/images"
      ));
    }
    const product = new Product({
      id: id,
      name: req.body.name,
      image: secure_url,
      imagePublicId: public_id,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.status(201).json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

//Creating API for deleting Products
exports.remove_product = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    if (product.image) {
      const publicId = await publicIdFromUrl(product.image);
      await deleteFileFromCloudinary(publicId);
    }
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.status(200).json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Delete Error: ", error);
    res
      .status(500)
      .json({ success: false, message: "Delete Error.", error: error });
  }
};

//Creating API for getting all Products
exports.get_products = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No product found." });
    }
    console.log("All products Fetched");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.get_products_query = async (req, res) => {
  const search = req.query.search?.trim();
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const buildSearchQuery = (search, fields = ["name", "category"]) => {
      if (!search?.trim()) return {};
      return {
        $or: fields.map((field) => ({
          [field]: { $regex: search.trim(), $options: "i" },
        })),
      };
    };

    const query = buildSearchQuery(search);
    const products = await Product.find(query).limit(limit).skip(skip).exec();
    const count = await Product.countDocuments(query);
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No product found." });
    }
    console.log("All products Fetched");
    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalCount: count,
      pageSize: limit,
      message: "No products found",
    });
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.new_collections = async (req, res) => {
  try {
    const products = await Product.find({}).limit(4);
    const newCollections = products.slice(0, 4);
    if (!newCollections || newCollections.length === 0) {
      return res.status(404).json({ message: "No product found ." });
    }

    console.log("NewCollection Fetched");
    res.status(200).json(newCollections);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

// creating endpoint for new collection data
exports.new_collection_women = async (req, res) => {
  try {
    const products = await Product.find({ category: "women" });
    const newCollections = products.slice(0, 4);
    if (!newCollections || newCollections.length === 0) {
      return res.status(404).json({ message: "No product found ." });
    }

    console.log("NewCollection Fetched");
    res.status(200).json(newCollections);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.new_collection_men = async (req, res) => {
  try {
    const products = await Product.find({ category: "men" });
    const newCollections = products.slice(0, 4);
    if (!newCollections || newCollections.length === 0) {
      return res.status(404).json({ message: "No product found ." });
    }

    console.log("NewCollection Fetched");
    res.status(200).json(newCollections);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

exports.new_collection_kid = async (req, res) => {
  try {
    const products = await Product.find({ category: "kid" });
    const newCollections = products.slice(0, 4);
    if (!newCollections || newCollections.length === 0) {
      return res.status(404).json({ message: "No product found ." });
    }

    console.log("NewCollection Fetched");
    res.status(200).json(newCollections);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

//creating endpoint for popular in women section
exports.popular_women = async (req, res) => {
  try {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    if (!popular_in_women || popular_in_women.length === 0) {
      return res.status(404).json({ message: "No women product found. " });
    }
    console.log("Popular in women fetched");
    res.status(200).send(popular_in_women);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

//creating endpoint for popular in men section
exports.popular_men = async (req, res) => {
  try {
    let products = await Product.find({ category: "men" });
    let popular_in_men = products.slice(0, 4);
    if (!popular_in_men || popular_in_men.length === 0) {
      return res.status(404).json({ message: "No men product found. " });
    }
    console.log("Popular in men fetched");
    res.status(200).send(popular_in_men);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};

//creating endpoint for popular in kid section
exports.popular_kid = async (req, res) => {
  try {
    let products = await Product.find({ category: "kid" });
    let popular_in_kid = products.slice(0, 4);
    if (!popular_in_kid || popular_in_kid.length === 0) {
      return res.status(404).json({ message: "No kid product found. " });
    }
    console.log("Popular in kid fetched");
    res.status(200).send(popular_in_kid);
  } catch (error) {
    console.error("Error fetching pages:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching pages.",
      error: error.message,
    });
  }
};
