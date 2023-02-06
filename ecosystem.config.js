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
			ref: "origin/main",
			repo: "git@github.com:seasidefm/botsuro2.git",
			path: "/home/duke_ferdinand/botsuro",
			"pre-deploy-local": "",
			"post-setup": "npm install && npm run build",
			"post-deploy":
				"export PATH=~/.npm-global/bin:$PATH pm2 reload ecosystem.config.js --env production",
			"pre-setup": "",
			env: {
				NODE_ENV: "production",
				BOT_TOKEN: process.env.BOT_TOKEN,
				CLIENT_ID: process.env.CLIENT_ID,
			},
		},
	},
};
