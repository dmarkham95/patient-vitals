import { VariantType } from "./VariantType";

export interface MessageOption {
	anchorOrigin?: AnchorOrigin;
	autoHideDuration?: number;
	message: string;
	variant?: VariantType;
}

interface AnchorOrigin {
	vertical: "top" | "bottom";
	horizontal: "left" | "center" | "right";
}
