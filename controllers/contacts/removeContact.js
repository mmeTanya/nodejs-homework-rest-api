const contactsOperations = require("../../models/contacts");
const { createError } = require("../../helpers");

  const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw createError(404, `contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
};

  module.exports = removeContact;

  