# prunify

> **Prunify (가지치기 설계자)** — [pi](https://github.com/earendil-works/pi-coding-agent) 코딩 에이전트용 하향식 백캐스팅 스킬. **공장 라인(factory line)** 메타포. (repo: `github.com/sng2c/prunify`)

Prunify는 실재 여부가 불확실한 '이상적 산물'을 목표로 삼아, 문제를 세 종류 스테이션으로 분해합니다:

- **기계(Machine)** — 동일 입력 = 동일 출력, 학습 없음. 완전 자동화.
- **자동조정(Auto-Tuned)** — 자동이나 학습 기반; 표류(drift)함. 모니터링 필요. 기계칸에 섞지 않음.
- **인간 판단(Human-Judgment)** — 맥락 판단/책임 필요. I/O 계약으로만 정의·위임.

각 인간 자리마다 **기계/자동조정 대체를 먼저 시도**하고, 가짜(대체 가능)는 지우고, 진짜(환원불가)는 남겨 **컨트롤 패널**을 발견합니다. 바닥까지 하향식 재귀 하강.

## 핵심 — 6단계 phase (do-next)

1. **Admit(1회)** — 트리거가 스킬을 켜되, 구체적 문제(시스템 한 줄 + 강한 긴장 ≥1 + 책임 질문)가 없으면 framing을 먼저 요청. framing 전엔 하강 안 함.
2. **Sketch** — 이 층의 이상 산물 한 줄(`[Buildability Unverified]`). 모순(두 must 충돌)은 '관리 대상 긴장'으로 — 양 극을 한계로 두고 그 사이 인간 자리. '완전 자동/완전 수동' 껍질 벗겨 본질.
3. **Sort** — 기계/자동조정/인간 판단으로 분류. (자동조정을 기계칸에 섞지 않음.)
4. **Seat** — 각 인간 자리 I/O 계약(Input/Output/Responsibility). 나머지를 현재 라인(MVP)으로.
5. **Split(핵심)** — 각 인간 자리마다 *보이는 로그에* 구체적 대체 후보 + 실패 이유를 쓰고: 대체 성공 → **Fake**(제거, 대체명 명시); 대체 안 되고 쪼개지면 → **하강**; 대체 안 되고 재오픈해도 같으면 → **Real**(유지). 층 로그를 쓰고 다음으로.
   - **Hard gate**: 판정(Fake/Real/Descend)마다 보이는 후보+실패이유 줄이 없으면 redo. (스킬을 무너뜨리는 1순위 단축경로.)
6. **Report(1회, 바닥에서)** — Final Line Report: 컨트롤 패널(잔존 Real + I/O), 기계 코어, 자동조정 층, 제거된 Fake(대체명). 검토 게이트에서 대기.

## 활성 조건

`[Prunify]` · `Prunify` · `prunify` · `가지치기` · `가지치기 모드` — 또는 복잡한 문제의 하향식 설계 요청 시. 단, 트리거만으로 under-specified 문제에 자동 하강하지 않고, 문제 framing이 부족하면 하강 전 framing을 먼저 요청한다.

## 설치 (pi 안에서)

```bash
pi install git:github.com/sng2c/prunify
```

또는 `~/.pi/agent/settings.json`:

```json
{
  "packages": [
    "git:github.com/sng2c/prunify"
  ]
}
```

그 후 `/skill:prunify` 호출, 또는 `[Prunify]`·`가지치기` 입력.

## 안티패턴 (요약)

- **껍데기 수사어 금지** — synergy/next-gen/seamless/hyper-automation.
- **산물 실체화 금지** — 기계 환원 검증 없이 이상 산물을 실재로 가정하지 말 것.
- **거짓 바닥점 금지** — "상상이 안 된다"로 진짜 선언 불가; 후보 대체 시도가 선행.
- **근거-only 판정 금지** — 모든 판정 앞에 보이는 후보+실패이유. (v0.9.2가 고친 1순위 실패.)
- **모순만으로 중단 금지** — 모순 판정은 경험적 open-and-split과 짝.
- **로그 없는 하강 금지** — 하강하는 모든 층은 로그 선행.

## 한 줄 요약

> "이상 산물 스케치에서 시작해, 충돌 요구를 본질만 남겨 반자동 라인으로 재구성하고, 반복 단순 작업은 전부 기계에, 가짜 인간 자리를 지워 — 인지 부하를 최소화한 가장 간결한 컨트롤 패널을 발견해 리포트한다."

## 패키지

```json
{
  "name": "prunify",
  "version": "0.9.5",
  "pi": { "skills": ["./skills"] }
}
```

## 변경이력 (condensed)

- **v0.9.5** — TypeSafe 통합 참조 추가: `references/typesafe-stations.md`(Jev 판단 = Auto-Tuned 좌석 — 정렬 규칙 3개, escalation bundle 핸드셰이크, 드리프트 감시; 라이브 문서 검증) + 실측 예제 `examples/typesafe-stations/`(첫 실행 기록, 번역 스테이션 후보 Fake 판정). SKILL.md 본문 변경 없음.
- **v0.9.4** — 스킬 이름을 **Prunify**(prune + purify/verify)로 변경. 본문을 8 원시연산 → 6단계 **do-next phase**로 재구성(v0.9.3). front-gate(Phase 1 Admit) 명시: 트리거 ≠ framing 적격, under-specified면 하강 전 framing 요청. repo·스킬 디렉터리도 `prunify`로 변경(GitHub가 이전 `pruner-arch` URL을 자동 리다이렉트).
- **v0.9.2** — 후보 시도를 템플릿 필수 필드로(Candidate → Why-fails → Verdict, 3줄). Gemma 4 31B 실측에서 근거-only 판정(1순위 단축경로)을 구조적으로 차단.
- **v0.9.1** — 중형 인스트럭트 모델(Gemma 3 27B급) 강화: worked 예시, 출력 규율, 자기검사 강화, 최종 자기감사.
- **v0.9.0** — 공장 라인 메타포로 뼈대 재구성(철학 용어 → 자급자족 언어). 원시연산 '연산+자기검사'로 정밀화.

## 라이선스

MIT © sng2c