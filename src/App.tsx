const lessonGoals = [
  {
    step: '학습목표 1',
    title: '파레토 분석의 실무 의미 이해',
    body: '불량 개수만 많이 보는 것이 아니라 누적 기여율, 수율 영향도, 조치 난이도를 함께 보며 우선순위를 정합니다.',
  },
  {
    step: '학습목표 2',
    title: '시간 흐름으로 불량 변화 읽기',
    body: '주차별, 라인별, 공정별 트렌드를 비교해 “최근에 커지는 문제”와 “항상 많은 문제”를 구분합니다.',
  },
  {
    step: '학습목표 3',
    title: 'AI 작업지시서로 분석 자동화',
    body: '결함 로그를 넣으면 파레토 차트, 트렌드 차트, 원인 후보, 다음 실험 계획까지 생성하는 지시서를 작성합니다.',
  },
];

const lessonFlow = [
  { time: '3분', label: '지난 흐름 연결' },
  { time: '7분', label: '파레토 개념' },
  { time: '10분', label: '트렌드 해석' },
  { time: '15분', label: 'AI 분석 실습' },
  { time: '5분', label: '검증/정리' },
];

const previousLessons = [
  ['01강', 'AI 마인드셋', '코딩보다 AI에게 일 시키는 방식 이해'],
  ['02강', '엔지니어용 대화법', '공정 변수와 현장 용어를 정확히 지시'],
  ['03강', 'MES 데이터 병합', '분산된 생산 이력과 불량 로그를 한 표로 연결'],
  ['04강', '데이터 정제', '결측, 단위, 이상치를 분석 가능한 상태로 정리'],
  ['05강', '수율 히트맵', '공간 좌표로 불량 위치 패턴 확인'],
  ['06강', '설비 이상 감지', '관리도와 이동 평균으로 OOC 탐지'],
  ['07강', '상관관계 분석', '공정 조건과 수율/불량의 관계 후보 도출'],
];

const defectRows = [
  { type: 'Particle', count: 342, share: '35.7%', trend: '+44%', action: '세정/이송 구간 이물원 추적' },
  { type: 'Scratch', count: 238, share: '24.8%', trend: '+8%', action: '이송 롤러, 카세트 접촉부 점검' },
  { type: 'CD Drift', count: 168, share: '17.5%', trend: '+31%', action: '노광/현상 조건과 계측 위치 재확인' },
  { type: 'Mura', count: 96, share: '10.0%', trend: '-5%', action: '증착 균일도 로그와 비교' },
  { type: 'Open', count: 71, share: '7.4%', trend: '+2%', action: '패턴 끊김 위치를 공정맵과 매칭' },
  { type: 'Etch Residue', count: 43, share: '4.5%', trend: '-12%', action: '식각 후 세정 recipe 유지 관찰' },
];

const aiPromptBlocks = [
  {
    label: '역할',
    text: '너는 디스플레이 제조 데이터 분석을 돕는 공정 엔지니어링 분석가다.',
  },
  {
    label: '입력 데이터',
    text: '컬럼: date, line, process, panel_id, defect_type, x, y, severity, lot_id. 결측치와 이상값은 따로 표시해라.',
  },
  {
    label: '분석 작업',
    text: '불량 유형별 파레토, 주차별 트렌드, 라인별 편차, 최근 4주 급증 유형을 계산하고 표와 차트로 요약해라.',
  },
  {
    label: '검증 기준',
    text: '총 불량 수 합계가 원본 행 수와 맞는지 확인하고, 상위 80%를 만드는 유형을 별도로 표시해라.',
  },
  {
    label: '산출물',
    text: '우선 조치 3개, 원인 가설, 필요한 추가 데이터, 다음 실험 계획을 엔지니어 보고서 문장으로 작성해라.',
  },
];

const checklist = [
  '불량명 표기가 Particle, particle, PRT처럼 섞여 있지 않은가?',
  '동일 패널의 중복 카운트 기준이 명확한가?',
  '개수 기준과 수율 영향도 기준을 혼동하지 않았는가?',
  '최근 급증한 불량과 누적 상위 불량을 따로 해석했는가?',
  'AI가 만든 원인 가설을 설비 로그, recipe 변경 이력, LOT 이력으로 검증했는가?',
];

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-top">
          <div className="logo-group">
            <img
              src="/lecture08/logo.png"
              alt="LettUin Edu"
              className="header-logo"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="header-tag-container">
            <span className="header-tag">AI를 지휘하는 스마트한 엔지니어의 시작</span>
          </div>
        </div>

        <div className="hero-section">
          <h1>Ch.8 불량 원인(Pareto) & 트렌드 자동 분석 실습</h1>
          <p className="subtitle">많은 불량을 “무엇부터 조치할지”로 바꾸는 AI 데이터 분석 교안</p>
          <div className="lesson-meta" aria-label="lesson summary">
            <span>40분</span>
            <span>실습 포함</span>
            <span>파레토 차트</span>
            <span>트렌드 분석</span>
            <span>액션 리포트</span>
          </div>
        </div>
      </header>

      <main>
        <section className="overview-section">
          <span className="section-label">01. 오프닝 및 학습목표</span>
          <h2>08강은 “분석 결과를 보고 무엇을 먼저 고칠 것인가”를 결정하는 수업입니다</h2>
          <p className="section-intro">
            01강부터 07강까지는 AI와 대화하는 법, 데이터를 모으고 정제하는 법, 히트맵과 모니터링, 상관관계 분석까지 다루었습니다.
            이제 08강에서는 불량 로그를 파레토와 트렌드로 바꾸고, AI가 다음 조치 계획까지 정리하도록 지시합니다.
          </p>
          <div className="learning-goals-grid" aria-label="학습목표">
            {lessonGoals.map((item) => (
              <article className="learning-goal-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="lesson-timeline" aria-label="40분 강의 진행표">
            {lessonFlow.map((item) => (
              <div className="timeline-step" key={item.label}>
                <strong>{item.time}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">02. 01강-07강 흐름 연결</span>
          <h2>앞 강의의 결과물은 08강에서 우선순위 분석의 입력 데이터가 됩니다</h2>
          <p className="section-intro">
            수강생이 “왜 갑자기 파레토를 배우는지” 놓치지 않도록, 08강은 앞선 분석 도구들을 현장 의사결정으로 묶어주는 위치에 놓습니다.
          </p>
          <div className="curriculum-chain">
            {previousLessons.map(([chapter, title, result]) => (
              <article className="chain-item" key={chapter}>
                <strong>{chapter}</strong>
                <h3>{title}</h3>
                <p>{result}</p>
              </article>
            ))}
          </div>
          <div className="connection-note">
            <strong>08강의 전환점</strong>
            <p>07강까지는 “문제를 보이게 만드는 법”이었다면, 08강은 “보이는 문제 중 무엇부터 해결할지 정하는 법”입니다.</p>
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">03. 핵심 개념</span>
          <h2>파레토는 “상위 몇 개 불량이 전체 손실의 대부분을 만드는가”를 확인하는 도구입니다</h2>
          <p className="section-intro">
            공정 현장에서는 모든 불량을 동시에 해결할 수 없습니다. 파레토 분석은 제한된 시간과 인력을 가장 큰 손실 요인에 먼저 배치하기 위한 우선순위 도구입니다.
          </p>
          <div className="concept-grid">
            <div className="concept-card">
              <span>개수 기준</span>
              <h3>가장 많이 발생한 불량</h3>
              <p>검사 로그에서 유형별 빈도를 집계합니다. 단순하지만 현장 회의의 출발점으로 좋습니다.</p>
            </div>
            <div className="concept-card">
              <span>영향 기준</span>
              <h3>수율을 가장 많이 깎는 불량</h3>
              <p>불량 개수에 심각도, 패널 폐기 여부, 재작업 비용을 곱해 실제 손실 기여도를 봅니다.</p>
            </div>
            <div className="concept-card">
              <span>변화 기준</span>
              <h3>최근 급격히 커지는 불량</h3>
              <p>누적 상위가 아니어도 최근 2-4주 상승률이 크면 선제 조치 대상이 됩니다.</p>
            </div>
          </div>
          <div className="formula-box">
            <strong>수업에서 사용할 계산식</strong>
            <p>불량 점유율 = 유형별 불량 수 / 전체 불량 수 × 100</p>
            <p>누적 기여율 = 상위 유형부터 점유율을 순서대로 더한 값</p>
            <p>트렌드 변화율 = 최근 기간 평균 / 기준 기간 평균 - 1</p>
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">04. 실무 데이터 예시</span>
          <h2>같은 불량 데이터도 파레토, 트렌드, 액션 매트릭스로 보면 판단이 달라집니다</h2>
          <p className="section-intro">
            아래 예시는 가상의 디스플레이 패널 검사 로그를 기준으로 구성했습니다. Particle은 누적 1위이면서 증가율도 높고, CD Drift는 개수는 3위지만 최근 상승률이 커서 함께 봐야 합니다.
          </p>
          <figure className="image-panel">
            <img src="/lecture08/generated/lesson08_pareto_trend.png" alt="파레토, 트렌드, 액션 매트릭스 예시" />
            <figcaption>Python으로 생성한 08강 실습용 예시 이미지: 파레토, 주차별 트렌드, 영향도-난이도 매트릭스</figcaption>
          </figure>
          <div className="data-table-wrap">
            <table className="defect-table">
              <thead>
                <tr>
                  <th>불량 유형</th>
                  <th>건수</th>
                  <th>점유율</th>
                  <th>최근 변화</th>
                  <th>1차 조치 방향</th>
                </tr>
              </thead>
              <tbody>
                {defectRows.map((row) => (
                  <tr key={row.type}>
                    <td>{row.type}</td>
                    <td>{row.count}</td>
                    <td>{row.share}</td>
                    <td className={row.trend.startsWith('+') ? 'trend-up' : 'trend-down'}>{row.trend}</td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">05. AI 자동 분석 파이프라인</span>
          <h2>AI에게 맡길 일은 “차트 그리기”가 아니라 “차트에서 조치안까지 이어가기”입니다</h2>
          <p className="section-intro">
            수강생에게는 데이터 업로드 후 AI가 어떤 순서로 계산해야 하는지 명확히 지시하게 합니다. 이 순서가 분명해야 결과가 보고서와 연결됩니다.
          </p>
          <figure className="image-panel compact">
            <img src="/lecture08/generated/lesson08_workflow.png" alt="불량 로그에서 액션 메모까지 이어지는 분석 파이프라인" />
            <figcaption>Raw defect log → Clean & group → Pareto → Trend → Action memo 흐름</figcaption>
          </figure>
          <div className="prompt-grid">
            {aiPromptBlocks.map((block) => (
              <article className="prompt-card" key={block.label}>
                <strong>{block.label}</strong>
                <p>{block.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">06. 실습 작업지시서</span>
          <h2>수강생은 아래 형식으로 AI에게 분석 자동화 웹앱 제작을 지시합니다</h2>
          <p className="section-intro">
            이 실습의 목표 산출물은 CSV를 넣으면 파레토 차트, 트렌드 차트, 상위 원인 후보, 조치 메모가 한 화면에 나오는 작은 분석 도구입니다.
          </p>
          <div className="instruction-box">
            <pre>{`내가 가진 defect_log.csv를 분석하는 웹 도구를 만들어줘.

필수 기능:
1. CSV 업로드 후 defect_type, date, line, process 기준으로 집계
2. 불량 유형별 파레토 차트와 누적 80% 기준선 표시
3. 주차별 Top 3 불량 트렌드 라인 차트 표시
4. 최근 4주 증가율이 큰 불량을 별도 카드로 표시
5. 우선 조치 후보 3개를 "불량명 / 근거 / 확인할 데이터 / 다음 실험" 형식으로 출력

검증:
- 전체 행 수와 집계 합계가 맞는지 표시
- 결측 defect_type, 잘못된 date, 중복 panel_id를 경고
- 차트 아래에 엔지니어가 해석할 수 있는 3문장 요약 제공`}</pre>
          </div>
          <div className="output-grid">
            <div>
              <span>입력</span>
              <strong>defect_log.csv</strong>
              <p>검사일, 라인, 공정, 패널 ID, 불량 유형, 좌표, 심각도</p>
            </div>
            <div>
              <span>처리</span>
              <strong>집계 + 정렬 + 변화율 계산</strong>
              <p>유형별 빈도, 누적 기여율, 주차별 Top 3 추세</p>
            </div>
            <div>
              <span>출력</span>
              <strong>우선 조치 리포트</strong>
              <p>상위 불량, 급증 불량, 확인 로그, 다음 실험 계획</p>
            </div>
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">07. 검증 및 정리</span>
          <h2>AI 결과는 그대로 믿지 말고, 집계 기준과 현장 맥락을 반드시 확인합니다</h2>
          <p className="section-intro">
            파레토 차트는 강력하지만 기준을 잘못 잡으면 엉뚱한 조치로 이어집니다. 마지막 5분은 결과 검증 체크리스트와 다음 강의 연결로 마무리합니다.
          </p>
          <div className="checklist-panel">
            {checklist.map((item, index) => (
              <div className="checklist-item" key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="next-lesson-box">
            <strong>다음 강의 연결</strong>
            <p>
              08강에서 우선 조치 후보를 뽑았다면, 09강부터는 기술 문서와 매뉴얼을 빠르게 읽어 조치 방법을 찾고 보고서 자동화로 이어갈 수 있습니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
