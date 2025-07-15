import styles from "./page.module.css";

const paragraphs = [
  "I work at the intersection of music, technology, and systems thinking. My focus is meaning. How it emerges, how it persists, how it bends under the weight of the systems we live within.",
  "It began with music. Not training or theory, just a deep pull toward something that could hold emotion and structure in the same breath. I made what I could, shaped by instinct and limitation. I followed the spark through noise, reaching for something real.",
  "As I moved deeper, the shape of things became clearer. The tools I used were not neutral. The platforms I depended on did more than distribute the work. They influenced what I made, what I wanted, and what felt sincere. Even authenticity had become a product of its environment.",
  "This was not a failure. It was clarity. Meaning is not only filtered by systems. It is formed by them. Once I saw this, the question changed. It was no longer how to escape. It was how to build with full awareness of the conditions.",
  "That question led to the Omnilith. A framework for creating with intention in a world already shaped by code, culture, and constraint. At its center is a structure built from five foundational elements. Processes that shape movement. Relations that form structure. Intentions that guide direction. Constraints that define the field. Forms that give shape to the result. A system that adapts, remembers, and evolves through use.",
  "We begin with music. A space where feeling meets structure. Collaborators shape ideas in sequence, refining the vision together. Governance gives it continuity. The process starts focused and expands through transparent tools. The result is not clean or symmetrical. It is strange, emotional, altered.",
  "The Omnilith is more than a platform. It is a living system for those who care about meaning. It supports creative work, builds coherence, and helps people find each other around shared purpose. It grows through real use and carries real value.",
  "If something in this speaks to you, I would love to connect.",
];

export default function Page() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>About the Omnilith</h1>
      {paragraphs.map((text, idx) => (
        <p className={styles.aboutText} key={idx}>
          {text}
        </p>
      ))}
    </div>
  );
}
