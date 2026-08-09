# pruner-arch

**[English](https://www.google.com/search?q=README_EN.md)** | **[한국어](README.md)**

> **Pruner (가지치기 설계자)** — [pi](https://www.google.com/search?q=https://github.com/earendil-works/pi-coding-agent) 코딩 에이전트를 위한 하향식 백캐스팅(backcasting) 스킬이며, **공장 라인(factory line)** 메타포를 기반으로 동작합니다.

Pruner는 실재 여부가 불확실한 ‘이상적 산물(ideal product)’을 목표로 삼는 pi 스킬입니다. 모든 요소를 다음 세 가지 유형의 스테이션으로 분해합니다:

* **기계 스테이션 (Machine station)** — 입력이 같으면 항상 같은 출력을 내는 확정적(deterministic) 공정입니다. 추론이나 학습이 없으며 완전히 자동화할 수 있습니다.
* **자동조정 스테이션 (Auto-tuned station)** — 자동으로 동작하지만 데이터 학습을 바탕으로 작동하므로 표류(drift) 가능성이 있습니다. 대체로 정확하지만 지속적인 모니터링이 필요하며, 기계 스테이션과는 명확히 구분됩니다.
* **인간 판단 스테이션 (Human-judgment station)** — 상황 파악과 맥락적 판단이 필수적인 공정입니다. 단순 규칙으로 대체할 수 없으며, 입출력 계약(I/O Contract)으로만 정의된 채 위임됩니다.

판단이 필요한 영역은 **I/O 계약만 정의된 인간 판단 스테이션**에 위임되며, 최종적으로 남는 인간 스테이션들의 집합이 곧 컨트롤 패널(Control Panel)이 됩니다. 이는 인위적으로 설계된 것이 아니라, 불필요한 공정을 깎아내며 발견(discovered)된 결과물입니다.

모순 검사 (Contradiction check)는 사양 수준에서 **구조적 구축 불가능(unbuildable-by-structure)** 상태인 요구사항을 식별합니다.

**충돌하는 요구사항**이 발견되면 '완전 자동' 혹은 '완전 수동'이라는 고정관념(껍질)을 벗겨내고, 각 측이 진정으로 원하는 본질적 가치만 남겨 반자동 라인 (semi-automated line)으로 재구성합니다:

* **자동 $\rightarrow$ 반자동**: 완전 자동화가 시스템 무결성을 위협할 경우, 인간 판단 스테이션을 중간에 삽입합니다.
* **수동 $\rightarrow$ 반자동**: 반복적인 단순 작업은 기계 스테이션으로 넘기고, 인간에게는 핵심 판단 및 책임만 남깁니다.

이 알고리즘은 더 이상 인간 스테이션을 기계 스테이션으로 줄일 수 없는 바닥점 (bottom point)에 도달할 때까지 하향식으로 재귀 수행됩니다. 살아남은 모든 스테이션은 재검토 시 동일한 판단을 요구하거나(경험적 저항), 모순으로 인해 구조적으로 직접 구축할 수 없는 상태입니다.

과정 전체에 걸쳐 층별 라인 로그 (line log)가 유지되며, 탐색 완료 후 최종 라인 리포트 (Final Line Report)를 생성합니다. 감독 지능(supervising intelligence)은 단일 트리거로 전체 하강을 승인하고 실행 후 검토 단계에서 결과를 검증합니다. 컨트롤 패널은 가짜 인간 스테이션을 삭제하면서 축소되며, 최종 결과물은 설계된 것이 아닌 **발견**된 것입니다.

## v0.9.0 — 뼈대 재구성 (공장 라인 메타포; 소형 모델 자급자족)

v0.8.x까지 이 스킬은 칸트(선험적/정련적 이상), 퍼스(경험적 검증), 헤겔(변증법) 등 철학적 개념을 빌려와 구조의 뼈대로 사용했습니다. 이러한 접근은 해당 개념을 이미 이해하고 있는 대형 언어 모델(LLM)에서는 잘 작동했지만, 배경 지식이 부족한 소형 언어 모델에서는 제대로 동작하지 않는 한계가 있었습니다.

v0.9.0에서는 어떠한 모델이든 쉽게 이해할 수 있는 **공장 라인(factory line)** 메타포를 도입하여, 외부 배경지식 없이도 스스로 작동할 수 있는 **자급자족형 언어**로 뼈대를 재설계했습니다. 정밀함은 이제 **각 원시연산(primitive)의 '연산 + 자기검사(Yes/No)'** 조합으로 보장됩니다. 모델은 지정된 연산을 수행하고 간단한 자기검사 질문에 답함으로써 외부 지식 없이도 의미를 명확히 고정할 수 있습니다. 기존의 철학적 정식은 이론적 배경을 참고하고 싶은 분들을 위해 [`skills/pruner-arch/references/philosophy.md`](https://www.google.com/search?q=skills/pruner-arch/references/philosophy.md)에 그대로 보존되어 있으나, 스킬 실행 시에는 필요하지 않습니다.

## 핵심 개념 — 공장 라인과 8가지 원시연산

전체 문제를 하나의 **공장 라인**으로 모델링합니다. 라인 위의 각 공정(스테이션)은 다음 세 가지 중 하나에 해당합니다:

* **기계 스테이션** — 동일 입력 = 동일 출력. 추론/학습이 없으며 완벽히 자동화 가능.
* **자동조정 스테이션** — 기계처럼 자동으로 실행되지만, 데이터 학습으로 인해 표류(drift)할 수 있음. 대부분 정확하나 모니터링이 필요함 (기계 스테이션과 섞이면 표류가 은폐되므로 엄격히 구분).
* **인간 판단 스테이션** — 맥락 파악과 상황적 판단 필요. 규칙으로 대체 불가능하며 I/O 계약으로만 정의됨.

**컨트롤 패널 = 살아남은 인간 판단 스테이션**이며, **인지 부하 최소화 = 인간 스테이션 수의 최소화**, **MVP = 현재 라인**을 의미합니다.

### 8가지 원시연산 (각: 한 줄 연산 + 한 줄 자기검사)

1. **이상적 산물 스케치 (Ideal-product sketch)** — 해당 층이 목표로 하는 최선의 최종 상태를 "구축 가능성 미검증"으로 표시하여 한 줄로 작성하고, "이 스케치가 구체적인 라인 공정으로 녹아드는가?"를 즉시 테스트합니다.
*자기검사*: 산물이 실제로 존재한다는 전제하에 라인 설계를 시작했는가? $\rightarrow$ 실패.
2. **모순 검사 (Contradiction check)** — 사양을 엄격하게 정의할 때 “A는 반드시 성립해야 한다”와 “A는 절대로 성립하면 안 된다”가 동시에 참이 되나요? 그렇다면 이는 단번에 만들어 배송할 수 있는 결과물이 아니라, **상시 조정하고 관리해야 할 긴장 상태**입니다. 양 극단을 한계선으로 설정하고, 그 사이에 인간 판단 스테이션을 배치합니다.
*자기검사*: 두 요구사항이 모두 '필수(must)'로 충돌하는가? $\rightarrow$ 완성품이 아닌 관리 대상 긴장임.
3. **껍질 벗기기 (Shell-stripping)** — 충돌하는 요구사항에서 '완전 자동' 또는 '완전 수동'이라는 딱딱한 형태(껍질)를 제거하고, 각 측이 실제로 원하는 **본질적 가치**만 남깁니다.
* 반복적인 단순 작업 $\rightarrow$ **기계 스테이션**
* 최종 판단 및 책임 $\rightarrow$ **인간 판단 스테이션**
(전체 자동화는 위험하므로 인간 판단 스테이션을 삽입하고, 전체 수동의 경우 단순 작업을 기계 스테이션으로 이전합니다.)
*자기검사*: 한쪽 요구사항을 완전히 배제했는가? $\rightarrow$ 실패. 양쪽의 본질 가치를 모두 보존해야 함.


4. **3분류 배분 (Three-bin sort)** — 모든 요소를 **기계 스테이션**, **자동조정 스테이션**, **인간 판단 스테이션** 중 하나로 분류합니다. 자동조정 스테이션을 기계 칸에 섞지 않습니다.
*자기검사*: 자동조정 스테이션을 기계 스테이션으로 분류했는가? $\rightarrow$ 표류 위험이 몰래 유입되므로 실패.
5. **열어-쪼개기 검사 (Open-and-split test)** — 하나의 인간 판단 스테이션을 열어 다시 세 칸으로 분해합니다.
* 기계/자동조정으로 환원되면 **가짜 인간 스테이션**입니다. 라인에서 제거하고 **대체할 기계(또는 자동조정) 스테이션의 이름을 명시**합니다.
* 다시 열어도 동일한 인간 판단을 계속 요구한다면 **진짜 인간 스테이션**입니다. 라인에 유지합니다.
*자기검사*: 가짜라고 선언하고 제거하면서 대체 스테이션 이름을 지정하지 않았는가? $\rightarrow$ 허위 삭제, 실패.


6. **바닥점 (Bottom point)** — 남은 인간 스테이션 중 기계 스테이션으로 분할할 수 있는 것이 없을 때(재오픈 시에도 동일한 판단만 반환) 바닥점에 도달한 것입니다. 이 시점에서 하강을 중단합니다.
*자기검사*: "기계화할 방법을 떠올리지 못해서" 중단했는가? $\rightarrow$ 거짓 바닥점. 실제로 열어-쪼개기를 수행해야 함.
7. **라인 로그 (Line log)** — 다음 층으로 하강하기 전, 현재 층의 **이상적 산물 스케치**, **3분류 결과**, **인간 스테이션 I/O 계약**, **열어-쪼개기 결과**를 기록합니다. 간과된 인간 스테이션이 흐름 밖으로 새어 나가는 것을 방지합니다.
*자기검사*: 이 층을 로그에 기록하지 않고 다음 층으로 하강했는가? $\rightarrow$ 흐름 누수 위험, 실패.
8. **선언 금지 규칙 (No-declaration rule)** — 세 가지 금지 사항:
① 실제로 열어-쪼개지 않고 "바닥점"이라 선언하는 것 금지 ("상상이 안 된다"는 이유 불가).
② 대체 스테이션 명시 없이 "가짜이므로 제거"라 선언하는 것 금지.
③ 이상적 산물이 실재한다는 가정하에 설계를 시작하는 것 금지 (항상 쪼개기-검사부터 시작).
*자기검사*: 시도나 대체 명칭 없이 선언된 항목이 있는가? $\rightarrow$ 전체 실패.

정본은 [`SKILL.md`](https://www.google.com/search?q=skills/pruner-arch/SKILL.md) §2를 참고하십시오.

## 하는 일 (4단계 $\rightarrow$ 바닥점까지 하강)

트리거가 발동되면 **바닥점까지 전체 하강**을 수행합니다. **라인 로그**를 유지하면서 각 인간 스테이션 내부를 깊이 우선 탐색 방식으로 탐원합니다. 각 층마다 아래 4단계를 수행합니다:

1. **이상적 산물 스케치 + 모순 검사 + 껍질 벗기기** — 현실 제약(비용·기술·시간)을 배제하고 해당 층의 이상적 산물을 한 줄로 작성합니다("구축 가능성 미검증"). 모순이 발견되면 완성형 산물이 아닌 **관리 대상 긴장**으로 취급합니다. 충돌하는 요구사항의 껍질을 벗겨 본질만 남긴 뒤, 반복 작업은 기계로, 판단은 인간으로 재구성합니다.
2. **현실 마찰 + 3분류 배분** — 이상적 산물을 현실과 충돌시켜 "현재 기계가 정확히 실행할 수 있는 것"과 "판단이 필요한 것"을 구분하고, 각각 기계 / 자동조정 / 인간 판단 스테이션으로 분류합니다(자동조정을 기계 칸에 섞지 않음).
3. **인간 스테이션 I/O + 현재 라인(MVP)** — 판단이 필요한 부분은 I/O 계약만 정의한 인간 판단 스테이션 [B]에 위임하고, 나머지는 현재 동작 가능한 가장 간결한 라인(MVP = 컨트롤 패널)으로 연결합니다.
4. **열어-쪼개기 + 로그 + 하강 또는 바닥 정지** — 각 인간 스테이션을 열어 1~3단계를 재귀적으로 적용합니다.
* 기계/자동조정으로 줄어들면 **가짜 인간 스테이션**으로 판정하여 제거하고 대체 공정명을 기록합니다.
* 동일한 판단이 계속 반환되면 **진짜 인간 스테이션**으로 유지합니다.
각 층의 결과는 **라인 로그**에 기록되며, 오픈 가능한 인간 스테이션이 더 이상 없으면 바닥점에 도달하여 하강을 종료합니다.



#### 라인 로그 항목 (방문한 층마다 생성)

```text
**Layer n — ideal-product sketch**
- Ideal product (one line): …
- Contradiction check & shell‑stripping: no clash | clash [A must: … vs A must not: …] → essence extracted → re‑built as [human station / limits]
- Reality friction: …
- Machine stations (same input = same output, no guessing; automated now): …
- Auto‑tuned stations (learned/probabilistic; mostly right but drifts, needs watching; NOT machine stations): …
- Human‑judgment stations (I/O contract each): [B_n,1] …, [B_n,2] …
- Current line (MVP / control panel): …
- Open‑and‑split result:
  - [B_n,1] → fake (removed; replaced by machine/auto‑tuned: …) | real (human station kept) | descended → layer k
  - …

```

> **종료 및 최종 산출물:** 바닥점에 도달하면 남아있는 인간 판단 스테이션들이 곧 **컨트롤 패널**이 됩니다. 이는 기계 코어( 및 선택적인 자동조정 층) 위에 구축된 최소한의 인간 판단 자리입니다. 이 패널은 처음부터 설계된 것이 아니라, 가짜 인간 스테이션을 제거하면서 **발견**된 것입니다. 전체 층에 대한 추적 기록과 함께 **최종 라인 리포트**가 발행되어 감독 지능이 실행 후 검토합니다.

#### 최종 라인 리포트 (Final Line Report)

```text
---
**[Pruner] Final Line Report — bottom at layer N**

1. Bottom reached. No remaining human station reduces to a machine station; every survivor is real — empirically (re‑opening returns the same judgment) or by contradiction (both poles limits, unbuildable). Those marked "unbuildable" by contradiction: [list: A must / A must not]; held as limits and managed. The human stations surviving under them are real empirically.

2. Discovered control panel (the practical mechanism):
   - Real human‑judgment stations (judgment & accountability seats):
     - [B_a,b] — confirmed real at layer a (same on re‑open) — I/O contract …
     - …
   - Machine core (true machine stations, accumulated across layers; same input = same output): …
   - Auto‑tuned stations (learned/probabilistic; NOT machine; drifts, needs watching): …

3. Removed fake human stations:
   - [B_c,d] — confirmed fake at layer c (reduced to machine/auto‑tuned: …)
   - …

4. Per‑layer trace: the line log above, n = 0 … N.

5. Review gate. The AI's fake/real verdicts (empirical and contradiction) are provisional. Confirm the bottom here, or re‑open any station where a machine/auto‑tuned reduction was missed, a contradiction was mis‑detected, or a human station was prematurely called fake.

Awaiting instruction:
1. Confirm the bottom and freeze the line?
2. Re‑open a specific human station and descend further?

```

## 활성 조건

`[Pruner]`, `Pruner`, `pruner`, `가지치기`, `가지치기 모드` 키워드가 입력되거나 복잡한 문제를 하향식으로 설계해 달라는 요청을 받았을 때 활성화됩니다.

## 안티패턴 (엄격 적용)

* **수사적 껍데기 금지** — "시너지", "컨버전스", "차세대", "상호보완" 등 실질적 내용 없는 표현이 등장하면 실행은 실패로 간주합니다.
* **산물 실체화 금지** — 이상적 산물(또는 인간 스테이션의 이상)이 기계 스테이션으로 변환되는지 검증 없이 실재한다고 가정하지 마십시오.
* **거짓 바닥점 금지** — 실제 열어-쪼개기 검사 없이 스테이션을 "진짜"라 선언하지 마십시오("상상이 안 된다"는 이유로 진짜가 되지 않습니다). 반대로, 대체 스테이션 이름 지정 없이 "가짜"라 선언하는 것도 금지됩니다. 바닥점은 반드시 **검증을 통해 확인**되어야 합니다.
* **모순만으로 중단 금지** — 모순 검사의 "건축 불가" 판정은 4단계 경험적 검사와 함께일 때만 유효합니다. 모순만으로 중단하는 것은 거짓 바닥점 안티패턴의 변형입니다.
* **로그 없는 하강 금지** — 하강하는 모든 층은 다음 단계로 진행하기 **전에** 반드시 라인 로그에 기록되어야 합니다.
* **방치된 인간 스테이션 금지** — 모든 인간 판단 스테이션 전후에 I/O 계약 가드레일을 두어 흐름이 비선형 자리에서 새지 않도록 합니다.

## 한 줄 요약 (쉬운 말)

공장 라인 용어는 정밀한 뼈대로 유지하되, 평범한 일상어로 설명합니다:

> *"이상적 산물 스케치에서 시작해, 충돌하는 요구사항을 본질만 남겨 반자동 라인으로 재구성하고, 반복적인 단순 작업은 전부 기계에 맡기며, 가짜 인간 스테이션을 삭제하면서 — 운영자의 인지 부하를 최소화한 가장 간결한 라인(컨트롤 패널)을 찾아 리포트한다."*

## 설치 (pi 안에서)

```bash
pi install git:github.com/sng2c/pruner-arch

```

또는 `~/.pi/agent/settings.json`에 다음과 같이 추가합니다:

```json
{
  "packages": [
    "git:github.com/sng2c/pruner-arch"
  ]
}

```

그 후 `/skill:pruner-arch`를 호출하거나 `[Pruner]`, `가지치기`를 입력해 트리거합니다.

## 패키지

```json
{
  "name": "pruner-arch",
  "version": "0.9.0",
  "pi": { "skills": ["./skills"] }
}

```

## 라이선스

MIT © sng2c