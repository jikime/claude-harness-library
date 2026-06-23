# claude-harness-library

Claude Code 전용 **하네스(harness) 라이브러리**입니다. 반복 가능한 작업을 Agent와 Skill로 묶어 둔 모음으로, 모든 하네스는 [`harness-lab`](https://github.com/) 메타 스킬로 설계·생성했습니다.

여기서 "하네스"는 하나의 일을 **언제든 같은 품질로 재현**하기 위한 역할(agents) + 절차(skills) + 산출물 골격의 묶음을 뜻합니다.

## 무엇이 들어 있나

| 하네스 | 한 줄 설명 | 위치 |
|---|---|---|
| **design-system** | 실제 웹사이트를 계측해 디자인 토큰·`DESIGN.md`를 추출(흐름 A)하고, 그 디자인 시스템 그대로 프리미엄 웹/앱 페이지를 생성(흐름 B)하는 양방향 파이프라인 | [`design-system/`](./design-system) |

> 라이브러리는 점진적으로 늘어납니다. 새 하네스도 동일하게 `harness-lab`으로 만들어 `agents/`·`skills/` 구조로 추가합니다.

## 사용 방법

각 하네스 폴더 안의 `agents/`와 `skills/`를 사용하려는 위치의 `.claude/`로 복사하면 됩니다.

**특정 프로젝트에서만 사용** — 그 프로젝트 루트에 복사:

```bash
mkdir -p .claude/agents .claude/skills
cp -R design-system/agents/* .claude/agents/
cp -R design-system/skills/* .claude/skills/
```

**모든 프로젝트에서 전역 사용** — 홈의 `~/.claude/`로 복사:

```bash
mkdir -p ~/.claude/agents ~/.claude/skills
cp -R design-system/agents/* ~/.claude/agents/
cp -R design-system/skills/* ~/.claude/skills/
```

복사 후 Claude Code를 다시 시작하면 스킬과 에이전트가 자동으로 인식됩니다. 자연어로 작업을 요청하면 해당 하네스의 오케스트레이터 스킬이 라우팅합니다(예: design-system은 `design-system-orchestrator`가 흐름 A/B를 판별).

## 구조

```
claude-harness-library/
├── README.md            ← 현재 문서
└── design-system/       ← 하네스 1
    ├── agents/          ← 역할 카드 (.claude/agents 로 복사)
    ├── skills/          ← 작업 매뉴얼 (.claude/skills 로 복사)
    ├── samples/         ← 실제 산출물 예시 (참고용, 복사 불필요)
    └── README.md        ← 하네스별 상세 안내
```

- **`agents/`** — 각 작업을 수행하는 전문 에이전트의 역할 정의
- **`skills/`** — 자연어 트리거와 단계별 절차가 담긴 스킬 매뉴얼(오케스트레이터 포함)
- **`samples/`** — 그 하네스가 실제로 만들어낸 결과물 예시. 동작 확인·학습용이며 복사 대상이 아닙니다.

## 라이선스 / 기여

새 하네스는 `harness-lab`으로 설계한 뒤 동일한 폴더 규약(`<harness>/{agents,skills,samples}`)으로 추가하고, 위 표에 한 줄을 더해 주세요.
