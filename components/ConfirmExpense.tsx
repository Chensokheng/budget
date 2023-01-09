import React from "react";
import { HiLockClosed } from "react-icons/hi";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import { VscLoading } from "react-icons/vsc";

export default function ConfirmExpense({
	isConfirm,
	amount,
	tag,
	submitExpense,
	adding,
	handleOnCancel,
}: {
	adding: boolean;
	isConfirm: boolean;
	amount: string;
	tag: string[];
	submitExpense: () => void;
	handleOnCancel: () => void;
}) {
	return (
		<>
			<motion.div
				initial={false}
				animate={isConfirm ? "open" : "closed"}
				variants={{
					open: { y: 0 },
					closed: { y: "100%" },
				}}
				className="fixed bottom-0 h-screen   w-full sm:w-lg bg-white dark:bg-black p-5 bg-opacity-90 backdrop-blur-sm "
			></motion.div>
			<motion.div
				initial={false}
				animate={isConfirm ? "open" : "closed"}
				variants={{
					open: { y: 0 },
					closed: { y: "100%" },
				}}
				className="fixed bottom-0 h-1/2 z-40   w-full sm:w-lg rounded-t-2xl border-t p-5 bg-opacity-90 backdrop-blur-sm dark:border-zinc-600 "
			>
				<div className="flex flex-col h-full">
					<div className="flex flex-col gap-5">
						<h1 className="font-black text-3xl">Confirm</h1>
						<div className="flex items-center gap-3">
							<div>
								<span className="w-8 h-8 bg-gray-300 grid place-content-center rounded-full text-gray-500 ">
									<HiLockClosed />
								</span>
							</div>

							<p className="text-gray-500">
								Help us ensure accuracy by reviewing your
								expense before confirming because you can not
								edit it later.
							</p>
						</div>
					</div>
					<div className="flex-1 flex justify-center items-center">
						<div className="flex items-center gap-10">
							<h1 className="text-3xl font-black">${amount}</h1>

							<HiOutlineArrowLongRight className="w-8 h-8" />

							<div className="flex items-center gap-5">
								<h1 className="text-4xl">{tag[0]}</h1>
								<div>
									<h1 className=" font-semibold text-lg">
										{tag[1]}
									</h1>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<button
							className="bg-red-200 dark:bg-red-400  rounded-md hover:tracking-wider transition-all"
							onClick={handleOnCancel}
						>
							Cancel
						</button>
						<button
							className={[
								"bg-black dark:bg-white dark:text-black text-white py-5 w-full justify-center items-center rounded-lg hover:tracking-wider transition-all hover:shadow-md  flex gap-3",
								adding ? "animate-pulse" : "",
							].join(" ")}
							onClick={submitExpense}
						>
							{adding && <VscLoading className="animate-spin" />}
							Confirm
						</button>
					</div>
				</div>
			</motion.div>
		</>
	);
}
