import Link from "next/link";

const Logo = () => {
  return (
    <div className="text-[2rem] font-dancing font-bold hover:text-primary transition cursor-pointer">
      <Link href="/">Foodora</Link>
    </div>
  );
}

export default Logo