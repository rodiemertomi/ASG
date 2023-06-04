function Navbar() {
  return (
    <div className='bg-gray-800'>
      <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-200 cursor-pointer'>ASG</h1>
        <nav className='space-x-4'>
          <a href='#' className='text-gray-200 hover:text-white hover:underline'>
            Home
          </a>
          <a href='#' className='text-gray-200 hover:text-white hover:underline'>
            About
          </a>
          <a href='#' className='text-gray-200 hover:text-white hover:underline'>
            Services
          </a>
          <a href='#' className='text-gray-200 hover:text-white hover:underline'>
            Contact
          </a>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
