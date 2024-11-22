import { useEffect, useState } from "react"

const useActiveSection = items => {
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = items.map(item => {
        const element = document.querySelector(item.url)
        return {
          id: item.url,
          offsetTop: element ? element.offsetTop : 0,
        }
      })

      const scrollPosition = window.scrollY + window.innerHeight / 3

      // Find the section that corresponds to the current scroll position
      const active = sectionOffsets
        .reverse()
        .find(section => scrollPosition >= section.offsetTop)

      setActiveSection(active ? active.id : null)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [items])

  return activeSection
}

export default useActiveSection
