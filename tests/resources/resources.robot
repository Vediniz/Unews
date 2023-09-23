*** Settings ***
Library    SeleniumLibrary
Library    String

*** Variables *** 
${local_host}     localhost:3000

*** Keywords ***

Open Site Domain
    [Arguments]    ${site_domain}    ${browser}
    ${options}=    Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys, selenium.webdriver
    Call Method    ${options}  add_argument  --disable-dev-shm-usage

    IF  '${browser}'=='chrome'  
        ${webdriver}=    Set Variable    ${EXECDIR}/venv/bin/chromedriver
        Create Webdriver  Chrome    executable_path=${webdriver}    options=${options}
    END
  
    IF  '${browser}'=='firefox'    
        ${webdriver}=    Set Variable    ${EXECDIR}/venv/bin/geckodriver
        Create Webdriver  Firefox    executable_path=${webdriver}    options=${options}
    END
    Maximize Browser Window
    Go To           ${site_domain}




### Auxiliar Keywords
Wait and Click Element
    [Arguments]    ${button}
    Wait Until Page Contains Element    ${button}
    Click Element    ${button}