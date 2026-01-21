import AuditLog from "../models/auditLog.model.js";

const logger = (req, res, next) => {
	if (process.env.NODE_ENV === "test") {
		return next();
	}

	res.on("finish", async () => {
		if (!req.audit || res.statusCode >= 400) return;

		try {
			const { action, entity, entityID, before, after } = req.audit;

			await AuditLog.create({
				user: req.user._id,
				action,
				entity,
				entityID,
				before: before || null,
				after: after || null,
				metaData: {
					ip: req.ip || "unknown",
					userAgent: req.headers["user-agent"] || "unknown",
				},
			});
		} catch (error) {
			console.error("Audit log failed:", error.message);
		}
	});
	next();
};

export default logger;
