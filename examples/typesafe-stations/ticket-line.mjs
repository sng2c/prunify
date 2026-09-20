// Layer 1 (Jev-seated) support-ticket line — running experiment for
// skills/prunify/references/typesafe-stations.md §4 (first run record: §8).
//
// Machine:        dedupe/SLA/drafts stubbed; escalation-policy evaluation is real (§1).
// Auto-Tuned:     judgment set — ONE request per ticket, 4 parallel questions (§3).
// Human-Judgment: [B_1,1] — modeled here as "print the escalation bundle" (§2).
//
// Drift watch: pinned versioned ID, never the alias (§5.1).
const MODEL = "jev-1.13.0";

// Governance — watched config, not machine core (§1.3).
// Values illustrative; evaluate on your own data (§5, §7 language caveat: Korean state).
const POLICY = {
  urgentFast: 0.9,        // noul: counts as "urgent"
  novelMax: 0.5,          // noul: above → out-of-distribution, escalate
  valueEscalateAbove: 3.5, // score gray band: high-consequence → human go/no-go
  routeMin: 0.9,          // choice: top-probability floor for auto-routing
  marginMin: 0.7,         // choice: top1−top2 floor (non-urgent)
  marginMinUrgent: 0.85,  // thresholds scale with risk (docs: confidence.md)
};

const state = (t) => ({ ticket: { id: t.id, messages: t.messages }, customer: t.customer });

const QUESTIONS = {
  is_urgent: {
    type: "noul",
    instructions: "Do the customer messages in `ticket.messages` convey urgency or time-sensitivity?",
    criteria: {
      true: "Explicitly time-sensitive: active outage, money leaking, hard deadline now.",
      false: "No urgency expressed; can wait for a normal queue.",
    },
  },
  business_value: {
    type: "score",
    instructions: "How valuable is this customer account, given `customer` and `ticket.messages`?",
    criteria: [
      "Individual free-tier user; no revenue attached.",
      "Standard paid individual subscription.",
      "Multi-seat team account; moderate monthly revenue.",
      "Business account with meaningful revenue.",
      "High-value account: large revenue or publicly visible brand.",
      "Strategic/enterprise account or VIP with a named relationship.",
    ],
  },
  route: {
    type: "choice",
    instructions: "Which team should handle the request in `ticket.messages`?",
    criteria: {
      billing: "Payment, invoicing, refunds, charges.",
      technical: "Bugs, outages, integration errors.",
      sales: "Pricing, upgrades, new accounts.",
      other: "None of the above fit cleanly (no-match outcome).",
    },
  },
  is_novel_or_ambiguous: {
    type: "noul",
    instructions: "Is the request in `ticket.messages` novel or ambiguous — not mapping cleanly onto any standard category, or mixing several?",
    criteria: {
      true: "No standard category fits, several conflict, or context is insufficient to classify.",
      false: "A standard category clearly fits.",
    },
  },
};

const TICKETS = [
  {
    id: "T1 · KR routine",
    customer: { plan: "individual", note: "standard paid subscriber" },
    messages: ["주문 A-104에 결제가 두 번 들어간 것 같아요. 중복된 금액은 환불 부탁드립니다."],
  },
  {
    id: "T2 · KR urgent + high-value",
    customer: { plan: "enterprise", note: "annual contract, named account" },
    messages: ["지금 결제 모듈 전체가 터졌습니다. 30분째 전 고객 결제가 실패하고 있어요. 당장 누군가 나와서 봐야 합니다."],
  },
  {
    id: "T3 · KR novel/ambiguous",
    customer: { plan: "team", note: "multi-seat" },
    messages: [
      "지난주 환불 안내 메일의 링크로 들어가니 제 계정이 다른 사람 계정처럼 보입니다.",
      "그리고 제 사촌이 제 계정으로 주문한 것 같기도 하고요. 뭘 요청해야 할지 모르겠습니다.",
    ],
  },
  {
    id: "T4 · EN control",
    customer: { plan: "team", note: "evaluating upgrade" },
    messages: ["Hi, quick question — do you offer annual billing discounts for the Team plan?"],
  },
];

async function askJudgments(t) {
  const body = JSON.stringify({ state: state(t), model: MODEL, questions: QUESTIONS });
  for (let attempt = 1; ; attempt++) {
    const res = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.TYPESAFE_API_KEY}`, "Content-Type": "application/json" },
      body,
    });
    if (res.ok) return res.json();
    if ((res.status === 429 || res.status === 529) && attempt < 3) {
      await new Promise((r) => setTimeout(r, 1500 * attempt)); // back off per docs
      continue;
    }
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
}

// Machine station: evaluate the already-decided policy (§1 rule 3).
function evaluatePolicy(a) {
  const whys = [];
  const { probabilities: p, choice } = a.route;
  const ranked = Object.entries(p).sort((x, y) => y[1] - x[1]);
  const [top, topP] = ranked[0];
  const margin = topP - (ranked[1]?.[1] ?? 0);
  const urgent = a.is_urgent.noul >= POLICY.urgentFast;

  if (a.is_novel_or_ambiguous.noul >= POLICY.novelMax)
    whys.push(`novelty noul ${a.is_novel_or_ambiguous.noul} ≥ ${POLICY.novelMax} — out-of-distribution, no labeled signal`);
  if (a.business_value.score >= POLICY.valueEscalateAbove)
    whys.push(`value score ${a.business_value.score} ≥ ${POLICY.valueEscalateAbove} — high-consequence seat`);
  if (topP < POLICY.routeMin)
    whys.push(`route top-p ${topP} < ${POLICY.routeMin}`);
  if (margin < (urgent ? POLICY.marginMinUrgent : POLICY.marginMin))
    whys.push(`route margin ${margin.toFixed(2)} < ${urgent ? POLICY.marginMinUrgent : POLICY.marginMin}${urgent ? " (urgent → stricter)" : ""}`);

  return { escalate: whys.length > 0, whys, route: choice, urgent };
}

const fmt = (a) =>
  `is_urgent=${a.is_urgent.noul}  value=${a.business_value.score} (conf ${a.business_value.confidence})  ` +
  `novel=${a.is_novel_or_ambiguous.noul}  route=${a.route.choice} (top ${Math.max(...Object.values(a.route.probabilities)).toFixed(2)}, conf ${a.route.confidence})`;

console.log(`Layer 1 (Jev-seated) — model ${MODEL} · policy ${JSON.stringify(POLICY)}\n`);
for (const t of TICKETS) {
  const res = await askJudgments(t);
  const a = res.answers;
  const verdict = evaluatePolicy(a);
  const decision = verdict.escalate
    ? `ESCALATE → [B_1,1]\n    why: ${verdict.whys.join("; ")}`
    : `AUTO-ROUTE → ${verdict.route}`;
  console.log(`${t.id}\n  answers: ${fmt(a)}\n  decision: ${decision}\n  bundle: {model: ${res.model}, tokens: ${res.usage.input_tokens}in/${res.usage.output_tokens}out}\n`);
}
