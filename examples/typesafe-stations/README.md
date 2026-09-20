# examples/typesafe-stations

`skills/prunify/references/typesafe-stations.md` 문서의 Layer 1 (Jev-seated) 라인을
실측한 실험 스크립트. 의존성 없음 — Node ≥ 18 (전역 `fetch`)과 API 키만 있으면 됩니다.

> **pi 안에서라면 이 스크립트가 필요 없습니다** — pi-typesafe 익스텐션이 설치·활성화
> (`/typesafe enable`)돼 있으면 에이전트가 `typesafe_evaluate` 툴로 같은 판단 세트를
> 세션 안에서 직접 실행한다 (문서 §7a). 아래 스크립트는 pi 밖 스탠드얼론 경로(§7b:
> CI·리플레이 하네스)다.

```bash
export TYPESAFE_API_KEY=...
node ticket-line.mjs      # §4 worked example — 티켓 4건 × 질문 4개(1요청) → escalation bundle
node ab-translation.mjs   # §8 Split record — 번역 스테이션 후보 A/B/C (한국어/영어/하이브리드)
```

## 파일

- **`ticket-line.mjs`** — Machine(정책 평가) ← Auto-Tuned(판단 세트, 요청 1회) →
  `[B_1,1]`(escalation bundle) 구성을 그대로 실행. `jev-1.13.0` 버전 ID 고정
  (별칭 미사용, §5.1). POLICY 상수가 거버넌스 설정값(§1.3) — 예시값이므로 자체
  데이터로 재평가할 것.
- **`ab-translation.mjs`** — 직렬 번역 스테이션(𝑔̂) 후보의 Split 기록 재현 스크립트.
  첫 실행에서 결정 변경 0건, 긴급 케이스(T2)에서 번역이 route margin을 깎는 것을
  관측 → Fake 판정(§8).

## 유의

- 첫 실행 결과는 문서 §8에 기록돼 있음. n=4 수준의 샘플은 통계가 아니므로, 무인
  가동 전 §5 리플레이 세트와 한국어 임계값 평가(§7)가 선행돼야 함.
- 두 스크립트 모두 429/529 백오프 재시도 포함(docs: Handling rate limits).
