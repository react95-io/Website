import React, { Component } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { styleReset } from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import Hero from "./views/Hero";
import Finally from "./views/Finally";
import Info from "./views/Info";


const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, * {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  background: teal;
`;
const Section = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={original}>
        <>
          <GlobalStyles />

          <Main>
            <ReactFullpage
              licenseKey="C6FC49F4-8D154646-97D49C8C-8B9E9DD8"
              anchors={["", "finally", "launched"]}
              verticalCentered={false}
              render={({ state, fullpageApi }) => {
                return (
                  <ReactFullpage.Wrapper>
                    <Section className="section">
                      <Hero />
                    </Section>
                    <Section className="section">
                      <Finally onStart={() => fullpageApi.moveSectionDown()} />
                    </Section>
                    <Section className="section">
                      <Info />
                    </Section>
                  </ReactFullpage.Wrapper>
                );
              }}
            />
          </Main>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
