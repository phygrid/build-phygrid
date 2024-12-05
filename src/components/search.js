import React, { useState, useRef, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import * as PhosphorIcons from "@phosphor-icons/react"

const Search = ({ toggleSearch }) => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `)

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const index = Index.load(data.siteSearchIndex.index)

  // Ref for the search input
  const searchInputRef = useRef(null)

  // Focus the search input and set up Escape key listener
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }

    const handleKeyDown = event => {
      if (event.key === "Escape") {
        toggleSearch() // Close the search modal
      }
    }

    // Add event listener
    window.addEventListener("keydown", handleKeyDown)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggleSearch])

  const handleSearch = e => {
    const query = e.target.value
    setQuery(query)

    if (query) {
      const searchResults = index
        .search(query, { expand: true }) // Enable partial matching
        .map(({ ref }) => index.documentStore.getDoc(ref))
      setResults(searchResults)
    } else {
      setResults([])
    }
  }

  // Group results alphabetically by section
  const groupedResults = results.reduce((acc, result) => {
    const section = result.section || "Other"
    if (!acc[section]) {
      acc[section] = []
    }
    acc[section].push(result)
    return acc
  }, {})

  const sortedSections = Object.keys(groupedResults).sort() // Sort sections alphabetically

  return (
    <Modal>
      <SearchWrapper>
        <CloseModal onClick={toggleSearch}>
          <PhosphorIcons.X />
        </CloseModal>
        <Label htmlFor="searchInput">Search the documentation</Label>
        <SearchInput
          id="searchInput"
          name="searchInput"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="What are you looking for?..."
          ref={searchInputRef} // Attach the ref to the input element
        />
        {results.length > 0 && (
          <ResultsWrapper>
            {sortedSections.map(section => (
              <SectionWrapper key={section}>
                <SectionTitle>{section}</SectionTitle>
                <Results>
                  {groupedResults[section].map(result => {
                    const IconComponent =
                      result.icon && PhosphorIcons[result.icon]
                        ? PhosphorIcons[result.icon]
                        : null

                    return (
                      <Result key={result.slug}>
                        <Link to={result.slug}>
                          {IconComponent && <IconComponent />}
                          {result.title}
                        </Link>
                      </Result>
                    )
                  })}
                </Results>
              </SectionWrapper>
            ))}
          </ResultsWrapper>
        )}
      </SearchWrapper>
    </Modal>
  )
}

export default Search

// Styled components
const Result = styled.li`
  margin: 0;
  padding: 0;
  display: block;

  a {
    display: block;
    padding: var(--space-2);
    &:hover {
      background: var(--color-border);
      text-decoration: underline;
    }
  }
`

const Results = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const SectionWrapper = styled.div`
  display: block;
  flex: 1 0 100%;
  padding: var(--space-2) 0 var(--space-4);
  border-top: 1px solid var(--color-border);

  &:first-of-type {
    border: 0;
  }
`

const SectionTitle = styled.h3`
  margin: 0;
  padding: 0 var(--space-2);
  color: var(--color-title);
  font-size: 1rem;
  border: 0;
  line-height: 1;
`

const SearchInput = styled.input`
  all: unset;
  width: 100%;
  box-sizing: border-box;
  padding: var(--space-2) 0;
  line-height: 1;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  &:focus,
  &:active {
    color: var(--color-title);
    border-color: rgba(255, 255, 255, 1);
  }
`

const ResultsWrapper = styled.div`
  position: relative;
  background: var(--color-pageBg);
  margin: var(--space-2) 0;
  padding: 0;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.2);
`

const Label = styled.label`
  font-size: var(--font-lg);
  font-weight: 600;
  padding: var(--space-2) 0 0 0;
  display: block;
`

const SearchWrapper = styled.div`
  display: block;
  margin: auto;
  max-width: 980px;
`

const CloseModal = styled.button`
  all: unset;
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  background: var(--color-border);
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100svw;
  height: 100svh;
  z-index: 20;
  display: block;
  margin: 0 var(--space-3) 0 auto;
  backdrop-filter: blur(40px);
  overflow: auto;
`
