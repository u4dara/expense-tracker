import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		action: {
			type: String,
			required: true,
			enum: ["create", "update", "soft-delete", "restore", "permanent-delete", "archive", "unarchive"],
		},
		entity: {
			type: String,
			required: true,
		},
		entityID: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		before: {
			type: Object,
		},
		after: {
			type: Object,
		},
		metaData: {
			ip: String,
			userAgent: String,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("AuditLog", auditLogSchema);
