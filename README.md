<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Pathfinder

A conversational AI guide that builds a personalized learning roadmap for any subject, calibrated to who you are and what you actually want.

**View the live app in AI Studio:** https://ai.studio/apps/1f201015-c374-46c5-9af4-cdcb077ef45a

## Why Pathfinder

Ask any learning community "how do I start learning X?" and you usually get the same generic textbook answer. Start with the fundamentals. Then move to intermediate. Then advanced. The advice ignores your age, your real goal, your available time, your budget, and your life situation.

A 50-year-old curious about astronomy gets handed a physics degree curriculum. A teenager who wants to build games gets told to learn data structures first. A working professional who wants to use AI at their job gets told to start with linear algebra. A homemaker who wants to understand pharmacy for family health gets pointed at pharmacology textbooks.

Pathfinder fixes that. It profiles you first through a few simple questions, then builds a roadmap that matches your real goal instead of a textbook ideal.

## How to use it

1. Open the [live app](https://ai.studio/apps/1f201015-c374-46c5-9af4-cdcb077ef45a).
2. Tell Pathfinder what you want to learn.
3. Answer a few quick multiple-choice questions about your age, goal, timeline, current level, time available, and learning style.
4. Receive a phased roadmap with named resources, a first-week action plan, and self-check progress markers.
5. Ask follow-up questions to refine, deepen, or pivot the path at any time.

The whole flow takes about three to five minutes from first message to a roadmap you can act on the same day.

## What it covers

Anything a human might want to learn. Sciences, mathematics, medicine, pharmacy, engineering, technology, humanities, social sciences, law, business, arts, music, languages, crafts and trades, cooking, agriculture, sports, religious and spiritual learning, creative writing, and professional certifications.

If you name a field Pathfinder does not recognize, it asks you to describe it and adapts.

## What makes it different

**Profiles you before advising.** No generic roadmaps on the first message.

**Matches your real goal.** A hobbyist learning astronomy gets stargazing apps and beginner books, not a physics degree plan. A career switcher gets a structured path with certifications and milestones.

**Adapts to your age.** Tone, pace, and resource style shift between a 12-year-old, a working professional, and a 65-year-old learner.

**Names real resources.** No vague "find a good book on geology". Pathfinder names specific books, courses, channels, and communities.

**Honest about trade-offs.** If your timeline is unrealistic, Pathfinder says so kindly and offers alternatives.

**Respects professional boundaries.** For health, legal, financial, and safety-critical topics, it points you to qualified professionals rather than replacing them.

## Example sessions

**A retired teacher learning watercolor painting**
Receives a gentle, hobby-focused path with affordable supplies, beginner YouTube channels, and a four-week first project. Not an art school syllabus.

**A software engineer trying to understand a family member's cardiology diagnosis**
Receives reputable patient-education resources, a glossary of key terms, and clear questions to bring to the doctor. Not a medical school reading list.

**A 13-year-old learning game development**
Receives a Scratch-to-Unity progression with weekend-sized projects and age-appropriate communities. Not a computer science curriculum.

**A career switcher from accounting to cybersecurity**
Receives a structured six-month path with foundational courses, a home lab setup, certifications worth pursuing, and realistic milestones. Not just "learn networking first".

## Run locally

This contains everything you need to run the app locally.

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
3. Run the app:
   ```
   npm run dev
   ```

## Tech

Pathfinder is a React app built with Google AI Studio. The conversation is powered by Gemini and a system prompt that enforces profiling, age-adapted tone, goal matching, and realistic resource recommendations.

## Feedback

Found a roadmap that missed the mark? Got a profile combination that produced a weak result? Open an issue with the conversation and Pathfinder will get sharper.

## License

MIT.
