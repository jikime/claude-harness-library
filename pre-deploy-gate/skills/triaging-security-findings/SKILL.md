---
name: triaging-security-findings
description: 보안 검토자들이 만든 findings(코드·공급망)를 받아 오탐을 분류하고 OWASP Risk Rating으로 위험도를 매기고 예외 처리 기준을 적용해 확정 발견과 보안 축 go/no-go 권고를 sec/03-triage-report.md로 정리하는 작업 매뉴얼. security-triage-risk-rater가 따른다. 새 검사를 수행하지 않고 입력 발견만 판정하며, 생성과 분리된 회의적 평가 기준을 정의한다.
---

# 보안 발견 Triage 매뉴얼

## 트리거
security-triage-risk-rater가 `sec/01-code-findings.md`·`sec/02-supplychain-findings.md`(및 있으면 code-quality-reviewer가 넘긴 보안 의심)를 통합 판정할 때 따른다. 예외 기준의 정본은 같은 하네스로 함께 배포되는 `reviewing-predeploy-security` 스킬의 `references/dev-security-checklist.md` ⑦ 예외 처리 기준이다.

## 1단계 · 오탐 분류
각 발견을 분류한다:
- **true positive** — 증거가 확실하고 악용 가능
- **false positive** — 정보성/맥락상 무해(예: 비민감 쿠키 헤더 누락, 테스트 픽스처의 가짜 시크릿). 제외하되 제외 사유를 남긴다
- **needs-review** — 인젝션류(CWE-89/78/79)처럼 수동 확정이 필요한 항목. 보수적으로 위험 측에 둔다

## 2단계 · CWE → OWASP Top 10 매핑
CWE-79/89/78→A03(Injection), CWE-352/22→A01, CWE-200/327→A02, CWE-287→A07, CWE-918→A10, CWE-502→A08, CWE-611→A05. 카테고리로 묶어 보고한다.

## 3단계 · OWASP Risk Rating
`Risk = Likelihood × Impact`. 인터넷 노출·미인증 접근·악용 용이·탐지 어려움은 Likelihood↑. 데이터 노출·무결성 훼손·결제/개인정보·컴플라이언스는 Impact↑.
- 등급: **Critical / High / Medium / Low / Note**
- 회의적 원칙: 불확실하면 한 단계 높게. 자기평가 과소추정을 전제로 본다.

## 4단계 · 예외 판정
- 예외는 사유·영향·악용 가능성·완화책·수정 예정일·**만료일**·승인자가 모두 있을 때만 "임시 허용"으로 표기한다.
- **예외 불가(무조건 위반 유지)**: 실제 시크릿 노출 · 인증/인가 우회 · RCE · 인터넷 노출 서비스의 악용 중 CRITICAL CVE · 미서명/출처 검증 불가 프로덕션 이미지.
- 만료일 없는 예외는 반려로 표기.

## 5단계 · 중복 제거·통합
다른 축(code-quality-reviewer 등)에서 올라온 보안 의심을 같은 파일·취약점 기준으로 합쳐 한 번만 보고한다.

## 보안 축 go/no-go 권고
- **no-go** — 확정 Critical 1건 이상, 또는 예외 불가 항목 미해결
- **conditional** — High가 있으나 승인된 예외로 관리됨
- **go** — Critical 없음, High는 해결/승인 완료

## 산출물 형식 (`sec/03-triage-report.md`)
```markdown
# 보안 Triage 리포트

## 보안 축 권고: no-go | conditional | go
- Critical N · High N · Medium N · Low N (false positive 제외 N, 예외 N)

## 확정 발견 (위험도순)
### [CRITICAL] {제목}  (OWASP A03 / CWE-89)
- 출처: sec/01-code-findings.md → path:line
- 판정: true positive
- 근거/영향: ...
- 예외: 없음 (또는 SEC-YYYY-NNN, 만료 YYYY-MM-DD)

## 제외(오탐) 목록
- {항목} — 사유

## 미검증으로 남은 영역 (사람 확인 필요)
- {항목} — 무엇이 있어야 확인되는가
```

## 품질 체크
- [ ] 모든 입력 발견을 분류했다(true/false/needs-review)
- [ ] 위험도를 OWASP 기준으로 매겼다
- [ ] 예외 불가 항목을 예외로 빠뜨리지 않았다
- [ ] 보안 축 go/no-go 권고를 명시했다
- [ ] 새 검사를 만들지 않고 입력 발견만 판정했다
- [ ] 리포트를 지정 경로에 저장했다
