import { ILogs } from "../type";

const logs: ILogs = {
	"Mon Jan 09 2023": ["Support dark mode."],
	"Sun Jan 08 2023": [
		"Fix bar chart with wrong data.",
		"Fix typo and remove useless.",
		"Update auth page UI.",
		"Render auth page from server.",
		"Update navbar and reused it.",
		"Update color scheme.",
	],
	"Sat Jan 07 2023": [
		"Support PWA",
		"Add confirmation modal after user input the amount.",
		"Fix page scrolling on adding expense.",
		"Chore remove some bundle size on initial load.",
		"Improve SEO.",
		"Cache list of tags.",
		"Export database schema for typescript intellisense.",
	],
	"Fri Jan 06 2023": [
		"Release personal user's data summary expense.",
		"User can logout and switch account.",
		"Fix total amount display.",
	],
	"Thu Jan 05 2023": [
		"Update color of the list expenses.",
		"Update app layout and change text colors.",
		"Remove padding from bottom navigation.",
		"Release a static data version of summary expense.",
		"Personal user's data summary expense is still in progress.",
	],
	"Wed Jan 04 2023": ["Add public default tags.", "Fix invalid date."],
	"Tue Jan 03 2023": [
		"Logs page to keep track what has been done and what is coming for next version.",
		"Fix list expenses not reading from the cache.",
		"Fix parse date time on phone.",
		"Fix auto focus on after change screen.",
	],
	"Mon Jan 02 2023": [
		"publish this web app to https://dailyexpense.vercel.app.",
		"User can add expenses,tags,list expenses.",
	],
};

export default logs;
