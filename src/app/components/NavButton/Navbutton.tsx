import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavButtonProps {
  link: string;
  label: string;
}

export default function NavButton({ link, label }: NavButtonProps) {
  return (
    <Button asChild variant="link">
      <Link href={link}>{label}</Link>
    </Button>
  );
}
