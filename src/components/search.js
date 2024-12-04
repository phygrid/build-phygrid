import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import * as PhosphorIcons from "@phosphor-icons/react"

const Search = () => {
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
    <SearchWrapper>
      <SearchInput
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search documentation..."
      />
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
    </SearchWrapper>
  )
}

export default Search

const SearchInput = styled.input`
  all: reset;
`

const ResultsWrapper = styled.div`
  position: absolute;
  background: var(--color-pageBg);
  top: 100%;
  left: 0;
  min-width: 320px;
  max-width: 720px;
  margin: 0;
  padding: 0;
  border-radius: var(--border-radius);
`

const Result = styled.li`
  margin: 0;
  padding: var(--space-2);
  display: block;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  &:last-of-type {
    border: 0;
  }
`

const Results = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const SearchWrapper = styled.div`
  position: relative;
  z-index: 4;
`

const SectionWrapper = styled.div``

const SectionTitle = styled.h3`
  margin: 0;
  padding: var(--space-2);
  color: var(--color-title);
  font-size: 1rem;
`
