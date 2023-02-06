module.exports = {
	apps: [
		{
			script: "dist/main.js",
		},
	],

	deploy: {
		production: {
			user: "duke_ferdinand",
			host: "192.168.1.37",
			ref: "origin/master",
			repo: "GIT_REPOSITORY",
			path: "DESTINATION_PATH",
			"pre-deploy-local": "",
			"post-deploy":
				"npm install && npm run build && pm2 reload ecosystem.config.js --env production",
			"pre-setup": "",
			env: {
				NODE_ENV: "production",
				BOT_TOKEN: process.env.BOT_TOKEN,
				CLIENT_ID: process.env.CLIENT_ID,
			},
		},
	},
};
