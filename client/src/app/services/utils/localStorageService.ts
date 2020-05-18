export function setItem(itemName: string, value: string) {
	localStorage.setItem(itemName, value);
}
export function getItem(itemName: string): string | null {
	return localStorage.getItem(itemName);
}
export function removeItem(itemName: string) {
	localStorage.removeItem(itemName);
}
