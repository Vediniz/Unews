*** Settings ***
Library    SeleniumLibrary
Library    String

*** Variables *** 
${local_host}     localhost:3000

*** Keywords ***
Open Site Domain
    [Arguments]    ${site_domain}    ${browser}
    ${webdriver}    Set Variable    
    IF   '${browser}'=='chrome'
           ${webdriver}=    Evaluate    sys.modules['webdriver_manager.chrome'].ChromeDriverManager().install()    sys, webdriver_manager.chrome
    ELSE IF    '${browser}'=='firefox'
       ${webdriver}=    Evaluate    sys.modules['webdriver_manager.firefox'].GeckoDriverManager().install()    sys, webdriver_manager.firefox
    END
    Open Browser    ${site_domain}    ${browser}    executable_path=${webdriver}
    Maximize Browser Window

Check News
    ${qt_news}    Get Element Count    //*[@class="card"]
    FOR    ${i}    IN RANGE    1    ${qt_news+1}
        ${title}   Get Text    (//*[@class="card"])[${i}]//*[@class="card-title"]
        Wait and Click Element    (//*[@class="card"])[${i}]
        Check News Title    ${title}
        Check News Text
        Close News
    END
Check News Title
    [Arguments]    ${title}
    Wait Until Page Contains Element    //*[@class="content-newsModal"]//*[contains(text(), '${title}')]
Check News Text
    No Operation

Close News
    Wait and Click Element    //*[@class="close-button"]
### Auxiliar Keywords
Wait and Click Element
    [Arguments]    ${button}
    Wait Until Page Contains Element    ${button}
    Click Element    ${button}