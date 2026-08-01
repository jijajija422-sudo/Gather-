import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  published: boolean;
  readTime: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    name: string;
  };
}

export interface Invitation {
  id: string;
  email: string;
  token: string;
  role: string;
  createdAt: string;
  expiresAt: string;
}

// === User Methods ===
export async function getUserCount(): Promise<number> {
  const usersRef = collection(db, "users");
  const snap = await getDocs(usersRef);
  return snap.size;
}

export async function getAdminUserCount(): Promise<number> {
  const q = query(collection(db, "users"), where("role", "==", "ADMIN"));
  const snap = await getDocs(q);
  return snap.size;
}


export async function getUserByEmail(email: string): Promise<User | null> {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docData = snap.docs[0].data();
  return {
    id: snap.docs[0].id,
    name: docData.name,
    email: docData.email,
    role: docData.role,
    createdAt: docData.createdAt,
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  const docData = docSnap.data();
  return {
    id: docSnap.id,
    name: docData.name,
    email: docData.email,
    role: docData.role,
    createdAt: docData.createdAt,
  };
}

export async function getAllUsers(): Promise<User[]> {
  const q = query(collection(db, "users"), orderBy("name", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: data.createdAt,
    };
  });
}

export async function createUser(id: string, name: string, email: string, role: string): Promise<User> {
  const user: User = {
    id,
    name,
    email,
    role,
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db, "users", id), user);
  return user;
}

// === Invitation Methods ===
export async function getInvitationByEmail(email: string): Promise<Invitation | null> {
  const q = query(collection(db, "invitations"), where("email", "==", email));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const data = snap.docs[0].data();
  return {
    id: snap.docs[0].id,
    email: data.email,
    token: data.token,
    role: data.role,
    createdAt: data.createdAt,
    expiresAt: data.expiresAt,
  };
}

export async function getInvitationByToken(token: string): Promise<Invitation | null> {
  const q = query(collection(db, "invitations"), where("token", "==", token));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const data = snap.docs[0].data();
  return {
    id: snap.docs[0].id,
    email: data.email,
    token: data.token,
    role: data.role,
    createdAt: data.createdAt,
    expiresAt: data.expiresAt,
  };
}

export async function createInvitation(email: string, token: string, role: string): Promise<Invitation> {
  const id = token; // Use token as ID or generate auto
  const invitation: Invitation = {
    id,
    email,
    token,
    role,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days expiry
  };
  await setDoc(doc(db, "invitations", id), invitation);
  return invitation;
}

export async function deleteInvitation(id: string): Promise<void> {
  await deleteDoc(doc(db, "invitations", id));
}

export async function getAllInvitations(): Promise<Invitation[]> {
  const q = query(collection(db, "invitations"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      email: data.email,
      token: data.token,
      role: data.role,
      createdAt: data.createdAt,
      expiresAt: data.expiresAt,
    };
  });
}

// === Post Methods ===
export async function getPosts(options?: {
  publishedOnly?: boolean;
  authorId?: string;
  orderByField?: string;
}): Promise<Post[]> {
  const constraints = [];

  if (options?.publishedOnly) {
    constraints.push(where("published", "==", true));
  }

  if (options?.authorId) {
    constraints.push(where("authorId", "==", options.authorId));
  }

  const q = query(collection(db, "posts"), ...constraints);
  const snap = await getDocs(q);
  const posts = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      category: data.category,
      published: data.published,
      readTime: data.readTime,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      authorId: data.authorId,
      author: data.author || { name: "Author" },
    } as Post;
  });

  const orderByField = options?.orderByField || "createdAt";
  posts.sort((a, b) => {
    const left = (a[orderByField as keyof Post] as string | undefined) ?? "";
    const right = (b[orderByField as keyof Post] as string | undefined) ?? "";
    return String(right).localeCompare(String(left));
  });

  return posts;
}

export async function getPostById(id: string): Promise<Post | null> {
  const docSnap = await getDoc(doc(db, "posts", id));
  if (!docSnap.exists()) return null;
  const data = docSnap.data();
  return {
    id: docSnap.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.coverImage,
    category: data.category,
    published: data.published,
    readTime: data.readTime,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    authorId: data.authorId,
    author: data.author || { name: "Author" },
  } as Post;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(collection(db, "posts"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  const data = d.data();
  return {
    id: d.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.coverImage,
    category: data.category,
    published: data.published,
    readTime: data.readTime,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    authorId: data.authorId,
    author: data.author || { name: "Author" },
  } as Post;
}

export async function createPost(postData: Omit<Post, "author"> & { author: { name: string } }): Promise<Post> {
  await setDoc(doc(db, "posts", postData.id), postData);
  return postData as Post;
}

export async function updatePost(id: string, postData: Partial<Post>): Promise<void> {
  await updateDoc(doc(db, "posts", id), {
    ...postData,
    updatedAt: new Date().toISOString(),
  });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, "posts", id));
}
