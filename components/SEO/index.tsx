import React from "react";
import Head from "next/head";

export default function SE0() {
	const description =
		"It is a website to keep track of your financial expenses in a convenient and organized way. It typically allows you to input information about your purchases, income, and other financial transactions, and provides tools for analyzing and categorizing this information to help you better understand your spending habits.";
	const title = "Daily|Budget";
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta
				name="keywords"
				content="Personal finance,
                Money management,
                Budget planning,
                Expense tracking,
                Financial planning,
                Debt reduction,
                Savings,
                Credit management,
                Financial goals,
                Frugality,"
			/>
			<meta name="author" content="chensokheng" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />

			<meta property="og:image" content="/og.png" />
			{/* for twitter */}
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content="/og.png" />
			<link rel="icon" href="/icon.png" />
		</Head>
	);
}
