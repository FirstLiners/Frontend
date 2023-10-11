import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input w-[200px] left-0.5 bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "text-[#003C96] border justify-center rounded-xl ml-6 w-[156px] hover:bg-secondary/80",
        firstly:
          "bg-[#003C96] text-white justify-center rounded-xl ml-6 w-[156px] hover:bg-[#001E64]/90",
        dropdownMenuButton1:
          "bg-[#003C96] text-white justify-center rounded-lg w-[88px] h-[32px] text-xs hover:bg-[#001E64]/90",
        dropdownMenuButton2:
          "bg-white text-[#003C96] justify-center rounded-lg w-[88px] border h-[32px] text-xs hover:bg-secondary/80",
        dropdownMenuButton3:
          "bg-white text-[#003C96] ml-2 justify-center rounded-md w-[70px] border h-[40px] text-sm hover:bg-secondary/80",
        exel: "bg-white text-[#003C96] justify-center rounded-xl border w-[170px] hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        tpr1: "h-[32px] px-[6px] py-1",
        tpr2: "h-[32px] px-[2px] py-1 px-[5px]",
        tpr3: "pt-1 pr-1 pb-1 pl-1",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
