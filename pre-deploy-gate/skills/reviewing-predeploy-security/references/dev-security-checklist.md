# 개발자 보안 체크리스트 (배포 직전 코드·릴리스 판정용)

> **목적** — 배포 직전 **현재 프로젝트의 코드·변경분·릴리스 산출물**에서 실제로 판정 가능한 보안 항목만 모은다.
> **범위** — 코드를 읽고(또는 도구를 돌려) 통과/위반/N-A/미검증으로 판정할 수 있는 것. 조직 보안 프로그램 설계·CI 파이프라인 구축·운영 지표·컴플라이언스 매핑은 이 게이트의 범위가 아니다(필요하면 `security-posture` 하네스).
> **한계** — 자동/패턴 판정 위주. 수동 침투 테스트·비즈니스 로직 검토를 대체하지 않는다.

이 체크리스트는 두 검토자가 나눠 본다.
- **code-security-reviewer** → "코드 작성 보안 기준" + "코드 리뷰에서 바로 차단할 패턴" + "PR 보안 체크리스트".
- **supply-chain-deploy-verifier** → "빌드·배포·공급망 판정 기준" + "릴리스 산출물 확인".
- **security-triage-risk-rater** → "예외 처리 기준".

---

## 차단 기준 (위반이면 보안 no-go 후보)

- 시크릿(API 키·토큰·비밀번호·private key) 노출
- 인증/인가 우회 가능 취약점
- 원격 코드 실행(RCE)
- 인터넷 노출 서비스의 알려진 악용 중 CRITICAL CVE
- 서명되지 않았거나 출처를 검증할 수 없는 프로덕션 이미지

---

## 코드 작성 보안 기준

개발자가 코드를 작성할 때 확인하고, 리뷰어가 PR에서 다시 확인한다. 스캐너가 모든 문제를 잡지는 못하므로 인증/인가·비즈니스 로직·데이터 노출처럼 맥락이 필요한 부분은 사람이 함께 본다.

### 공통 원칙

- [ ] 외부 입력은 신뢰하지 않고 서버 측에서 검증한다.
- [ ] 인증은 "누구인지", 인가는 "이 작업을 해도 되는지"로 나누어 확인한다.
- [ ] 사용자가 전달한 값으로 SQL, shell command, 파일 경로, URL을 직접 조립하지 않는다.
- [ ] 민감정보는 코드, 로그, 에러 메시지, 응답 payload, 테스트 fixture에 남기지 않는다.
- [ ] 실패 시 기본 동작은 허용이 아니라 거부로 설계한다.
- [ ] 보안에 중요한 값은 클라이언트 입력이나 프론트엔드 상태만 믿지 않는다.
- [ ] 테스트 코드에도 실제 토큰, 운영 계정, 운영 데이터 샘플을 넣지 않는다.

### 입력값 검증

프론트엔드 검증은 사용자를 돕는 장치이고, 보안 경계는 항상 서버다.

- [ ] API 요청 body, query, path parameter에 스키마 검증을 적용한다.
- [ ] 숫자, 날짜, enum, 길이, 허용 문자, 파일 크기 같은 제약을 명시한다.
- [ ] allowlist 방식으로 허용 가능한 값만 통과시킨다.
- [ ] 검증 실패 메시지에 내부 필드명, SQL, stack trace를 노출하지 않는다.

```python
# 권장: Pydantic/FastAPI처럼 스키마로 입력 범위를 고정한다.
from pydantic import BaseModel, Field

class CreateUserRequest(BaseModel):
    email: str = Field(max_length=255)
    role: str = Field(pattern="^(viewer|editor)$")
```

### 인증과 인가

인증이 되어 있어도 해당 리소스에 접근할 권한이 있는지는 별도로 확인해야 한다. 특히 IDOR/BOLA는 스캐너보다 코드 리뷰·테스트에서 더 잘 잡힌다.

- [ ] 모든 보호 API는 인증 미들웨어를 통과한다.
- [ ] 객체 조회, 수정, 삭제 시 소유자 또는 역할 권한을 확인한다.
- [ ] 관리자 기능은 UI 숨김이 아니라 서버 권한 검사로 보호한다.
- [ ] JWT는 `alg`, `iss`, `aud`, `exp`, 서명을 모두 검증한다.
- [ ] 권한 검사는 controller에 흩뿌리기보다 정책 함수나 middleware로 일관되게 둔다.

```javascript
// 위험: userId를 클라이언트가 보낸 값 그대로 신뢰한다.
app.get("/orders/:id", async (req, res) => {
  const order = await db.orders.findById(req.params.id);
  res.json(order);
});

// 권장: 현재 인증 사용자 기준으로 소유권을 함께 확인한다.
app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.orders.findOne({ id: req.params.id, ownerId: req.user.id });
  if (!order) return res.status(404).json({ error: "not_found" });
  res.json(order);
});
```

### 데이터베이스와 쿼리

문자열 연결로 쿼리를 만들면 SQL injection 위험이 생긴다. ORM을 쓰더라도 raw query를 쓰는 순간 다시 직접 검토한다.

- [ ] SQL은 parameterized query 또는 ORM query builder를 사용한다.
- [ ] 정렬 컬럼, 필터 필드처럼 SQL 구조에 들어가는 값은 allowlist로 제한한다.
- [ ] DB 계정은 애플리케이션별 최소 권한을 사용한다.
- [ ] 대량 조회 API에는 pagination과 최대 limit을 둔다.

```python
# 위험
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
# 권장
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
```

### 명령 실행과 파일 처리

사용자 입력이 OS 명령이나 파일 경로에 섞이면 command injection, path traversal, 임의 파일 읽기가 생긴다.

- [ ] `exec`, `eval`, shell command 호출은 기본 금지하고, 꼭 필요하면 보안 리뷰를 받는다.
- [ ] 파일 경로는 base directory 아래로 정규화한 뒤 벗어나는지 확인한다.
- [ ] 업로드 파일은 확장자만 보지 말고 MIME/type, 크기, 내용 검사를 함께 한다.
- [ ] 업로드 파일명은 사용자가 준 이름을 그대로 저장하지 않는다.
- [ ] 압축 파일은 zip slip, 압축 폭탄 가능성을 검사한다.

```python
from pathlib import Path
BASE_DIR = Path("/srv/app/uploads").resolve()

def safe_path(filename: str) -> Path:
    path = (BASE_DIR / filename).resolve()
    if BASE_DIR not in path.parents:
        raise ValueError("invalid path")
    return path
```

### 외부 요청과 SSRF

서버가 사용자가 준 URL로 요청을 보내는 기능(웹훅, 이미지 프록시, URL 미리보기, 파일 import)은 SSRF 위험이 크다.

- [ ] 사용자가 입력한 URL로 서버가 직접 요청하는 기능은 보안 리뷰 대상이다.
- [ ] 허용 도메인 allowlist를 사용한다.
- [ ] 사설 IP, localhost, link-local, metadata endpoint 접근을 차단한다.
- [ ] redirect 이후 최종 URL도 다시 검증한다.
- [ ] timeout, 응답 크기 제한, content-type 제한을 둔다.

### 출력 인코딩과 XSS

저장형 XSS는 "저장할 때 정리"만으로 막기 어렵다. 출력 위치에 맞는 인코딩을 적용한다.

- [ ] HTML, attribute, URL, JavaScript context별 인코딩을 구분한다.
- [ ] 사용자 입력을 HTML로 렌더링해야 하면 검증된 sanitizer를 쓴다.
- [ ] React/Vue 등에서도 `dangerouslySetInnerHTML`, `v-html` 사용은 별도 리뷰한다.
- [ ] CSP를 적용하되, CSP만으로 XSS 방어를 대체하지 않는다.

### 시크릿과 설정값

시크릿은 한 번 Git에 들어가면 삭제해도 히스토리에 남는다. 탐지되면 즉시 폐기·재발급한다.

- [ ] API key, DB password, private key, OAuth secret은 저장소에 넣지 않는다.
- [ ] 운영 시크릿은 Secret Manager, Vault, KMS, Kubernetes Secret 등 승인된 저장소를 쓴다.
- [ ] 로컬 개발용 `.env`는 `.gitignore`에 포함한다.
- [ ] 테스트용 fake secret은 실제 패턴과 혼동되지 않도록 명확히 표시한다.
- [ ] 시크릿이 노출되면 코드 삭제가 아니라 키 폐기·재발급까지 완료한다.

### 로그와 에러 처리

- [ ] access/refresh token, session id, cookie, authorization header를 로그에 남기지 않는다.
- [ ] 주민번호, 카드번호, 계좌번호, 이메일 등 개인정보는 마스킹한다.
- [ ] 예외 응답에 내부 stack trace, DB 에러, 인프라 정보가 노출되지 않게 한다.
- [ ] 보안 이벤트(로그인 실패, 권한 거부, 관리자 설정 변경, 토큰 재발급)는 감사 로그로 남긴다.

### 암호화와 토큰

암호화는 직접 구현하지 않는다. 표준 라이브러리·검증된 KMS/SDK를 쓴다.

- [ ] 비밀번호는 bcrypt, scrypt, Argon2로 저장한다(단순 SHA-256 금지).
- [ ] 토큰은 충분한 엔트로피의 난수로 생성한다.
- [ ] 장기 토큰은 만료·회전·폐기 방법을 둔다.
- [ ] 민감 데이터 암호화 키는 코드가 아니라 KMS/Secret Manager에서 관리한다.

### API 변경 시 추가 확인

엔드포인트가 하나 늘어날 때마다 본다.

- [ ] 인증이 필요한 API와 공개 API가 명확히 구분된다.
- [ ] 사용자별/조직별 데이터 경계가 테스트되어 있다.
- [ ] rate limit 또는 abuse 방지 정책이 적용되어 있다.
- [ ] 응답에 불필요한 내부 ID, 권한, 개인정보가 포함되지 않는다.
- [ ] 상태 변경 요청에는 CSRF 또는 동등한 보호가 적용되어 있다.

### 코드 리뷰에서 바로 차단할 패턴

발견 즉시 수정 후 재리뷰한다.

- [ ] `eval`, `exec`, dynamic import에 사용자 입력이 들어감
- [ ] SQL 문자열 연결
- [ ] 인증 사용자와 리소스 소유자 검증 없는 상세 조회/수정/삭제
- [ ] `verify=False`, TLS 검증 비활성화
- [ ] `admin=true`, `role=admin` 같은 클라이언트 입력 기반 권한 부여
- [ ] 운영 URL, 운영 토큰, 실제 개인정보가 테스트 코드에 포함됨
- [ ] 컨테이너가 root 또는 privileged로 실행됨
- [ ] S3/GCS/Azure Storage public access가 코드나 IaC에 추가됨

---

## 빌드·배포·공급망 판정 기준

supply-chain-deploy-verifier가 본다. **해당 산출물이 없으면 N-A**(예: 이미지·서명이 없는 코드 레포). 억지로 위반/통과로 채우지 않는다.

### 의존성 (SCA)
- [ ] lockfile/매니페스트에 알려진 CVE(특히 CRITICAL/HIGH) 의존성이 없다.
- [ ] dependency confusion·typosquatting 징후(사내 패키지명 충돌, 오타 유사 패키지)가 없다.
- [ ] 변경된 의존성의 라이선스·취약점이 확인됐다.

### IaC / 매니페스트
- [ ] Terraform/K8s/CloudFormation에 public access, 과도한 IAM 권한, 암호화 누락이 없다(`trivy config` 등).

### 컨테이너 이미지 (이미지가 있을 때만)
- [ ] Dockerfile: root 실행(USER 미설정), `:latest` 태그, HEALTHCHECK 누락, ENV/ARG 시크릿, ADD 남용 점검.
- [ ] 이미지 CVE(CRITICAL/HIGH) 게이트(`trivy image --ignore-unfixed`).

### 서명·출처 (릴리스 산출물이 있을 때만)
- [ ] 이미지 서명 검증 시 **OIDC issuer와 인증서 identity를 반드시 핀**한다(identity 미지정 `cosign verify`는 무의미).
- [ ] SLSA provenance가 소스 repo·커밋·빌더와 일치한다.

```bash
# 서명 검증은 identity 핀이 필수
cosign verify \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  --certificate-identity-regexp "^https://github.com/myorg/myrepo/" \
  ghcr.io/myorg/myrepo:v1.2.3
```

### CI 공급망 (`.github/workflows` 등이 있을 때)
- [ ] 외부 액션이 SHA 다이제스트로 고정되어 있다(태그 핀 금지).
- [ ] `GITHUB_TOKEN`/시크릿 권한이 최소화되어 있다.
- [ ] 워크플로에 스크립트 인젝션(신뢰 못 할 입력을 `run:`에 직접 보간)이 없다.

### SBOM (릴리스 시)
- [ ] CycloneDX/SPDX SBOM이 생성된다.

---

## PR 보안 체크리스트

PR 설명에 복사해 쓴다. 해당 없음은 `N/A`로 표시하되, 보안 영향이 있으면 이유를 남긴다.

```markdown
## 보안 체크리스트
- [ ] 사용자 입력값이 추가/변경되었고 서버 측 검증이 적용됨
- [ ] 인증/인가 로직이 변경되었으며 권한 우회 가능성을 검토함
- [ ] 신규 API 엔드포인트가 인증, 권한, rate limit, 로깅 정책을 따름
- [ ] 민감정보가 로그, 에러 메시지, 응답 payload에 포함되지 않음
- [ ] 신규 의존성의 라이선스와 CVE를 확인함
- [ ] 시크릿/API 키/토큰이 코드·테스트·문서에 포함되지 않음
- [ ] Dockerfile/배포 매니페스트 변경 시 root 실행, privileged, hostPath, latest 태그를 점검함
- [ ] IaC 변경 시 public access, 과도한 IAM 권한, 암호화 누락을 점검함
- [ ] 배포 산출물 이미지/SBOM/서명/provenance 검증 결과를 확인함(해당 시)
```

리뷰어는 체크박스보다 근거를 본다. "권한 우회 검토"는 어떤 역할로 어떤 API를 테스트했는지 짧게 남긴다.

---

## 릴리스 산출물 확인 (릴리스 전, 해당 산출물이 있을 때)

| 확인 항목 | 필수 증거 | 실패 시 조치 |
|---|---|---|
| 변경 범위 | PR 링크, 변경 파일 목록, 릴리스 노트 | 범위 불명확 시 승인 보류 |
| 이미지 취약점 | Trivy 결과, HIGH/CRITICAL 0건 또는 승인된 예외 | 배포 차단 |
| IaC/매니페스트 | `trivy config` 등 결과 | 고위험 오설정 수정 후 재검증 |
| SBOM | CycloneDX 또는 SPDX 파일 | SBOM 생성 후 재승인 |
| 이미지 서명 | `cosign verify` 결과(issuer+identity 핀) | 미서명/identity 불일치 시 차단 |
| 빌드 출처 | SLSA provenance, source repo/commit/builder 일치 | provenance 불일치 시 차단 |
| 예외 | 예외 승인자, 만료일, 보완 계획 | 만료일 없으면 반려 |

---

## ⑦ 예외 처리 기준

security-triage-risk-rater가 적용한다. 예외도 관리 가능한 위험이어야 한다.

예외 요청에 반드시 포함: 탐지 항목과 심각도 · 영향 받는 서비스/버전 · 실제 악용 가능성 판단 · 임시 완화 조치 · 수정 예정일과 담당자 · **예외 만료일** · 승인자.

**예외를 허용하지 않는 항목**(무조건 위반 유지):
- 실제 시크릿 노출
- 인증/인가 우회 가능 취약점
- 원격 코드 실행 가능 취약점
- 인터넷 노출 서비스의 알려진 악용 중 CRITICAL CVE
- 서명되지 않았거나 출처를 검증할 수 없는 프로덕션 이미지

만료일 없는 예외는 반려로 표기한다. 예외 파일은 저장소에 남겨 추적한다.

```yaml
# security-exceptions.yml
exceptions:
  - id: SEC-2026-001
    service: payment-api
    finding: CVE-2026-12345
    severity: HIGH
    reason: "취약 코드 경로가 비활성 기능 뒤에 있으며 외부 노출 없음"
    mitigation: "WAF rule 적용, feature flag off 유지"
    owner: "@team-payment"
    approved_by: "@security-reviewer"
    expires: "2026-07-15"
    remediation_due: "2026-07-10"
```
