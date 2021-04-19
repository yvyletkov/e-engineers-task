import React from 'react'
import styled from 'styled-components'
import Feed from './components/Feed'

const StyledApp = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
`

const App: React.FC = () => {
    return <StyledApp>
        <Feed
            feedUrl='https://api.massrelevance.com/MassRelDemo/kindle.json'
            updateInterval={3000}
            postsToShow={10}/>
    </StyledApp>
}

export default App