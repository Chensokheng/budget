import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BsArrowDown } from "react-icons/bs";
import { FiRotateCcw } from "react-icons/fi";
import { BsTags } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";

import ListTags from "./ListTags";
import { ITag } from "../type";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";

export default function AddExpense({
	isOpen,
	close,
}: {
	isOpen: boolean;
	close: () => void;
}) {
	const [isSelectTag, setSelectTag] = useState(false);
	const [tag, setTag] = useState<ITag>();
	const [adding, setAdding] = useState(false);

	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const user = useUser();
	const supabaseClient = useSupabaseClient();
	const queryClient = useQueryClient();
	useEffect(() => {
		if (isOpen) inputRef.current.focus();
	}, [isOpen]);

	const closeTags = () => {
		close();
		setSelectTag(false);
	};

	const submitExpense = async () => {
		setAdding(true);
		if (!tag) {
			setAdding(false);
			return toast.error("Please a tag!!");
		}
		const amount = parseFloat(inputRef.current.value);

		if (!amount || amount <= 0) {
			setAdding(false);
			return toast.error("Amount should be bigger than 0.");
		}

		const date = new Date();
		const firstDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			1
		).toISOString();
		const lastDay = new Date(
			date.getFullYear(),
			date.getMonth() + 1,
			0
		).toISOString();

		let total_expense = await supabaseClient
			.from("total_expense")
			.select()
			.lte("created_at", lastDay)
			.gte("created_at", firstDay)
			.single();

		if (!total_expense.data) {
			total_expense = await supabaseClient
				.from("total_expense")
				.insert({
					amount,
					user_id: user?.id,
				})
				.select()
				.single();
			if (total_expense.error) {
				setAdding(false);
				toast.error(total_expense.error.message);
				return;
			}
		} else {
			total_expense = await supabaseClient
				.from("total_expense")
				.update({ amount: total_expense.data.amount + amount })
				.eq("id", total_expense.data.id)
				.select()
				.single();
			if (total_expense.error) {
				setAdding(false);
				toast.error(total_expense.error.message);
				return;
			}
		}
		const expense = {
			tag_id: tag?.id,
			amount: parseFloat(inputRef.current.value),
			user_id: user?.id,
			total_expense_id: total_expense.data.id,
		};

		const { error } = await supabaseClient
			.from("expense")
			.insert(expense)
			.select();

		if (error) {
			setAdding(false);
			return toast.error(error.message);
		}
		setAdding(false);
		toast.success("New expense has been created.");
		queryClient.invalidateQueries("expenses");
		inputRef.current.value = "";
		close();
	};

	return (
		<>
			<motion.div
				initial={false}
				animate={isOpen ? "open" : "closed"}
				variants={{
					open: { y: 0 },
					closed: { y: "100%" },
				}}
				className="fixed bottom-0 h-screen  w-full sm:w-lg bg-white p-5 bg-opacity-90 backdrop-blur-sm "
			>
				<div
					className="w-full flex justify-center items-center h-screen flex-col gap-10"
					style={{
						height: "90vh",
					}}
				>
					<button
						className="absolute top-14 left-10 hover:tracking-wider transition-all"
						onClick={closeTags}
					>
						Cancel
					</button>
					<div className="flex">
						<span className="text-3xl text-gray-400">$</span>
						<div>
							<h1 className="text-center text-sm text-gray-400">
								Today at 10:30am
							</h1>
							<input
								className="border-b border-zinc-200 bg-transparent outline-none text-center text-5xl w-52 font-bold "
								placeholder="0"
								autoFocus
								type="number"
								ref={inputRef}
								min={0}
								required
							/>
						</div>
					</div>
					<BsArrowDown className="w-6 h-6 text-gray-400" />
					<div
						className="flex cursor-pointer hover:tracking-wider transition-all items-center gap-5"
						onClick={() => setSelectTag(!isSelectTag)}
					>
						<Tag tag={tag} />
						<FiRotateCcw className="text-gray-400" />
					</div>
					<button
						className={[
							"bg-black text-white py-2 px-3 rounded-lg hover:tracking-wider transition-all hover:shadow-md  flex gap-3",
							adding ? "animate-pulse" : "",
						].join(" ")}
						onClick={submitExpense}
					>
						{adding && <VscLoading className="animate-spin" />}
						Confirm
					</button>
				</div>
			</motion.div>
			<ListTags
				isSelectTag={isSelectTag}
				closeTag={() => {
					setSelectTag(false);
				}}
				selectTag={(tag: ITag) => {
					setTag(tag);
				}}
			/>
			<Toaster position="top-center" />
		</>
	);
}

const Tag = ({ tag }: { tag: ITag | undefined }) => {
	if (tag) {
		let name = tag?.name.split(" ");
		return (
			<div className="flex gap-5 text-xl items-center">
				<span>{name[0]}</span>
				<h1>{name[1]}</h1>
			</div>
		);
	}
	return (
		<div className="flex gap-5 text-xl items-center text-gray-400">
			<BsTags />
			<h1>select your tag</h1>
		</div>
	);
};
