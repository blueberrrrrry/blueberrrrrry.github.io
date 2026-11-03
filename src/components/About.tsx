import { motion } from 'framer-motion'
import { Heart, Code, Database, Users } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: '서비스 기획 & 설계',
      description: '아이디어를 구체적인 기능과 화면 단위의 요구사항으로 정의하고 실현 가능한 프로덕트로 설계'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: '데이터 기반 의사결정',
      description: '정량적 지표와 정성적 피드백을 분석하여 가설을 수립하고 최적의 프로덕트 방향성을 도출'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '사용자 중심',
      description: '실제 사용자의 니즈를 파악하고 직관적이며 효율적인 사용자 경험을 설계'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: '문제 해결',
      description: '복잡한 비즈니스 요구사항을 분석하고 창의적인 기술 솔루션으로 해결'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-apple-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-apple-dark dark:text-white mb-6">
            IT <span className="text-gradient-apple">최윤아</span>
          </h2>

        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start lg:items-center">
          {/* 왼쪽: 프로필 사진 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col items-center"
          >
            <div className="relative mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={`${import.meta.env.BASE_URL}profile.png`}
                  alt="최윤아 프로필 사진"
                  className="w-64 h-[21rem] rounded-3xl object-cover shadow-2xl"
                />
                {/* 프로필 사진 테두리 그라데이션 */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-apple-blue/20 to-purple-500/20 -z-10 transform translate-x-2 translate-y-2"></div>
              </motion.div>
            </div>
            
          </motion.div>

          {/* 중간: 소개 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-6 bg-apple-gray-50/80 dark:bg-apple-gray-700/40 rounded-3xl border border-apple-gray-200 dark:border-apple-gray-700 p-6 md:p-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-apple-dark dark:text-white">
              안녕하세요, 최윤아입니다!
            </h3>
            
            <div className="space-y-4 text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed">
              <p>
                저는 무엇을 만들지보다, 왜 필요한지를 먼저 묻는 편입니다.
                아이디어를 사용자 흐름과 우선순위로 정리하고, 실제로 쓰이는 서비스로 연결해왔습니다.
              </p>
              
              <p>
                <strong className="text-apple-blue">편의점 종합 솔루션</strong>에서는 고객·점주·본사가 함께 움직이는 구조를,
                <strong className="text-apple-blue"> 쇼핑몰 통합 플랫폼</strong>에서는 탐색부터 결제까지의 구매 흐름을,
                <strong className="text-apple-blue"> 리듬게임</strong>,
                <strong className="text-apple-blue"> 라쿤게임</strong>,
                <strong className="text-apple-blue"> 윷잡자</strong>,
                <strong className="text-apple-blue"> 파워킹</strong>에서는
                플레이어가 바로 이해하고 반복하고 싶은 경험을 중심으로 제품을 만들어왔습니다.
              </p>

               <p>
                또한 Cursor랑 Antigravity 등 다양한 <strong className="text-apple-blue">바이브 코딩(Vibe Coding) </strong>툴을 깊이 이해하고 능숙하게 활용하고 함께 다듬는 협업에도 익숙합니다.
                제가 잘하는 일은 기능 목록을 늘리는 것이 아니라, <strong className="text-apple-blue">필요한 경험을 선명하게 만드는 것</strong>입니다.
              </p>
            </div>

          </motion.div>

        </div>

        {/* 핵심 역량 - 리스트형 UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-apple-dark dark:text-white text-center mb-12">
            핵심 역량
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-5 md:p-6 bg-white dark:bg-apple-gray-700 border border-apple-gray-300 dark:border-apple-gray-600 rounded-2xl card-hover h-full"
              >
                <div className="flex items-start gap-4">
                  <div className="text-apple-blue mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-apple-dark dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
        
      </div>
    </section>
  )
}

export default About