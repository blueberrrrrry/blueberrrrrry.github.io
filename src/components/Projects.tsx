import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import {
  ExternalLink,
  Play,
  Database,
  Brain,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Award,
  TrendingUp,
  Bug,
  CheckCircle,
  X,
  Layers,
  Users,
  Clock,
  Star,
  BookOpen,
} from 'lucide-react'
import { trackProjectClick } from '../utils/analytics'

// 타입 정의
type ProjectStatus = 'LIVE' | 'BETA' | 'DEVELOPMENT'
type TabType = 'overview' | 'achievements' | 'troubleshooting' | 'metrics'

// 상수 정의
const DISPLAY_LIMITS = {
  MAIN_FEATURES: 4,
  MAIN_TECHNOLOGIES: 6,
  CARD_TECHNOLOGIES: 4,
  DESCRIPTION_LENGTH: 100
} as const

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  achievements: Array<{
    title: string
    description: string
  }>
  troubleshooting: Array<{
    problem: string
    solution: string
    impact: string
  }>
  metrics: {
    codeLines: string
    testCoverage?: string
    buildTime?: string
    users?: string
    performance?: string
  }
  deployUrl: string
  githubUrl: string
  docsUrl?: string
  status: ProjectStatus
  color: string
  icon: React.ReactNode
  featured: boolean
  category: string
  period: string
  team: string
  media?: {
    images?: string[]  // 프로젝트 이미지 URLs
    videos?: string[]  // 프로젝트 영상 URLs
  }
}

// 재사용 가능한 컴포넌트들
const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const statusConfig = {
    LIVE: { bg: 'bg-green-100 text-green-800', dotBg: 'bg-green-400' },
    BETA: { bg: 'bg-blue-100 text-blue-800', dotBg: 'bg-blue-400' },
    DEVELOPMENT: { bg: 'bg-yellow-100 text-yellow-800', dotBg: 'bg-yellow-400' }
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg}`}>
      <span className={`w-2 h-2 rounded-full mr-1 animate-pulse ${config.dotBg}`} />
      {status}
    </span>
  )
}

const LINK_PLACEHOLDER = '수정해야할 링크'
const shouldShowLiveDemo = (deployUrl: string): boolean =>
  deployUrl !== '#' && deployUrl !== LINK_PLACEHOLDER

const ProjectActions = ({
  project,
  onViewDetails,
  showViewDetails = true
}: {
  project: Project
  onViewDetails: () => void
  showViewDetails?: boolean
}) => {
  const hasLiveDemo = shouldShowLiveDemo(project.deployUrl)

  if (!hasLiveDemo && !showViewDetails) {
    return (
      <div className="w-full px-6 py-3 rounded-xl font-semibold text-center bg-apple-gray-100 text-apple-gray-500 border border-apple-gray-200">
        개발 진행 중
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {showViewDetails && (
        <motion.button
          onClick={onViewDetails}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            hasLiveDemo ? 'flex-1' : 'w-full'
          } apple-button bg-gradient-to-r ${project.color} text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg`}
          aria-label={`${project.title} 상세 정보 보기`}
        >
          <Play size={20} />
          <span>상세 보기</span>
        </motion.button>
      )}

      {hasLiveDemo && (
        <motion.a
          href={project.deployUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackProjectClick(project.title, 'live_demo')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${
            showViewDetails ? 'flex-1' : 'w-full'
          } apple-button border-2 border-rose-200 text-rose-500 px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:border-rose-500 hover:text-rose-600 transition-colors duration-200`}
          aria-label={`${project.title} 라이브 데모 보기`}
        >
          <ExternalLink size={20} />
          <span>라이브 데모</span>
        </motion.a>
      )}

    </div>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [overviewImageIndex, setOverviewImageIndex] = useState(0)
  const publicBase = import.meta.env.BASE_URL

  const projects: Project[] = [
    {
      id: 1,
      title: 'Shopping Mall - 쇼핑몰 통합 솔루션',
      subtitle: '검색부터 결제까지 이어지는 커머스 경험',
      description: '상품 탐색, 장바구니, 주문/결제, 관리자 상품 관리까지 포함한 풀스택 쇼핑몰 프로젝트입니다. 사용자 구매 전환 흐름과 운영 효율을 고려해 설계했습니다.',
      image: '/api/placeholder/800/500',
      category: '웹 애플리케이션, 이커머스',
      period: '2025.08 - 2025.09',
      team: '팀 프로젝트',
      technologies: ['React 18', 'TypeScript', 'Supabase', 'React Query', 'React Router', 'TailwindCSS', 'Vite', '토스페이먼츠'],
      features: [
        '카테고리/필터/검색 기반 상품 탐색',
        '장바구니 및 주문 상태 즉시 반영',
        '토스페이먼츠 결제 연동 및 결제 검증',
        '관리자 상품/재고/주문 통합 관리'
      ],
      achievements: [
        {
          title: '주요 구매 흐름 구현',
          description: '상품 상세, 장바구니, 결제 페이지를 연결해 기본 구매 플로우를 구성'
        },
        {
          title: '결제 프로세스 연동',
          description: '토스페이먼츠 결제 요청/응답 처리와 주문 상태 변경 로직을 구현'
        },
        {
          title: '관리자 기능 구현',
          description: '상품/재고/주문 상태를 확인하고 수정할 수 있는 관리 화면을 구성'
        }
      ],
      troubleshooting: [
        {
          problem: '결제 성공 페이지 재진입 시 주문 생성 로직이 중복 실행될 수 있는 문제',
          solution: 'PaymentSuccessPage에서 hasProcessedRef와 paymentKey 기반 중복 체크를 적용해 주문 생성 1회만 수행',
          impact: '중복 주문 생성 가능성을 줄이고 결제 후 처리 안정성을 높임'
        },
        {
          problem: '검색 자동완성에서 중복 키워드와 노이즈 결과가 섞여 검색 경험이 떨어지는 문제',
          solution: 'searchService에서 2글자 이상 입력 조건, 중복 제거(Set), startsWith 우선 정렬 로직을 적용',
          impact: '자동완성 품질이 개선되어 원하는 상품 탐색 속도를 높임'
        },
        {
          problem: '장바구니에서 전체 선택/부분 선택 전환 시 선택 상태가 어긋나는 문제',
          solution: 'CartContext에서 selectedItems를 분리 관리하고 사용자 상태에 따라 DB/로컬 업데이트 경로를 명확히 분기',
          impact: '선택 상태 일관성이 개선되어 주문 직전 수량·금액 확인 신뢰도를 높임'
        }
      ],
      metrics: {
        codeLines: '38,400+'
      },
      deployUrl: 'https://blueberrrrrry.github.io/dept/',
      githubUrl: '수정해야할 링크',
      status: 'LIVE',
      color: 'from-pink-500 to-rose-600',
      icon: <Smartphone className="w-8 h-8" />,
      featured: true
    },
    {
      id: 2,
      title: '3D Rhythm Game - 3D 리듬 액션 게임',
      subtitle: '비트로 완성하는 몰입형 3D 리듬 액션',
      description: 'Unity(WebGL)와 React 웹을 연동한 3D 리듬게임입니다. 3D 로비, 리듬 플레이, WebGL 실행 최적화 등 실제 플레이 흐름 중심 기능을 개발했습니다.',
      image: '/api/placeholder/800/500',
      category: '게임 개발, 웹 애플리케이션',
      period: '2025.09 - 2025.10',
      team: '팀 프로젝트',
      technologies: ['Unity', 'C#', 'React', 'TypeScript', 'Socket.IO', 'WebGL', 'Node.js', 'Express.js', 'Vite'],
      features: [
        '3D 학교 로비 및 곡 선택 화면',
        '2곡 리듬 플레이와 기본 판정 시스템',
        'WebGL 실행 및 화면 전환 흐름 최적화',
        '점수 집계 및 결과 화면 제공'
      ],
      achievements: [
        {
          title: '크로스 플랫폼 연동 구현',
          description: 'Unity 게임과 React 웹 간 플레이 흐름을 설계하고 연동 구조를 구현'
        },
        {
          title: '게임 핵심 루프 구현',
          description: '로비 진입부터 플레이, 결과 확인까지 기본 게임 루프를 구성'
        },
        {
          title: 'WebGL 빌드 연동',
          description: 'WebGL 빌드 결과물을 웹 페이지와 연동해 브라우저에서 실행 가능하게 구성'
        }
      ],
      troubleshooting: [
        {
          problem: 'Unity WebGL과 웹 페이지 임베딩 시 로딩/전환 불안정',
          solution: '로딩 상태 분기와 초기화 타이밍을 분리해 화면 전환 안정성을 개선',
          impact: '초기 진입 실패율 감소 및 플레이 시작 속도 개선'
        },
        {
          problem: '초기 진입 시 화면 전환 타이밍이 어긋나 플레이 시작이 지연되는 문제',
          solution: '초기화 시점과 화면 전환 상태를 분리해 렌더링 순서를 안정화',
          impact: '플레이 진입 속도 개선 및 체감 안정성 향상'
        },
        {
          problem: '음원 재생과 노트 타이밍 간 미세한 싱크 오차',
          solution: '노트 시작 오프셋 보정값을 도입하고 곡별 타이밍을 개별 조정',
          impact: '판정 체감 품질 개선'
        }
      ],
      metrics: {
        codeLines: '102,500+'
      },
      deployUrl: 'https://blueberrrrrry.github.io/rhythmgame/',
      githubUrl: '수정해야할 링크',
      status: 'LIVE',
      color: 'from-violet-500 to-fuchsia-600',
      icon: <Smartphone className="w-8 h-8" />,
      featured: true
    },
    {
      id: 3,
      title: 'Convi - 편의점 종합 솔루션',
      subtitle: '디지털 혁신으로 편의점을 재정의하다',
      description: '완전한 상용 수준의 편의점 통합 관리 플랫폼입니다. 고객, 점주, 본사가 실시간으로 연결되어 주문부터 재고 관리, 매출 분석까지 모든 비즈니스 프로세스를 자동화합니다.',
      image: '/api/placeholder/800/500',
      category: '웹 애플리케이션',
      period: '2026.01 - 2026.02',
      team: '팀 프로젝트',
      technologies: ['React 19', 'TypeScript', 'TailwindCSS', '토스페이먼츠', 'PostgreSQL', 'RLS', 'Render'],
      features: [
        '실시간 주문 및 재고 관리 시스템',
        '토스페이먼츠 결제 연동',
        '주문/재고/프로모션/쿠폰 중심 데이터베이스 설계',
        '본사-점주-고객 3자 실시간 통합 관리',
      ],
      achievements: [
        {
          title: '핵심 업무 흐름 구현',
          description: '주문, 재고, 결제, 권한 제어 등 편의점 운영 핵심 기능을 구현'
        },
        {
          title: '데이터베이스 스키마 설계',
          description: '확장 가능한 데이터 구조와 관계를 설계해 운영 기능을 뒷받침'
        },
        {
          title: '실시간 데이터 동기화 구현',
          description: '실시간 구독 기반 주문 및 재고 관리 시스템'
        }
      ],
      troubleshooting: [
        {
          problem: 'RLS(Row Level Security) 정책 설정 복잡성',
          solution: 'RLS 정책을 사용자 역할별로 세분화하여 구현. 각 테이블마다 적절한 권한 설정으로 데이터 보안 강화',
          impact: '역할별 데이터 접근 제어 기준을 정리해 운영 안정성을 높임'
        },
        {
          problem: '실시간 데이터 동기화 성능 이슈',
          solution: '실시간 구독 기반 선택적 업데이트 시스템 구현. 필요한 데이터만 갱신하도록 최적화',
          impact: '실시간 업데이트 속도 개선'
        },
        {
          problem: '토스페이먼츠 결제 연동 중 상태 관리 복잡성',
          solution: '결제 컴포넌트 상태(isProcessing/showTossWidget)와 성공/실패 라우트를 분리해 결제 흐름을 정리',
          impact: '결제 단계 이탈을 줄이고 처리 흐름의 추적성을 개선'
        }
      ],
      metrics: {
        codeLines: '46,700+'
      },
      deployUrl: 'https://blueberrrrrry.github.io/Convi/',
      githubUrl: '수정해야할 링크',
      status: 'LIVE',
      color: 'from-blue-500 to-indigo-600',
      icon: <Database className="w-8 h-8" />,
      featured: true
    },
    {
      id: 4,
      title: 'Raccon Game - 모션인식 기반 캐주얼 게임',
      subtitle: '모션인식 입력으로 즐기는 캐주얼 아케이드 플레이',
      description: '사용자 모션인식 입력을 게임 조작으로 연결한 웹 기반 캐주얼 게임 프로젝트입니다. 브라우저에서 바로 실행되도록 구성하고, 빠른 반응성과 반복 플레이 재미에 집중했습니다.',
      image: '/api/placeholder/800/500',
      category: '웹 게임, 모션인식',
      period: '2025.06 - 2025.07',
      team: '개인 프로젝트',
      technologies: ['JavaScript', 'Three.js', 'TensorFlow.js', 'MediaPipe', 'WebGL', 'GLTF/FBX Loader', 'HTML/CSS'],
      features: [
        '모션인식으로 동물을 전환하고 동물 능력으로 장애물을 해결하는 플레이',
        '스테이지 난이도 단계별 진행 시스템',
        '장애물 패턴 기반 생존형 게임 루프',
        '게임 오버/재시작 및 기본 UI 흐름',
      ],
      achievements: [
        {
          title: '핵심 플레이 구현',
          description: '이동-회피-생존 루프를 중심으로 짧고 반복 가능한 플레이 구조를 구현'
        },
        {
          title: '패턴형 스테이지 구성',
          description: '장애물 배치와 속도 곡선을 조정해 난이도 구간별 플레이 리듬을 정리'
        },
        {
          title: '플레이 가능한 빌드 제작',
          description: '핵심 기능 기준으로 단독 빌드를 정리하고 테스트 가능한 형태로 구성'
        }
      ],
      troubleshooting: [
        {
          problem: '장애물 충돌 판정이 프레임에 따라 다르게 느껴지는 문제',
          solution: '충돌 범위와 판정 타이밍 기준을 통일해 판정 일관성을 확보',
          impact: '오판정 감소 및 조작 신뢰도 향상'
        },
        {
          problem: '이펙트가 많은 구간에서 프레임 저하가 발생',
          solution: '이펙트 재생 빈도와 렌더 순서를 조정해 연산량을 줄임',
          impact: '플레이 체감 부드러움 개선'
        },
        {
          problem: '스테이지 리스타트 시 상태 초기화 누락',
          solution: '게임 상태 머신을 도입해 시작/진행/종료 전환 시 공통 초기화 루틴을 강제',
          impact: '재시작 관련 버그 제거 및 안정성 향상'
        }
      ],
      metrics: {
        codeLines: '7,700+'
      },
      deployUrl: 'https://blueberrrrrry.github.io/RaccoonGame/',
      githubUrl: '수정해야할 링크',
      status: 'LIVE',
      color: 'from-emerald-500 to-teal-600',
      icon: <Brain className="w-8 h-8" />,
      featured: true
    },
    {
      id: 5,
      title: '윷잡자 - 3D 전통 윷놀이 게임',
      subtitle: '3D 공간에서 즐기는 전통 윷놀이',
      description: '윷 던지기, 말 이동, 승리 조건까지 구현한 3D 윷놀이 게임 프로젝트입니다. 3D 보드 연출과 턴 기반 로직으로 플레이 흐름을 구성했습니다.',
      image: '/api/placeholder/800/500',
      category: '게임 개발, 3D, 캐주얼',
      period: '2025.10 - 2025.11',
      team: '팀 프로젝트',
      technologies: ['Unity', 'C#', '3D Game', 'Turn-based Logic', 'State Machine', 'Firebase Realtime Database', 'UI Toolkit', 'Git', 'Android Build'],
      features: [
        '윷 던지기 결과(도/개/걸/윷/모) 판정 시스템',
        '말 이동·업기·잡기 규칙 자동 처리, 잡기 시 3D 전투 애니메이션 출력',
        '턴 기반 멀티플레이 진행 UI',
        '황금 발판 도달 시 이로운 효과 발동'
      ],
      achievements: [
        {
          title: '핵심 룰 엔진 구현',
          description: '윷 결과 처리, 말 이동, 업기/잡기, 승리 판정까지 턴 기반 규칙을 안정적으로 구현'
        },
        {
          title: '멀티플레이 UX 개선',
          description: '턴 안내, 선택 가능한 말 하이라이트, 진행 상태 표시로 플레이 흐름 이해도를 향상'
        },
        {
          title: '핵심 씬 구성',
          description: '메인/로비/대기실/게임 씬을 연결해 멀티플레이 진행 흐름을 구성'
        }
      ],
      troubleshooting: [
        {
          problem: '잡기/업기 규칙 충돌로 잘못된 말 상태가 저장되는 문제',
          solution: '행동 우선순위(잡기 > 업기 > 이동)를 명시한 규칙 테이블 기반 처리로 로직을 단일화',
          impact: '턴 결과 정확도 개선 및 규칙 오류 제거'
        },
        {
          problem: '동시 입력 시 턴 순서가 꼬이는 문제',
          solution: '서버 기준 턴 락과 액션 큐를 도입해 한 턴에 하나의 확정 액션만 처리',
          impact: '멀티플레이 진행 안정성 확보'
        },
        {
          problem: '모바일 화면에서 말 선택 UI 오작동',
          solution: '터치 영역 확장 및 제스처 충돌 방지 로직을 적용해 선택 이벤트 정확도를 개선',
          impact: '모바일 조작 오류 감소 및 완주율 향상'
        }
      ],
      metrics: {
        codeLines: '22,100+'
      },
      deployUrl: '수정해야할 링크',
      githubUrl: '수정해야할 링크',
      docsUrl: 'https://dockdock-production.up.railway.app/api-docs',
      status: 'LIVE',
      color: 'from-green-500 to-emerald-600',
      icon: <BookOpen className="w-8 h-8" />,
      featured: true,
      media: {
        images: [
          `${publicBase}Yutjabja/Yutjabja1.png`,
          `${publicBase}Yutjabja/Yutjabja2.png`,
          `${publicBase}Yutjabja/Yutjabja3.png`,
          `${publicBase}Yutjabja/Yutjabja4.png`,
          `${publicBase}Yutjabja/Yutjabja5.png`,
          `${publicBase}Yutjabja/Yutjabja6.png`
        ]
      }
    },
    {
      id: 6,
      title: '파워킹 - 걸음수 기반 피트니스 게임',
      subtitle: '걷기 데이터를 게임화한 안드로이드 앱',
      description: '안드로이드 만보기 센서를 활용해 걸음 수를 추적하고, 코인/스탯/전투/랭킹 요소로 연결한 피트니스 게임 앱입니다.',
      image: '/api/placeholder/800/500',
      category: '안드로이드 앱, 피트니스 게임',
      period: '2025.11 - 2025.12',
      team: '팀 프로젝트',
      technologies: ['Kotlin', 'Jetpack Compose', 'MVVM', 'StateFlow', 'Coroutines', 'Room Database', 'Sensor API', 'Foreground Service', 'Material 3'],
      features: [
        '실시간 걸음 수 추적 및 코인 자동 획득',
        '캐릭터 스탯 강화 및 장비(모자) 시스템',
        '아레나 전투와 주간 랭킹 경쟁',
        'Room 기반 걸음 수/사용자 데이터 로컬 저장',
      ],
      achievements: [
        {
          title: '센서 기반 핵심 루프 구현',
          description: '걸음 수 추적 → 코인 보상 → 캐릭터 성장으로 이어지는 게임 루프를 완성'
        },
        {
          title: '안드로이드 네이티브 구조 적용',
          description: 'Jetpack Compose + MVVM + StateFlow 구조로 화면/상태 흐름을 일관되게 구성'
        },
        {
          title: '데이터 영속성 확보',
          description: 'Room 엔티티/DAO로 걸음 기록과 사용자 정보를 안정적으로 저장/조회'
        }
      ],
      troubleshooting: [
        {
          problem: '앱이 백그라운드로 전환되면 걸음 수 추적이 끊기는 문제',
          solution: 'Foreground Service로 센서 추적을 유지하고 알림 채널을 통해 서비스 생존성을 확보',
          impact: '백그라운드 추적 안정성 향상'
        },
        {
          problem: '센서 노이즈로 걸음 수가 과다/누락 집계되는 문제',
          solution: '센서 이벤트 필터링과 기준값 보정을 적용해 잘못된 카운트를 최소화',
          impact: '걸음 수 집계 정확도 개선'
        },
        {
          problem: '전투 종료 후 점수/랭킹 UI 반영 순서가 엇갈려 표시가 늦게 갱신되는 문제',
          solution: '점수 DB 업데이트 이후 UI 상태 갱신과 랭킹 재조회 호출 순서를 정리',
          impact: '전투 종료 직후 랭킹/상태 반영 일관성 개선'
        }
      ],
      metrics: {
        codeLines: '4,300+'
      },
      deployUrl: '수정해야할 링크',
      githubUrl: '수정해야할 링크',
      status: 'LIVE',
      color: 'from-indigo-500 to-purple-600',
      icon: <TrendingUp className="w-8 h-8" />,
      featured: true,
      media: {
        images: [
          `${publicBase}Powerking/Powerking1.jpg`,
          `${publicBase}Powerking/Powerking2.jpg`,
          `${publicBase}Powerking/Powerking3.jpg`,
          `${publicBase}Powerking/Powerking4.jpg`,
          `${publicBase}Powerking/Powerking5.jpg`,
          `${publicBase}Powerking/Powerking6.jpg`
        ]
      }
    }
  ]

  // 성능 최적화: 메모이제이션
  const featuredProjects = useMemo(() => {
    const priorityProjectTitle = '편의점 종합 솔루션'
    return projects
      .filter(p => p.featured)
      .sort((a, b) => {
        const aPriority = a.title.includes(priorityProjectTitle) ? 1 : 0
        const bPriority = b.title.includes(priorityProjectTitle) ? 1 : 0
        return bPriority - aPriority
      })
  }, [projects])

  // 콜백 메모이제이션
  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project)
    setActiveTab('overview')
    setOverviewImageIndex(0)
    trackProjectClick(project.title, 'view_details')
  }, [])

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab)
  }, [])

  const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
      { id: 'overview', label: '개요', icon: <Layers size={16} /> },
      { id: 'achievements', label: '성과', icon: <Award size={16} /> },
      { id: 'troubleshooting', label: '트러블슈팅', icon: <Bug size={16} /> },
      { id: 'metrics', label: '지표', icon: <TrendingUp size={16} /> }
    ]

    const renderTabContent = () => {
      switch (activeTab) {
        case 'overview':
          const overviewImages = project.media?.images ?? []
          const hasOverviewImages = overviewImages.length > 0
          const safeIndex = hasOverviewImages ? overviewImageIndex % overviewImages.length : 0

          const goToNextImage = () => {
            if (!hasOverviewImages) return
            setOverviewImageIndex((prev) => (prev + 1) % overviewImages.length)
          }

          const goToPrevImage = () => {
            if (!hasOverviewImages) return
            setOverviewImageIndex((prev) => (prev - 1 + overviewImages.length) % overviewImages.length)
          }

          return (
            <div className="space-y-6">
              {hasOverviewImages && (
                <div>
                  <h5 className="font-semibold text-apple-dark mb-3">프로젝트 이미지</h5>
                  <div>
                    <div className="relative w-full overflow-hidden rounded-2xl border border-rose-100 dark:border-apple-gray-700 bg-apple-gray-50 dark:bg-apple-gray-900">
                      <div className="relative w-full h-64 md:h-[26rem]">
                        <img
                          src={overviewImages[safeIndex]}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-35"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
                        <img
                          src={overviewImages[safeIndex]}
                          alt={`${project.title} 개요 이미지 ${safeIndex + 1}`}
                          className="relative z-10 w-full h-full object-contain"
                          loading="lazy"
                        />

                        <button
                          type="button"
                          onClick={goToPrevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                          aria-label="이전 이미지"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={goToNextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                          aria-label="다음 이미지"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xl font-semibold text-apple-dark mb-4 flex items-center">
                  <Layers className="mr-2" size={20} />
                  프로젝트 개요
                </h4>
                <p className="text-apple-gray-700 leading-relaxed text-lg mb-6">
                  {project.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-apple-gray-600">
                      <Users className="mr-2" size={16} />
                      <span className="font-medium mr-2">팀:</span>
                      <span>{project.team}</span>
                    </div>
                    <div className="flex items-center text-sm text-apple-gray-600">
                      <Clock className="mr-2" size={16} />
                      <span className="font-medium mr-2">기간:</span>
                      <span>{project.period}</span>
                    </div>
                    <div className="flex items-center text-sm text-apple-gray-600">
                      <Star className="mr-2" size={16} />
                      <span className="font-medium mr-2">상태:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'LIVE' ? 'bg-green-100 text-green-800' :
                        project.status === 'BETA' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-apple-dark mb-3">주요 기능</h5>
                    <div className="space-y-2">
                      {project.features.slice(0, DISPLAY_LIMITS.MAIN_FEATURES).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-apple-gray-700">
                          <CheckCircle className="mr-2 text-green-500" size={14} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-apple-dark mb-3">기술 스택</h5>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm font-medium border border-rose-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        
        case 'achievements':
          return (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-apple-dark mb-4 flex items-center">
                <Award className="mr-2" size={20} />
                주요 성과
              </h4>
              {project.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white dark:bg-apple-gray-800 rounded-xl border border-rose-100 dark:border-apple-gray-700"
                >
                  <h5 className="font-semibold text-apple-dark dark:text-white mb-2 flex items-center">
                    <CheckCircle className="mr-2 text-green-500" size={16} />
                    {achievement.title}
                  </h5>
                  <p className="text-apple-gray-700 dark:text-apple-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )
        
        case 'troubleshooting':
          return (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-apple-dark mb-4 flex items-center">
                <Bug className="mr-2" size={20} />
                문제 해결 사례
              </h4>
              {project.troubleshooting.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white dark:bg-apple-gray-800 rounded-xl border border-rose-100 dark:border-apple-gray-700"
                >
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">문제</h5>
                      <p className="text-apple-gray-700 dark:text-apple-gray-300">{item.problem}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-blue-600 mb-2">해결책</h5>
                      <p className="text-apple-gray-700 dark:text-apple-gray-300">{item.solution}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">결과</h5>
                      <p className="text-apple-gray-700 dark:text-apple-gray-300">{item.impact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        
        case 'metrics':
          return (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-apple-dark mb-4 flex items-center">
                <TrendingUp className="mr-2" size={20} />
                프로젝트 지표
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-4 bg-white dark:bg-apple-gray-800 rounded-xl border border-rose-100 dark:border-apple-gray-700"
                  >
                    <div className="text-2xl font-bold text-rose-500 mb-2">{value}</div>
                    <div className="text-sm text-apple-gray-600 dark:text-apple-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        
        default:
          return null
      }
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-apple-gray-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-apple-gray-700 max-w-4xl w-full h-[92vh] max-h-[92vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="p-6 border-b border-rose-100 dark:border-apple-gray-700 shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} text-white`}>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-apple-dark dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-apple-gray-700 dark:text-apple-gray-300">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-rose-50 dark:hover:bg-apple-gray-800 rounded-full transition-colors"
                >
                  <X size={24} className="text-apple-gray-700 dark:text-apple-gray-300" />
                </button>
              </div>
              
              {/* 탭 네비게이션 */}
              <div className="flex space-x-1 mt-6 bg-rose-50 dark:bg-apple-gray-800 rounded-xl p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-apple-gray-700 text-rose-500 shadow-sm'
                        : 'text-apple-gray-700 dark:text-apple-gray-300 hover:text-rose-500'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 모달 콘텐츠 */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0">
              {renderTabContent()}
            </div>

            {/* 모달 푸터 */}
            <div className="p-6 border-t border-rose-100 dark:border-apple-gray-700 bg-rose-50/40 dark:bg-apple-gray-800/60 shrink-0">
              <ProjectActions
                project={project}
                onViewDetails={() => {}}
                showViewDetails={false}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white via-rose-50/20 to-white dark:from-apple-gray-900 dark:via-apple-gray-900 dark:to-apple-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-apple-dark dark:text-white mb-6">
            주요 <span className="text-gradient-apple">프로젝트</span>
          </h2>
          <p className="text-lg text-apple-gray-700 dark:text-apple-gray-300 max-w-3xl mx-auto">
            상용 수준의 웹 서비스와 게임 프로젝트를 소개합니다. 각 프로젝트를 클릭하여 상세 정보를 확인할 수 있습니다.
          </p>
        </motion.div>

        <div className="space-y-32 mb-32">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* 프로젝트 이미지 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative cursor-pointer ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-xl border border-rose-100 dark:border-apple-gray-800 group">
                  {/* 상태 배지 */}
                  <div className="absolute top-4 left-4 z-10">
                    <StatusBadge status={project.status} />
                  </div>

                  {/* 이미지 플레이스홀더 */}
                  <div className={`aspect-video bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <div className="mb-4">{project.icon}</div>
                      <div className="text-2xl font-bold">{project.title}</div>
                      <div className="text-lg opacity-80">{project.subtitle}</div>
                    </div>
                  </div>

                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-center">
                      <Play className="w-16 h-16 mx-auto mb-2" />
                      <p className="font-semibold">상세 정보 보기</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 프로젝트 정보 */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`space-y-6 bg-white dark:bg-apple-gray-800 border border-rose-100 dark:border-apple-gray-700 rounded-3xl p-7 shadow-sm ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-apple-dark dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className={`text-lg font-medium bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-4`}>
                    {project.subtitle}
                  </p>
                  <p className="text-apple-gray-700 dark:text-apple-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* 주요 기능 미리보기 */}
                <div>
                  <h4 className="text-lg font-semibold text-apple-dark dark:text-white mb-3">
                    주요 기능
                  </h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, DISPLAY_LIMITS.MAIN_FEATURES).map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-apple-gray-700 dark:text-apple-gray-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  {project.features.length > DISPLAY_LIMITS.MAIN_FEATURES && (
                    <button
                      onClick={() => handleProjectSelect(project)}
                      className="text-apple-blue hover:text-apple-blue/80 text-sm mt-2 flex items-center"
                    >
                      +{project.features.length - DISPLAY_LIMITS.MAIN_FEATURES}개 더 보기
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  )}
                </div>

                {/* 기술 스택 미리보기 */}
                <div>
                  <h4 className="text-lg font-semibold text-apple-dark dark:text-white mb-3">
                    기술 스택
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm font-medium border border-rose-100"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <ProjectActions
                  project={project}
                  onViewDetails={() => handleProjectSelect(project)}
                  showViewDetails={true}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 하단 Call-to-Action */}
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            setSelectedProject(null)
            setActiveTab('overview')
          }}
        />
      )}
    </section>
  )
}

export default Projects