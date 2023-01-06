export default function cn(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
