# Gather — A Space for Collected Thoughts

Gather is a premium, cozy, and distraction-free personal blogging platform and content management system. Built with modern full-stack web technologies, it is designed to feel unhurried, inviting, and premium.

---

## ✨ Features

- **Cozy & Minimalist Design**: Soft Pastel / Clean Canvas aesthetic using an off-white/cream background, elegant Playfair Display Serif headings, and Inter Sans-serif body typography.
- **Sage Accents**: Accent colors tailored for interactive components (hover states, custom active links, reading progress bar, blockquotes).
- **Zen Mode**: A distraction-free reading experience that fades away headers, footers, and other navigation elements at the tap of a button.
- **Dynamic Content**: Fully powered by Prisma and a local SQLite database (easily configurable for PostgreSQL, MySQL, etc.).
- **Role-Based Admin Dashboard**:
  - **Admin**: Full access to dashboard metrics, user permissions, write new posts, edit or delete any stories, and manage invitation links.
  - **Author**: Can read, write, and edit only their own posts.
- **First-Time Setup Flow**: The application automatically detects if no admin exists on launch and routes you to a setup portal to create the primary credentials.
- **Author Invitation System**: Secure, token-based link generator that allows administrators to invite guest writers with a secure URL. Invited writers register their own passwords, and tokens expire automatically for security.
- **Unique Slug Constraint Safeguard**: Automatic suffixing checks prevent database unique-constraint crashes when multiple posts share the same title.
- **Custom Markdown Blocks**: Supports custom syntax elements inside stories such as custom heading tags, styled pull quotes, lists inside data boxes, and adaptive image grids.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js](https://nextjs.org/) (App Router, Server Actions, Middleware, API Routes)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database / ORM**: [Prisma ORM](https://www.prisma.io/) with SQLite
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or above) installed on your system.

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (or update the existing one):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="supersecret_temporary_key_replace_in_prod"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Setup the Database

Sync your Prisma schema with the SQLite database file:

```bash
npx prisma db push
```

*(Optional) Seed the database with the default admin user and initial articles:*

```bash
npx prisma db seed
```

Default credentials seeded:
* **Admin Email**: `admin@gather.com`
* **Admin Password**: `admin123`

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your blog. Navigate to `/admin` to log into the dashboard.

---

## 📂 Project Structure

```text
├── prisma/
│   ├── schema.prisma   # Prisma schema (User, Post, Invitation)
│   └── seed.ts         # Initial database seeding script
├── src/
│   ├── app/            # Next.js App Router Pages
│   │   ├── admin/      # Protected administration pages
│   │   │   ├── invite/ # Accept invite registrations
│   │   │   ├── posts/  # Post creator and edit panels
│   │   │   ├── setup/  # First-time account setup
│   │   │   └── users/  # Invite token creator and user metrics
│   │   ├── api/        # Auth callbacks and API routes
│   │   └── posts/      # Client-facing dynamic dynamic article routes
│   ├── components/     # UI Component architecture (layout, home, articles)
│   ├── context/        # React context wrappers (e.g. Zen Mode state)
│   ├── data/           # Mock data and structural interfaces
│   └── lib/            # Shared utilities (NextAuth configuration, Prisma client)
```

---

## 🖋️ Custom Content Blocks

When writing stories in the admin Markdown panel, you can use these custom container tags for premium styling:

### Pull Quotes
```text
<PULLQUOTE>
This is an elegant pull quote emphasizing a central theme in your essay.
</PULLQUOTE>
```

### Heading Breaks
```text
<HEADING>
A serif subtitle separating your thoughts
</HEADING>
```

### Data List Boxes
```text
<DATABOX title="Morning Routine Checklist">
• Wake up at dawn
• Brew a slow cup of tea
• Sit with a blank notebook for 10 minutes
</DATABOX>
```

### Image Grids
```text
<IMAGEGRID>
/images/nature-1.jpg | Misty forests in the morning
/images/nature-2.jpg | Dew on a sage leaf
</IMAGEGRID>
```

---

## 📄 License

This project is open-source and available under the MIT License.
