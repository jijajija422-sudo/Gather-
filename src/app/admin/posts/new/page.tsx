import { PostForm } from "../PostForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPostPage() {
  return (
    <div className="animate-fade-in">
      <PostForm />
    </div>
  );
}
