 import React, { useState } from "react";

const topics = [
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

const allSubtopics = topics.flatMap(t => t.subtopics.map(s => ({ ...s, topicId: t.id })));

export default function StudyHub() {
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sf_completed") || "{}"); } catch { return {}; }
  });
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const toggleComplete = (id) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    try { localStorage.setItem("sf_completed", JSON.stringify(next)); } catch {}
  };

  const totalDone = Object.values(completed).filter(Boolean).length;
  const totalAll = allSubtopics.length;
  const pct = Math.round((totalDone / totalAll) * 100);

  const activeTopic = topics.find(t => t.id === activeTopicId);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f8f7f4", minHeight: "100vh", color: "#1a1a1a" }}>
      {/* Header */}
      <div style={{ background: "#1a1a2e", padding: "32px 40px 28px", borderBottom: "3px solid #6366f1" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "0.15em", color: "#6366f1", fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>
                Skill Engineer · Layer 1 Study Block
              </div>
              <h1 style={{ margin: 0, fontSize: 28, color: "#fff", fontWeight: 400, lineHeight: 1.2 }}>
                AI Conceptual Fluency
              </h1>
              <p style={{ margin: "8px 0 0", color: "#9ca3af", fontSize: 14, fontFamily: "Arial, sans-serif" }}>
                6 topic areas · {totalAll} concepts · 2–4 week programme
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 400, color: "#fff", lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "Arial, sans-serif", marginTop: 4 }}>{totalDone} of {totalAll} complete</div>
              <div style={{ marginTop: 8, background: "#2d2d4e", borderRadius: 4, height: 6, width: 120, overflow: "hidden" }}>
                <div style={{ background: "#6366f1", height: "100%", width: `${pct}%`, transition: "width 0.4s ease", borderRadius: 4 }} />
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
            ← All topics
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
                      {topic.subtopics.length} concepts
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

            {/* Quick overview strip */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e5e7eb" }}>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "0.12em", color: "#9ca3af", marginBottom: 16, textTransform: "uppercase", fontWeight: 600 }}>
                Suggested sequence
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {topics.map((t, i) => {
                  const done = t.subtopics.filter(s => completed[s.id]).length;
                  return (
                    <div key={t.id} onClick={() => setActiveTopicId(t.id)}
                      style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "6px 0" }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%", background: done === t.subtopics.length ? t.color : "#f3f4f6",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontFamily: "Arial, sans-serif", fontWeight: 700,
                        color: done === t.subtopics.length ? "#fff" : "#9ca3af", flexShrink: 0
                      }}>{i + 1}</div>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#374151" }}>{t.label}</div>
                      {done > 0 && done < t.subtopics.length && (
                        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: t.color, marginLeft: "auto" }}>in progress</div>
                      )}
                      {done === t.subtopics.length && (
                        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: t.color, marginLeft: "auto" }}>✓ done</div>
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
                  {activeTopic.subtopics.filter(s => completed[s.id]).length} of {activeTopic.subtopics.length} concepts complete
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
                          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: activeTopic.color, marginBottom: 6 }}>Mental model</div>
                          {s.content.analogy}
                        </div>

                        {/* Operational implication */}
                        <div style={{
                          background: "#fff", borderRadius: 8, padding: "14px 16px", marginBottom: 20,
                          borderLeft: `3px solid #374151`,
                          fontFamily: "Arial, sans-serif", fontSize: 13, color: "#374151", lineHeight: 1.6
                        }}>
                          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#374151", marginBottom: 6 }}>Operational implication</div>
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
                          {isDone ? "Mark incomplete" : "Mark complete"}
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
