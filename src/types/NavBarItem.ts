type RegularNavBarItem = {
	id: number;
	displayText: string;
	path: string;
	parentId: number | null;
	isActive?: boolean;
};

type ChildrenNavBar = {
	parentId: number;
	parent: RegularNavBarItem;
	children: ChildrenNavBar[];
} & RegularNavBarItem;

type ParentNavbar = {
	parentId: null;
	parent: null;
	children: ChildrenNavBar[];
} & RegularNavBarItem;

export type NavBarItem = ChildrenNavBar | ParentNavbar;
