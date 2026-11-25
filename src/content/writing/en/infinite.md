---
title: "Infinite and the engineering of autonomous work"
description: "How Infinite coordinates agents, recovers work after interruptions, and verifies outcomes and decisions."
slug: infinite
section: projects
author: Axel Rodriguez
publishedAt: "2026-11-25"
language: en
type: case-study
draft: false
translationId: infinite-case-study
---

<p class="page-lead">I develop the backend for Infinite, an agentic system for coordinating marketing work. It connects campaign data, analysis, and proposals with decisions a person can review. It is designed to recover work after an interruption and verify the result before closing the task.</p>

In one test of Infinite, we stopped the process just after a simulated service carried out an action. The effect already existed on the other side. Infinite still had no confirmation. When work resumed, the system recovered the same execution and reconciled the result. The simulator's records still showed a single effect.

That interruption captures the hardest problem I encountered while developing the backend. **An autonomous system can lose a response at the exact moment the world has already changed.** Repeating the action can cause the same effect twice. Marking the work complete can turn an unknown outcome into an unsupported claim. While the system resolves that uncertainty, other agents and users keep working.

I am developing Infinite at Octopus Labs to turn campaign data and what a business knows about its brand into analyses, proposals, and marketing work that people can review and act on. The underlying challenge was to preserve a coherent record while different parts of the system progress at different speeds. Data can arrive late, proposals can change during review, and an external provider keeps its own state. I wanted a backend that could preserve what happened, who authorized it, and what evidence allows the work to move forward.

## Each task has a contract with the next

The work spans several responsibilities. Someone has to observe a campaign, interpret the observations, prepare a proposal, decide what may be done with it, and verify the effect when action is taken. The difficulty lies in what one step hands to the next. An analysis must identify which data supports its conclusion, which period it covers, and which questions remain open. A proposal must identify the content presented for review. A decision must apply to the version the reviewer actually saw.

I chose to treat these handoffs as contracts that can be checked. An incomplete observation may yield a useful analysis with an explicit limitation. A well-formed proposal may still be awaiting review. A process can reach the end of its execution with an external effect still unconfirmed. Each outcome permits a different next step.

With multiple users, that precision also protects the context of the work. I want to be able to tell which brand a result belongs to and verify who may read it or act on it. In one read test, the authorized brand could retrieve an analysis and a different brand was denied access. The test used the same existing result for both requests, so its existence was established before the access check.

## How I verify that work is complete

“The agent finished” can mean four different things. In Infinite, I want to be able to examine each one.

| Question | Evidence I look for |
| --- | --- |
| Did the execution finish? | The system recorded how the process closed. |
| Is the result valid? | The output meets the task's conditions and makes missing data explicit. |
| Is the action authorized? | The decision applies to the action and the version reviewed. |
| Did the effect occur? | For an external action, there is evidence of the observed state at the destination. |

The opening test shows the gap between the first and last questions. Two explanations fit the provider's silence. It may never have carried out the action, or it may have carried it out and the response was lost. We checked the state of the simulator and verified the identity of the work that resumed. In the companion case, the task was canceled before dispatch and the simulator recorded zero effects.

<figure class="recovery-flow">
  <figcaption>Recovering a task after a lost response</figcaption>
  <div class="recovery-flow__lane">
    <p class="recovery-flow__label" id="flow-infinite">Infinite</p>
    <ol class="recovery-flow__steps" role="list" aria-labelledby="flow-infinite">
      <li>Starts the task</li>
      <li>Loses the response</li>
      <li>Recovers the same work</li>
      <li>Verifies the effect</li>
    </ol>
  </div>
  <div class="recovery-flow__lane">
    <p class="recovery-flow__label" id="flow-provider">Simulated provider</p>
    <ol class="recovery-flow__steps" role="list" aria-labelledby="flow-provider">
      <li>Receives the action</li>
      <li>Records a single effect</li>
    </ol>
  </div>
</figure>

There was also a case with real external data. An initial, narrowly scoped attempt to read campaign performance ended in an uncertain state. A second test, identified as a new operation, produced an analysis whose counts and derived metrics matched an export for the campaign and day under examination. The agreement supported the read to the precision of that export. Attribution equivalence and conclusions about sales remained open.

I want the history to record both outcomes. Someone reviewing the system months later should be able to distinguish a verified recovery, a new operation that returned a result, and an attempt whose outcome remains unconfirmed.

## Thinking in systems when something fails

One idea I took from Donella H. Meadows's *Thinking in Systems* is that resilience becomes visible when the environment changes. Applied to Infinite, that makes me ask what the system can preserve through an interruption and what it needs to verify before continuing. In the test, the process stopped and the effect persisted outside it. We could verify the recovery against a record independent of the interrupted process. That observation made it possible to tell a recovered task from an action carried out twice. [Donella H. Meadows, *Thinking in Systems*, chapter 3](https://www.gc.soton.ac.uk/files/2015/01/Thinking-in-Systems-A-Primer-Donella-H.-Meadows-75-90.pdf)

Meadows also pays attention to delays and to who receives the information needed to make a decision. In an agentic system, a late response can change the state of a task. Conflicting data can call for another check. A malicious instruction embedded in a document poses a separate problem. The information an agent reads and its authority to act must stay separate. That calls for its own tests. [Donella H. Meadows, *Leverage Points*](https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/)

For the autonomous systems I want to build, expanding autonomy means designing for the point where the available evidence runs out. Sometimes the next step is to verify the result. Sometimes it is to preserve the work and leave a decision pending so someone can resume it with the context they need.

## The data can be right and the conclusion wrong

The evidence also has to hold up under analysis. The performance module separates observations from calculated metrics. A rate needs its numerator and denominator. Missing data stays missing. Return on ad spend stays undetermined when verified revenue is unavailable.

This synthetic example shows how the same numbers can change the interpretation of a campaign.

| Segment | Before | After |
| --- | --- | --- |
| A | 900 clicks / 9,000 impressions = 10% | 110 / 1,000 = 11% |
| B | 10 clicks / 1,000 impressions = 1% | 180 / 9,000 = 2% |
| Total | 910 / 10,000 = 9.10% | 290 / 10,000 = 2.90% |

The overall rate drops by more than six percentage points even though the rate rises in both segments. The distribution of impressions changed. If I apply the original mix of 90% A and 10% B to the later rates, I get 10.10%. Holding the weights fixed shows how the interpretation changes when the original mix is preserved. Explaining why the mix shifted requires additional evidence.

To study the quality of the explanations, we compared template-based notes and model-generated notes in a blind review. The delegated review favored the model in all four comparisons, which covered two repeated synthetic scenarios. For those patterns, the decision was to keep the calculations and template as the default and incorporate specific improvements in the explanation. Generalization to new cases and human review time remained to be measured. I wanted to be able to defend both the interpretation of a metric and the choice of how to explain it.

## An approval has to survive a revision

I tested another point in the portal where it is easy to lose the history of the work. I returned the first version of a synthetic proposal and approved the second. After the test, both versions and their associated decisions could be retrieved. The approved version was still available through read access after review permission was withdrawn.

The architectural decision was to tie approval to the exact content reviewed. A content fingerprint can establish whether two copies represent the same content. The permission and the scope of the decision are checked separately. This matters when a review produces a new version or someone looks up a past decision. The history has to explain what each person reviewed and what they decided at that point in time.

The portal test proved a result I care about. A proposal could be returned, revised, approved, and retrieved. The record made it possible to verify which version each decision applied to. In an autonomous process, that traceability is what lets a person intervene with an accurate picture of the work.

## I measure concurrency in useful work

My design target is for Infinite to sustain **more than 100 active users at once**, with several jobs in progress per person. The number becomes meaningful once the workload is defined. One person may be reading a report. Another may start a job that generates several tasks. Another may leave a proposal waiting for review. Those situations put different kinds of pressure on the system.

The unit I care about is work that reaches **a verifiable result**. If 120 tasks of the same kind arrive per minute and 100 finish, the queue grows by 20 per minute over that interval. A dashboard can show plenty of activity while waiting times get worse. I would also look at the distribution of those waits. An acceptable average can hide one group of users waiting much longer than the others.

The capacity test I propose combines reads, new jobs, and review decisions. I would measure a steady workload first, then repeat the same mix with a slow provider and controlled interruptions. I would record verified throughput, typical and slow-case wait times, recovery time, and duplicate effects. I would also observe how long the queue takes to drain after a spike. The tests described here already provide evidence about recovery, review, and isolation in bounded cases. Sustained capacity calls for a separate result.

## What we built

In the tested scenarios, we read external data and verified the analysis against an export. We recovered the same task after an interruption in a test with a simulated effect. We reviewed two versions of a proposal in the portal and retrieved the decision for the exact version. Those results come from different layers of the backend. Together, they show the kind of system I set out to build.

What drew me into the development of Infinite was the way each failure forced us to sharpen the design. Losing a response forced us to define what counts as a confirmed effect. A misleading rate forced us to preserve the context of the measurement. Returning a proposal forced us to specify exactly what gets approved. That is how Infinite took shape.

The most demanding test, to me, comes when something departs from the expected path and a person asks what happened. The system has to be able to show the evidence behind its answer.
