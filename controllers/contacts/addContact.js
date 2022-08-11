const contactsOperations = require("../../models/contacts");
const { createError } = require("../../helpers");
const { addSchema } = require ('../../schemas/contacts')

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw createError(400, "missing required name field");
  }
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
}

module.exports = addContact;

  