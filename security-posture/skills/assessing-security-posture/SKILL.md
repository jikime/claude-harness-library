---
name: assessing-security-posture
description: 운영 서비스의 보안 태세를 "운영 보안 체크리스트"(이 스킬의 references/ops-security-checklist.md)의 도메인별 통제로 평가해 충족/미흡/N-A/미검증으로 판정하고 증거와 함께 도메인 파일로 남기는 작업 매뉴얼. cloud-infra-network-auditor·threat-detection-monitoring-auditor·identity-data-protection-auditor·ir-resilience-compliance-auditor가 공통으로 따른다. IaC·설정·문서를 읽고 가능하면 read-only로 라이브 조회하는 하이브리드 규칙과 N-A 정직 표기 원칙을 정의한다.
---

# 보안 태세 평가 매뉴얼

## 트리거
security-posture의 4개 도메인 감사관이 자기 도메인을 평가할 때 따른다. SSOT는 이 스킬에 동봉된 `references/ops-security-checklist.md`(스킬과 함께 배포되는 정본)이며, 이 SKILL.md는 그 통제를 **어떻게 판정·증거화·저장**할지를 규정한다(기준 항목은 references 정본을 읽는다).

## 판정 4상태
| 상태 | 의미 | 필수 증거 |
|---|---|---|
| **충족** | 통제가 작동 | 확인한 설정/정책 파일 또는 read-only 조회 결과 |
| **미흡** | 통제 부재·약함 | 무엇이 빠졌고 왜 위험한지 + 근거 위치 |
| **N-A** | 이 서비스에 해당 통제 대상이 없음 | 왜 적용 안 되는지(예: "클라우드 미사용", "DB 없음") |
| **미검증** | 증거·접근 부재로 확인 못 함 | 무엇을 못 봤고 무엇이 있어야 하는지 |

**원칙: 억지로 채우지 않는다.** 운영 인프라가 없는 대상은 다수가 N-A. 접근/증거 없으면 미검증. 추측으로 충족 처리 금지(거짓 태세 보고 방지).

## 증거 출처(하이브리드)·안전 규칙
1. **파일 증거 우선** — IaC(Terraform/CloudFormation/Helm·K8s)·클라우드 설정·정책 문서·런북·플레이북·탐지 규칙·접근 검토 기록. 라이브 접근 없이 파일만으로 최대한 판정한다.
2. **라이브 클라우드 조회는 사람 승인 게이트** — 프로덕션 계정에 CLI를 거는 건 read-only라도 비용·레이트리밋·민감정보 노출이 있으므로 **오케스트레이터가 사용자 승인을 받은 뒤에만** 한다. 승인 전에는 파일 증거로만 판정하고 나머지는 미검증으로 남긴다.
3. **승인됐어도 메타데이터/설정만** — `describe/list/get-bucket-acl/get-policy`처럼 **구성·설정만** 조회한다.
   - **금지(denylist) — 시크릿·데이터 추출**: `secretsmanager get-secret-value`, `ssm get-parameter --with-decryption`, `kubectl get secret -o yaml`, `s3 cp`/`get-object`, DB 덤프 등 실제 시크릿·데이터를 끌어오는 조회는 형식상 get이어도 하지 않는다(존재·설정만 확인).
   - **금지 — 변경**: 생성·수정·삭제·테스트 발사. 환경을 바꾸지 않는다.
4. 접근/파일 부재는 **미검증**, 통제 대상 부재는 **N-A**.

## 도메인 경계 (어느 감사관이 어느 ①~④를 보나)
- cloud-infra-network-auditor → ① 클라우드·인프라·네트워크
- threat-detection-monitoring-auditor → ② 위협 탐지·모니터링
- identity-data-protection-auditor → ③ ID·접근·데이터 보호
- ir-resilience-compliance-auditor → ④ IR·복원력·컴플라이언스

겹치는 통제(예: IAM은 ①·③, 개인정보는 ③·④)는 자기 도메인 관점만 보고 다른 감사관에 `SendMessage`로 공유한다.

## 산출물 형식 (도메인 파일)
```markdown
# {도메인명} 태세 평가  (모드: 전체|도메인지정 / 일시는 오케스트레이터가 stamp)

## 요약
- 충족 N · 미흡 N · N-A N · 미검증 N

## 통제별 판정
### {통제 항목}  (프레임워크: NIST PR.AC / CIS 5)
- 상태: 미흡
- 증거: path/to/iac.tf:30  (또는 `aws s3api get-bucket-acl` 출력)
- 갭: 무엇이 왜 위험한가 (성숙도 점수는 매기지 않음 — synthesizer가 함)
- 권장: 한 줄 개선 방향
```

## 품질 체크
- [ ] 모든 통제가 4상태 중 하나로 판정됐다
- [ ] 미흡·미검증에 증거가 있다
- [ ] N-A에 사유가 있다
- [ ] 라이브 조회를 read-only로만 했다(변경 없음)
- [ ] 성숙도 점수·우선순위를 여기서 정하지 않았다(synthesizer 몫)
- [ ] 도메인 파일을 지정 경로에 저장했다(요약으로 대체하지 않음)
