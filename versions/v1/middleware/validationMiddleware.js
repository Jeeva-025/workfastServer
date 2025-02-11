const middleware = {};

middleware.validateBody = (schema) => {
  return (req, res, next) => {
    if (!schema || typeof schema.validate !== "function") {
      return res.status(500).json({ code: 500, message: "Invalid validation schema" });
    }

    const options = {
      abortEarly: false, // Include all errors
      allowUnknown: true, // Ignore unknown props
      
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      console.error("Validation Error:", error.details.map((e) => e.message));

      return res.status(422).json({
        code: 422,
        errors: error.details.map((e) => e.message),
      });
    }

    req.body = value;
    next();
  };
};

module.exports = middleware;