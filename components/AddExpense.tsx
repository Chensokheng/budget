import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BsArrowDown } from "react-icons/bs";
import { FiRotateCcw } from "react-icons/fi";
import { BsTags } from "react-icons/bs";

import { ITag } from "../type";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import useAppState from "../hook/useAppState";
const ConfirmExpense = dynamic(() => import("./ConfirmExpense"));
const ListTags = dynamic(() => import("./ListTags"));

export default function AddExpense() {
	const [isSelectTag, setSelectTag] = useState(false);
	const { data } = useAppState();
	const [tag, setTag] = useState<ITag>();
	const [isConfirm, setIsConfirm] = useState(false);
	const [adding, setAdding] = useState(false);

	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const user = useUser();
	const supabaseClient = useSupabaseClient();
	const queryClient = useQueryClient();
	useEffect(() => {
		if (data?.isAddingExpense) {
			inputRef.current.focus();
		}
	}, [data?.isAddingExpense]);

	const closeAdding = () => {
		const updateState = { ...data };
		updateState["isAddingExpense"] = false;
		queryClient.setQueryData(["state"], updateState);
	};

	const closeTags = () => {
		closeAdding();
		setSelectTag(false);
	};

	const submitExpense = async () => {
		setAdding(true);
		if (validateInput()) {
			const amount = parseFloat(inputRef.current.value);

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
			queryClient.invalidateQueries(["expenses"]);
			inputRef.current.value = "";
			setIsConfirm(false);
			closeAdding();
		}
	};

	const handleOnNext = () => {
		if (validateInput()) {
			setIsConfirm(true);
		}
	};
	const validateInput = () => {
		if (!tag) {
			setAdding(false);
			toast.error("Please a tag!!");
			return false;
		}
		const amount = parseFloat(inputRef.current.value);

		if (!amount || amount <= 0) {
			setAdding(false);
			toast.error("Amount should be bigger than 0.");
			return false;
		}
		return true;
	};
	const handleOnCancel = () => {
		setIsConfirm(false);
	};

	return (
		<>
			<motion.div
				initial={false}
				animate={data?.isAddingExpense ? "open" : "closed"}
				variants={{
					open: { y: 0 },
					closed: { y: "100%" },
				}}
				className="fixed bottom-0 h-screen  w-full sm:w-lg bg-white dark:bg-black p-5 bg-opacity-90 backdrop-blur-sm "
			>
				<div
					className="w-full flex justify-center items-center h-screen flex-col gap-10"
					style={{
						height: "90vh",
					}}
				>
					<div className="flex">
						<div>
							<h1 className="text-center text-sm text-gray-400">
								Today at {new Date().toDateString()}
							</h1>
							<input
								className="border-b border-zinc-200 bg-transparent outline-none text-center text-5xl w-52 font-bold "
								placeholder="0"
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
					<div className="flex gap-2">
						<button
							className=" bg-red-200 dark:bg-red-400 px-8  py-3 rounded-md hover:tracking-wider transition-all hover:shadow-md"
							onClick={closeTags}
						>
							Cancel
						</button>
						<button
							className="bg-black dark:bg-white text-white dark:text-black px-8  py-3 rounded-md hover:tracking-wider transition-all hover:shadow-md"
							onClick={handleOnNext}
						>
							Next
						</button>
					</div>
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
			<ConfirmExpense
				isConfirm={isConfirm}
				amount={inputRef.current ? inputRef.current.value : "0"}
				tag={tag?.name.split(" ") || ["", ""]}
				submitExpense={submitExpense}
				adding={adding}
				handleOnCancel={handleOnCancel}
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
