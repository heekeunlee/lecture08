const lessonGoals = [
  {
    step: '학습목표 1',
    title: '핵심 개념 정리',
    body: '강의 주제가 확정되면 수강생이 먼저 이해해야 할 개념과 판단 기준을 이 위치에 배치합니다.',
  },
  {
    step: '학습목표 2',
    title: '현장 데이터 연결',
    body: '반도체, 디스플레이, 2차전지 공정의 실제 데이터와 업무 상황을 연결하는 목표를 배치합니다.',
  },
  {
    step: '학습목표 3',
    title: 'AI 작업지시서 실습',
    body: 'AI에게 맡길 산출물, 입력 데이터, 검증 기준을 정의하는 실습 목표를 배치합니다.',
  },
];

const lessonFlow = [
  { time: '3분', label: '목표 확인' },
  { time: '7분', label: '개념 정리' },
  { time: '12분', label: '실무 사례' },
  { time: '13분', label: '작업지시서/실습' },
  { time: '5분', label: '검증/정리' },
];

const placeholderSections = [
  {
    label: '02. 핵심 개념',
    title: '이 섹션에는 강의의 핵심 개념을 01강과 같은 문서형 흐름으로 배치합니다',
    intro: '카드형 슬라이드 덱이 아니라 세로로 읽히는 교안 구조를 유지합니다. 제목, 본문, 보조 카드, 실습 흐름은 이 폭과 여백 안에서 확장합니다.',
  },
  {
    label: '03. 실무 사례',
    title: '반도체, 디스플레이, 2차전지 현장의 사례를 같은 카드 규칙으로 정리합니다',
    intro: '사례가 추가되더라도 로고 위치, 제목 크기, 섹션 라벨, 본문 최대 폭은 01강 기준을 유지합니다.',
  },
  {
    label: '04. 실습 및 검증',
    title: 'AI 작업지시서와 결과 검증 기준을 수강생이 바로 따라할 수 있게 배치합니다',
    intro: '향후 내용 작성 시에도 이 기본 레이아웃 위에서 카드와 표만 추가하면 01강과 같은 양식을 유지할 수 있습니다.',
  },
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
          <h1>Ch.8강의 교안</h1>
          <p className="subtitle">01강과 동일한 문서형 교안 양식으로 준비된 08강 기본 템플릿</p>
          <div className="lesson-meta" aria-label="lesson summary">
            <span>40분</span>
            <span>실습 포함</span>
            <span>반도체</span>
            <span>디스플레이</span>
            <span>2차전지</span>
          </div>
        </div>
      </header>

      <main>
        <section className="overview-section">
          <span className="section-label">01. 오프닝 및 학습목표</span>
          <h2>오늘 여러분은 08강의 핵심 내용을 AI 작업지시서와 실무 데이터 흐름으로 연결하는 방법을 배우게 됩니다</h2>
          <p className="section-intro">
            이 페이지는 향후 강의 내용이 들어가기 전에도 01강과 같은 로고 위치, 제목 크기, 폭, 여백, 섹션 라벨, 학습목표 카드 양식을 유지하도록 만든 기본 교안입니다.
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

        {placeholderSections.map((section) => (
          <section className="teaching-section" key={section.label}>
            <span className="section-label">{section.label}</span>
            <h2>{section.title}</h2>
            <p className="section-intro">{section.intro}</p>
            <div className="placeholder-panel">
              <strong>내용 작성 영역</strong>
              <p>추후 본문, 도표, 실습 단계, 코드 예시를 이 영역에 추가합니다.</p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
