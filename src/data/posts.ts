import { formatReadTime } from "@/lib/readTime";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
  readTime: string;
  content: string;
}

const postContents = {
  "the-art-of-slow-mornings": `There's a particular quality to the first hour of the day that disappears the moment you reach for your phone. I've been thinking about this a lot recently—how the texture of a morning changes depending on how you enter it.

For the last three months, I've been running an experiment: no screens for the first 90 minutes after waking. Instead, the morning unfolds like this: boil water, grind coffee, sit by the window, and simply watch the world come alive.

<PULLQUOTE>The quality of your morning determines the quality of your day. Not its productivity—its quality.</PULLQUOTE>

The results have been quietly remarkable. Not in the way of dramatic life overhauls, but in the way that a well-tuned instrument sounds different from one that's slightly off. Everything is just a little more resonant.

<HEADING>The Ritual</HEADING>

The specifics matter less than the spirit, but here's what I've settled into:

<DATABOX title="Morning Routine — 6:30 to 8:00 AM">
• 6:30 — Wake naturally (no alarm when possible)
• 6:35 — Boil water, prepare pour-over coffee
• 6:45 — Sit with coffee, look out the window
• 7:00 — Open journal, write 1-2 pages longhand
• 7:30 — Light stretching or a short walk
• 8:00 — Begin the day's work
</DATABOX>

The key insight is that none of this is optimized for output. There's no gratitude list, no affirmation practice, no cold plunge. It's simply space—unstructured, unhurried, and entirely your own.

<HEADING>What Changes</HEADING>

The first thing you notice is that your thoughts become longer. Without the staccato interruptions of notifications and feeds, your mind begins to complete its sentences. Ideas that would normally be cut off mid-formation have room to arrive fully.

The second thing is subtler: you start to notice what you actually want. Not what the algorithm suggests you should want, not what the discourse says is important, but what genuinely pulls at your attention when nothing else is competing for it.

<IMAGEGRID>
/images/cover-morning.png|A quiet desk by the window
/images/cover-slowliving.png|Simple morning rituals
</IMAGEGRID>

I don't think slow mornings are a universal prescription. Some people thrive on momentum, on hitting the ground running. But if you've been feeling like your days have a particular sameness to them, like you're moving through routines that someone else designed—it might be worth trying.

Start with one morning. Just one. See what happens when you give yourself the gift of an unhurried beginning.`,

  "tools-for-thinking": `Every craftsperson has a relationship with their tools. A woodworker knows the weight of their favorite chisel; a painter can feel the difference between brushes by touch. Writers and thinkers are no different, though our tools are often invisible—software, systems, habits of mind.

I've spent the better part of a decade refining my toolkit for thinking. Not just for writing, though writing is a big part of it, but for the broader project of understanding the world and making sense of what I find.

<PULLQUOTE>The best tools disappear into the work. You stop noticing the pen and start noticing the ideas.</PULLQUOTE>

What follows is not a "productivity stack" or a set of life hacks. It's more like a studio tour—here are the things I reach for, and here's why they've earned their place.

<HEADING>For Capturing</HEADING>

The biggest bottleneck in thinking isn't having ideas. It's losing them. An idea that arrives while you're walking the dog or standing in the shower has a half-life of about 30 seconds unless you capture it.

<DATABOX title="Capture Toolkit">
• Field Notes memo books — Always in my back pocket
• Apple Notes — For quick voice memos and photos
• A single "Inbox" note — Everything goes here first, sorted later
• A pen that writes well — Currently: Uni-ball Signo 0.38mm
</DATABOX>

The principle is simple: minimize the friction between having a thought and recording it. The medium doesn't matter nearly as much as the habit.

<HEADING>For Processing</HEADING>

Capturing is only half the equation. The other half is revisiting, connecting, and developing. This is where most systems fail—they become write-only databases, graveyards of half-formed ideas.

My approach is deliberately low-tech. Once a week, usually on Sunday mornings, I sit down with my inbox and sort through everything. Some things get discarded. Some get filed. The interesting ones get expanded into longer notes.

The goal isn't comprehensive organization. It's serendipitous collision—putting ideas close enough together that they start to react.

<HEADING>For Creating</HEADING>

When it's time to actually produce something—an essay, a talk, a project plan—I switch to a different mode entirely. The exploring tools go away, and the focus tools come out.

<DATABOX title="Creation Environment">
• iA Writer — Markdown, full-screen, no distractions
• A single browser tab — For research, when absolutely necessary
• Noise-canceling headphones — Playing ambient or classical
• A timer — 50-minute sessions with 10-minute breaks
</DATABOX>

The constraint is the point. By deliberately limiting my environment, I force my attention into a narrow channel. It's uncomfortable at first, but the work that emerges is consistently better.`,

  "on-reading-deeply": `I read differently now than I did five years ago. Not better, necessarily, but with more intention and less anxiety. I used to read to accumulate—to add books to a mental scoreboard, to feel well-read. Now I read to think.

The shift happened gradually, but I can point to a specific catalyst: I read the same book three times in a row. It was completely unintentional. I finished it, set it down, and found myself picking it up again the next day. And then again the following week.

<PULLQUOTE>A book read three times slowly teaches you more than ten books read once quickly. Depth defeats breadth, every time.</PULLQUOTE>

That experience broke something open. I realized that my relationship with reading had been fundamentally transactional—I was consuming books rather than conversing with them.

<HEADING>The Practice of Deep Reading</HEADING>

Deep reading isn't a technique so much as a disposition. It's the willingness to slow down, to re-read sentences, to sit with confusion instead of rushing past it. It means treating a book not as content to be processed but as a mind to be engaged with.

Here's what this looks like in practice: I read with a pencil. Every book I own is marked up—underlines, margin notes, questions, disagreements. The physical act of marking forces a different kind of attention. You can't underline on autopilot.

<HEADING>Building a Reading Practice</HEADING>

The specifics of my reading practice have evolved, but the core has remained stable:

<DATABOX title="Reading Practice">
• 1 hour of focused reading per day, usually evening
• No more than 2 books at a time
• Always with a pencil and notebook nearby
• Re-read at least one book per month
• No reading goals or annual targets
</DATABOX>

The absence of goals is deliberate. The moment reading becomes a performance metric, it stops being reading and starts being consumption. I want to be changed by what I read, and that requires a kind of openness that goal-tracking destroys.

<HEADING>What Deep Reading Gives You</HEADING>

The most obvious benefit is understanding. When you read slowly, you actually grasp the argument. You see the structure. You notice the places where the author's reasoning is strong and where it's shaky.

But there's a less obvious benefit that I've come to value more: it changes how you think even when you're not reading. Deep reading trains a kind of patience with ideas—a willingness to hold something in mind, turn it over, and resist the urge to immediately categorize it.

In a world optimized for quick takes and instant reactions, this patience is increasingly rare. And increasingly valuable.`,

  "seasons-of-creative-work": `Creative work moves in seasons. This is something I had to learn the hard way, through years of trying to maintain a constant output and wondering why it felt like pushing a boulder uphill half the time.

The truth is simpler and more forgiving than the productivity culture would have you believe: there are times for planting, times for tending, and times for harvesting. And there are times for letting the field lie fallow.

<PULLQUOTE>You cannot harvest what you haven't planted. And you cannot plant year-round. The fallow season isn't laziness—it's preparation.</PULLQUOTE>

I've come to think of my creative year in roughly four phases, though they don't map neatly onto calendar seasons. They're more like internal weather patterns—I can feel when one is giving way to the next.

<HEADING>The Gathering Season</HEADING>

This is the input phase. Reading widely, taking walks, having long conversations, visiting museums, watching films. The work during this season doesn't look like work at all. It looks like wandering.

But something is happening beneath the surface. Connections are forming. Ideas are colliding in the dark. The subconscious is doing its slow, mysterious work of synthesis.

<HEADING>The Building Season</HEADING>

At some point—and I've learned not to rush this—the gathering gives way to a fierce desire to make something. The building season is characterized by long hours, deep focus, and a kind of urgency that feels entirely organic rather than forced.

<DATABOX title="Creative Seasons">
• Gathering — 2-3 months of wide input and exploration
• Building — 1-2 months of focused, intensive creation
• Refining — 1 month of editing, polishing, perfecting
• Resting — 2-4 weeks of deliberate stillness
</DATABOX>

This is when I write most of my essays, develop new ideas, and take on ambitious projects. The key is that I don't try to manufacture this energy. I wait for it, and when it arrives, I protect it fiercely.

<HEADING>The Refining Season</HEADING>

Building creates rough drafts, prototypes, sketches. The refining season is where they become finished work. This requires a completely different mindset—critical rather than generative, precise rather than expansive.

I've learned to keep these seasons separate. Trying to refine while you're building is like trying to edit while you're writing a first draft. It kills the momentum and produces worse work on both fronts.

<HEADING>The Fallow Season</HEADING>

This is the hardest one for people who tie their identity to their output. The fallow season is when nothing seems to be happening. No new ideas, no burning desire to create, no obvious progress.

But the fallow season is essential. It's when the soil recovers. It's when the subconscious processes everything from the previous cycle. Rushing through it—or worse, skipping it entirely—leads to diminishing returns and eventual burnout.

Learn to rest before you're exhausted. Learn to be still before you're forced to stop.`,

  "letters-to-a-young-writer": `If I could go back and tell my younger self one thing about writing, it wouldn't be about craft or discipline or finding your voice. It would be this: write for the person you were six months ago.

That person had questions you've since found answers to. They had confusions you've since resolved. They were looking for exactly the kind of clarity that you now possess, however imperfectly.

<PULLQUOTE>Write for the person you were six months ago. They needed this essay, and they couldn't find it anywhere.</PULLQUOTE>

This single reframe solved most of my writing problems. It eliminated the question of audience (you know exactly who you're writing for). It eliminated the question of expertise (you know exactly enough). And it eliminated the question of value (you know it's useful because you needed it).

<HEADING>On Finding Your Subject</HEADING>

New writers often ask what they should write about. The answer is hiding in plain sight: write about what you can't stop thinking about. Not what you think you should write about, not what's trending, not what would make you sound smart. Write about your genuine obsessions.

The market for authentic curiosity never saturates. There are infinite readers who share your exact weird combination of interests—they just haven't found you yet.

<HEADING>On the Practice</HEADING>

Writing is a practice in the same way that meditation is a practice. You don't get better at it by reading about it. You don't get better at it by thinking about it. You get better at it by doing it, badly, repeatedly, with gradually increasing awareness.

<DATABOX title="A Minimal Writing Practice">
• Write for 30 minutes every day, same time
• Don't edit while writing — that's a different session
• Publish something every two weeks, no matter what
• Read widely and steal shamelessly (structure, not words)
• Keep a running list of things that make you angry or curious
</DATABOX>

The consistency matters more than the duration. Thirty minutes a day will take you further than a four-hour weekend marathon. The daily practice keeps the writing mind warm. When you sit down, you're continuing a conversation rather than starting one from scratch.

<HEADING>On Sharing Your Work</HEADING>

The hardest part of writing isn't writing. It's publishing. Hitting send. Making your thinking available for others to read, judge, misunderstand, and occasionally appreciate.

There's no way to make this comfortable. There's only the decision to do it anyway, in the faith that your imperfect contribution is better than your perfect silence.

Every writer you admire was, at some point, exactly where you are now—uncertain, underprepared, and not quite ready. They wrote anyway. So can you.`,
};

export const posts: Post[] = [
  {
    slug: "the-art-of-slow-mornings",
    title: "The Art of Slow Mornings",
    excerpt:
      "There's a particular quality to the first hour of the day that disappears the moment you reach for your phone. An experiment in unhurried beginnings.",
    date: "2026-07-15",
    category: "Essays",
    coverImage: "/images/cover-featured.png",
    readTime: formatReadTime(postContents["the-art-of-slow-mornings"]),
    content: postContents["the-art-of-slow-mornings"],
  },
  {
    slug: "tools-for-thinking",
    title: "Tools for Thinking",
    excerpt:
      "Every craftsperson has a relationship with their tools. A studio tour of the instruments I reach for when trying to understand the world.",
    date: "2026-07-08",
    category: "Notes",
    coverImage: "/images/cover-tools.png",
    readTime: formatReadTime(postContents["tools-for-thinking"]),
    content: postContents["tools-for-thinking"],
  },
  {
    slug: "on-reading-deeply",
    title: "On Reading Deeply",
    excerpt:
      "I read differently now than I did five years ago. Not better, necessarily, but with more intention and less anxiety.",
    date: "2026-06-28",
    category: "Essays",
    coverImage: "/images/cover-essays.png",
    readTime: formatReadTime(postContents["on-reading-deeply"]),
    content: postContents["on-reading-deeply"],
  },
  {
    slug: "seasons-of-creative-work",
    title: "Seasons of Creative Work",
    excerpt:
      "Creative work moves in seasons. There are times for planting, times for tending, and times for letting the field lie fallow.",
    date: "2026-06-15",
    category: "Essays",
    coverImage: "/images/cover-seasons.png",
    readTime: formatReadTime(postContents["seasons-of-creative-work"]),
    content: postContents["seasons-of-creative-work"],
  },
  {
    slug: "letters-to-a-young-writer",
    title: "Letters to a Young Writer",
    excerpt:
      "If I could go back and tell my younger self one thing about writing, it wouldn't be about craft or discipline. It would be much simpler.",
    date: "2026-06-01",
    category: "Notes",
    coverImage: "/images/cover-slowliving.png",
    readTime: formatReadTime(postContents["letters-to-a-young-writer"]),
    content: postContents["letters-to-a-young-writer"],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
