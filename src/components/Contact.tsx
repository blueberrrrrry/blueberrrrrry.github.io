import { motion } from 'framer-motion'
import { trackContactClick } from '../utils/analytics'

const Contact = () => {

  const contactInfo = [
    {
      title: '이메일',
      value: 'pinuts67@naver.com',
      href: 'mailto:pinuts67@naver.com',
      description: '',
      type: 'email' as const
    },
    {
      title: '전화번호',
      value: '010-8875-6708',
      href: 'tel:010-8875-6708',
      description: '',
      type: 'phone' as const
    },
    {
      title: 'GitHub',
      value: 'github.com/blueberrrrrry',
      href: 'https://github.com/blueberrrrrry',
      description: '',
      type: 'github' as const
    }
  ]

  return (
    <section id="contact" className="py-20 bg-apple-gray-50 dark:bg-apple-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          
          <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
            
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* 왼쪽: 연락처 정보 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-3"
          >
            <div>
              <h3 className="text-2xl font-bold text-apple-dark dark:text-white mb-6">
                연락처 정보
              </h3>
            </div>

            {/* 연락처 카드들 */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  onClick={info.type ? () => trackContactClick(info.type!) : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01, x: 6 }}
                  className="p-6 bg-white dark:bg-apple-gray-800 rounded-2xl shadow-lg border border-apple-gray-200 dark:border-apple-gray-700 card-hover block"
                >
                  <div>
                    <h4 className="font-semibold text-apple-dark dark:text-white">
                      {info.title}
                    </h4>
                    <p className="text-apple-blue font-medium">
                      {info.value}
                    </p>
                    <p className="text-sm text-apple-gray-600 dark:text-apple-gray-300">
                      {info.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

          </motion.div>

          {/* 오른쪽: 협업 카드 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="h-full rounded-3xl bg-white dark:bg-apple-gray-800 border border-apple-gray-200 dark:border-apple-gray-700 p-8 shadow-lg">
              <h4 className="text-xl font-bold text-apple-dark dark:text-white mb-3">
                함께 만들고 싶은 것
              </h4>
              <p className="text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed mb-6">
                사용자에게 실제로 도움이 되는 웹 서비스와 게임을 함께 만드는 협업을 선호합니다.
                아이디어 단계부터 구현, 개선까지 빠르게 실행하는 팀과 잘 맞습니다.
              </p>
              <div className="space-y-3 mb-8">
                <div className="rounded-xl bg-apple-gray-50 dark:bg-apple-gray-700/50 px-4 py-3 text-sm text-apple-gray-700 dark:text-apple-gray-200">
                  - 웹 서비스 MVP 설계 및 구현
                </div>
                <div className="rounded-xl bg-apple-gray-50 dark:bg-apple-gray-700/50 px-4 py-3 text-sm text-apple-gray-700 dark:text-apple-gray-200">
                  - 게임/인터랙션 프로토타이핑
                </div>
                <div className="rounded-xl bg-apple-gray-50 dark:bg-apple-gray-700/50 px-4 py-3 text-sm text-apple-gray-700 dark:text-apple-gray-200">
                  - 데이터 구조 설계 및 개선
                </div>
              </div>
              <motion.a
                href="mailto:pinuts67@naver.com"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="apple-button w-full bg-gradient-to-r from-rose-500 to-violet-500 text-white px-6 py-3 rounded-xl font-semibold text-center block"
              >
                메일로 문의하기
              </motion.a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default Contact