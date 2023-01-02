import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { motion } from "framer-motion";
import { BsArrowLeftShort } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { ITag } from "../type";
import { toast, Toaster } from "react-hot-toast";

export default function ListTags({
	isSelectTag,
	closeTag,
	selectTag,
}: {
	isSelectTag: boolean;
	closeTag: () => void;
	selectTag: (tag: ITag) => void;
}) {
	const [isOpen, setOpen] = useState(false);
	const [isAdding, setAdding] = useState(false);
	const [tags, setTags] = useState<ITag[]>([]);

	const supabaseClient = useSupabaseClient();
	const user = useUser();

	const createTag = async (e: any) => {
		e.preventDefault();
		setAdding(true);
		const formData = new FormData(e.target);
		const { sticker, name } = Object.fromEntries(formData) as any;
		if (!sticker || !name) {
			setAdding(false);
			toast.error("sticker and name can not be empty.");
			return;
		}

		const nameTag = [sticker.trim(), name.trim()].join(" ");
		const { data, error } = await supabaseClient
			.from("tags")
			.insert({ name: nameTag, user_id: user?.id })
			.select();
		if (error) {
			setAdding(false);
			toast.error(error.message);
			return;
		}
		setAdding(false);
		setOpen(false);
		toast.success(nameTag + " has been created.");
		if (data?.length) {
			setTags((currentTags) => [...currentTags, data[0] as ITag]);
		}
		e.target.reset();
	};

	const getTags = async () => {
		const { data } = await supabaseClient.from("tags").select();
		setTags(data as ITag[]);
	};

	useEffect(() => {
		getTags();
		//eslint-disable-next-line
	}, []);

	return (
		<>
			{isSelectTag && (
				<div
					className=" h-screen fixed top-0 left-0  w-full"
					onClick={() => {
						setOpen(false);
						closeTag();
					}}
				>
					<div className="h-screen w-lg mx-auto bg-white bg-opacity-60 backdrop-blur-sm"></div>
				</div>
			)}
			<motion.div
				initial={false}
				animate={isSelectTag ? "open" : "closed"}
				variants={{
					open: { y: 0 },
					closed: { y: "100%" },
				}}
				className="fixed bottom-0 h-2/3 max-w-lg sm:w-lg w-full bg-white p-5 border-t  rounded-t-3xl"
			>
				<h1 className="text-center mb-5 uppercase text-gray-400">
					Expenses
				</h1>
				<div className="w-full grid grid-cols-4 gap-y-5">
					<div
						className="rounded-full border w-14 h-14 mx-auto flex justify-center items-center cursor-pointer group hover:border-zinc-500 transition-all"
						onClick={() => setOpen(true)}
					>
						<IoIosAdd className="h-8 w-8 text-gray-400 group-hover:text-zinc-500 group-hover:scale-125 transition-all" />
					</div>
					{tags.map((tag, index) => {
						let name = tag.name.split(" ");
						return (
							<div
								className="flex flex-col items-center group cursor-pointer"
								key={index}
								onClick={() => {
									selectTag(tag);
									closeTag();
								}}
							>
								<span className="text-xl ">{name[0]}</span>
								<h1 className="text-sm group-hover:scale-125 transition-all">
									{name[1]}
								</h1>
							</div>
						);
					})}
				</div>
			</motion.div>
			<motion.div
				initial={false}
				animate={isOpen ? "open" : "closed"}
				variants={{
					open: { x: 0, opacity: 1 },
					closed: { x: "-200%", opacity: 0 },
				}}
				className="fixed bottom-0 h-1/2 max-w-lg sm:w-lg w-full bg-white p-5 border-t"
			>
				<div className="border-b">
					<BsArrowLeftShort
						className="w-8 h-8"
						onClick={() => setOpen(false)}
					/>
				</div>
				<h1 className="text-center mb-5 uppercase text-gray-400 pt-2">
					New Tag
				</h1>

				<form
					className="flex flex-col justify-center items-center gap-8"
					onSubmit={createTag}
				>
					<input
						className="border-b text-center outline-none"
						placeholder="sticker"
						name="sticker"
						required
					/>
					<input
						className="border-b text-center outline-none"
						placeholder="name"
						name="name"
						required
					/>
					<button
						className={[
							"bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 ",
							isAdding ? "animate-pulse" : "",
						].join(" ")}
						disabled={isAdding}
					>
						{isAdding && <VscLoading className="animate-spin" />}
						Confirm
					</button>
				</form>
			</motion.div>
			<Toaster position="top-center" />
		</>
	);
}
