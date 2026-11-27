---
title: "Pawn’s Passage: from my first if statement to 23rd place"
description: "How I designed a bot to recognize attack patterns and reached 23rd place in Pawn’s Passage, a 2025 CodeCombat AI League arena."
slug: pawns-passage
section: projects
projectTitle: Pawn’s Passage
author: Axel Rodriguez
publishedAt: "2026-11-26"
language: en
type: case-study
draft: false
translationId: pawns-passage-case-study
tags: [CodeCombat, competitive programming, state machines]
images:
  - src: /images/pawns-passage/clasificacion-codecombat.png
    alt: Pawn’s Passage leaderboard highlighting Axel Rodriguez in 23rd place with 9,006 points.
    caption: My rank and score on the Pawn’s Passage leaderboard.
    width: 651
    height: 732
  - src: /images/pawns-passage/distribucion-jugadores-codecombat.png
    alt: Pawn’s Passage score distribution chart showing a total of 29,486 players.
    caption: The arena’s score distribution and total player count.
    width: 652
    height: 225
references:
  - label: Official Pawn’s Passage leaderboard
    url: https://codecombat.com/play/ladder/pawns-passage
  - label: "CodeCombat AI League · Season 13: Checkmate Challenge"
    url: https://codecombat.com/league/the-samuraisdd
---

**2025 · Season 13, Checkmate Challenge**

I signed up by accident. I had just learned to use `if` in the first CodeCombat world and was starting the second. I saw that there were tournaments and clicked around, figuring I would compete once I knew more. I hadn’t slept that day. I mistook the registration form for the login form, and by the time I realized it, I was already in. My first thought was, “What if someone searches for my name and sees I came in last?” So I gave it a shot.

I’d seen a tutorial on state machines in Godot and wanted to adapt the idea to my bot. Through trial and error, I got it playing, though I was still far down the leaderboard. So I watched the bots of the top 100 players. I measured unit speed, health, damage, and attack range. I counted the squares on the board and timed how long it took for coins to appear. I wanted to know what made an attack lane work and under what conditions I could break it.

Watching the matches together, I started recognizing patterns that different opponents relied on. My favorite part came when I started designing patterns of my own to break theirs. A lane full of enemies could call for very different responses depending on how many were coming, which units they were, and how much I could spend in response. Sometimes I wanted to hold off the attack. Other times I could break the formation or clear the lane. I had to decide what to look for on the board to tell those cases apart and turn that distinction into a rule the bot could execute on its own.

That became my version of a state machine. The bot read what was happening in each lane and switched strategies as the match unfolded. Once it started responding to the patterns I’d spotted in the replays, I moved into the top 100 quickly. Suddenly I was beating some of the players I’d spent hours studying.

The Pawn’s Passage leaderboard shows me in **23rd place with 9,006 points**, in an arena that lists **29,486 players**. I still wanted to see what would happen if I added special abilities. I’d joined late, I was working, and I ran out of time before I could learn to use the vectors I needed for some of them.

I still laugh when I think about signing up by accident. I opened the tournament to see what it was like and ended up timing coins, counting squares, and testing whether an idea I’d seen in a Godot tutorial could break an attack from one of the best bots on the leaderboard.
