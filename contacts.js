const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
	try {
		const data = await fs.readFile(contactsPath, "utf-8");
		return JSON.parse(data);
	} catch (error) {
		console.log(error.message);
	}
}

const getContactById = async (contactId) => {
	try {
		const contacts = await listContacts();
		const result = contacts.find(contact => contact.id === contactId);
		return result || null;
	} catch (error) {
		console.log(error.message);
	}
}

const addContact = async ({name, email, phone}) => {
	try {
		const contacts = await listContacts();
		const newContact = {
			id: nanoid(),
			name,
			email,
			phone,
		}
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return newContact;
	} catch (error) {
		console.log(error.message);
	}
}

const removeContactById = async (contactId) => {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex(contact => contact.id === contactId);
		if (index === -1) {
			return null;
		}
		const [result] = contacts.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return result;
	} catch (error) {
		console.log(error.message)
	}
}

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContactById,
};