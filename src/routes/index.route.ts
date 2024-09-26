import projectRoute from "./project.route";
import navbarItemRoute from "./navBarItem.route";
import contentRoute from "./content.route";

export default [
	{
		path: "api/projects",
		router: projectRoute,
	},
	{
		path: "api/navbarItems",
		router: navbarItemRoute,
	},
	{
		path: "api/contents",
		router: contentRoute,
	},
];
