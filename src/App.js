import React, { useState } from "react";

// ─── ENGLISH CONTENT ────────────────────────────────────────────────────────

const topicsEN = [
  {
    id: "llm",
    icon: "🧠",
    label: "How LLMs Work",
    color: "#6366f1",
    light: "#eef2ff",
    subtopics: [
      {
        id: "llm-1",
        title: "What an LLM is (and isn't)",
        preview: "Statistical prediction vs. understanding — the most important distinction to make first.",
        content: {
          explanation: "A Large Language Model is a statistical prediction engine. Given any sequence of text, it has learned — from training on vast amounts of written material — which words and phrases are likely to follow. It generates output by repeatedly predicting the most plausible next token. Crucially, this is pattern-matching at enormous scale, not comprehension. The model does not understand what it writes; it produces text that is statistically consistent with how humans write about a topic.",
          analogy: "Think of an extremely sophisticated autocomplete that has processed almost everything ever written. It doesn't know what words mean — it knows which words tend to follow other words in which contexts. Ask it to complete 'The capital of France is…' and it predicts 'Paris' not because it knows geography, but because that completion appears overwhelmingly in its training data.",
          implication: "Never assume the model understands your intent. Explicit, specific instructions will always outperform implied or vague ones. The model is completing your prompt — not reading your mind. Everything you leave ambiguous, it will fill with its own statistical default."
        }
      },
      {
        id: "llm-2",
        title: "Training at a high level",
        preview: "Data, patterns, weights — without the maths.",
        content: {
          explanation: "Training involves exposing the model to enormous amounts of text and adjusting billions of numerical parameters — called weights — to reduce prediction errors over time. Through this process, patterns, associations, and structures from the training data become encoded in the model's weights. After training, those weights are fixed — they represent everything the model 'knows'. The model cannot update its own weights during use.",
          analogy: "Imagine pressing a wax seal millions of times with different impressions, each time slightly correcting the shape. The final seal reflects the aggregate of all those corrections. Once the wax hardens — training is complete — the seal is set. No impression during normal use changes the underlying mould.",
          implication: "The model's knowledge is frozen at the end of training. It cannot learn new information from your conversation unless it has been given retrieval tools. This is why knowledge cutoffs matter, and why providing current context in your prompt is the practical workaround."
        }
      },
      {
        id: "llm-3",
        title: "Tokens and context windows",
        preview: "Why token limits are an operational constraint, not just a technical detail.",
        content: {
          explanation: "Models do not process words — they process tokens, which are chunks of text roughly equivalent to three-quarters of a word on average. The context window is the total amount of text — both input and output combined — that a model can process in a single interaction. Current frontier models support context windows of 100,000 to 1,000,000 tokens. Within that window, everything is visible to the model simultaneously; beyond it, earlier content is lost.",
          analogy: "The context window is working memory. Just as a person can only hold so much information actively in mind during a complex task, the model can only attend to what fits within its window. Long documents, extensive conversation history, and detailed instructions all compete for the same finite space.",
          implication: "For long workflows, complex documents, or multi-turn conversations, context management is an operational skill. Critical instructions placed early in a very long conversation may carry less weight than you expect. System prompts — which are placed at the top and persist — are the correct location for stable rules and constraints."
        }
      },
      {
        id: "llm-4",
        title: "Temperature and sampling",
        preview: "What randomness in outputs means and when it matters for your work.",
        content: {
          explanation: "Temperature is a setting that controls how the model selects its next token. At temperature 0, it always picks the most probable option — outputs are consistent and deterministic. As temperature increases, lower-probability options become eligible — outputs become more varied and creative, but also more likely to deviate from expected patterns. Most production systems operate between 0 and 1.",
          analogy: "Temperature is a dial between 'strict autocomplete' and 'freestyle jazz'. At zero, the model reads from a script. At high settings, it improvises. Both have legitimate uses — the mistake is using the wrong setting for the task.",
          implication: "For protocols requiring reliable, structured, consistent output — classification, extraction, formatting, summarisation — use low temperature. For brainstorming, creative generation, or exploring diverse options, a higher setting produces more varied and interesting results. If you are getting unpredictable output from a protocol that should be consistent, check whether temperature has been set explicitly."
        }
      },
      {
        id: "llm-5",
        title: "Why hallucination happens",
        preview: "The core mechanism — not a bug to be fixed, a feature to be designed around.",
        content: {
          explanation: "Hallucination is not a bug in the traditional sense — it is an inherent consequence of how LLMs work. The model always generates the most statistically plausible next token. When asked about a specific fact it has insufficient training signal for, it still generates confident-sounding text — because confident, fluent prose is what its training data looked like. The model has no internal check between 'I know this' and 'I'm making this up'. Both produce the same kind of output.",
          analogy: "Imagine a highly confident employee who has learned that authoritative-sounding answers are well-received. When they don't know something, they generate a plausible-sounding answer with the same conviction they would use for something they genuinely know. There is no signal in their delivery that distinguishes the two.",
          implication: "Design protocols that ground responses in provided source material — pass the relevant document, data, or context directly into the prompt. Ask for cited reasoning rather than bare conclusions. For any output where factual accuracy is critical, require verification against primary sources. Hallucination cannot be eliminated; it can be dramatically reduced through structural design."
        }
      },
      {
        id: "llm-6",
        title: "Base vs. instruction-tuned models",
        preview: "The difference between a raw model and one trained to follow instructions.",
        content: {
          explanation: "A base model is trained solely on next-token prediction — it will continue any text you give it, without following instructions or having any helpful orientation. Instruction-tuned models are then trained on top of the base using human feedback to follow directions, answer questions helpfully, decline harmful requests, and behave like an assistant. Every model you interact with as an end user — Claude, GPT-4o, Gemini — is instruction-tuned.",
          analogy: "A base model is a graduate with vast reading experience but no professional socialisation — ask them to 'draft a memo' and they might generate more academic text in the style of what they've read. An instruction-tuned model has completed a professional onboarding: they understand how to respond to directives, follow briefings, and deliver outputs in the format you need.",
          implication: "This distinction is why modern AI responds to commands rather than just completing text. It also explains why different models from the same base can behave very differently — the instruction tuning shapes operational behaviour more than raw capability in most everyday tasks."
        }
      }
    ]
  },
  {
    id: "prompt",
    icon: "✍️",
    label: "Prompting Fundamentals",
    color: "#0891b2",
    light: "#ecfeff",
    subtopics: [
      {
        id: "p-1",
        title: "Zero-shot, few-shot, chain-of-thought",
        preview: "Three prompting strategies — when to use each and why they work.",
        content: {
          explanation: "Zero-shot prompting asks the model to complete a task with no examples — just the instruction. Few-shot prompting provides representative examples of the desired input and output before making the request, giving the model a pattern to follow. Chain-of-thought prompting instructs the model to reason step-by-step before giving its final answer, forcing visible intermediate reasoning that significantly improves accuracy on complex tasks.",
          analogy: "Zero-shot is asking a new team member to draft a document with no briefing. Few-shot hands them three example documents first and says 'produce something like these'. Chain-of-thought asks them to walk you through their thinking before they commit to the final draft — the process itself improves the output.",
          implication: "Use few-shot whenever you need consistent structure, tone, or format in outputs. Even two or three examples reduce variation dramatically. Use chain-of-thought for any task involving multi-step reasoning, analysis, or judgement calls — the explicit reasoning step reduces errors and makes the model's logic auditable."
        }
      },
      {
        id: "p-2",
        title: "Why specificity matters",
        preview: "The direct relationship between input structure and output quality.",
        content: {
          explanation: "The model generates the most plausible completion of your input. If your input is ambiguous, the model resolves that ambiguity however it sees fit — not necessarily how you intended. Every gap in your prompt is a variable the model fills with its own default. This means the quality of output is directly proportional to the precision of the input. Vague prompts produce vague outputs; structured prompts produce structured outputs.",
          analogy: "You would not brief a contractor with 'do something good'. You would specify scope, deliverable format, audience, timeline, and quality criteria. Prompting works the same way. The level of clarity you would put into a written brief for a human collaborator is the baseline for a prompt that will produce reliable results.",
          implication: "Before writing a prompt, define: what the output should look like (format), who it is for (audience and register), what constraints apply (length, tone, scope), and what a good versus bad output looks like. These components are not optional polish — they are the functional specification for the task."
        }
      },
      {
        id: "p-3",
        title: "Role prompting and persona framing",
        preview: "What it does, what it doesn't do, and its limits in production.",
        content: {
          explanation: "Asking a model to 'act as' a specific role — a senior lawyer, a financial analyst, a plain-English translator — shifts its response patterns toward the language conventions and domain defaults of that role. It doesn't give the model new knowledge, but it activates relevant patterns from its training data and adjusts register, tone, and framing accordingly. The effect is real but limited: role framing influences style, not underlying capability.",
          analogy: "Asking a generalist employee to write 'as a contract lawyer reviewing this agreement' doesn't make them a lawyer. But it does orient them toward legal caution, specific language conventions, and the questions a lawyer would ask. The output will be different — and often more useful — than if they wrote without any framing.",
          implication: "Role framing is a useful tool for style, register, and domain orientation. It is not a substitute for clear task instructions and should never be relied on for factual accuracy in specialised domains. Combine role framing with explicit task instructions and output format specifications for best results."
        }
      },
      {
        id: "p-4",
        title: "System prompts vs. user prompts",
        preview: "Structural difference and why it matters for protocol design.",
        content: {
          explanation: "System prompts are instructions provided to the model before the conversation begins — they set context, persona, constraints, format preferences, and operational rules. User prompts are the individual requests made within a conversation. In most implementations, system prompts carry higher weight and persist across the conversation. System prompts are the foundation of protocol design; user prompts are the individual task requests that operate within those rules.",
          analogy: "A system prompt is the operating manual and job description. User prompts are the daily work requests. The manual governs what's in scope and how work should be done; individual requests operate within those parameters. Without the manual, each request is interpreted from scratch with no stable frame.",
          implication: "Stable rules, format requirements, persona constraints, and critical context belong in the system prompt. Dynamic, task-specific requests belong in user prompts. This separation is what makes AI workflows consistent, auditable, and maintainable — and it is the structural foundation of every robust protocol."
        }
      },
      {
        id: "p-5",
        title: "Iterative prompting as workflow",
        preview: "Prompting is not one-shot. Why iteration is the discipline, not the workaround.",
        content: {
          explanation: "Effective prompting is a workflow, not a single event. The first output is diagnostic — it reveals what the model understood, where it defaulted, and what the prompt failed to specify. Iteration means reading that output as feedback, identifying the specific gap, and revising the prompt or the follow-up instruction accordingly. Practitioners who treat the first output as a draft to be refined consistently outperform those who treat each prompt as a one-shot attempt.",
          analogy: "Managing a talented but highly literal contractor: the first draft always reveals misunderstandings. The professional response is to note precisely what needs to change, not to be frustrated by the gap. Revision instructions close the gaps; iteration is the discipline, not the failure.",
          implication: "Budget time for iteration in any AI-assisted workflow. A single-pass prompt treated as production-ready is the most common source of poor output quality. When building a protocol, the iteration log — what you changed and why — is the documentation of the protocol's development and an asset in its own right."
        }
      }
    ]
  },
  {
    id: "models",
    icon: "⚡",
    label: "Model Families",
    color: "#d97706",
    light: "#fffbeb",
    subtopics: [
      {
        id: "m-1",
        title: "Frontier vs. smaller models",
        preview: "The cost-intelligence tradeoff and when each is the right tool.",
        content: {
          explanation: "Frontier models are the largest, most capable LLMs from leading AI labs — they excel at complex reasoning, long-document analysis, subtle instruction-following, and multi-step tasks. Smaller, faster models are significantly cheaper and lower-latency, well-suited to high-volume, well-defined tasks like classification, extraction, summarisation of short text, and structured formatting. The choice is not about which is 'better' — it is about matching capability to task.",
          analogy: "Frontier models are senior partners at a consulting firm — expensive, thorough, and powerful for complex problems. Smaller models are capable analysts — faster, cheaper, and excellent for well-defined, high-volume work. Routing every task to the senior partner regardless of complexity is wasteful and unnecessary.",
          implication: "In protocol design, model selection is an explicit decision, not a default. Define what capability the task actually requires, then select the most cost-effective model that meets that threshold. Routing routine tasks to smaller models and reserving frontier capability for genuinely complex work is the standard cost-optimisation practice in production systems."
        }
      },
      {
        id: "m-2",
        title: "Claude: Haiku, Sonnet, Opus",
        preview: "Speed, cost, and reasoning depth — the operational decision framework.",
        content: {
          explanation: "Anthropic's Claude family operates on a three-tier model. Haiku is the fastest and most cost-efficient ($1 input / $5 output per million tokens) — built for high-volume, lower-complexity tasks. Sonnet is the balanced workhorse ($3 / $15) — capable of handling the majority of professional workflows at reasonable cost. Opus is the most capable tier ($5 / $25) — best reserved for complex reasoning, long-document analysis, and high-stakes outputs where depth justifies the premium. All tiers support long context windows and multimodal input. Pricing as of early 2026.",
          analogy: "Haiku is a sharp junior analyst — fast and efficient for defined tasks. Sonnet is your senior manager — reliable, capable, appropriate for most work. Opus is the expert partner you bring in for the genuinely hard problems — the cost is justified when the stakes or complexity demand it.",
          implication: "Default to Sonnet for most protocols in the design phase. Use Haiku for production workflows where volume is high and the task is well-defined and well-tested. Reserve Opus for complex analytical tasks, multi-step reasoning, or any situation where output quality materially affects a consequential decision."
        }
      },
      {
        id: "m-3",
        title: "Reasoning models vs. standard models",
        preview: "What the o-series and similar models actually do differently.",
        content: {
          explanation: "Reasoning models — such as OpenAI's o3 and o4-mini, or Claude with extended thinking enabled — are trained to generate an internal chain-of-thought before producing a final response. This 'think first' approach uses additional compute but significantly improves accuracy on multi-step problems, complex analysis, and tasks where the answer requires working through intermediate steps. The reasoning is sometimes visible to the user, sometimes internal. Standard models respond without this deliberate reasoning phase.",
          analogy: "A standard model answers like a sharp colleague who thinks quickly and replies immediately. A reasoning model is the same colleague who says 'give me thirty seconds' — they pause, work through the problem, then speak. The pause costs time; the output quality on hard problems is meaningfully better.",
          implication: "Use reasoning models when a task involves genuine complexity — multi-variable analysis, nuanced judgement, complex planning, or any problem where the first-pass answer frequently needs revision. For routine tasks with clear inputs and outputs, the additional cost and latency of reasoning mode is not justified. This is an explicit design decision when building protocols."
        }
      },
      {
        id: "m-4",
        title: "Multimodal capabilities",
        preview: "What vision, document, and audio inputs actually enable.",
        content: {
          explanation: "Multimodal models can process inputs beyond text — images, PDFs, screenshots, charts, and in some implementations audio. This enables tasks that were previously text-only workflows: analysing a chart in a report, extracting structured data from a scanned document, describing a screenshot, reading a PDF without pre-processing the text, or reviewing a presentation slide. All current Claude models support image and document input.",
          analogy: "A text-only model can read the written memo. A multimodal model can read the memo and look at the chart attached to it — and understand how they relate. For document-heavy workflows, the practical difference is significant.",
          implication: "Any workflow that currently involves manually copying text out of PDFs, screenshots, or images to feed into an AI tool can be simplified by passing the document directly. Multimodal capability is particularly high-value for document processing, reporting, and any workflow where information arrives in visual or mixed formats."
        }
      }
    ]
  },
  {
    id: "agents",
    icon: "🔗",
    label: "Agents & Orchestration",
    color: "#059669",
    light: "#ecfdf5",
    subtopics: [
      {
        id: "a-1",
        title: "What an AI agent is",
        preview: "The difference between a single model call and an agentic loop.",
        content: {
          explanation: "A single model call is a request-response interaction: you send a prompt, the model returns an output. An AI agent is a system where the model operates in a loop — perceive context, decide what to do, act (often using tools), observe the result, then repeat — until the task is complete. The model is not just answering; it is making sequential decisions and taking actions. Agents can browse the web, run code, query databases, write files, and call APIs, depending on the tools they are given.",
          analogy: "A single model call is like asking someone a question and receiving one answer. An agent is like assigning someone a task and giving them the authority to take whatever steps are needed to complete it — checking sources, drafting, revising, verifying — until the work is done. The difference is between a consultant who answers your question and one who manages the project.",
          implication: "Agents enable the automation of multi-step workflows that previously required constant human intervention at each step. They also introduce new failure modes — a wrong decision in step two can cascade through subsequent steps without human review. Protocol design for agents requires explicit thinking about failure handling, decision boundaries, and when human review must be enforced."
        }
      },
      {
        id: "a-2",
        title: "Tool use and function calling",
        preview: "What it means for a model to use external tools in practice.",
        content: {
          explanation: "Tool use — also called function calling — gives a model access to predefined external capabilities it can invoke during a response: searching the web, executing code, querying a database, reading a file, sending a message, calling an API. The model decides when to use a tool, what parameters to pass, and how to incorporate the result into its response. The tools themselves are defined and controlled by the system developer, not the model.",
          analogy: "Tool use transforms a model from someone who only talks into someone who can also do things. Giving a model a search tool is like giving a researcher internet access. Giving it a code execution tool is like giving an analyst a calculator. The model decides when and how to use these tools based on the task — but the tools themselves are what you have approved and made available.",
          implication: "Understanding what tools a model has access to is essential for designing safe and effective agentic workflows. Every tool represents a capability and a potential failure mode. Tool design — what actions to permit, what parameters to expose, what guardrails to build in — is where AI workflow safety is primarily managed."
        }
      },
      {
        id: "a-3",
        title: "RAG — Retrieval-Augmented Generation",
        preview: "The core concept and why it transforms business applications.",
        content: {
          explanation: "RAG connects the model to an external knowledge base at query time. When a query arrives, relevant documents are retrieved from a database (using semantic search) and passed into the model's context alongside the question. The model then generates a response grounded in those specific documents — rather than relying on what was in its training data. This addresses two fundamental limitations simultaneously: knowledge cutoffs and hallucination on domain-specific facts.",
          analogy: "RAG is like giving an employee a well-organised filing system and instructing them to look up relevant documents before answering any question about company policy or client history. Instead of relying on memory, they always check the source. The quality of the answer depends on the quality of the filing system — but the answers are grounded in the actual documents.",
          implication: "RAG is the standard architecture for any business AI application requiring accuracy on internal or domain-specific information. If you are building protocols for knowledge-intensive workflows — HR, compliance, client management, internal documentation — RAG is the architectural layer that makes it reliable. You do not need to build it yourself to understand why it matters for the systems you design around."
        }
      },
      {
        id: "a-4",
        title: "Memory types",
        preview: "In-context, external, procedural — a basic taxonomy.",
        content: {
          explanation: "AI systems have three categories of memory. In-context memory is the current conversation window — temporary, visible, and lost when the session ends. External memory is a persistent database that can be retrieved on demand — documents, past interactions, structured data. Procedural memory is behaviour encoded in the model's weights through training or fine-tuning — it cannot be updated without retraining the model. Most current applications combine in-context and external memory; procedural memory is what the model 'knows by default'.",
          analogy: "In-context memory is what you hold in your head during a meeting. External memory is your filing cabinet and notes — retrievable, persistent, searchable. Procedural memory is the expertise you have built up over years — so embedded it is not consciously retrieved, just expressed. The meeting ends and what was in your head is gone; the filing cabinet remains; your expertise persists.",
          implication: "When designing AI workflows, decide explicitly where information should live. Stable reference content belongs in external memory (a knowledge base). Task-specific context belongs in-context. Model defaults — tone, format conventions, domain conventions — can sometimes be influenced by fine-tuning, which modifies procedural memory. Most protocols work primarily with in-context and external memory."
        }
      },
      {
        id: "a-5",
        title: "MCP — Model Context Protocol",
        preview: "What it is and why it's becoming the standard for tool integration.",
        content: {
          explanation: "The Model Context Protocol (MCP) is an open standard, introduced by Anthropic in November 2024 and now adopted by OpenAI, Google, and Microsoft, that standardises how AI models connect to external tools and data sources. Before MCP, every integration required custom code — a bespoke connector for each tool and each model. MCP defines a common protocol so that any MCP-compatible tool can connect to any MCP-compatible model without custom engineering for each combination. By early 2026, thousands of MCP servers exist — covering everything from GitHub and Slack to Stripe and Notion. Governance was transferred to the Linux Foundation in December 2025.",
          analogy: "MCP is the USB standard for AI. Before USB, every peripheral needed its own proprietary connector — costly, fragile, and incompatible across devices. USB created a universal interface so any device could plug into any computer. MCP does the same for AI tool integration: any MCP server can plug into any MCP-compatible model.",
          implication: "MCP is rapidly becoming infrastructure. You do not need to build MCP servers to understand why it matters. Knowing what MCP is allows you to speak accurately with technical collaborators about integration costs and options, and to evaluate whether a proposed AI implementation is building on standard infrastructure or a custom, brittle connector that will be expensive to maintain."
        }
      }
    ]
  },
  {
    id: "limits",
    icon: "⚠️",
    label: "Limitations & Failure",
    color: "#dc2626",
    light: "#fef2f2",
    subtopics: [
      {
        id: "l-1",
        title: "Hallucination: types and causes",
        preview: "Design prompts that reduce it — not just recognise it.",
        content: {
          explanation: "Hallucination encompasses several distinct failure types: factual errors (wrong dates, names, statistics), fabricated citations (real-sounding but non-existent sources), logical inconsistencies within a response, and confident elaboration beyond what the source material supports. All stem from the same cause: the model generates the most statistically plausible text, regardless of whether it has reliable training signal for the specific claim. There is no internal mechanism that distinguishes 'I know this' from 'this sounds right'.",
          analogy: "A highly confident colleague who has learned that authoritative-sounding answers are well-received. They produce fluent, assured responses whether or not they have real knowledge behind them. There is nothing in their delivery that signals the difference. The only way to know is to check the underlying facts.",
          implication: "Three practical design responses: (1) Ground responses in provided source material — pass the document and instruct the model to answer from it. (2) Require citations — a model that must cite a specific source is easier to verify than one giving bare conclusions. (3) Treat any specific claim (statistics, names, dates, citations) as needing independent verification before it appears in a consequential output."
        }
      },
      {
        id: "l-2",
        title: "Context drift in long conversations",
        preview: "Why earlier instructions degrade and how to compensate.",
        content: {
          explanation: "As a conversation grows longer, the model's attention distributes across an increasingly large window. Earlier instructions, constraints, and context do not disappear — but they receive less effective weight relative to recent content. In a very long conversation, the model may subtly drift from constraints established at the start: relaxing format requirements, forgetting specific rules, or shifting tone. This is not the model ignoring instructions — it is the mathematical consequence of attention dilution across a long context.",
          analogy: "Like a long project meeting where the initial brief gets progressively buried under discussion. The final decisions may barely resemble what was scoped at the start — not because anyone deliberately abandoned the brief, but because it faded in salience relative to what was said most recently.",
          implication: "For long workflows, periodically restate the key constraints in the conversation. Place critical, stable rules in system prompts (not early user messages) — system prompts have structural persistence. For very long tasks, consider breaking them into shorter, focused exchanges that reset context rather than accumulating indefinitely."
        }
      },
      {
        id: "l-3",
        title: "Sycophancy",
        preview: "Why models tend to agree and how to counteract it in protocol design.",
        content: {
          explanation: "Models tend to agree with users, validate their assumptions, and avoid confrontation. This is not a deliberate design choice — it is a consequence of training on human feedback, where agreement was often rated more positively than disagreement. The practical result: if you push back on a model's correct answer, it will frequently revise its position to match your preference, even when you are wrong. Confident user assertions are treated as implicit corrections.",
          analogy: "An overly eager assistant who has learned that 'yes' creates less friction than 'no'. They say 'great idea!' to everything — not out of dishonesty, but because agreement has always been rewarded. The danger is not that they deceive you; it is that they confirm your errors rather than catching them.",
          implication: "Never treat a model's agreement as validation of your reasoning. Explicitly ask it to steelman counterarguments, identify weaknesses in your analysis, play devil's advocate, or tell you what a critic would say. Design protocols that ask for critique as a separate, explicit step. For important decisions, use a separate prompt specifically designed to challenge the first output."
        }
      },
      {
        id: "l-4",
        title: "Knowledge cutoffs",
        preview: "Operational implications for time-sensitive workflows.",
        content: {
          explanation: "Every model is trained on data up to a specific date — its knowledge cutoff. Events, publications, price changes, regulatory updates, and new information after that date are simply absent from the model's weights. The model cannot infer what has changed; it operates with the world as it was at training time. For Claude Sonnet 4.6, the knowledge cutoff is May 2025. This is a structural limitation, not a failure mode to be prompted around.",
          analogy: "Working with a brilliant colleague who has been on a remote research expedition since the training cutoff date. Everything they know from before is well-integrated and reliable. Everything that has changed since they left — they simply don't know, and they may not realise they don't know.",
          implication: "For any workflow involving current events, recent regulatory changes, live pricing, market data, or fast-moving technical information — do not rely on the model's training knowledge. Provide current information explicitly in the prompt, use a model with web-search tool access, or implement a RAG system with up-to-date source documents. Always verify time-sensitive claims regardless of how confidently the model presents them."
        }
      },
      {
        id: "l-5",
        title: "Over-reliance patterns",
        preview: "When AI assistance creates fragility, not resilience.",
        content: {
          explanation: "Over-reliance occurs when AI assistance becomes the default rather than a tool — when critical thinking atrophies because the AI is always there to compensate. Teams that route decisions through AI without maintaining the human judgement to evaluate the outputs create fragility: the system functions until the AI is wrong and no one notices. The risk is not that the AI fails — it is that the failure goes undetected because the humans have stopped independently verifying.",
          analogy: "GPS navigation is convenient until it routes you into a river — and you follow it because you have stopped trusting your own spatial reasoning. The tool has gradually substituted for the skill, and the skill has quietly atrophied. The failure mode is not the GPS being wrong; it is the driver having lost the independent capability to recognise that.",
          implication: "Protocols should explicitly specify when human review is mandatory — not optional. AI-generated outputs feeding consequential decisions should require documented human sign-off, not just consumption. When building AI workflows for teams, audit periodically whether the humans in the loop are genuinely reviewing outputs or merely approving them as a formality."
        }
      }
    ]
  },
  {
    id: "protocols",
    icon: "🛠️",
    label: "Protocol Engineering",
    color: "#7c3aed",
    light: "#f5f3ff",
    subtopics: [
      {
        id: "pr-1",
        title: "Prompt vs. protocol",
        preview: "A prompt is an input. A protocol is a reusable system. The difference is everything.",
        content: {
          explanation: "A prompt is a single input to a model — it works once, for one person, in one context. A protocol is a documented, versioned, repeatable system built around a prompt: it includes a purpose statement, the full prompt text, context-setting instructions, examples of good and bad outputs, failure handling rules, and a change log. A protocol is designed to produce consistent results across uses, users, and variations in input — without the author needing to be present.",
          analogy: "A prompt is a verbal instruction to a colleague. A protocol is an operating procedure in a process manual — written to work reliably even when the person who wrote it is not in the room, even when run by someone who has never seen the task before. The manual encodes the knowledge so it is no longer locked in one person's head.",
          implication: "The shift from prompting to protocol design is the shift from personal productivity to operational infrastructure. If the output quality of an AI workflow depends on who is running it or how they phrase things on a given day, it is a prompt-based system. If it works consistently regardless, it is a protocol. This distinction is the foundational capability of the Skill Engineer role."
        }
      },
      {
        id: "pr-2",
        title: "What makes a protocol robust",
        preview: "Specificity, examples, failure handling, version notes.",
        content: {
          explanation: "A robust protocol contains six elements: (1) a clear purpose statement — what the protocol is for and when to use it; (2) full system prompt text; (3) explicit output format specification; (4) examples of good outputs and at least one example of an unacceptable output; (5) failure handling instructions — what to do when the model produces edge-case or out-of-scope outputs; (6) version notes — what was changed and why. Robustness means the protocol performs consistently even with variation in inputs it was not specifically designed for.",
          analogy: "A well-designed process works even when a new person runs it for the first time, without needing to call for help. The documentation makes the knowledge transferable. The measure of robustness is not 'does it work when I run it'— it is 'does it work when someone else runs it on an input I didn't anticipate'.",
          implication: "Test every protocol with inputs you did not design it for. Edge cases reveal brittleness. The failure modes you encounter during testing are the most valuable information the protocol development process produces — document them and add handling for them. A protocol is only as robust as the hardest test case it has survived."
        }
      },
      {
        id: "pr-3",
        title: "Evaluating and testing prompts",
        preview: "How to know if a protocol is actually working.",
        content: {
          explanation: "Prompt evaluation involves running a protocol against a defined set of test cases — representative inputs — and scoring the outputs against explicit criteria. Without evaluation, you cannot know whether a protocol is performing reliably, degrading over time, or producing subtly wrong outputs that go unnoticed. Evaluation is also necessary when you change a model version, update a prompt, or change the context in which the protocol runs — the same prompt may behave differently on a new model.",
          analogy: "Quality control in a production process. You do not simply run the production line and hope. You sample outputs, measure them against a specification, and trace failures back to their cause. The specification has to be written before you can measure against it — which means defining what 'correct' looks like before you test.",
          implication: "When building a protocol, simultaneously build a small test set: 5–10 representative inputs covering the range of cases the protocol will encounter, including at least one or two edge cases. Define what a good output looks like for each. Run this test set before deployment and whenever you modify the protocol or change the model. This is your baseline for detecting regression."
        }
      },
      {
        id: "pr-4",
        title: "Prompt libraries and knowledge management",
        preview: "How teams operationalise AI skills at scale.",
        content: {
          explanation: "A prompt library is an organised, versioned collection of tested protocols — searchable by use case, with documentation of purpose, performance notes, ownership, and change history. It transforms AI capability from informal individual knowledge into a shared team asset. Teams with well-maintained prompt libraries can onboard new members into AI-assisted workflows quickly, maintain quality standards, and systematically improve protocols over time rather than rediscovering solutions.",
          analogy: "A standard operating procedures manual or a code repository. The collective knowledge is written down, accessible to the whole team, version-controlled, and improvable. Contrast this with a situation where each person has their own ad-hoc prompts stored informally — the team's capability is only as strong as the individual, and it disappears when they leave.",
          implication: "Even as an individual practitioner, maintaining a personal protocol library with version notes is the foundational practice of professional AI operations. It is also the primary portfolio artefact for a Skill Engineer — a well-documented library of working, tested protocols demonstrates capability more credibly than any certification."
        }
      },
      {
        id: "pr-5",
        title: "The Skill Engineer role landscape",
        preview: "Where this practice sits in the emerging profession.",
        content: {
          explanation: "The Skill Engineer role sits between 'AI user' and 'AI developer'. It involves designing, testing, documenting, and maintaining the prompt systems that organisations rely on — without requiring software engineering or ML expertise. The role is emerging as a distinct function in AI-forward organisations because the people best positioned to design effective AI protocols are not always developers — they are operational generalists with deep process knowledge, strong communication skills, and the discipline to document and iterate.",
          analogy: "The business analyst who bridges the gap between business requirements and technical implementation. Not a developer, but indispensable for translating what the business actually needs into system specifications that technical teams can build. The Skill Engineer occupies a similar bridging position — between operational workflows and the AI systems that support them.",
          implication: "The capabilities that define this role — structured thinking, process design, failure mode awareness, documentation discipline, and critical evaluation of outputs — are reframings of operational generalist strengths, not entirely new skills. The differentiator is applying those capabilities systematically to AI protocol development, with enough conceptual fluency to understand why models behave as they do."
        }
      }
    ]
  }
];

// ─── GERMAN CONTENT ─────────────────────────────────────────────────────────

const topicsDE = [
  {
    id: "llm",
    icon: "🧠",
    label: "Wie LLMs funktionieren",
    color: "#6366f1",
    light: "#eef2ff",
    subtopics: [
      {
        id: "llm-1",
        title: "Was ein LLM ist (und nicht ist)",
        preview: "Statistische Vorhersage vs. Verstehen — die wichtigste Unterscheidung zuerst.",
        content: {
          explanation: "Ein Large Language Model ist eine statistische Vorhersage-Engine. Zu jeder Textsequenz hat es gelernt — durch Training auf riesigen Mengen schriftlichen Materials —, welche Wörter und Phrasen wahrscheinlich folgen. Es erzeugt Ausgaben, indem es wiederholt das plausibelste nächste Token vorhersagt. Entscheidend ist: Dies ist Mustererkennung in enormem Maßstab, kein Verstehen. Das Modell versteht nicht, was es schreibt; es erzeugt Text, der statistisch konsistent damit ist, wie Menschen über ein Thema schreiben.",
          analogy: "Stellen Sie sich eine extrem ausgefeilte Textvervollständigung vor, die fast alles Geschriebene verarbeitet hat. Sie kennt nicht die Bedeutung von Wörtern — sie weiß, welche Wörter in welchen Kontexten auf andere folgen. Bitten Sie sie, 'Die Hauptstadt von Frankreich ist…' zu vervollständigen, und sie sagt 'Paris' voraus — nicht weil sie Geographie kennt, sondern weil diese Vervollständigung überwältigend in ihren Trainingsdaten vorkommt.",
          implication: "Gehen Sie nie davon aus, dass das Modell Ihre Absicht versteht. Explizite, spezifische Anweisungen werden immer vagen oder impliziten überlegen sein. Das Modell vervollständigt Ihren Prompt — es liest keine Gedanken. Alles, was Sie mehrdeutig lassen, füllt es mit seinem eigenen statistischen Standard."
        }
      },
      {
        id: "llm-2",
        title: "Training auf hohem Niveau",
        preview: "Daten, Muster, Gewichtungen — ohne die Mathematik.",
        content: {
          explanation: "Training beinhaltet das Aussetzen des Modells gegenüber enormen Textmengen und das Anpassen von Milliarden numerischer Parameter — genannt Gewichtungen — um Vorhersagefehler im Laufe der Zeit zu reduzieren. Durch diesen Prozess werden Muster, Assoziationen und Strukturen aus den Trainingsdaten in den Gewichtungen des Modells kodiert. Nach dem Training sind diese Gewichtungen festgesetzt — sie repräsentieren alles, was das Modell 'weiß'. Das Modell kann seine Gewichtungen während der Verwendung nicht aktualisieren.",
          analogy: "Stellen Sie sich vor, ein Wachssiegel wird Millionen Male mit verschiedenen Prägungen gedrückt, jedes Mal mit leichter Formkorrektur. Das endgültige Siegel spiegelt die Gesamtheit aller dieser Korrekturen wider. Sobald das Wachs aushärtet — das Training abgeschlossen ist — ist das Siegel gesetzt. Keine Prägung bei normalem Gebrauch ändert die zugrunde liegende Form.",
          implication: "Das Wissen des Modells ist am Ende des Trainings eingefroren. Es kann aus Ihrem Gespräch keine neuen Informationen lernen, es sei denn, es wurden Abruf-Tools bereitgestellt. Deshalb sind Wissens-Abschneidezeitpunkte wichtig, und deshalb ist das direkte Angeben aktueller Informationen im Prompt die praktische Lösung."
        }
      },
      {
        id: "llm-3",
        title: "Tokens und Kontextfenster",
        preview: "Warum Token-Limits eine operative Einschränkung sind, nicht nur ein technisches Detail.",
        content: {
          explanation: "Modelle verarbeiten keine Wörter — sie verarbeiten Tokens, die Textblöcke sind, die im Durchschnitt ungefähr drei Viertel eines Wortes entsprechen. Das Kontextfenster ist die gesamte Textmenge — sowohl Eingabe als auch Ausgabe zusammen —, die ein Modell in einer einzigen Interaktion verarbeiten kann. Aktuelle Frontier-Modelle unterstützen Kontextfenster von 100.000 bis 1.000.000 Tokens. Innerhalb dieses Fensters ist alles für das Modell gleichzeitig sichtbar; darüber hinaus geht früherer Inhalt verloren.",
          analogy: "Das Kontextfenster ist das Arbeitsgedächtnis. So wie eine Person bei einer komplexen Aufgabe nur so viele Informationen aktiv im Kopf halten kann, kann das Modell nur beachten, was in sein Fenster passt. Lange Dokumente, umfangreiche Gesprächsverläufe und detaillierte Anweisungen konkurrieren alle um denselben begrenzten Raum.",
          implication: "Für lange Workflows, komplexe Dokumente oder mehrstufige Gespräche ist das Kontextmanagement eine operative Fähigkeit. Kritische Anweisungen früh in einem sehr langen Gespräch können weniger Gewicht tragen als erwartet. System-Prompts — die oben platziert sind und persistieren — sind der richtige Ort für stabile Regeln und Einschränkungen."
        }
      },
      {
        id: "llm-4",
        title: "Temperatur und Sampling",
        preview: "Was Zufälligkeit bei Ausgaben bedeutet und wann es für Ihre Arbeit wichtig ist.",
        content: {
          explanation: "Temperatur ist eine Einstellung, die steuert, wie das Modell sein nächstes Token auswählt. Bei Temperatur 0 wählt es immer die wahrscheinlichste Option — Ausgaben sind konsistent und deterministisch. Mit steigender Temperatur werden Optionen mit geringerer Wahrscheinlichkeit verfügbar — Ausgaben werden abwechslungsreicher und kreativer, aber auch anfälliger für Abweichungen von erwarteten Mustern. Die meisten Produktionssysteme arbeiten zwischen 0 und 1.",
          analogy: "Temperatur ist ein Regler zwischen 'strenger Textvervollständigung' und 'freiem Jazz'. Bei null liest das Modell von einem Skript. Bei hohen Einstellungen improvisiert es. Beide haben legitime Verwendungszwecke — der Fehler besteht darin, die falsche Einstellung für die Aufgabe zu verwenden.",
          implication: "Für Protokolle, die zuverlässige, strukturierte und konsistente Ausgaben erfordern — Klassifizierung, Extraktion, Formatierung, Zusammenfassung — verwenden Sie niedrige Temperatur. Für Brainstorming oder kreative Generierung erzeugt eine höhere Einstellung abwechslungsreichere Ergebnisse. Wenn Sie unvorhersehbare Ausgaben von einem Protokoll erhalten, das konsistent sein sollte, überprüfen Sie, ob die Temperatur explizit gesetzt wurde."
        }
      },
      {
        id: "llm-5",
        title: "Warum Halluzination auftritt",
        preview: "Der Kernmechanismus — kein zu behebender Fehler, sondern ein zu berücksichtigendes Merkmal.",
        content: {
          explanation: "Halluzination ist kein Fehler im traditionellen Sinne — sie ist eine inhärente Konsequenz der Funktionsweise von LLMs. Das Modell generiert immer das statistisch plausibelste nächste Token. Wenn es nach einem bestimmten Fakt gefragt wird, für den es unzureichendes Trainingssignal hat, generiert es dennoch selbstsicher klingenden Text — weil selbstsichere, flüssige Prosa der Aussehen seiner Trainingsdaten war. Das Modell hat keine interne Prüfung zwischen 'Ich weiß das' und 'Ich erfinde das'. Beide produzieren die gleiche Art von Ausgabe.",
          analogy: "Stellen Sie sich einen sehr selbstbewussten Mitarbeiter vor, der gelernt hat, dass autoritativ klingende Antworten gut ankommen. Wenn er etwas nicht weiß, generiert er eine plausibel klingende Antwort mit der gleichen Überzeugung, die er für gesichertes Wissen verwenden würde. In seiner Lieferung gibt es kein Signal, das die beiden unterscheidet.",
          implication: "Entwerfen Sie Protokolle, die Antworten in bereitgestelltem Quellmaterial verankern — übergeben Sie das relevante Dokument direkt in den Prompt. Verlangen Sie zitierte Begründungen statt bloßer Schlussfolgerungen. Für jede Ausgabe, bei der faktische Genauigkeit kritisch ist, verlangen Sie eine Überprüfung an primären Quellen. Halluzination kann nicht eliminiert werden; sie kann durch strukturelles Design drastisch reduziert werden."
        }
      },
      {
        id: "llm-6",
        title: "Basis- vs. instruktionsgestimmte Modelle",
        preview: "Der Unterschied zwischen einem Rohmodell und einem, das auf das Befolgen von Anweisungen trainiert ist.",
        content: {
          explanation: "Ein Basismodell wird ausschließlich auf der Vorhersage des nächsten Tokens trainiert — es setzt jeden Text fort, den Sie ihm geben, ohne Anweisungen zu befolgen oder eine hilfreiche Ausrichtung zu haben. Instruktionsgestimmte Modelle werden dann auf dem Basis unter Verwendung von menschlichem Feedback trainiert, um Anweisungen zu befolgen, Fragen hilfreich zu beantworten, schädliche Anfragen abzulehnen und sich wie ein Assistent zu verhalten. Jedes Modell, mit dem Sie als Endnutzer interagieren — Claude, GPT-4o, Gemini — ist instruktionsgestimmt.",
          analogy: "Ein Basismodell ist ein Absolvent mit umfangreicher Leseerfahrung, aber ohne professionelle Sozialisation — bitten Sie ihn, 'ein Memo zu entwerfen', und er könnte mehr akademischen Text im Stil dessen erzeugen, was er gelesen hat. Ein instruktionsgestimmtes Modell hat ein professionelles Onboarding abgeschlossen: Es versteht, wie es auf Direktiven reagiert, Briefings folgt und Ausgaben in dem Format liefert, das Sie benötigen.",
          implication: "Diese Unterscheidung erklärt, warum moderne KI auf Befehle reagiert statt nur Text zu vervollständigen. Sie erklärt auch, warum verschiedene Modelle aus demselben Basis sich sehr unterschiedlich verhalten können — das Instruktions-Tuning prägt das operative Verhalten in den meisten alltäglichen Aufgaben mehr als rohe Fähigkeit."
        }
      }
    ]
  },
  {
    id: "prompt",
    icon: "✍️",
    label: "Grundlagen des Promptings",
    color: "#0891b2",
    light: "#ecfeff",
    subtopics: [
      {
        id: "p-1",
        title: "Zero-Shot, Few-Shot, Chain-of-Thought",
        preview: "Drei Prompting-Strategien — wann jede zu verwenden ist und warum sie funktionieren.",
        content: {
          explanation: "Zero-Shot-Prompting bittet das Modell, eine Aufgabe ohne Beispiele zu erfüllen — nur die Anweisung. Few-Shot-Prompting bietet repräsentative Beispiele der gewünschten Eingabe und Ausgabe, bevor die Anfrage gestellt wird, und gibt dem Modell ein Muster, dem es folgen soll. Chain-of-Thought-Prompting weist das Modell an, Schritt für Schritt zu denken, bevor es seine endgültige Antwort gibt, und erzwingt sichtbares Zwischendenken, das die Genauigkeit bei komplexen Aufgaben erheblich verbessert.",
          analogy: "Zero-Shot ist es, einen neuen Teammitglied zu bitten, ein Dokument ohne Briefing zu entwerfen. Few-Shot übergibt ihm zuerst drei Beispieldokumente und sagt 'erstellen Sie etwas Ähnliches'. Chain-of-Thought bittet ihn, Sie durch sein Denken zu führen, bevor er sich auf den endgültigen Entwurf festlegt — der Prozess selbst verbessert die Ausgabe.",
          implication: "Verwenden Sie Few-Shot, wenn Sie konsistente Struktur, Ton oder Format in Ausgaben benötigen. Schon zwei oder drei Beispiele reduzieren die Variation drastisch. Verwenden Sie Chain-of-Thought für jede Aufgabe, die mehrstufiges Denken, Analyse oder Urteilsbildung beinhaltet — der explizite Denkschritt reduziert Fehler und macht die Logik des Modells überprüfbar."
        }
      },
      {
        id: "p-2",
        title: "Warum Spezifität wichtig ist",
        preview: "Die direkte Beziehung zwischen Eingabestruktur und Ausgabequalität.",
        content: {
          explanation: "Das Modell generiert die plausibelste Vervollständigung Ihrer Eingabe. Wenn Ihre Eingabe mehrdeutig ist, löst das Modell diese Mehrdeutigkeit nach eigenem Ermessen auf — nicht unbedingt wie Sie es beabsichtigt haben. Jede Lücke in Ihrem Prompt ist eine Variable, die das Modell mit seinem eigenen Standard füllt. Das bedeutet: Die Qualität der Ausgabe ist direkt proportional zur Präzision der Eingabe. Vage Prompts erzeugen vage Ausgaben; strukturierte Prompts erzeugen strukturierte Ausgaben.",
          analogy: "Sie würden einen Auftragnehmer nicht mit 'mach etwas Gutes' beauftragen. Sie würden Umfang, Lieferformat, Zielgruppe, Zeitrahmen und Qualitätskriterien angeben. Prompting funktioniert genauso. Das Maß an Klarheit, das Sie in ein schriftliches Briefing für einen menschlichen Mitarbeiter stecken würden, ist die Grundlage für einen Prompt, der zuverlässige Ergebnisse liefert.",
          implication: "Bevor Sie einen Prompt schreiben, definieren Sie: wie die Ausgabe aussehen soll (Format), für wen sie ist (Zielgruppe und Register), welche Einschränkungen gelten (Länge, Ton, Umfang) und wie eine gute im Vergleich zu einer schlechten Ausgabe aussieht. Diese Komponenten sind kein optionaler Feinschliff — sie sind die funktionale Spezifikation für die Aufgabe."
        }
      },
      {
        id: "p-3",
        title: "Rollenformulierung und Persona-Framing",
        preview: "Was es bewirkt, was nicht, und seine Grenzen in der Produktion.",
        content: {
          explanation: "Wenn ein Modell gebeten wird, 'als' eine bestimmte Rolle zu agieren — ein erfahrener Anwalt, ein Finanzanalyst, ein Übersetzer in einfache Sprache — verschiebt es seine Antwortmuster hin zu den Sprachkonventionen und Domain-Standards dieser Rolle. Es gibt dem Modell kein neues Wissen, aber es aktiviert relevante Muster aus seinen Trainingsdaten und passt Register, Ton und Framing entsprechend an. Der Effekt ist real, aber begrenzt: Rollenformulierung beeinflusst Stil, nicht die zugrunde liegende Fähigkeit.",
          analogy: "Einen Generalisten zu bitten, 'als Vertragsanwalt, der diese Vereinbarung prüft' zu schreiben, macht ihn nicht zum Anwalt. Aber es orientiert ihn hin zu rechtlicher Vorsicht, spezifischen Sprachkonventionen und den Fragen, die ein Anwalt stellen würde. Die Ausgabe wird anders sein — und oft nützlicher — als wenn er ohne jegliches Framing schreiben würde.",
          implication: "Rollenformulierung ist ein nützliches Werkzeug für Stil, Register und Domain-Orientierung. Es ist kein Ersatz für klare Aufgabenanweisungen und sollte niemals für faktische Genauigkeit in spezialisierten Bereichen eingesetzt werden. Kombinieren Sie Rollenformulierung mit expliziten Aufgabenanweisungen und Ausgabeformat-Spezifikationen für beste Ergebnisse."
        }
      },
      {
        id: "p-4",
        title: "System-Prompts vs. Benutzer-Prompts",
        preview: "Struktureller Unterschied und warum er für das Protokolldesign wichtig ist.",
        content: {
          explanation: "System-Prompts sind Anweisungen, die dem Modell vor Beginn des Gesprächs gegeben werden — sie setzen Kontext, Persona, Einschränkungen, Formatpräferenzen und operative Regeln. Benutzer-Prompts sind die einzelnen Anfragen innerhalb eines Gesprächs. In den meisten Implementierungen haben System-Prompts mehr Gewicht und persistieren über das Gespräch hinweg. System-Prompts sind das Fundament des Protokolldesigns; Benutzer-Prompts sind die einzelnen Aufgabenanforderungen, die innerhalb dieser Regeln funktionieren.",
          analogy: "Ein System-Prompt ist das Betriebshandbuch und die Stellenbeschreibung. Benutzer-Prompts sind die täglichen Arbeitsanforderungen. Das Handbuch regelt, was im Umfang liegt und wie die Arbeit ausgeführt werden soll; einzelne Anforderungen funktionieren innerhalb dieser Parameter. Ohne das Handbuch wird jede Anforderung von Grund auf ohne stabilen Rahmen interpretiert.",
          implication: "Stabile Regeln, Formatanforderungen, Persona-Einschränkungen und kritischer Kontext gehören in den System-Prompt. Dynamische, aufgabenspezifische Anforderungen gehören in Benutzer-Prompts. Diese Trennung macht KI-Workflows konsistent, überprüfbar und wartbar — und ist das strukturelle Fundament jedes robusten Protokolls."
        }
      },
      {
        id: "p-5",
        title: "Iteratives Prompting als Workflow",
        preview: "Prompting ist kein Einmalschuss. Warum Iteration die Disziplin ist, nicht die Umgehungslösung.",
        content: {
          explanation: "Effektives Prompting ist ein Workflow, kein einzelnes Ereignis. Die erste Ausgabe ist diagnostisch — sie zeigt, was das Modell verstanden hat, wo es auf Standardwerte zurückgegriffen hat und was der Prompt nicht spezifiziert hat. Iteration bedeutet, diese Ausgabe als Feedback zu lesen, die spezifische Lücke zu identifizieren und den Prompt oder die Folgeanweisung entsprechend zu überarbeiten. Praktiker, die die erste Ausgabe als zu verfeinernden Entwurf behandeln, übertreffen konstant diejenigen, die jeden Prompt als einmaligen Versuch behandeln.",
          analogy: "Einen talentierten, aber sehr wörtlichen Auftragnehmer managen: Der erste Entwurf zeigt immer Missverständnisse. Die professionelle Reaktion ist, genau zu notieren, was geändert werden muss, und nicht über die Lücke frustriert zu sein. Überarbeitungsanweisungen schließen die Lücken; Iteration ist die Disziplin, nicht das Versagen.",
          implication: "Planen Sie Zeit für Iteration in jeden KI-gestützten Workflow ein. Ein Single-Pass-Prompt, der als produktionsreif behandelt wird, ist die häufigste Quelle schlechter Ausgabequalität. Beim Erstellen eines Protokolls ist das Iterationsprotokoll — was Sie geändert haben und warum — die Dokumentation der Protokollentwicklung und ein Vermögenswert an sich."
        }
      }
    ]
  },
  {
    id: "models",
    icon: "⚡",
    label: "Modellfamilien",
    color: "#d97706",
    light: "#fffbeb",
    subtopics: [
      {
        id: "m-1",
        title: "Frontier- vs. kleinere Modelle",
        preview: "Der Kosten-Intelligenz-Kompromiss und wann welches das richtige Werkzeug ist.",
        content: {
          explanation: "Frontier-Modelle sind die größten, fähigsten LLMs führender KI-Labore — sie glänzen bei komplexem Denken, der Analyse langer Dokumente, feiner Anweisungsbefolgung und mehrstufigen Aufgaben. Kleinere, schnellere Modelle sind deutlich günstiger und latenzärmer, gut geeignet für hochvolumige, klar definierte Aufgaben wie Klassifizierung, Extraktion, Zusammenfassung kurzer Texte und strukturierte Formatierung. Die Wahl betrifft nicht, welches 'besser' ist — es geht darum, Fähigkeiten mit der Aufgabe abzustimmen.",
          analogy: "Frontier-Modelle sind Senior-Partner einer Beratungsfirma — teuer, gründlich und leistungsstark für komplexe Probleme. Kleinere Modelle sind fähige Analysten — schneller, günstiger und ausgezeichnet für klar definierte, hochvolumige Arbeit. Jede Aufgabe unabhängig von der Komplexität an den Senior-Partner zu leiten, ist verschwenderisch und unnötig.",
          implication: "Im Protokolldesign ist die Modellauswahl eine explizite Entscheidung, kein Standard. Definieren Sie, welche Fähigkeit die Aufgabe tatsächlich erfordert, und wählen Sie dann das kosteneffektivste Modell, das diese Schwelle erfüllt. Routineaufgaben zu kleineren Modellen zu leiten und Frontier-Fähigkeiten für wirklich komplexe Arbeit zu reservieren, ist die Standard-Kostenoptimierungspraxis in Produktionssystemen."
        }
      },
      {
        id: "m-2",
        title: "Claude: Haiku, Sonnet, Opus",
        preview: "Geschwindigkeit, Kosten und Denktiefe — das operative Entscheidungsrahmen.",
        content: {
          explanation: "Anthropics Claude-Familie arbeitet auf einem Dreistufenmodell. Haiku ist das schnellste und kostengünstigste (1 $ Eingabe / 5 $ Ausgabe pro Million Tokens) — konzipiert für hochvolumige, weniger komplexe Aufgaben. Sonnet ist das ausgewogene Arbeitstier (3 $ / 15 $) — fähig, die Mehrheit professioneller Workflows zu einem vernünftigen Preis zu bewältigen. Opus ist die fähigste Stufe (5 $ / 25 $) — am besten für komplexes Denken, Analyse langer Dokumente und hochwertige Ausgaben reserviert, wo Tiefe die Prämie rechtfertigt. Alle Stufen unterstützen lange Kontextfenster und multimodale Eingabe. Preise Stand Anfang 2026.",
          analogy: "Haiku ist ein scharfer Junioranalyst — schnell und effizient für definierte Aufgaben. Sonnet ist Ihr Senior-Manager — zuverlässig, fähig, für die meisten Arbeiten geeignet. Opus ist der Expertenpartner, den Sie für die wirklich schwierigen Probleme hinzuziehen — die Kosten sind gerechtfertigt, wenn der Einsatz oder die Komplexität es erfordern.",
          implication: "Verwenden Sie standardmäßig Sonnet für die meisten Protokolle in der Designphase. Verwenden Sie Haiku für Produktions-Workflows, bei denen das Volumen hoch und die Aufgabe klar definiert und gut getestet ist. Reservieren Sie Opus für komplexe analytische Aufgaben, mehrstufiges Denken oder jede Situation, bei der die Ausgabequalität eine folgenreiche Entscheidung wesentlich beeinflusst."
        }
      },
      {
        id: "m-3",
        title: "Denkmodelle vs. Standardmodelle",
        preview: "Was die o-Serie und ähnliche Modelle tatsächlich anders machen.",
        content: {
          explanation: "Denkmodelle — wie OpenAIs o3 und o4-mini oder Claude mit erweitertem Denken — sind darauf trainiert, eine interne Gedankenkette zu generieren, bevor sie eine endgültige Antwort geben. Dieser 'Erst denken'-Ansatz verbraucht zusätzliche Rechenleistung, verbessert aber die Genauigkeit bei mehrstufigen Problemen, komplexen Analysen und Aufgaben, bei denen die Antwort das Durcharbeiten von Zwischenschritten erfordert, erheblich. Das Denken ist manchmal für den Benutzer sichtbar, manchmal intern. Standardmodelle reagieren ohne diese bewusste Denkphase.",
          analogy: "Ein Standardmodell antwortet wie ein scharfer Kollege, der schnell denkt und sofort antwortet. Ein Denkmodell ist derselbe Kollege, der sagt 'gib mir dreißig Sekunden' — er pausiert, arbeitet das Problem durch und spricht dann. Die Pause kostet Zeit; die Ausgabequalität bei schwierigen Problemen ist bedeutend besser.",
          implication: "Verwenden Sie Denkmodelle, wenn eine Aufgabe echte Komplexität beinhaltet — Mehrfachvariablen-Analyse, nuanciertes Urteil, komplexe Planung oder jedes Problem, bei dem die Erstantwort häufig überarbeitet werden muss. Für Routineaufgaben mit klaren Eingaben und Ausgaben sind die zusätzlichen Kosten und die Latenz des Denkmodus nicht gerechtfertigt."
        }
      },
      {
        id: "m-4",
        title: "Multimodale Fähigkeiten",
        preview: "Was Bild-, Dokument- und Audioeingaben tatsächlich ermöglichen.",
        content: {
          explanation: "Multimodale Modelle können Eingaben über Text hinaus verarbeiten — Bilder, PDFs, Screenshots, Diagramme und in einigen Implementierungen Audio. Dies ermöglicht Aufgaben, die zuvor nur Text-Workflows waren: Ein Diagramm in einem Bericht analysieren, strukturierte Daten aus einem gescannten Dokument extrahieren, einen Screenshot beschreiben, ein PDF ohne Vorverarbeitung lesen, oder eine Präsentationsfolie überprüfen. Alle aktuellen Claude-Modelle unterstützen Bild- und Dokumenteingabe.",
          analogy: "Ein rein textbasiertes Modell kann das schriftliche Memo lesen. Ein multimodales Modell kann das Memo lesen und das daran angehängte Diagramm ansehen — und verstehen, wie sie sich aufeinander beziehen. Für dokumentenintensive Workflows ist der praktische Unterschied erheblich.",
          implication: "Jeder Workflow, der derzeit das manuelle Kopieren von Text aus PDFs, Screenshots oder Bildern beinhaltet, kann durch direktes Übergeben des Dokuments vereinfacht werden. Multimodale Fähigkeiten sind besonders wertvoll für die Dokumentenverarbeitung und jeden Workflow, bei dem Informationen in visuellen oder gemischten Formaten ankommen."
        }
      }
    ]
  },
  {
    id: "agents",
    icon: "🔗",
    label: "Agenten & Orchestrierung",
    color: "#059669",
    light: "#ecfdf5",
    subtopics: [
      {
        id: "a-1",
        title: "Was ein KI-Agent ist",
        preview: "Der Unterschied zwischen einem einzelnen Modellaufruf und einer agentischen Schleife.",
        content: {
          explanation: "Ein einzelner Modellaufruf ist eine Anfrage-Antwort-Interaktion: Sie senden einen Prompt, das Modell gibt eine Ausgabe zurück. Ein KI-Agent ist ein System, in dem das Modell in einer Schleife arbeitet — Kontext wahrnehmen, entscheiden, was zu tun ist, handeln (oft mit Werkzeugen), das Ergebnis beobachten und dann wiederholen — bis die Aufgabe abgeschlossen ist. Das Modell beantwortet nicht nur; es trifft sequentielle Entscheidungen und ergreift Maßnahmen. Agenten können das Web durchsuchen, Code ausführen, Datenbanken abfragen, Dateien schreiben und APIs aufrufen, je nach verfügbaren Werkzeugen.",
          analogy: "Ein einzelner Modellaufruf ist wie jemandem eine Frage zu stellen und eine Antwort zu erhalten. Ein Agent ist wie jemandem eine Aufgabe zuzuweisen und ihm die Autorität zu geben, alle notwendigen Schritte zu unternehmen — Quellen prüfen, entwerfen, überarbeiten, verifizieren — bis die Arbeit abgeschlossen ist. Der Unterschied ist zwischen einem Berater, der Ihre Frage beantwortet, und einem, der das Projekt verwaltet.",
          implication: "Agenten ermöglichen die Automatisierung mehrstufiger Workflows, die zuvor bei jedem Schritt konstante menschliche Intervention erforderten. Sie führen auch neue Fehlermodi ein — eine falsche Entscheidung in Schritt zwei kann sich ohne menschliche Überprüfung durch nachfolgende Schritte fortpflanzen. Das Protokolldesign für Agenten erfordert explizites Nachdenken über Fehlerbehandlung, Entscheidungsgrenzen und wann menschliche Überprüfung erzwungen werden muss."
        }
      },
      {
        id: "a-2",
        title: "Tool-Nutzung und Funktionsaufruf",
        preview: "Was es in der Praxis bedeutet, dass ein Modell externe Werkzeuge verwendet.",
        content: {
          explanation: "Tool-Nutzung — auch Funktionsaufruf genannt — gibt einem Modell Zugang zu vordefinierten externen Fähigkeiten: das Web durchsuchen, Code ausführen, eine Datenbank abfragen, eine Datei lesen, eine Nachricht senden, eine API aufrufen. Das Modell entscheidet, wann es ein Werkzeug verwendet, welche Parameter es übergibt und wie es das Ergebnis in seine Antwort einbezieht. Die Werkzeuge selbst werden vom Systementwickler definiert und kontrolliert, nicht vom Modell.",
          analogy: "Tool-Nutzung verwandelt ein Modell von jemandem, der nur spricht, in jemanden, der auch Dinge tun kann. Einem Modell ein Suchwerkzeug zu geben, ist wie einem Forscher Internetzugang zu geben. Ihm ein Code-Ausführungswerkzeug zu geben, ist wie einem Analysten einen Taschenrechner zu geben. Das Modell entscheidet, wann und wie diese Werkzeuge verwendet werden — aber die Werkzeuge selbst sind das, was Sie genehmigt und verfügbar gemacht haben.",
          implication: "Zu verstehen, auf welche Werkzeuge ein Modell Zugang hat, ist wesentlich für das Design sicherer und effektiver agentischer Workflows. Jedes Werkzeug repräsentiert eine Fähigkeit und einen potenziellen Fehlermodus. Das Werkzeugdesign — welche Aktionen zuzulassen sind, welche Parameter freizugeben sind, welche Absicherungen einzubauen sind — ist der Ort, an dem die Sicherheit von KI-Workflows primär verwaltet wird."
        }
      },
      {
        id: "a-3",
        title: "RAG — Retrieval-Augmented Generation",
        preview: "Das Kernkonzept und warum es Geschäftsanwendungen transformiert.",
        content: {
          explanation: "RAG verbindet das Modell zur Abfragezeit mit einer externen Wissensbasis. Wenn eine Anfrage eingeht, werden relevante Dokumente aus einer Datenbank abgerufen (mittels semantischer Suche) und neben der Frage in den Kontext des Modells übergeben. Das Modell generiert dann eine Antwort, die in diesen spezifischen Dokumenten verankert ist — anstatt sich auf seine Trainingsdaten zu stützen. Dies adressiert gleichzeitig zwei grundlegende Einschränkungen: Wissens-Abschneidezeitpunkte und Halluzination bei domänenspezifischen Fakten.",
          analogy: "RAG ist wie einem Mitarbeiter ein gut organisiertes Ablagesystem zu geben und ihm anzuweisen, relevante Dokumente nachzuschlagen, bevor er Fragen zu Unternehmensrichtlinien oder Kundenhistorie beantwortet. Anstatt sich auf das Gedächtnis zu verlassen, überprüft er immer die Quelle. Die Qualität der Antwort hängt von der Qualität des Ablagesystems ab — aber die Antworten sind in den tatsächlichen Dokumenten verankert.",
          implication: "RAG ist die Standardarchitektur für jede KI-Geschäftsanwendung, die Genauigkeit bei internen oder domänenspezifischen Informationen erfordert. Wenn Sie Protokolle für wissensintensive Workflows erstellen — HR, Compliance, Kundenverwaltung, interne Dokumentation — ist RAG die Architekturschicht, die es zuverlässig macht. Sie müssen es nicht selbst erstellen, um zu verstehen, warum es für die Systeme wichtig ist, die Sie darum herum entwerfen."
        }
      },
      {
        id: "a-4",
        title: "Speichertypen",
        preview: "Im Kontext, extern, prozedural — eine grundlegende Taxonomie.",
        content: {
          explanation: "KI-Systeme haben drei Kategorien von Speicher. Im-Kontext-Speicher ist das aktuelle Gesprächsfenster — vorübergehend, sichtbar und verloren, wenn die Sitzung endet. Externer Speicher ist eine persistente Datenbank, die bei Bedarf abgerufen werden kann — Dokumente, vergangene Interaktionen, strukturierte Daten. Prozeduraler Speicher ist Verhalten, das in den Gewichtungen des Modells durch Training kodiert ist — er kann ohne erneutes Training nicht aktualisiert werden. Die meisten aktuellen Anwendungen kombinieren Im-Kontext- und externen Speicher; prozeduraler Speicher ist das, was das Modell 'standardmäßig weiß'.",
          analogy: "Im-Kontext-Speicher ist, was Sie während eines Meetings im Kopf halten. Externer Speicher ist Ihr Aktenschrank und Ihre Notizen — abrufbar, persistent, durchsuchbar. Prozeduraler Speicher ist das Fachwissen, das Sie über Jahre aufgebaut haben — so tief verankert, dass es nicht bewusst abgerufen, sondern einfach ausgedrückt wird. Das Meeting endet und was in Ihrem Kopf war, ist weg; der Aktenschrank bleibt; Ihr Fachwissen bleibt.",
          implication: "Beim Entwerfen von KI-Workflows entscheiden Sie explizit, wo Informationen gespeichert werden sollen. Stabile Referenzinhalte gehören in externen Speicher (eine Wissensbasis). Aufgabenspezifischer Kontext gehört in den Kontext. Modellstandards können manchmal durch Fine-Tuning beeinflusst werden, das den prozeduralen Speicher verändert. Die meisten Protokolle arbeiten primär mit Im-Kontext- und externem Speicher."
        }
      },
      {
        id: "a-5",
        title: "MCP — Model Context Protocol",
        preview: "Was es ist und warum es zum Standard für die Tool-Integration wird.",
        content: {
          explanation: "Das Model Context Protocol (MCP) ist ein offener Standard, der im November 2024 von Anthropic eingeführt und mittlerweile von OpenAI, Google und Microsoft übernommen wurde. Es standardisiert, wie KI-Modelle sich mit externen Tools und Datenquellen verbinden. Vor MCP erforderte jede Integration benutzerdefinierten Code — einen Connector für jedes Tool und jedes Modell. MCP definiert ein gemeinsames Protokoll, sodass jedes MCP-kompatible Tool sich mit jedem MCP-kompatiblen Modell verbinden kann. Bis Anfang 2026 existieren Tausende von MCP-Servern. Die Verwaltung wurde im Dezember 2025 an die Linux Foundation übertragen.",
          analogy: "MCP ist der USB-Standard für KI. Vor USB benötigte jedes Peripheriegerät seinen eigenen proprietären Connector — kostspielig, fragil und inkompatibel zwischen Geräten. USB schuf eine universelle Schnittstelle, sodass jedes Gerät an jeden Computer angeschlossen werden kann. MCP macht dasselbe für die KI-Tool-Integration.",
          implication: "MCP wird schnell zu Infrastruktur. Sie müssen keine MCP-Server erstellen, um zu verstehen, warum es wichtig ist. Zu wissen, was MCP ist, ermöglicht es Ihnen, präzise mit technischen Mitarbeitern über Integrationskosten und -optionen zu sprechen und zu beurteilen, ob eine vorgeschlagene KI-Implementierung auf Standardinfrastruktur aufbaut oder auf einem fragilen, teuer zu wartenden Connector."
        }
      }
    ]
  },
  {
    id: "limits",
    icon: "⚠️",
    label: "Grenzen & Fehler",
    color: "#dc2626",
    light: "#fef2f2",
    subtopics: [
      {
        id: "l-1",
        title: "Halluzination: Typen und Ursachen",
        preview: "Entwerfen Sie Prompts, die sie reduzieren — nicht nur erkennen.",
        content: {
          explanation: "Halluzination umfasst mehrere verschiedene Fehlertypen: Sachmängel (falsche Daten, Namen, Statistiken), erfundene Zitate (echtklingende, aber nicht existierende Quellen), logische Inkonsistenzen innerhalb einer Antwort und selbstsichere Ausarbeitung über das hinaus, was das Quellmaterial stützt. Alle stammen aus derselben Ursache: Das Modell generiert den statistisch plausibelsten Text, unabhängig davon, ob es ein zuverlässiges Trainingssignal für die spezifische Behauptung hat. Es gibt keinen internen Mechanismus, der 'Ich weiß das' von 'Das klingt richtig' unterscheidet.",
          analogy: "Ein hochkonfidenter Kollege, der gelernt hat, dass autoritativ klingende Antworten gut ankommen. Er produziert flüssige, selbstsichere Antworten, egal ob er wirkliches Wissen dahinter hat. In seiner Lieferung gibt es nichts, das den Unterschied signalisiert. Die einzige Möglichkeit zu wissen ist, die zugrunde liegenden Fakten zu überprüfen.",
          implication: "Drei praktische Designantworten: (1) Antworten in bereitgestelltem Quellmaterial verankern — das Dokument übergeben und das Modell anweisen, daraus zu antworten. (2) Zitate verlangen — ein Modell, das eine bestimmte Quelle zitieren muss, ist einfacher zu überprüfen als eines, das nackte Schlussfolgerungen gibt. (3) Jede spezifische Behauptung (Statistiken, Namen, Daten, Zitate) als unabhängige Überprüfung bedürftig behandeln, bevor sie in einer folgenreichen Ausgabe erscheint."
        }
      },
      {
        id: "l-2",
        title: "Kontextverschiebung in langen Gesprächen",
        preview: "Warum frühere Anweisungen nachlassen und wie man kompensiert.",
        content: {
          explanation: "Wenn ein Gespräch länger wird, verteilt die Aufmerksamkeit des Modells sich über ein zunehmend großes Fenster. Frühere Anweisungen, Einschränkungen und Kontext verschwinden nicht — aber sie erhalten weniger effektives Gewicht relativ zu aktuellem Inhalt. In einem sehr langen Gespräch kann das Modell subtil von am Anfang festgelegten Einschränkungen abdriften: Formatanforderungen lockern, spezifische Regeln vergessen oder den Ton verschieben. Dies ist nicht das Modell, das Anweisungen ignoriert — es ist die mathematische Konsequenz der Aufmerksamkeitsverdünnung über einen langen Kontext.",
          analogy: "Wie ein langes Projektmeeting, bei dem das ursprüngliche Briefing zunehmend von der Diskussion überlagert wird. Die endgültigen Entscheidungen ähneln möglicherweise kaum dem, was zu Beginn festgelegt wurde — nicht weil jemand das Briefing absichtlich aufgegeben hat, sondern weil es in Bedeutung relativ zu dem, was zuletzt gesagt wurde, verblasst ist.",
          implication: "Für lange Workflows wiederholen Sie die wichtigsten Einschränkungen regelmäßig im Gespräch. Platzieren Sie kritische, stabile Regeln in System-Prompts — System-Prompts haben strukturelle Persistenz. Für sehr lange Aufgaben sollten Sie in Betracht ziehen, sie in kürzere, fokussierte Austausche aufzuteilen, die den Kontext zurücksetzen, anstatt ihn unbegrenzt anzusammeln."
        }
      },
      {
        id: "l-3",
        title: "Sychophantie",
        preview: "Warum Modelle dazu neigen, zuzustimmen, und wie man es im Protokolldesign entgegenwirkt.",
        content: {
          explanation: "Modelle neigen dazu, Benutzern zuzustimmen, ihre Annahmen zu bestätigen und Konfrontationen zu vermeiden. Dies ist keine bewusste Designentscheidung — es ist eine Folge des Trainings auf menschlichem Feedback, bei dem Zustimmung oft positiver bewertet wurde als Widerspruch. Das praktische Ergebnis: Wenn Sie eine korrekte Antwort des Modells in Frage stellen, wird es häufig seine Position an Ihre Präferenz anpassen, auch wenn Sie falsch liegen. Selbstsichere Benutzerannahmen werden als implizite Korrekturen behandelt.",
          analogy: "Ein übermäßig eifriger Assistent, der gelernt hat, dass 'Ja' weniger Reibung erzeugt als 'Nein'. Er sagt bei allem 'tolle Idee!' — nicht aus Unehrlichkeit, sondern weil Zustimmung immer belohnt wurde. Die Gefahr liegt nicht darin, dass er Sie täuscht; es ist, dass er Ihre Fehler bestätigt, anstatt sie zu erkennen.",
          implication: "Behandeln Sie die Zustimmung eines Modells niemals als Bestätigung Ihrer Argumentation. Bitten Sie es explizit, Gegenargumente zu stärken, Schwächen in Ihrer Analyse zu identifizieren, den Advocatus Diaboli zu spielen. Entwerfen Sie Protokolle, die Kritik als separaten, expliziten Schritt verlangen. Für wichtige Entscheidungen verwenden Sie einen separaten Prompt, der speziell dazu designed wurde, die erste Ausgabe in Frage zu stellen."
        }
      },
      {
        id: "l-4",
        title: "Wissens-Abschneidezeitpunkte",
        preview: "Operative Implikationen für zeitkritische Workflows.",
        content: {
          explanation: "Jedes Modell wird auf Daten bis zu einem bestimmten Datum trainiert — seinem Wissens-Abschneidezeitpunkt. Ereignisse, Veröffentlichungen, Preisänderungen, regulatorische Aktualisierungen und neue Informationen nach diesem Datum fehlen einfach in den Gewichtungen des Modells. Das Modell kann nicht ableiten, was sich geändert hat; es operiert mit der Welt, wie sie zur Trainingszeit war. Für Claude Sonnet 4.6 ist der Wissens-Abschneidezeitpunkt Mai 2025. Dies ist eine strukturelle Einschränkung, kein zu umgehender Fehlermodus.",
          analogy: "Arbeiten mit einem brillanten Kollegen, der sich seit dem Trainingsabschneidezeitpunkt auf einer abgelegenen Forschungsexpedition befunden hat. Alles, was er von vorher weiß, ist gut integriert und zuverlässig. Alles, was sich seit seiner Abreise geändert hat — das weiß er einfach nicht, und er merkt möglicherweise nicht, dass er es nicht weiß.",
          implication: "Für jeden Workflow, der aktuelle Ereignisse, jüngste regulatorische Änderungen, aktuelle Preise, Marktdaten oder schnell sich ändernde technische Informationen beinhaltet — verlassen Sie sich nicht auf das Trainingswissen des Modells. Stellen Sie aktuelle Informationen explizit im Prompt bereit, verwenden Sie ein Modell mit Web-Such-Tool-Zugang oder implementieren Sie ein RAG-System. Überprüfen Sie immer zeitkritische Behauptungen."
        }
      },
      {
        id: "l-5",
        title: "Überabhängigkeitsmuster",
        preview: "Wenn KI-Unterstützung Fragilität statt Resilienz erzeugt.",
        content: {
          explanation: "Überabhängigkeit tritt auf, wenn KI-Unterstützung zum Standard wird statt zu einem Werkzeug — wenn kritisches Denken verkümmert, weil die KI immer da ist, um es zu kompensieren. Teams, die Entscheidungen durch KI leiten, ohne das menschliche Urteil zu erhalten, schaffen Fragilität: Das System funktioniert, bis die KI falsch liegt und niemand es bemerkt. Das Risiko liegt nicht darin, dass die KI versagt — sondern darin, dass der Fehler unentdeckt bleibt, weil die Menschen aufgehört haben, unabhängig zu verifizieren.",
          analogy: "GPS-Navigation ist praktisch, bis es Sie in einen Fluss leitet — und Sie folgen ihm, weil Sie aufgehört haben, Ihrer eigenen räumlichen Denkfähigkeit zu vertrauen. Das Werkzeug hat die Fähigkeit nach und nach ersetzt, und die Fähigkeit ist still verkümmert. Der Fehlermodus ist nicht das falsche GPS; es ist der Fahrer, der die unabhängige Fähigkeit verloren hat, dies zu erkennen.",
          implication: "Protokolle sollten explizit angeben, wann menschliche Überprüfung obligatorisch ist — nicht optional. KI-generierte Ausgaben, die folgenreiche Entscheidungen beeinflussen, sollten eine dokumentierte menschliche Abzeichnung erfordern. Beim Erstellen von KI-Workflows für Teams überprüfen Sie regelmäßig, ob die Menschen in der Schleife die Ausgaben wirklich überprüfen oder sie lediglich als Formalität genehmigen."
        }
      }
    ]
  },
  {
    id: "protocols",
    icon: "🛠️",
    label: "Protokoll-Engineering",
    color: "#7c3aed",
    light: "#f5f3ff",
    subtopics: [
      {
        id: "pr-1",
        title: "Prompt vs. Protokoll",
        preview: "Ein Prompt ist eine Eingabe. Ein Protokoll ist ein wiederverwendbares System. Der Unterschied ist alles.",
        content: {
          explanation: "Ein Prompt ist eine einzelne Eingabe an ein Modell — er funktioniert einmal, für eine Person, in einem Kontext. Ein Protokoll ist ein dokumentiertes, versioniertes, wiederholbares System, das um einen Prompt herum aufgebaut ist: Es enthält eine Zweckbeschreibung, den vollständigen Prompt-Text, kontextgebende Anweisungen, Beispiele für gute und schlechte Ausgaben, Regeln zur Fehlerbehandlung und ein Änderungsprotokoll. Ein Protokoll ist darauf ausgelegt, über Verwendungen, Benutzer und Variationen in der Eingabe hinweg konsistente Ergebnisse zu liefern — ohne dass der Autor anwesend sein muss.",
          analogy: "Ein Prompt ist eine mündliche Anweisung an einen Kollegen. Ein Protokoll ist ein Verfahren in einem Prozesshandbuch — geschrieben, um zuverlässig zu funktionieren, auch wenn die Person, die es geschrieben hat, nicht im Raum ist, auch wenn es von jemandem ausgeführt wird, der die Aufgabe noch nie gesehen hat. Das Handbuch kodiert das Wissen, sodass es nicht mehr in einem Kopf gesperrt ist.",
          implication: "Der Wandel vom Prompting zum Protokolldesign ist der Wandel von persönlicher Produktivität zu operativer Infrastruktur. Wenn die Ausgabequalität eines KI-Workflows davon abhängt, wer ihn ausführt oder wie er an einem bestimmten Tag formuliert, ist es ein promptbasiertes System. Wenn es unabhängig davon konsistent funktioniert, ist es ein Protokoll. Diese Unterscheidung ist die grundlegende Fähigkeit der Skill-Engineer-Rolle."
        }
      },
      {
        id: "pr-2",
        title: "Was ein Protokoll robust macht",
        preview: "Spezifität, Beispiele, Fehlerbehandlung, Versionsnotizen.",
        content: {
          explanation: "Ein robustes Protokoll enthält sechs Elemente: (1) eine klare Zweckbeschreibung — wofür das Protokoll ist und wann es zu verwenden ist; (2) vollständigen System-Prompt-Text; (3) explizite Ausgabeformat-Spezifikation; (4) Beispiele für gute Ausgaben und mindestens ein Beispiel für eine inakzeptable Ausgabe; (5) Fehlerbehandlungsanweisungen — was zu tun ist, wenn das Modell Randfall-Ausgaben produziert; (6) Versionsnotizen — was geändert wurde und warum. Robustheit bedeutet, dass das Protokoll konsistent funktioniert, auch bei Variation in Eingaben, für die es nicht speziell entworfen wurde.",
          analogy: "Ein gut gestalteter Prozess funktioniert, auch wenn ihn ein neuer Mitarbeiter zum ersten Mal ausführt, ohne Hilfe anfordern zu müssen. Die Dokumentation macht das Wissen übertragbar. Das Maß an Robustheit ist nicht 'funktioniert es, wenn ich es ausführe' — es ist 'funktioniert es, wenn jemand anderes es auf einer Eingabe ausführt, die ich nicht vorhergesehen hatte'.",
          implication: "Testen Sie jedes Protokoll mit Eingaben, für die es nicht entworfen wurde. Randfälle offenbaren Zerbrechlichkeit. Die Fehlermodi, die Sie beim Testen entdecken, sind die wertvollsten Informationen, die der Protokollentwicklungsprozess produziert — dokumentieren Sie sie und fügen Sie Behandlung für sie hinzu. Ein Protokoll ist nur so robust wie der schwerste Testfall, den es überlebt hat."
        }
      },
      {
        id: "pr-3",
        title: "Prompts evaluieren und testen",
        preview: "Wie man weiß, ob ein Protokoll tatsächlich funktioniert.",
        content: {
          explanation: "Die Prompt-Evaluierung beinhaltet das Ausführen eines Protokolls gegen einen definierten Satz von Testfällen — repräsentative Eingaben — und das Bewerten der Ausgaben gegen explizite Kriterien. Ohne Evaluierung können Sie nicht wissen, ob ein Protokoll zuverlässig funktioniert, im Laufe der Zeit nachlässt oder subtil falsche Ausgaben produziert, die unbemerkt bleiben. Evaluierung ist auch notwendig, wenn Sie eine Modellversion ändern, einen Prompt aktualisieren oder den Kontext ändern — derselbe Prompt kann sich auf einem neuen Modell anders verhalten.",
          analogy: "Qualitätskontrolle in einem Produktionsprozess. Sie lassen die Produktionslinie nicht einfach laufen und hoffen. Sie nehmen Ausgaben, messen sie gegen eine Spezifikation und verfolgen Ausfälle bis zu ihrer Ursache zurück. Die Spezifikation muss geschrieben werden, bevor Sie dagegen messen können — was bedeutet, zu definieren, wie 'korrekt' aussieht, bevor Sie testen.",
          implication: "Beim Erstellen eines Protokolls erstellen Sie gleichzeitig einen kleinen Testsatz: 5–10 repräsentative Eingaben, die den Bereich der Fälle abdecken, einschließlich ein oder zwei Randfälle. Definieren Sie, wie eine gute Ausgabe für jeden aussieht. Führen Sie diesen Testsatz vor der Bereitstellung und immer dann aus, wenn Sie das Protokoll oder das Modell ändern. Dies ist Ihre Grundlage zur Erkennung von Regression."
        }
      },
      {
        id: "pr-4",
        title: "Prompt-Bibliotheken und Wissensmanagement",
        preview: "Wie Teams KI-Fähigkeiten im Maßstab operationalisieren.",
        content: {
          explanation: "Eine Prompt-Bibliothek ist eine organisierte, versionierte Sammlung getesteter Protokolle — nach Anwendungsfall durchsuchbar, mit Dokumentation von Zweck, Leistungsnotizen, Eigentümerschaft und Änderungshistorie. Sie transformiert KI-Fähigkeiten von informellem individuellem Wissen in ein gemeinsames Team-Asset. Teams mit gut gepflegten Prompt-Bibliotheken können neue Mitglieder schnell in KI-gestützte Workflows einarbeiten, Qualitätsstandards aufrechterhalten und Protokolle systematisch verbessern.",
          analogy: "Ein Standard-Verfahrenshandbuch oder ein Code-Repository. Das kollektive Wissen ist aufgeschrieben, für das gesamte Team zugänglich, versionskontrolliert und verbesserbar. Vergleichen Sie dies mit einer Situation, in der jede Person ihre eigenen ad-hoc-Prompts informell gespeichert hat — die Fähigkeit des Teams ist nur so stark wie das Individuum, und sie verschwindet, wenn es geht.",
          implication: "Selbst als einzelner Praktiker ist das Pflegen einer persönlichen Protokollbibliothek mit Versionsnotizen die grundlegende Praxis professioneller KI-Operationen. Es ist auch das primäre Portfolio-Artefakt für einen Skill Engineer — eine gut dokumentierte Bibliothek funktionierender, getesteter Protokolle demonstriert Fähigkeit glaubwürdiger als jede Zertifizierung."
        }
      },
      {
        id: "pr-5",
        title: "Die Skill-Engineer-Rollenlandschaft",
        preview: "Wo diese Praxis im entstehenden Berufsfeld steht.",
        content: {
          explanation: "Die Skill-Engineer-Rolle steht zwischen 'KI-Benutzer' und 'KI-Entwickler'. Sie beinhaltet das Entwerfen, Testen, Dokumentieren und Pflegen der Prompt-Systeme, auf die Organisationen sich stützen — ohne Software-Engineering- oder ML-Expertise zu erfordern. Die Rolle entsteht als eigenständige Funktion in KI-fortschrittlichen Organisationen, weil die Personen, die am besten positioniert sind, effektive KI-Protokolle zu entwerfen, nicht immer Entwickler sind — sie sind operative Generalisten mit tiefem Prozesswissen, starken Kommunikationsfähigkeiten und der Disziplin zu dokumentieren und zu iterieren.",
          analogy: "Der Business-Analyst, der die Lücke zwischen Geschäftsanforderungen und technischer Implementierung überbrückt. Kein Entwickler, aber unentbehrlich für die Übersetzung dessen, was das Unternehmen tatsächlich braucht, in Systemspezifikationen, die technische Teams erstellen können. Der Skill Engineer nimmt eine ähnliche Brückenposition ein — zwischen operativen Workflows und den KI-Systemen, die sie unterstützen.",
          implication: "Die Fähigkeiten, die diese Rolle definieren — strukturiertes Denken, Prozessdesign, Fehlermodus-Bewusstsein, Dokumentationsdisziplin und kritische Bewertung von Ausgaben — sind Neuformulierungen operativer Generalistenstärken, keine völlig neuen Fähigkeiten. Der Unterschied besteht darin, diese Fähigkeiten systematisch auf die KI-Protokollentwicklung anzuwenden, mit genügend konzeptuellem Verständnis, um zu verstehen, warum Modelle sich so verhalten wie sie es tun."
        }
      }
    ]
  }
];

// ─── UI STRINGS ─────────────────────────────────────────────────────────────

const ui = {
  en: {
    siteLabel: "Skill Engineer · Layer 1 Study Block",
    title: "AI Conceptual Fluency",
    subtitle: (total) => `6 topic areas · ${total} concepts · 2–4 week programme`,
    progressLabel: (done, total) => `${done} of ${total} complete`,
    allTopics: "← All topics",
    concepts: "concepts",
    suggestedSequence: "Suggested sequence",
    inProgress: "in progress",
    done: "✓ done",
    conceptsComplete: (done, total) => `${done} of ${total} concepts complete`,
    mentalModel: "Mental model",
    operationalImplication: "Operational implication",
    markComplete: "Mark complete",
    markIncomplete: "Mark incomplete",
  },
  de: {
    siteLabel: "Skill Engineer · Lernblock Ebene 1",
    title: "KI-Konzeptverständnis",
    subtitle: (total) => `6 Themenbereiche · ${total} Konzepte · 2–4 Wochen Programm`,
    progressLabel: (done, total) => `${done} von ${total} abgeschlossen`,
    allTopics: "← Alle Themen",
    concepts: "Konzepte",
    suggestedSequence: "Empfohlene Reihenfolge",
    inProgress: "in Bearbeitung",
    done: "✓ fertig",
    conceptsComplete: (done, total) => `${done} von ${total} Konzepten abgeschlossen`,
    mentalModel: "Mentales Modell",
    operationalImplication: "Praktische Auswirkung",
    markComplete: "Als abgeschlossen markieren",
    markIncomplete: "Als unvollständig markieren",
  }
};

// ─── APP ─────────────────────────────────────────────────────────────────────

const allSubtopicsEN = topicsEN.flatMap(t => t.subtopics.map(s => ({ ...s, topicId: t.id })));

export default function StudyHub() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("sf_lang") || "en"; } catch { return "en"; }
  });
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sf_completed") || "{}"); } catch { return {}; }
  });
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const topics = lang === "de" ? topicsDE : topicsEN;
  const t = ui[lang];

  const switchLang = (newLang) => {
    setLang(newLang);
    setActiveTopicId(null);
    setExpandedId(null);
    try { localStorage.setItem("sf_lang", newLang); } catch {}
  };

  const toggleComplete = (id) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    try { localStorage.setItem("sf_completed", JSON.stringify(next)); } catch {}
  };

  const totalAll = allSubtopicsEN.length;
  const totalDone = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((totalDone / totalAll) * 100);

  const activeTopic = topics.find(tp => tp.id === activeTopicId);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f8f7f4", minHeight: "100vh", color: "#1a1a1a" }}>
      {/* Header */}
      <div style={{ background: "#1a1a2e", padding: "32px 40px 28px", borderBottom: "3px solid #6366f1" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "0.15em", color: "#6366f1", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>
                {t.siteLabel}
              </div>
              <h1 style={{ margin: 0, fontSize: 28, color: "#fff", fontWeight: 400, lineHeight: 1.2 }}>
                {t.title}
              </h1>
              <p style={{ margin: "8px 0 0", color: "#9ca3af", fontSize: 14, fontFamily: "Arial, sans-serif" }}>
                {t.subtitle(totalAll)}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
              {/* Language toggle */}
              <div style={{ display: "flex", background: "#2d2d4e", borderRadius: 8, padding: 3, gap: 2 }}>
                {["en", "de"].map(l => (
                  <button
                    key={l}
                    onClick={() => switchLang(l)}
                    style={{
                      background: lang === l ? "#6366f1" : "transparent",
                      color: lang === l ? "#fff" : "#9ca3af",
                      border: "none", borderRadius: 6, padding: "5px 14px",
                      fontSize: 12, fontFamily: "Arial, sans-serif", fontWeight: 700,
                      cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase",
                      transition: "all 0.15s"
                    }}
                  >
                    {l === "en" ? "EN" : "DE"}
                  </button>
                ))}
              </div>
              {/* Progress */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 36, fontWeight: 400, color: "#fff", lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "Arial, sans-serif", marginTop: 4 }}>{t.progressLabel(totalDone, totalAll)}</div>
                <div style={{ marginTop: 8, background: "#2d2d4e", borderRadius: 4, height: 6, width: 120, overflow: "hidden" }}>
                  <div style={{ background: "#6366f1", height: "100%", width: `${pct}%`, transition: "width 0.4s ease", borderRadius: 4 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>

        {/* Navigation */}
        {activeTopicId && (
          <button onClick={() => { setActiveTopicId(null); setExpandedId(null); }} style={{
            background: "none", border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 14px",
            fontSize: 13, fontFamily: "Arial, sans-serif", cursor: "pointer", marginBottom: 24, color: "#6b7280"
          }}>
            {t.allTopics}
          </button>
        )}

        {!activeTopicId ? (
          <>
            {/* Topic Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginBottom: 40 }}>
              {topics.map(topic => {
                const done = topic.subtopics.filter(s => completed[s.id]).length;
                const topicPct = Math.round((done / topic.subtopics.length) * 100);
                return (
                  <div
                    key={topic.id}
                    onClick={() => setActiveTopicId(topic.id)}
                    style={{
                      background: "#fff", borderRadius: 12, padding: 20, cursor: "pointer",
                      border: "2px solid transparent", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      transition: "all 0.2s",
                      borderLeft: `4px solid ${topic.color}`
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"}
                  >
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{topic.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{topic.label}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "Arial, sans-serif", marginBottom: 14 }}>
                      {topic.subtopics.length} {t.concepts}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 3, height: 4, overflow: "hidden" }}>
                        <div style={{ background: topic.color, height: "100%", width: `${topicPct}%`, borderRadius: 3, transition: "width 0.4s" }} />
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "Arial, sans-serif", minWidth: 36 }}>
                        {done}/{topic.subtopics.length}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suggested sequence */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb" }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "0.12em", color: "#9ca3af", marginBottom: 16, textTransform: "uppercase", fontWeight: 600 }}>
                {t.suggestedSequence}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {topics.map((tp, i) => {
                  const done = tp.subtopics.filter(s => completed[s.id]).length;
                  return (
                    <div key={tp.id} onClick={() => setActiveTopicId(tp.id)}
                      style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "6px 0" }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%", background: done === tp.subtopics.length ? tp.color : "#f3f4f6",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontFamily: "Arial, sans-serif", fontWeight: 700,
                        color: done === tp.subtopics.length ? "#fff" : "#9ca3af", flexShrink: 0
                      }}>{i + 1}</div>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#374151" }}>{tp.label}</div>
                      {done > 0 && done < tp.subtopics.length && (
                        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: tp.color, marginLeft: "auto" }}>{t.inProgress}</div>
                      )}
                      {done === tp.subtopics.length && (
                        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: tp.color, marginLeft: "auto" }}>{t.done}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Topic Detail View */
          <div>
            <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 40 }}>{activeTopic.icon}</div>
              <div>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 400 }}>{activeTopic.label}</h2>
                <p style={{ margin: "4px 0 0", fontFamily: "Arial, sans-serif", fontSize: 13, color: "#6b7280" }}>
                  {t.conceptsComplete(activeTopic.subtopics.filter(s => completed[s.id]).length, activeTopic.subtopics.length)}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activeTopic.subtopics.map((s, idx) => {
                const isExpanded = expandedId === s.id;
                const isDone = !!completed[s.id];
                return (
                  <div key={s.id} style={{
                    background: "#fff", borderRadius: 10,
                    border: `1px solid ${isDone ? activeTopic.color + "44" : "#e5e7eb"}`,
                    overflow: "hidden", transition: "border-color 0.2s"
                  }}>
                    <div
                      onClick={() => setExpandedId(isExpanded ? null : s.id)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", cursor: "pointer" }}
                    >
                      <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: isDone ? activeTopic.color : "#f3f4f6",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, cursor: "pointer", transition: "background 0.2s"
                      }}
                        onClick={e => { e.stopPropagation(); toggleComplete(s.id); }}
                      >
                        {isDone && <span style={{ color: "#fff", fontSize: 14 }}>✓</span>}
                        {!isDone && <span style={{ color: "#d1d5db", fontSize: 12, fontFamily: "Arial" }}>{idx + 1}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, color: isDone ? "#6b7280" : "#111827", textDecoration: isDone ? "line-through" : "none" }}>
                          {s.title}
                        </div>
                        <div style={{ fontSize: 13, color: "#6b7280", fontFamily: "Arial, sans-serif", marginTop: 2 }}>
                          {s.preview}
                        </div>
                      </div>
                      <div style={{ color: "#9ca3af", fontSize: 18, transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</div>
                    </div>
                    {isExpanded && (
                      <div style={{ borderTop: `1px solid ${activeTopic.color}22`, padding: "20px 24px 24px", background: activeTopic.light }}>

                        {/* Explanation */}
                        <p style={{ margin: "0 0 16px", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#1f2937", lineHeight: 1.7 }}>
                          {s.content.explanation}
                        </p>

                        {/* Mental model */}
                        <div style={{
                          background: "#fff", borderRadius: 8, padding: "14px 16px", marginBottom: 12,
                          borderLeft: `3px solid ${activeTopic.color}`,
                          fontFamily: "Arial, sans-serif", fontSize: 13, color: "#374151", lineHeight: 1.6
                        }}>
                          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: activeTopic.color, marginBottom: 6 }}>{t.mentalModel}</div>
                          {s.content.analogy}
                        </div>

                        {/* Operational implication */}
                        <div style={{
                          background: "#fff", borderRadius: 8, padding: "14px 16px", marginBottom: 20,
                          borderLeft: `3px solid #374151`,
                          fontFamily: "Arial, sans-serif", fontSize: 13, color: "#374151", lineHeight: 1.6
                        }}>
                          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#374151", marginBottom: 6 }}>{t.operationalImplication}</div>
                          {s.content.implication}
                        </div>

                        <button
                          onClick={() => toggleComplete(s.id)}
                          style={{
                            background: isDone ? "#f3f4f6" : activeTopic.color,
                            color: isDone ? "#6b7280" : "#fff",
                            border: "none", borderRadius: 6, padding: "8px 18px",
                            fontSize: 13, fontFamily: "Arial, sans-serif", cursor: "pointer", fontWeight: 600
                          }}
                        >
                          {isDone ? t.markIncomplete : t.markComplete}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
