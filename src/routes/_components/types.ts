type PropDoc = {
	name: string;
	type: string;
	description?: string;
};

export type ComponentDoc = {
	summary: string;

	props?: PropDoc[];

	details?: string[];
};
