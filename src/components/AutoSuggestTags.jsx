import { useState } from 'react'
import PropTypes from 'prop-types'

const AutoSuggestTags = props => {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { tags, setTags, subjects } = props

  const handleInputChange = e => {
    const { value } = e.target
    setInputValue(value)

    const suggestions = subjects.filter(subject =>
      subject.toLowerCase().startsWith(value.toLowerCase())
    )
    if (value === '') {
      setSuggestions([])
      return
    }
    setSuggestions(suggestions)
  }

  const handleTagClick = word => {
    const removeElement = word
    const newTag = tags.filter(tag => tag !== removeElement)
    setTags(newTag)
  }

  const handleSuggestionClick = tag => {
    setTags(prevTags => [...prevTags, tag])
    setInputValue('')
    setSuggestions([])
  }

  return (
    <div className='flex flex-col items-start gap-2'>
      <div className='flex gap-2'>
        {tags?.map((tag, index) => (
          <span
            key={index}
            className='bg-blue-500 text-white px-2 py-1 rounded-full cursor-pointer'
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Type a word'
        className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <ul className='bg-white border border-gray-300 rounded w-full'>
        {suggestions.map((word, index) => (
          <li
            key={index}
            className='px-3 py-2 cursor-pointer hover:bg-gray-100'
            onClick={() => handleSuggestionClick(word)}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  )
}

AutoSuggestTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default AutoSuggestTags
