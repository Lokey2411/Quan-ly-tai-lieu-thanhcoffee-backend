type RegularContent = {
	title: string;
	subtitle: string;
};

export type ChildContent = {
	images: string[];
} & RegularContent;
export type ParentContent = {
	children: (ChildContent | ParentContent)[];
} & RegularContent;

export type TContent = ParentContent | ChildContent;
