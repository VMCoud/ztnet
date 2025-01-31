import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		try {
			const folderPath = path.resolve("/var/lib/zerotier-one/zt-mkworld");
			const filePath = path.join(folderPath, "planet.custom");

			// Check if the directory and file exist
			if (
				!fs.existsSync(folderPath) ||
				!fs.statSync(folderPath).isDirectory() ||
				!fs.existsSync(filePath)
			) {
				return res.status(404).send("Folder or file not found.");
			}

			// Read the file and stream it to the response
			const fileStream = fs.createReadStream(filePath);

			// Set the headers
			res.setHeader("Content-Disposition", "attachment; filename=planet.custom");
			res.setHeader("Content-Type", "application/octet-stream");

			// Pipe the read stream to the response
			fileStream.pipe(res);
		} catch (error) {
			console.error(error);
			res.status(500).send("Internal Server Error.");
		}
	} else {
		res.status(405).send("Method Not Allowed"); // Handle unsupported HTTP methods
	}
};
