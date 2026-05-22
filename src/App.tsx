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
  { time: '5분', label: '문제 제기' },
  { time: '12분', label: '파레토 개념' },
  { time: '18분', label: '실무 판단 사례' },
  { time: '20분', label: 'AI 분석 실습' },
  { time: '15분', label: '검증 실습' },
  { time: '5분', label: '정리' },
];

const decisionFrames = [
  ['빈도', '얼마나 많이 발생했는가', '유형별 건수, 점유율, 누적 기여율로 전체 손실의 큰 덩어리를 찾습니다.'],
  ['영향도', '수율과 비용을 얼마나 깎는가', '심각도, 폐기 여부, 재작업 비용을 반영해 단순 건수와 손실 순위를 분리합니다.'],
  ['변화율', '최근에 얼마나 빨리 커지는가', '최근 4주와 기준 4주를 비교해 누적 상위와 급증 항목을 따로 봅니다.'],
  ['난이도', '지금 바로 확인할 수 있는가', '설비 정지나 장기 실험이 필요한 항목과 즉시 점검 가능한 항목을 나눕니다.'],
];

const scenarioCards = [
  {
    title: 'Particle',
    tag: '누적 1위 + 급증',
    body: '건수 342건, 점유율 35.7%, 최근 +44%입니다. Line, process, 좌표 분포를 분리해 세정/이송 구간의 원인 범위를 좁힙니다.',
  },
  {
    title: 'CD Drift',
    tag: '누적 3위 + 급증',
    body: '건수는 3위지만 최근 +31%입니다. 계측 calibration, 노광 dose/focus, 현상 조건, recipe 변경 이력을 긴급 확인합니다.',
  },
  {
    title: 'Open',
    tag: '저빈도 + 고영향 가능',
    body: '건수는 낮아도 폐기율이 높으면 손실 기준 우선순위가 올라갑니다. severity를 반영한 가중 파레토로 다시 확인합니다.',
  },
];

const promptComparison = [
  {
    label: '나쁜 지시문',
    text: 'defect_log.csv 분석해서 파레토 차트 그려줘.',
    note: '컬럼, 기간, 결측 처리, 중복 기준, 산출물 형식이 없어 AI가 임의로 가정합니다.',
  },
  {
    label: '좋은 지시문',
    text: '최근 4주와 이전 4주 평균을 비교하고, 결측 defect_type, 잘못된 date, 중복 panel_id를 경고하며, 상위 80%와 급증 Top 3를 분리해 보고서 문장으로 작성해라.',
    note: '분석 기준, 검증 기준, 결과 형식이 명확해서 회의 자료로 옮기기 쉽습니다.',
  },
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
  '검사일, 공정 투입일, lot 종료일 중 어떤 날짜 기준으로 트렌드를 집계했는가?',
  '개수 기준과 수율 영향도 기준을 혼동하지 않았는가?',
  '최근 급증한 불량과 누적 상위 불량을 따로 해석했는가?',
  'AI가 만든 원인 가설을 설비 로그, recipe 변경 이력, LOT 이력으로 검증했는가?',
  '차트의 단위와 보고서 문장의 단위가 defect count인지 panel count인지 일치하는가?',
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
            <span>75분</span>
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
            불량 유형, 라인, 공정, 시간대가 한꺼번에 쌓이면 단순 표만으로는 조치 우선순위를 정하기 어렵습니다.
            08강에서는 불량 로그를 파레토와 트렌드로 바꾸고, AI가 다음 조치 계획까지 정리하도록 지시합니다.
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
          <span className="section-label">02. 실무 판단 프레임</span>
          <h2>파레토 순위는 출발점이고, 실제 조치 순서는 네 가지 기준으로 정합니다</h2>
          <p className="section-intro">
            건수 1위가 항상 조치 1순위는 아닙니다. 빈도, 영향도, 변화율, 조치 난이도를 분리해서 봐야 회의에서 실행 가능한 판단이 나옵니다.
          </p>
          <div className="decision-grid">
            {decisionFrames.map(([label, title, result]) => (
              <article className="decision-card" key={label}>
                <strong>{label}</strong>
                <h3>{title}</h3>
                <p>{result}</p>
              </article>
            ))}
          </div>
          <div className="connection-note">
            <strong>판단 질문</strong>
            <p>“이 불량이 1위입니다”에서 멈추지 말고, “왜 이 불량을 먼저 봐야 하는지”를 수치와 확인 데이터로 설명합니다.</p>
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
          <div className="formula-box warning-box">
            <strong>흔한 오해</strong>
            <p>상위 80%만 보면 나머지는 무시해도 된다는 뜻이 아닙니다. 하위 항목 안에도 치명도가 높은 불량이 있을 수 있습니다.</p>
            <p>파레토 순위는 조치 순서의 출발점이며, 영향도와 최근 변화율을 함께 봐야 합니다.</p>
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
          <div className="scenario-grid">
            {scenarioCards.map((item) => (
              <article className="scenario-card" key={item.title}>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          
          <div className="prompt-example-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#1e293b', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>🤖 각 시각화를 직접 만들어보는 AI 프롬프트 예시</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1rem' }}>CSV 로그 파일을 챗봇에 업로드한 뒤, 아래와 같이 구체적으로 지시하면 실무에 바로 쓸 수 있는 차트를 얻을 수 있습니다.</p>
            
            <div className="prompt-example" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>💡 파레토 차트 (Pareto Chart) 생성 프롬프트</h4>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#334155', fontSize: '0.95rem', lineHeight: '1.5', fontFamily: 'inherit' }}>
{`내가 제공한 defect_log.csv 데이터를 기반으로 파레토 차트를 그려줘.
1. X축은 '불량 유형', Y축(좌측)은 '발생 건수' 막대그래프, Y축(우측)은 '누적 점유율(%)' 꺾은선으로 이중 축 설정.
2. 누적 점유율이 80%가 되는 지점에 붉은색 수평 점선을 그어 줘.
3. 80% 이내에 속하는 불량 유형들은 '핵심 관리 대상'으로 막대 색상을 진하게 표시해 줘.`}
              </pre>
            </div>
            
            <div className="prompt-example" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>💡 트렌드 차트 (Trend Chart) 생성 프롬프트</h4>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#334155', fontSize: '0.95rem', lineHeight: '1.5', fontFamily: 'inherit' }}>
{`주차별 주요 불량의 발생 건수 추이를 꺾은선 차트(Line Chart)로 그려줘.
1. 전체 불량이 아닌 누적 상위 5개 불량 유형만 필터링해서 보여줄 것.
2. 각 선의 끝(가장 최근 주차)에 불량 유형 라벨과 발생 건수를 직접 표기해 줘 (범례 최소화).
3. 4주 전 대비 현재 증가율이 20% 이상인 불량은 꺾은선을 붉은색 굵은 선으로 강조해 줘.`}
              </pre>
            </div>

            <div className="prompt-example" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>💡 액션 매트릭스 (Action Matrix) 생성 프롬프트</h4>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#334155', fontSize: '0.95rem', lineHeight: '1.5', fontFamily: 'inherit' }}>
{`불량 유형들을 4분면 액션 매트릭스(Scatter Plot)에 배치해 줘.
1. X축은 '조치 난이도 및 예상 소요 시간 (Low to High)', Y축은 '수율 영향도 및 손실 비용 (Low to High)'으로 설정.
2. 점의 크기는 '발생 건수'에 비례하게 설정해 줘 (Bubble Chart 형태).
3. 좌측 상단 2사분면(영향도 높고 난이도 낮음)의 배경을 옅은 녹색으로 칠하고 'Quick Wins (우선 조치)'라고 라벨을 달아 줘.`}
              </pre>
            </div>
          </div>
        </section>

        <section className="teaching-section">
          <span className="section-label">04-2. 심화 시각화: 불량 순위 변동 차트 (Bump Chart)</span>
          <h2>순위 역전 현상을 포착하면, 새로운 고질 불량을 초기에 막을 수 있습니다</h2>
          <p className="section-intro">
            단순 파레토 차트는 누적 결과를 보여주지만, '최근 치고 올라오는 불량'을 놓치기 쉽습니다. 주차별 순위 변동 차트(Bump Chart)를 활용하면, 항상 1등인 불량과 새롭게 순위가 급상승하는 불량을 직관적으로 구분할 수 있습니다.
          </p>
          <div className="bump-chart-container" style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', margin: '2rem 0', overflowX: 'auto' }}>
            <svg width="800" height="300" viewBox="0 0 800 300" style={{ minWidth: '600px', display: 'block', margin: '0 auto' }}>
              {/* Grid lines */}
              {[1, 2, 3, 4].map(rank => (
                <line key={`grid-${rank}`} x1="80" y1={rank * 60} x2="720" y2={rank * 60} stroke="#334155" strokeDasharray="4 4" />
              ))}
              {/* X Axis labels */}
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, i) => (
                <text key={week} x={150 + i * 166.6} y="280" fill="#94a3b8" fontSize="14" textAnchor="middle">{week}</text>
              ))}
              {/* Y Axis labels */}
              {[1, 2, 3, 4].map(rank => (
                <text key={`y-${rank}`} x="60" y={rank * 60 + 5} fill="#94a3b8" fontSize="14" textAnchor="end">{rank}위</text>
              ))}
              
              {/* Lines */}
              {[
                { id: 'Particle', color: '#3b82f6', ranks: [1, 1, 1, 2] },
                { id: 'CD Drift', color: '#f59e0b', ranks: [4, 3, 2, 1] },
                { id: 'Scratch',  color: '#10b981', ranks: [2, 2, 4, 4] },
                { id: 'Mura',     color: '#8b5cf6', ranks: [3, 4, 3, 3] },
              ].map(series => (
                <g key={series.id}>
                  <polyline 
                    points={series.ranks.map((r, i) => `${150 + i * 166.6},${r * 60}`).join(' ')} 
                    fill="none" 
                    stroke={series.color} 
                    strokeWidth="4" 
                    strokeLinejoin="round"
                  />
                  {series.ranks.map((r, i) => (
                    <g key={`${series.id}-${i}`}>
                      <circle cx={150 + i * 166.6} cy={r * 60} r="16" fill="#1e293b" stroke={series.color} strokeWidth="3" />
                      <text x={150 + i * 166.6} y={r * 60 + 5} fill="#f8fafc" fontSize="14" textAnchor="middle" fontWeight="bold">{r}</text>
                      {i === 3 && (
                        <text x={150 + i * 166.6 + 25} y={r * 60 + 5} fill={series.color} fontSize="14" fontWeight="bold">{series.id}</text>
                      )}
                      {i === 0 && (
                        <text x={150 + i * 166.6 - 25} y={r * 60 + 5} fill={series.color} fontSize="14" textAnchor="end" fontWeight="bold">{series.id}</text>
                      )}
                    </g>
                  ))}
                </g>
              ))}
            </svg>
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', marginTop: '1rem' }}>
              실무 데이터 기반 시각화: 'CD Drift'가 4주 만에 4위에서 1위로 급상승하며 최우선 조치 대상으로 부상함.
            </p>
          </div>
          <div className="concept-grid">
            <div className="concept-card">
              <span>순위 유지 (Horizontal)</span>
              <h3>고질적 불량 요인</h3>
              <p>항상 상위권을 유지하는 불량으로, 근본적인 공정 개선이나 설비 개조가 필요한 장기 과제입니다.</p>
            </div>
            <div className="concept-card">
              <span>순위 상승 (Upward)</span>
              <h3>신규 돌발성 요인</h3>
              <p>갑자기 순위가 급상승하는 불량으로, 최근 변경된 작업자, 자재, 파츠 수명 등을 즉각 확인해야 합니다.</p>
            </div>
            <div className="concept-card">
              <span>순위 하락 (Downward)</span>
              <h3>개선 효과 검증</h3>
              <p>최근 진행한 개선 대책이나 조건 변경이 실제로 효과가 있었는지 검증하는 지표가 됩니다.</p>
            </div>
          </div>
          <div className="prompt-example" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginTop: '2rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a' }}>💡 순위 변동 차트 생성을 위한 AI 프롬프트 예시</h4>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#334155', fontSize: '0.95rem', lineHeight: '1.5', fontFamily: 'inherit' }}>
{`내가 제공한 defect_log.csv 데이터를 바탕으로 불량 순위 변동 차트(Bump Chart)를 그려줘.
1. X축은 '주차(Week)'로 설정하고 최근 4주치 데이터를 반영할 것.
2. Y축은 '불량 발생 건수 순위(1위~5위)'로 뒤집어서(1위가 맨 위에 오도록) 표시할 것.
3. 각 불량 유형(defect_type)별로 선 색상을 다르게 지정하고, 각 데이터 포인트에 해당 주차의 순위를 텍스트로 적어줄 것.
4. 순위가 급상승(예: 2계단 이상 상승)한 불량 유형이 있다면 차트 옆에 강조해서 요약해 줘.`}
            </pre>
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
          <div className="compare-grid">
            {promptComparison.map((item) => (
              <article className="compare-card" key={item.label}>
                <strong>{item.label}</strong>
                <p>{item.text}</p>
                <span>{item.note}</span>
              </article>
            ))}
          </div>
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
5. severity를 반영한 손실 점수 파레토를 옵션으로 표시
6. 우선 조치 후보 3개를 "불량명 / 근거 / 확인할 데이터 / 다음 실험" 형식으로 출력

검증:
- 전체 행 수와 집계 합계가 맞는지 표시
- 결측 defect_type, 잘못된 date, 중복 panel_id를 경고
- 원본 행 수, 제외 행 수, 분석 사용 행 수를 각각 표시
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
            파레토 차트는 강력하지만 기준을 잘못 잡으면 엉뚱한 조치로 이어집니다. 마지막 구간은 AI 결과를 회의 자료로 쓰기 전에 반드시 확인할 항목을 정리합니다.
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
            <strong>보고서 문장 템플릿</strong>
            <p>
              “최근 4주 기준 [불량명]은 [건수/점유율/변화율]로 우선 확인 대상입니다. [비교 불량]과 달리 [판단 근거]가 있으므로 [확인할 데이터]를 먼저 보고 [다음 액션]을 진행합니다.”
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
