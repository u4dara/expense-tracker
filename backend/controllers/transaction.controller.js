import { transactions } from '../database/transactionSampleData.js';

//@desc    Get all transactions
//@route   GET /api/transactions
//@access  Private
export const getTrasactions = async (req, res) => {
	res.status(200).json({ success: true, data: transactions });
};

//@desc    Add a new transaction
//@route   POST /api/transactions
//@access  Private
export const addTransaction = async (req, res) => {
	res
		.status(201)
		.json({ success: true, message: 'Transaction added successfully' });
};

//@desc    Delete a transaction
//@route   DELETE /api/transactions/:id
//@access  Private
export const deleteTransaction = async (req, res) => {
	res.status(200).json({
		success: true,
		message: `Transaction ${req.params.id} deleted successfully`,
	});
};

//@desc    Update a transaction
//@route   PUT /api/transactions/:id
//@access  Private
export const updateTransaction = async (req, res) => {
	res.status(200).json({
		success: true,
		message: `Transaction ${req.params.id} updated successfully`,
	});
};
