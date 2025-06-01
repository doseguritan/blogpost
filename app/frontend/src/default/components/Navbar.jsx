import { CircleFadingPlus, MenuIcon } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { title: 'Blog', link: '/blogs' },
  { title: 'Contact', link: '#' },
  { title: 'About', link: '#' },
]

const Navbar = ({showBlogForm}) => {
  const [showNav, setShowNav] = useState(false)

  const handleShowNav = () => {
    setShowNav(!showNav)
  }

  return (
    <nav className="sticky top-0 left-0 z-20 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-white px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-10">
          {/* hamburger menu */}
          <button onClick={handleShowNav} aria-label="Toggle Menu" className="md:hidden">
            <MenuIcon color="#202020" strokeWidth={3} size={25} />
          </button>
          {/* logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dyvkdwzcj/image/upload/v1709055594/logo-1_vo1dni.png"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-primary md:text-2xl">
              Blog
            </span>
          </a>
          {/* nav links */}
          <div
            className={`absolute left-0 right-0 -z-10 flex w-full flex-col gap-3 bg-white p-3 shadow transition-all duration-300 ease-in-out md:relative md:left-0 md:right-auto md:top-auto md:z-auto md:flex-row md:shadow-none ${showNav ? 'top-[60px]' : 'top-[-165px]'}`}>
            {/* {navLinks.map(({ title, link }, index) => (
              <a
                key={index}
                href={link}
                className="rounded-md px-3 py-2 text-secondary transition-colors duration-100 ease-linear hover:bg-gray-700 hover:text-white">
                {title}
              </a>
            ))} */}
          </div>
        </div>
        {/* CTA button */}
        <div>
            <button
                type="button"
                className="flex items-center gap-2 rounded-lg border bg-theme px-4 py-2 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-theme-hover active:scale-95 sm:px-5 sm:py-2.5"
                onClick={() => showBlogForm(true)}
            >
                <CircleFadingPlus size={18} />
                <span>Create</span>
            </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar