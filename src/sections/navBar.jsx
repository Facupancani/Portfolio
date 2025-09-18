export default function navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><a href="#home" className="hover:text-white">Home</a></li>
          <li><a href="#projects" className="hover:text-white">Projects</a></li>
          <li><a href="#about-me" className="hover:text-white">About me</a></li>
          <li><a href="#contact" className="hover:text-white">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
