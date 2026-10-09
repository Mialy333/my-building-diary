import type { Locale } from "../i18n/ui";

type L = Record<Locale, string>;

export interface Term {
  term: L;
  definition: L;
  concepts?: number[];
}

export const glossary: Term[] = [
  {
    term: { fr: "ADR", en: "ADR" },
    definition: {
      fr: "Architecture Decision Record : une page qui consigne une décision technique, l'option écartée, et la mesure chiffrée qui la ferait changer.",
      en: "Architecture Decision Record: a page that records a technical decision, the option set aside, and the numeric measurement that would change it.",
    },
  },
  {
    term: { fr: "Agent", en: "Agent" },
    definition: {
      fr: "Un programme qui utilise un modèle de langage pour décider quoi faire (chercher, appeler un outil, répondre, refuser), en boucle, avec des règles d'arrêt.",
      en: "A program that uses a language model to decide what to do (search, call a tool, answer, refuse), in a loop, with stopping rules.",
    },
    concepts: [2],
  },
  {
    term: { fr: "Appel d'outil", en: "Tool call" },
    definition: {
      fr: "La demande du modèle d'exécuter un outil avec des arguments précis. C'est lui qu'on lit dans la trace, pas la réponse finale.",
      en: "The model's request to run a tool with specific arguments. That's what you read in the trace, not the final answer.",
    },
    concepts: [3, 8],
  },
  {
    term: { fr: "Base de connaissances", en: "Knowledge base" },
    definition: {
      fr: "Un ensemble de documents découpés et indexés que l'agent interroge avant de répondre. Une base non synchronisée renvoie du vide, sans erreur.",
      en: "A set of documents, split and indexed, that the agent queries before answering. An unsynced base returns nothing, with no error.",
    },
    concepts: [7],
  },
  {
    term: { fr: "Boucle d'agent", en: "Agent loop" },
    definition: {
      fr: "Le cycle message → modèle → appel d'outil → résultat → modèle, répété jusqu'à une réponse ou une sortie prévue.",
      en: "The cycle message → model → tool call → result → model, repeated until an answer or a planned exit.",
    },
    concepts: [2],
  },
  {
    term: { fr: "Budget", en: "Budget" },
    definition: {
      fr: "Le nombre maximal d'appels qu'une boucle d'agent peut faire, vérifié avant chaque appel, jamais après.",
      en: "The maximum number of calls an agent loop may make, checked before each call, never after.",
    },
    concepts: [2],
  },
  {
    term: { fr: "Chunk (passage)", en: "Chunk (passage)" },
    definition: {
      fr: "Un morceau de document que la récupération peut renvoyer. Un passage trop court peut perdre la phrase qui répond.",
      en: "A piece of a document that retrieval can return. A passage that's too short can lose the sentence that answers.",
    },
    concepts: [7],
  },
  {
    term: { fr: "Citation", en: "Citation" },
    definition: {
      fr: "L'identifiant du document qui soutient une réponse. Une citation juste ne prouve pas que la phrase vient du document.",
      en: "The ID of the document that supports an answer. A correct citation doesn't prove the sentence comes from the document.",
    },
    concepts: [5, 9],
  },
  {
    term: { fr: "Cold start", en: "Cold start" },
    definition: {
      fr: "La lenteur du premier appel à un service qui vient de démarrer. On la mesure : c'est un nombre, pas un verdict de panne.",
      en: "The slowness of the first call to a service that just started. You measure it: it's a number, not a failure verdict.",
    },
  },
  {
    term: { fr: "Corpus", en: "Corpus" },
    definition: {
      fr: "L'ensemble des documents sur lesquels l'agent a le droit de s'appuyer.",
      en: "The set of documents the agent is allowed to rely on.",
    },
    concepts: [7],
  },
  {
    term: { fr: "Diff", en: "Diff" },
    definition: {
      fr: "La liste exacte des lignes ajoutées et supprimées dans un fichier. C'est lui qui fait foi, pas ce que l'assistant annonce.",
      en: "The exact list of lines added and removed in a file. It's what counts, not what the assistant announces.",
    },
    concepts: [1],
  },
  {
    term: { fr: "Échec silencieux", en: "Silent failure" },
    definition: {
      fr: "Une erreur qui ressemble à une réponse normale, comme « aucun résultat » alors qu'il y en a. Le pire type d'erreur.",
      en: "An error that looks like a normal answer, like \"no results\" when there are some. The worst kind of error.",
    },
    concepts: [6],
  },
  {
    term: { fr: "Faux modèle", en: "Fake model" },
    definition: {
      fr: "Un modèle déterministe aux réponses prévues. Il teste le circuit, pas le jugement : un test vert sur lui prouve la tuyauterie.",
      en: "A deterministic model with scripted answers. It tests the circuit, not the judgment: a green test on it proves the plumbing.",
    },
    concepts: [9],
  },
  {
    term: { fr: "Garde d'URL", en: "URL guard" },
    definition: {
      fr: "Un contrôle qui décide, sur la seule chaîne de caractères et avant toute requête, si une adresse est autorisée : protocole, adresse publique, domaine permis.",
      en: "A check that decides, on the string alone and before any request, whether an address is allowed: protocol, public address, permitted domain.",
    },
    concepts: [3],
  },
  {
    term: { fr: "Golden set", en: "Golden set" },
    definition: {
      fr: "Un petit jeu de questions de référence, chacune étiquetée avec le comportement attendu : répondre, citer, ou refuser.",
      en: "A small set of reference questions, each labeled with the expected behavior: answer, cite, or refuse.",
    },
    concepts: [9],
  },
  {
    term: { fr: "Grounding (ancrage)", en: "Grounding" },
    definition: {
      fr: "Le fait qu'une réponse soit réellement soutenue par le document qu'elle cite.",
      en: "The fact that an answer is actually supported by the document it cites.",
    },
    concepts: [7, 9],
  },
  {
    term: { fr: "Guardrail", en: "Guardrail" },
    definition: {
      fr: "Un filtre appliqué aux entrées et aux sorties du modèle : contenus dangereux, données personnelles, sujets interdits. Il se teste comme du code, faux positifs compris.",
      en: "A filter applied to the model's inputs and outputs: harmful content, personal data, denied topics. It's tested like code, false positives included.",
    },
    concepts: [4],
  },
  {
    term: { fr: "Hallucination d'action", en: "Action hallucination" },
    definition: {
      fr: "L'agent affirme avoir agi sans l'avoir fait, par exemple en donnant un numéro de ticket inventé. Le texte de la réponse ne prouve rien.",
      en: "The agent claims to have acted without doing so, for example by giving an invented ticket number. The answer's text proves nothing.",
    },
    concepts: [1],
  },
  {
    term: { fr: "Harness", en: "Harness" },
    definition: {
      fr: "Tout ce qui entoure le modèle : la boucle qui le fait tourner, les instructions, les outils, les traces, les évaluations. Un harness géré fait tourner la boucle à votre place, avec moins de contrôle.",
      en: "Everything around the model: the loop that runs it, the instructions, the tools, the traces, the evaluations. A managed harness runs the loop for you, with less control.",
    },
    concepts: [2],
  },
  {
    term: { fr: "Hit rate @k", en: "Hit rate @k" },
    definition: {
      fr: "La part des questions dont le document attendu figure parmi les k premiers résultats de la recherche.",
      en: "The share of questions whose expected document is among the top k search results.",
    },
    concepts: [7],
  },
  {
    term: { fr: "Hook", en: "Hook" },
    definition: {
      fr: "Du code déclenché à un moment précis de la vie de l'agent, avant ou après un appel, pour imposer une règle que le prompt ne garantit pas.",
      en: "Code triggered at a precise moment in the agent's life, before or after a call, to enforce a rule the prompt doesn't guarantee.",
    },
    concepts: [11],
  },
  {
    term: { fr: "Idempotence", en: "Idempotence" },
    definition: {
      fr: "Relancer une action ne change pas le résultat : un retour déjà initié n'est pas initié deux fois, une ressource existante est réutilisée.",
      en: "Running an action again doesn't change the result: a return already started isn't started twice, an existing resource is reused.",
    },
    concepts: [11],
  },
  {
    term: { fr: "Injection de prompt", en: "Prompt injection" },
    definition: {
      fr: "Un ordre caché dans un texte (document, page, sortie d'outil, nom de produit) qui tente de piloter le modèle. On le traite comme une donnée, jamais comme une instruction.",
      en: "An order hidden in a text (document, page, tool output, product name) that tries to steer the model. You treat it as data, never as an instruction.",
    },
    concepts: [4],
  },
  {
    term: { fr: "Intention épinglée", en: "Pinned intent" },
    definition: {
      fr: "Ce qui a été demandé, écrit avant que l'action existe. Chaque vérification compare l'action à cette épingle, jamais à elle-même.",
      en: "What was asked, written down before the action exists. Every check compares the action to that pin, never to itself.",
    },
    concepts: [11],
  },
  {
    term: { fr: "LLM", en: "LLM" },
    definition: {
      fr: "Large Language Model : le modèle de langage qui génère du texte et choisit les outils à appeler.",
      en: "Large Language Model: the language model that generates text and chooses which tools to call.",
    },
  },
  {
    term: { fr: "LLM-as-judge", en: "LLM-as-judge" },
    definition: {
      fr: "Un modèle qui note les réponses d'un autre selon un critère. Il lit le texte, mais ne voit ni les appels d'outils ni ce qui a été écrit en base.",
      en: "A model that scores another model's answers against a criterion. It reads the text, but sees neither the tool calls nor what was written to the database.",
    },
    concepts: [9],
  },
  {
    term: { fr: "Masquage (redaction)", en: "Redaction" },
    definition: {
      fr: "Remplacer un secret (clé, token, e-mail) par une étiquette avec une empreinte avant d'écrire un log, sans supprimer le champ. Même secret, même étiquette.",
      en: "Replacing a secret (key, token, email) with a label carrying a fingerprint before writing a log, without deleting the field. Same secret, same label.",
    },
    concepts: [8],
  },
  {
    term: { fr: "MCP", en: "MCP" },
    definition: {
      fr: "Model Context Protocol : un standard pour exposer des outils et des sources de données à n'importe quel agent. Un outil MCP se découvre par son nom, sa description et son schéma.",
      en: "Model Context Protocol: a standard for exposing tools and data sources to any agent. An MCP tool is discovered by its name, description and schema.",
    },
    concepts: [3],
  },
  {
    term: { fr: "Mémoire de session", en: "Session memory" },
    definition: {
      fr: "L'historique d'une conversation, qui disparaît quand elle se termine.",
      en: "The history of one conversation, which disappears when it ends.",
    },
    concepts: [10],
  },
  {
    term: { fr: "Mémoire long terme", en: "Long-term memory" },
    definition: {
      fr: "Ce qui survit d'une session à l'autre, rangé par utilisateur : faits, préférences, résumés. Sans propriétaire ni limite, elle fuit et contamine les tests.",
      en: "What survives from one session to the next, filed per user: facts, preferences, summaries. Without an owner or a limit, it leaks and contaminates tests.",
    },
    concepts: [10],
  },
  {
    term: { fr: "Orchestrateur", en: "Orchestrator" },
    definition: {
      fr: "Dans un système multi-agents, l'agent qui ne répond jamais lui-même : il route le travail vers des agents spécialisés.",
      en: "In a multi-agent system, the agent that never answers itself: it routes the work to specialist agents.",
    },
    concepts: [2],
  },
  {
    term: { fr: "Outil borné", en: "Bounded tool" },
    definition: {
      fr: "Un outil qui valide ses arguments avant d'agir, refuse en nommant les valeurs valides, et reste en lecture seule par défaut.",
      en: "A tool that validates its arguments before acting, refuses by naming the valid values, and stays read-only by default.",
    },
    concepts: [3],
  },
  {
    term: { fr: "Parser", en: "Parser" },
    definition: {
      fr: "Le code qui lit la sortie du modèle et la rejette si elle ne respecte pas le schéma : format, champs exacts, types, bornes.",
      en: "The code that reads the model's output and rejects it if it doesn't match the schema: format, exact fields, types, bounds.",
    },
    concepts: [5],
  },
  {
    term: { fr: "Politique de rétention", en: "Retention policy" },
    definition: {
      fr: "Ce qu'une mémoire garde, pourquoi, comment le corriger, quand ça expire, et ce qu'elle refuse de garder. Écrite avant le premier enregistrement.",
      en: "What a memory keeps, why, how to correct it, when it expires, and what it refuses to keep. Written before the first record.",
    },
    concepts: [10],
  },
  {
    term: { fr: "Prompt système", en: "System prompt" },
    definition: {
      fr: "Les instructions fixes données au modèle avant toute conversation. Une règle y réduit un comportement sans l'éliminer, et un prompt trop long est moins bien suivi.",
      en: "The fixed instructions given to the model before any conversation. A rule there reduces a behavior without eliminating it, and a prompt that's too long is followed less well.",
    },
    concepts: [4, 11],
  },
  {
    term: { fr: "RAG", en: "RAG" },
    definition: {
      fr: "Retrieval-Augmented Generation : chercher des passages dans une base, puis répondre à partir d'eux, en les citant.",
      en: "Retrieval-Augmented Generation: search for passages in a base, then answer from them, citing them.",
    },
    concepts: [7],
  },
  {
    term: { fr: "Récupération (retrieval)", en: "Retrieval" },
    definition: {
      fr: "L'étape qui cherche dans le corpus les passages utiles à une question, avant d'appeler le modèle. Rien trouvé : on refuse sans appel.",
      en: "The step that searches the corpus for passages useful to a question, before calling the model. Nothing found: refuse without a call.",
    },
    concepts: [6, 7],
  },
  {
    term: { fr: "Refus", en: "Refusal" },
    definition: {
      fr: "Une réponse explicite « je ne peux pas répondre » : pas de citation, confiance nulle, relecture humaine. Un état, pas un crash.",
      en: "An explicit \"I can't answer\": no citation, zero confidence, human review. A state, not a crash.",
    },
    concepts: [6],
  },
  {
    term: { fr: "Refus excessif", en: "Over-refusal" },
    definition: {
      fr: "Refuser aussi ce à quoi l'agent aurait pu répondre. Sûr, mais moins utile ; on le mesure autant que les erreurs.",
      en: "Also refusing what the agent could have answered. Safe, but less useful; you measure it as much as errors.",
    },
    concepts: [4, 6],
  },
  {
    term: { fr: "Retry correctif", en: "Corrective retry" },
    definition: {
      fr: "Un second essai unique où l'on renvoie au modèle l'erreur de son premier essai. Au-delà, refus signalé.",
      en: "A single second attempt where the model gets back the error from its first one. Beyond that, a flagged refusal.",
    },
    concepts: [5],
  },
  {
    term: { fr: "Rollback", en: "Rollback" },
    definition: {
      fr: "Le retour à la dernière version qui marchait, décrit d'avance par une action, un nombre et une unité.",
      en: "Going back to the last version that worked, described in advance by an action, a number and a unit.",
    },
  },
  {
    term: { fr: "Schéma", en: "Schema" },
    definition: {
      fr: "La forme obligatoire d'une donnée : ses champs, leurs types, leurs bornes.",
      en: "The required shape of a piece of data: its fields, their types, their bounds.",
    },
    concepts: [5],
  },
  {
    term: { fr: "Seam (couture)", en: "Seam" },
    definition: {
      fr: "Le point de contact unique entre l'agent et n'importe quel modèle : une seule méthode, et l'on change de fournisseur sans toucher à l'agent.",
      en: "The single point of contact between the agent and any model: one method, and you switch providers without touching the agent.",
    },
  },
  {
    term: { fr: "Seau d'échec", en: "Failure bucket" },
    definition: {
      fr: "La catégorie dans laquelle on range une panne avant de la corriger : recherche, choix d'outil, consigne non suivie, format.",
      en: "The category a failure goes into before you fix it: retrieval, tool choice, instruction not followed, format.",
    },
    concepts: [8],
  },
  {
    term: { fr: "Skill", en: "Skill" },
    definition: {
      fr: "Une fiche d'instructions que l'assistant charge seulement quand la tâche correspond. Elle se juge à la différence qu'elle fait, preuve à l'appui.",
      en: "An instruction sheet the assistant loads only when the task matches. It's judged by the difference it makes, with evidence.",
    },
  },
  {
    term: { fr: "Slot filling", en: "Slot filling" },
    definition: {
      fr: "Remplir les paramètres d'un outil au fil de la conversation : garder ce qui est donné, demander un seul champ manquant à la fois, agir dès que tout est là.",
      en: "Filling a tool's parameters during the conversation: keep what's given, ask for one missing field at a time, act as soon as everything is there.",
    },
    concepts: [3],
  },
  {
    term: { fr: "Smoke test", en: "Smoke test" },
    definition: {
      fr: "Un test rapide lancé juste après un déploiement, conçu pour pouvoir dire « ce déploiement est mauvais ».",
      en: "A quick test run right after a deployment, designed to be able to say \"this deployment is bad\".",
    },
  },
  {
    term: { fr: "SSRF", en: "SSRF" },
    definition: {
      fr: "Server-Side Request Forgery : pousser un outil qui va chercher des URL à appeler une adresse interne ou privée à la place de l'attaquant.",
      en: "Server-Side Request Forgery: getting a tool that fetches URLs to call an internal or private address on the attacker's behalf.",
    },
    concepts: [3],
  },
  {
    term: { fr: "Surconfiance", en: "Overconfidence" },
    definition: {
      fr: "Une confiance affichée plus haute que ce que les sources justifient, par exemple 1.0 sur un seul document.",
      en: "A displayed confidence higher than the sources justify, for example 1.0 on a single document.",
    },
    concepts: [5],
  },
  {
    term: { fr: "Table de transitions", en: "Transition table" },
    definition: {
      fr: "La liste des couples (état, événement) autorisés et de l'état où chacun mène. Tout couple absent est refusé, et l'état ne bouge pas.",
      en: "The list of allowed (state, event) pairs and the state each one leads to. Any missing pair is refused, and the state doesn't move.",
    },
    concepts: [2],
  },
  {
    term: { fr: "Température", en: "Temperature" },
    definition: {
      fr: "Le réglage du hasard dans la génération. À 0, les réponses et les appels d'outils deviennent plus stables, sans devenir parfaits.",
      en: "The setting for randomness in generation. At 0, answers and tool calls become more stable, without becoming perfect.",
    },
  },
  {
    term: { fr: "Timeout", en: "Timeout" },
    definition: {
      fr: "Une durée maximale d'attente. Passé ce délai, on abandonne l'appel et on renvoie un refus lisible, au lieu d'attendre sans fin.",
      en: "A maximum waiting time. Past it, you abandon the call and return a readable refusal, instead of waiting forever.",
    },
    concepts: [6],
  },
  {
    term: { fr: "Trace", en: "Trace" },
    definition: {
      fr: "Le journal d'un run : chaque étape (recherche, appel au modèle, appel d'outil, décision) avec ses arguments et son résultat.",
      en: "The log of a run: every step (search, model call, tool call, decision) with its arguments and result.",
    },
    concepts: [8],
  },
  {
    term: { fr: "Verrouillage optimiste", en: "Optimistic locking" },
    definition: {
      fr: "Chaque écriture porte la version lue juste avant ; si la version a changé entre-temps, l'écriture est refusée. Deux agents ne peuvent pas s'écraser en silence.",
      en: "Every write carries the version read just before it; if the version changed in the meantime, the write is refused. Two agents can't silently overwrite each other.",
    },
    concepts: [11],
  },
];

// Anchor of a term on the glossary page, e.g. "Appel d'outil" -> "appel-d-outil".
// Used by the glossary page (id) and by the links and bubbles in the chapters.
export const termId = (entry: Term, locale: Locale) =>
  entry.term[locale]
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const letterOf = (word: string) =>
  word.normalize("NFD").replace(/[̀-ͯ]/g, "").charAt(0).toUpperCase();

export function glossaryByLetter(locale: Locale) {
  const sorted = [...glossary].sort((a, b) =>
    a.term[locale].localeCompare(b.term[locale], locale, { sensitivity: "base" }),
  );
  const groups = new Map<string, Term[]>();
  for (const entry of sorted) {
    const letter = letterOf(entry.term[locale]);
    groups.set(letter, [...(groups.get(letter) ?? []), entry]);
  }
  return [...groups.entries()].map(([letter, terms]) => ({ letter, terms }));
}
