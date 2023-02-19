import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from "react";

const TextEditor = forwardRef<
	HTMLTextAreaElement,
	DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
	return <textarea ref={ref} className="input  w-full h-full rounded-sm" {...props}></textarea>;
});

export default TextEditor;
