const validate =
  (schema, target = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join("; ");
      return res.status(400).json({ message: `Validation failed: ${message}` });
    }

    req[target] = result.data;
    next();
  };

module.exports = validate;
