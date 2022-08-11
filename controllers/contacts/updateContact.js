const contactsOperations = require("../../models/contacts");
const { createError } = require("../../helpers");
const { addSchema } = require ('../../schemas/contacts')

  const updateContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, `contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
};

  module.exports = updateContact;


  
  