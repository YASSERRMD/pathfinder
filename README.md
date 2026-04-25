<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1f201015-c374-46c5-9af4-cdcb077ef45a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# Learning Roadmap Advisor

A conversational AI app that builds a personalized learning roadmap for any subject, calibrated to who you are and what you actually want.

Built with [Google AI Studio](https://aistudio.google.com).

## Why this exists

Ask any learning community "how do I start learning X?" and you usually get the same generic textbook answer. Start with the fundamentals. Then move to intermediate. Then advanced. The advice ignores your age, your real goal, your available time, your budget, and your life situation.

A 50-year-old curious about astronomy gets handed a physics degree curriculum. A teenager who wants to build games gets told to learn data structures first. A working professional who wants to use AI at their job gets told to start with linear algebra. A homemaker who wants to understand pharmacy for family health gets pointed at pharmacology textbooks.

This app fixes that. It profiles you first through a few simple questions, then builds a roadmap that matches your real goal instead of a textbook ideal.

## What it does

1. Greets you and asks what you want to learn.
2. Profiles you through small batches of multiple-choice questions covering age, situation, goal, timeline, starting point, time available, learning style, and budget.
3. Generates a phased roadmap with named resources, a first-week action plan, and self-check progress markers.
4. Adapts tone, depth, and pace to your age and life stage.
5. Flags when a qualified professional is needed for health, legal, financial, or safety-critical topics.

## What it covers

Anything a human might want to learn. Sciences, mathematics, medicine, pharmacy, engineering, technology, humanities, social sciences, law, business, arts, music, languages, crafts and trades, cooking, agriculture, sports, religious and spiritual learning, creative writing, professional certifications, and more. If you name a field the advisor does not recognize, it asks you to describe it and adapts.

## Try it

Open the live app in Google AI Studio, or follow the setup instructions below to run your own copy.

## Setup

### Option 1: Run on Google AI Studio (recommended)

1. Open [Google AI Studio](https://aistudio.google.com).
2. Create a new chat prompt.
3. Open `prompt.md` from this repo and copy the full contents.
4. Paste it into the system instructions field in AI Studio.
5. Pick a model (Gemini 2.5 Pro or Gemini 2.5 Flash both work well).
6. Save the prompt and start chatting.

### Option 2: Use it on any LLM platform

The prompt works on any platform that supports a system prompt or custom instructions field:

- **ChatGPT**: create a Custom GPT, paste `prompt.md` into the instructions field.
- **Claude**: create a Project, paste `prompt.md` into the project instructions.
- **Gemini**: create a Gem with the prompt as instructions.
- **API**: pass the prompt as the system message in your API calls.

### Option 3: Fork and deploy

Fork this repo, edit `prompt.md` to your preferences, and deploy to your own AI Studio workspace or wrap it with your own frontend.

## Project structure

```
.
├── prompt.md          The full system prompt that powers the app
├── README.md          This file
└── examples/          Sample conversations across different learner profiles
```

## Customization

Common edits to `prompt.md`:

- **Narrow the scope**: remove domains you do not want the advisor to cover.
- **Add languages**: extend the language preference question and add localized resource suggestions.
- **Add few-shot examples**: paste 2 or 3 sample Q&A flows at the end of the prompt for sharper behavior.
- **Change the tone**: adjust the tone guidelines section to match your audience.
- **Add domain authorities**: append a section listing recognized institutions or scholars to anchor recommendations.

## Example interactions

**A retired teacher learning watercolor painting**
Receives a gentle, hobby-focused path with affordable supplies, beginner YouTube channels, and a four-week first project. Not an art school syllabus.

**A software engineer trying to understand a family member's cardiology diagnosis**
Receives reputable patient-education resources, a glossary of key terms, and clear questions to bring to the doctor. Not a medical school reading list.

**A 13-year-old learning game development**
Receives a Scratch-to-Unity progression with weekend-sized projects and age-appropriate communities. Not a computer science curriculum.

**A career switcher from accounting to cybersecurity**
Receives a structured six-month path with foundational courses, a home lab setup, certifications worth pursuing, and realistic milestones. Not just "learn networking first".

## Design rules baked into the prompt

1. Match the goal, not the formal curriculum.
2. Match age and tone, from children to seniors.
3. Match timeline to depth.
4. Use a clear output structure (phases, resources, first-week plan, checkpoints).
5. Name real, specific, trustworthy resources.
6. Be honest about trade-offs and unrealistic timelines.
7. Respect professional boundaries on health, legal, financial, and safety topics.

## Roadmap

Planned improvements:

- Few-shot examples for cleaner first-turn behavior.
- Optional voice input flow for accessibility.
- Localized resource lists for Arabic, Urdu, and Hindi learners.
- A simple web frontend for non-AI-Studio deployment.
- Eval set to measure roadmap quality across age and domain combinations.

## Contributing

Pull requests are welcome. Helpful contributions include:

- Improvements to question batches or wording.
- New domain-specific resource lists.
- Few-shot examples for underrepresented learner profiles.
- Translations of the prompt into other languages.

Open an issue first if you are planning a larger change.
