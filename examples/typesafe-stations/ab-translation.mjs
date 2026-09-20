// A/B/C: Korean state vs English-translated state vs hybrid — does a translation
// station (serial g-hat) earn its seat in front of the judgment set? (prunify Split
// candidate for the Auto-Tuned layer; skills/prunify/references/typesafe-stations.md
// §7 caveat, §8 Split record)
const MODEL = "jev-1.13.0";

const TICKETS = [
  {
    id: "T1 · routine",
    customer: { plan: "individual", note: "standard paid subscriber" },
    ko: ["주문 A-104에 결제가 두 번 들어간 것 같아요. 중복된 금액은 환불 부탁드립니다."],
    en: ["It looks like order A-104 was charged twice. Please refund the duplicate amount."],
  },
  {
    id: "T2 · urgent + high-value",
    customer: { plan: "enterprise", note: "annual contract, named account" },
    ko: ["지금 결제 모듈 전체가 터졌습니다. 30분째 전 고객 결제가 실패하고 있어요. 당장 누군가 나와서 봐야 합니다."],
    en: ["The payment module has completely crashed right now. For the past 30 minutes every customer payment is failing. Someone needs to look at this immediately."],
  },
  {
    id: "T3 · novel/ambiguous",
    customer: { plan: "team", note: "multi-seat" },
    ko: [
      "지난주 환불 안내 메일의 링크로 들어가니 제 계정이 다른 사람 계정처럼 보입니다.",
      "그리고 제 사촌이 제 계정으로 주문한 것 같기도 하고요. 뭘 요청해야 할지 모르겠습니다.",
    ],
    en: [
      "When I follow the link in last week's refund notice email, my account looks like someone else's account.",
      "Also, my cousin may have placed an order on my account. I'm not sure what I should even request.",
    ],
  },
  {
    id: "T4 · EN control",
    customer: { plan: "team", note: "evaluating upgrade" },
    ko: null,
    en: ["Hi, quick question — do you offer annual billing discounts for the Team plan?"],
  },
];

const questions = (hybrid) => ({
  is_urgent: {
    type: "noul",
    instructions: hybrid
      ? "Do the customer messages in `ticket.messages` (English rendering: `ticket.messages_en`) convey urgency or time-sensitivity?"
      : "Do the customer messages in `ticket.messages` convey urgency or time-sensitivity?",
    criteria: {
      true: "Explicitly time-sensitive: active outage, money leaking, hard deadline now.",
      false: "No urgency expressed; can wait for a normal queue.",
    },
  },
  business_value: {
    type: "score",
    instructions: "How valuable is this customer account, given `customer` and the messages?",
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
    instructions: hybrid
      ? "Which team should handle the request in `ticket.messages` (English rendering: `ticket.messages_en`)?"
      : "Which team should handle the request in `ticket.messages`?",
    criteria: {
      billing: "Payment, invoicing, refunds, charges.",
      technical: "Bugs, outages, integration errors.",
      sales: "Pricing, upgrades, new accounts.",
      other: "None of the above fit cleanly (no-match outcome).",
    },
  },
  is_novel_or_ambiguous: {
    type: "noul",
    instructions: hybrid
      ? "Is the request in `ticket.messages` (English rendering: `ticket.messages_en`) novel or ambiguous — not mapping cleanly onto any standard category, or mixing several?"
      : "Is the request in `ticket.messages` novel or ambiguous — not mapping cleanly onto any standard category, or mixing several?",
    criteria: {
      true: "No standard category fits, several conflict, or context is insufficient to classify.",
      false: "A standard category clearly fits.",
    },
  },
});

const stateFor = (t, variant) => {
  if (variant === "A") return { ticket: { id: t.id, messages: t.ko }, customer: t.customer };
  if (variant === "B") return { ticket: { id: t.id, messages: t.en }, customer: t.customer };
  return { ticket: { id: t.id, messages: t.ko, messages_en: t.en }, customer: t.customer };
};

async function ask(t, variant) {
  const body = JSON.stringify({ state: stateFor(t, variant), model: MODEL, questions: questions(variant === "C") });
  for (let attempt = 1; ; attempt++) {
    const res = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.TYPESAFE_API_KEY}`, "Content-Type": "application/json" },
      body,
    });
    if (res.ok) return res.json();
    if ((res.status === 429 || res.status === 529) && attempt < 3) {
      await new Promise((r) => setTimeout(r, 1500 * attempt));
      continue;
    }
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
}

const row = (a) => {
  const p = Object.values(a.route.probabilities).sort((x, y) => y - x);
  return `urgent=${a.is_urgent.noul.toFixed(2)} val=${a.business_value.score.toFixed(1)} novel=${a.is_novel_or_ambiguous.noul.toFixed(2)} route=${a.route.choice}(top ${p[0].toFixed(2)}, margin ${(p[0] - p[1]).toFixed(2)}, conf ${a.route.confidence.toFixed(2)})`;
};

for (const t of TICKETS) {
  console.log(`\n== ${t.id}`);
  for (const v of ["A", "B", "C"]) {
    const state = stateFor(t, v);
    if (!state.ticket.messages) { console.log(`  ${v}: (n/a — T4 is already English)`); continue; }
    const res = await ask(t, v);
    console.log(`  ${v}: ${row(res.answers)}  [${res.usage.input_tokens}in]`);
  }
}
