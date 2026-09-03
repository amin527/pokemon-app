# Pokémon App — Project Report

## Project Overview

- Built a React and TypeScript Pokémon application, with the primary aim of gaining practical experience in professional software development practices rather than solely producing a working application.
- Focused on developing skills in five areas in particular: Git workflow, Agile workflow, TypeScript, Continuous Integration (CI), and automated testing.
- Implemented a number of notable features including a responsive grid with dynamic Pokémon row display, application themes, search functionality, and a Pokémon details page.

## Key Learnings

- **Commit at each functional state** — Commit working code whenever the application reaches a functional state – do not allow multiple changes to accumulate before committing: the responsive three-row Pokémon grid feature progressed through four implementation stages before a commit was made. This resulted in a less clear Git history and made it difficult to revert to previous working states whenever an issue arose.

- **Be mindful of scope creep** — Remain mindful of scope creep when responsible for implementing a feature and able to make change decisions independently: scope creep occurred in this project at two separate instances. The more recent of these happened when I was working on the Pokémon Details regression error and I decided to implement a media screen which was outside the scope of the ticket I was working on.

- **Think solutions through before coding** — Think through how a solution will behave before writing code: the similar Pokémon cards rendering issue in the Pokémon Details page could easily have been anticipated before any implementation was made: the similar-Pokémon container gets its height from the ref object attached to the Pokémon details container > the ref object only gets set after the Pokémon details container has rendered > the similar-Pokémon container has to wait for Pokémon details to render before it could determine its own height > the height of the similar Pokémon container will change on the screen resulting in a visible jump.

- **Do not merge regressions** — Do not merge a branch that introduces regression errors: changes to the Pokémon Card component broke the existing Pokémon Details page. This was noticed before merging, but the decision was made to defer the fix to a later ticket rather than resolve it on the same branch. Code that introduces a known regression should never be merged into main, even if the fix requires the scope of work to expand beyond what the original ticket specified.

## What I Will Do Next

- Resolve the rendering issue introduced by `useElementHeight` — the similar-Pokémon container cannot determine its height until the details container has rendered. This results in a visible layout shift on the page.
- Complete the settings menu epic: increased text size, colour blind accessibility, and reduced motion options, with consistent persistence of user preferences across the application.
- Resolve the 404 error that occurs when refreshing or navigating directly to a Pokémon details page. This issue is likely caused by client-side routing not being configured to handle hard navigation.
