import projectRoute from "./project.route";
import navbarItemRoute from "./navBarItem.route";
import contentRoute from "./content.route";
import guideRoute from "./guide.route";
import imageRoute from "./image.route";

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
	{
		path: "api/guides",
		router: guideRoute,
	},
	{ path: "api/images", router: imageRoute },
];
