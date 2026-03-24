import { motion } from 'framer-motion'
import { Sun, Moon, Menu, X, FileDown } from 'lucide-react'
import { useState } from 'react'
import { trackDarkModeToggle, trackNavigation } from '../utils/analytics'
import { scrollToSectionWithOffset } from '../utils/scrollToSection'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: '홈', href: '#hero' },
    { name: '소개', href: '#about' },
    { name: '프로젝트', href: '#projects' },
    { name: '기술', href: '#skills' },
    { name: '연락처', href: '#hero' }
  ]

  const scrollToSection = (href: string) => {
    const moved = scrollToSectionWithOffset(href)
    if (moved) {
      // 네비게이션 클릭 이벤트 추적
      trackNavigation(href.replace('#', ''))
    }
    setIsMenuOpen(false)
  }

  const handleDarkModeToggle = () => {
    toggleDarkMode()
    // 다크모드 토글 이벤트 추적
    trackDarkModeToggle(!darkMode)
  }

  const handleSaveAsPdf = () => {
    window.print()
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-rose-100/70 dark:border-apple-gray-700/70"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between rounded-2xl bg-white/80 dark:bg-apple-gray-800/80 border border-rose-100 dark:border-apple-gray-700 px-4 md:px-6 h-20 shadow-sm">
          {/* 로고 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-apple-dark dark:text-white"
          >
            최윤아의 포트폴리오
          </motion.div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-2 bg-rose-50/70 dark:bg-apple-gray-700/60 rounded-xl px-2 py-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 rounded-lg text-sm text-apple-gray-700 dark:text-apple-gray-200 hover:bg-white dark:hover:bg-apple-gray-600 hover:text-rose-500 dark:hover:text-rose-300 transition-colors duration-200"
              >
                {item.name}
              </motion.button>
            ))}

            {/* PDF 저장 버튼 */}
            <motion.button
              onClick={handleSaveAsPdf}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="no-print px-3 py-2 rounded-lg text-sm font-medium text-white bg-apple-blue hover:bg-apple-blue/90 transition-colors duration-200 flex items-center gap-1.5"
            >
              <FileDown size={18} />
              PDF로 저장
            </motion.button>

            {/* 다크모드 토글 */}
            <motion.button
              onClick={handleDarkModeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-2 p-2 rounded-full bg-white dark:bg-apple-gray-600 text-rose-500 dark:text-rose-300 hover:text-rose-600 dark:hover:text-rose-200 transition-all duration-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={handleSaveAsPdf}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="no-print p-2 rounded-full bg-apple-blue text-white"
              title="PDF로 저장"
            >
              <FileDown size={20} />
            </motion.button>
            <motion.button
              onClick={handleDarkModeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-rose-50 dark:bg-apple-gray-800 text-rose-500 dark:text-rose-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-rose-50 dark:bg-apple-gray-800 text-rose-500 dark:text-rose-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            <motion.button
              onClick={handleSaveAsPdf}
              whileHover={{ x: 10 }}
              className="no-print flex items-center gap-2 w-full text-left px-4 py-2 text-apple-gray-700 dark:text-apple-gray-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200 font-medium"
            >
              <FileDown size={18} />
              PDF로 저장
            </motion.button>
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ x: 10 }}
                className="block w-full text-left px-4 py-2 text-apple-gray-700 dark:text-apple-gray-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200"
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header