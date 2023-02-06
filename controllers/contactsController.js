const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @description Get alll contacts
// @route GET /api/contacts
// @access private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);

  //   res.status(200).json({ message: "Get all contacts" });
});

// @description Create contacts
// @route POST /api/contacts
// @access private

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("All field should be fulfield");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  //   res.status(200).json({ message: "Create contacts" });
  res.status(200).json(contact);
});

// @description Update contacts
// @route Put /api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updateContactRequest = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  //   res.status(200).json({ message: `Update contacts for ${req.params.id}` });
  res.status(200).json(updateContactRequest);
});

// @description Update contacts
// @route Put /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  // await Contact.remove();
  await Contact.deleteOne({ _id: req.params.id });
  // res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
  res.status(200).json(contact);
});

module.exports = { getContact, createContact, updateContact, deleteContact };
