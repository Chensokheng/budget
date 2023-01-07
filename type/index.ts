export type ITag = {
	created_at: string | null;
	name: string;
	user_id: string | null;
	id: string;
	public: boolean;
};

export type ILogs = {
	[key: string]: string[];
};

export type ITotalExpense = {
	created_at: string;
	amount: number;
	user_id: string;
	id: string;
};

export type IExpense = {
	id: string;
	amount: number;
	tag_id: string;
	total_expense_id: string;
	user_id: string;
	created_at: string;
	tags?: ITag;
	total_expense?: ITotalExpense;
};
