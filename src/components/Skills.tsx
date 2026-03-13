import { motion } from 'framer-motion'
import { useState } from 'react'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const skillCategories = {
    frontend: {
      title: 'Frontend',
      icon: '💻',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'JavaScript', icon: '🟨' },
        { name: 'HTML/CSS', icon: '🎨' },
        { name: 'Tailwind CSS', icon: '🎯' }
      ]
    },
    backend: {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', icon: '⬢' },
        { name: 'Express.js', icon: '🚂' },
        { name: 'RESTful API', icon: '🔗' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Supabase', icon: '🗃️' }
      ]
    },
    ai: {
      title: 'Game & Tools',
      icon: '🤖',
      skills: [
        { name: 'Unity', icon: '🎮' },
        { name: 'C#', icon: '🧩' },
        { name: 'Git', icon: '📁' },
        { name: 'Vite', icon: '⚡' },
        { name: 'WebGL Build', icon: '🕹️' },
        { name: 'Cursor', icon: '🤝' }
      ]
    }
  }

  const categories = Object.keys(skillCategories) as Array<keyof typeof skillCategories>
  
  type SkillCategory = keyof typeof skillCategories
  type Skill = typeof skillCategories[SkillCategory]['skills'][0]

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white via-rose-50/30 to-violet-50/20 dark:from-apple-gray-900 dark:via-apple-gray-900 dark:to-apple-gray-900">
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
            기술 <span className="text-gradient-apple">스택</span>
          </h2>
          <p className="text-lg text-apple-gray-700 dark:text-apple-gray-300 max-w-3xl mx-auto">
            웹, 게임, 모바일 스택을 유연하게 활용해 실제 동작하는 제품을 구현합니다
          </p>
        </motion.div>

        {/* 카테고리 탭 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-white dark:bg-apple-gray-800 rounded-2xl p-1.5 shadow-sm border border-rose-100 dark:border-apple-gray-700">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white shadow-md'
                    : 'text-apple-gray-700 dark:text-apple-gray-300 hover:bg-rose-50 dark:hover:bg-apple-gray-700'
                }`}
              >
{skillCategories[category].icon}
                <span className="ml-2">{skillCategories[category].title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 스킬 리스트 */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skillCategories[activeCategory as SkillCategory].skills.map((skill: Skill, index: number) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="
                  bg-white dark:bg-apple-gray-800
                  border border-rose-100 dark:border-apple-gray-700
                  rounded-2xl p-5 text-center
                  shadow-sm hover:shadow-lg
                  transition-all duration-300
                  cursor-pointer group
                "
              >
                {/* 아이콘 */}
                <div className="text-2xl mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={skill.name === 'Node.js' ? 'text-green-500 text-4xl leading-none inline-block' : ''}>
                    {skill.icon}
                  </span>
                </div>

                {/* 스킬 이름 */}
                <h3 className="text-sm md:text-base font-semibold text-apple-dark dark:text-white leading-tight">
                  {skill.name}
                </h3>

                {/* 미니멀한 액센트 */}
                <div className="mt-3 h-0.5 w-10 mx-auto bg-gradient-to-r from-rose-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 하단 특화 기술 소개 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-rose-50 to-violet-50 dark:from-apple-gray-800 dark:to-apple-gray-800 border border-rose-100 dark:border-apple-gray-700 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-apple-dark dark:text-white mb-4">
              특화 분야
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">⚙️</div>
                <h4 className="font-semibold text-apple-dark dark:text-white mb-1">
                  백엔드 서비스 개발
                </h4>
                <p className="text-sm text-apple-gray-700 dark:text-apple-gray-300">
                  Node.js 기반 API 설계, 인증/권한 처리, 비즈니스 로직 구현과 운영 흐름까지 고려한 백엔드 개발
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🗄️</div>
                <h4 className="font-semibold text-apple-dark dark:text-white mb-1">
                  데이터베이스 아키텍처
                </h4>
                <p className="text-sm text-apple-gray-700 dark:text-apple-gray-300">
                  PostgreSQL 데이터 모델링, 관계 설계, RLS 권한 정책, 조회 성능을 고려한 DB 구조 설계
                </p>
              </div>
              <div>
                <div className="text-4xl mb-2">🚀</div>
                <h4 className="font-semibold text-apple-dark dark:text-white mb-1">
                  적극적인 바이브 코딩 툴 사용
                </h4>
                <p className="text-sm text-apple-gray-700 dark:text-apple-gray-300">
                  AI와 함께 생각하고, 함께 코딩하는 개발로 <br></br>
                   빠른 프로토타이핑·아이디어 검증·실시간 협업이 가능
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills